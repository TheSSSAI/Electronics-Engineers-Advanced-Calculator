/**
 * @file execution.error.ts
 * @description Defines a custom error class for handling specific failures
 * that occur during the sandboxed execution of a formula. Using a custom error
 * type allows for more specific catch blocks and better error tracking and logging.
 */

/**
 * Custom error thrown when a sandboxed formula execution fails for a specific
 * reason, such as a timeout, syntax error, or out-of-memory condition.
 */
export class ExecutionError extends Error {
  /**
   * The cause of the error, which could be the original error thrown by the sandbox.
   */
  public readonly cause?: unknown;

  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = 'ExecutionError';
    this.cause = cause;

    // This is a V8-specific feature that helps with stack traces
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ExecutionError);
    }
  }
}