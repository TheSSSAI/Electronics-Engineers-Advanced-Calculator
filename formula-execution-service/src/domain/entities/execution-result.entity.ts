/**
 * @file execution-result.entity.ts
 * @description This entity represents the standardized result of a sandboxed formula execution.
 * It follows a result pattern, encapsulating either a successful value or an error,
 * preventing the use of exceptions for control flow across application layers. This aligns with
 * DDD principles of creating robust, expressive domain models.
 */

export class ExecutionResult {
  public readonly value: number | null;
  public readonly error: string | null;
  public readonly isSuccess: boolean;

  /**
   * The constructor is private to enforce the use of static factory methods,
   * ensuring that instances of ExecutionResult are always in a valid state
   * (either a success with a value or a failure with an error).
   * @param isSuccess - Indicates if the execution was successful.
   * @param value - The numerical result of a successful execution.
   * @param error - The error message of a failed execution.
   */
  private constructor(
    isSuccess: boolean,
    value: number | null,
    error: string | null,
  ) {
    this.isSuccess = isSuccess;
    this.value = value;
    this.error = error;

    Object.freeze(this);
  }

  /**
   * Creates a success result instance.
   * @param value - The numerical result of the calculation.
   * @returns A new ExecutionResult instance representing success.
   */
  public static createSuccess(value: number): ExecutionResult {
    if (value === null || value === undefined || !isFinite(value)) {
        // Defensive check, though the sandbox should prevent non-finite numbers.
        // If it happens, it's an internal error state, not a user error.
        return new ExecutionResult(false, null, 'Internal Error: Invalid success value provided.');
    }
    return new ExecutionResult(true, value, null);
  }

  /**
   * Creates a failure result instance.
   * @param error - A user-friendly error message explaining the failure.
   * @returns A new ExecutionResult instance representing failure.
   */
  public static createFailure(error: string): ExecutionResult {
    const errorMessage = error || 'An unknown execution error occurred.';
    return new ExecutionResult(false, null, errorMessage);
  }
}