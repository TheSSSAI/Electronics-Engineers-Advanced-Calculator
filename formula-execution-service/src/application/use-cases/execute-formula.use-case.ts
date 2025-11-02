import { ISandboxService } from '../../domain/interfaces/sandbox.service.interface';
import { ExecutionResult } from '../../domain/entities/execution-result.entity';
import { ExecuteFormulaCommand } from '../dtos/execute-formula.dto';
import { ExecutionError } from '../errors/execution.error';

/**
 * @interface IUseCase
 * @description Defines the contract for a use case, ensuring a consistent execution pattern.
 * @template TCommand The command object type that the use case accepts.
 * @template TResult The result type that the use case returns.
 */
export interface IUseCase<TCommand, TResult> {
  execute(command: TCommand): Promise<TResult>;
}

/**
 * @class ExecuteFormulaUseCase
 * @description Implements the application-specific business logic for executing a user-defined formula.
 * It orchestrates the validation of the input and delegates the secure execution to a sandbox service.
 * This class is decoupled from the specific implementation of the sandbox and the Lambda handler,
 * adhering to Clean Architecture principles.
 */
export class ExecuteFormulaUseCase
  implements IUseCase<ExecuteFormulaCommand, ExecutionResult>
{
  /**
   * @param {ISandboxService} sandboxService - The injected sandbox service that conforms to the ISandboxService interface.
   * This implements the Dependency Inversion Principle, allowing the underlying sandbox technology to be swapped.
   */
  constructor(private readonly sandboxService: ISandboxService) {}

  /**
   * @method execute
   * @description Executes the use case to validate and run a formula.
   * @param {ExecuteFormulaCommand} command - The command object containing the formula and its context.
   * @returns {Promise<ExecutionResult>} A promise that resolves to an ExecutionResult entity,
   * containing either the calculated value or an error message.
   */
  public async execute(
    command: ExecuteFormulaCommand,
  ): Promise<ExecutionResult> {
    try {
      // 1. Perform initial application-level validation on the command object.
      const validationError = this.validateCommand(command);
      if (validationError) {
        // REQ-1-019, REQ-1-069: The application layer is responsible for validating incoming data.
        // If validation fails, return a failure result immediately without invoking the domain service.
        return ExecutionResult.createFailure(validationError);
      }

      // 2. Delegate the core, security-critical execution logic to the injected domain service.
      // This honors the separation of concerns between application and domain layers.
      // REQ-1-018: The actual sandboxed execution is handled by the service implementation.
      const result = await this.sandboxService.execute(
        command.formula,
        command.context,
      );

      return result;
    } catch (error) {
      // 3. Catch any unexpected, unhandled exceptions from the domain service layer.
      // While the ISandboxService contract should prevent this, this acts as a safety net.
      // This ensures the Lambda handler always receives a structured response.
      console.error('Unexpected error in ExecuteFormulaUseCase:', error);

      if (error instanceof ExecutionError) {
        return ExecutionResult.createFailure(error.message);
      }

      // Return a generic failure result for unknown errors to avoid leaking implementation details.
      return ExecutionResult.createFailure(
        'An unexpected internal error occurred during formula execution.',
      );
    }
  }

  /**
   * @method validateCommand
   * @private
   * @description Validates the incoming command object to ensure it meets basic requirements
   * before being processed by the domain layer.
   * @param {ExecuteFormulaCommand} command - The command to validate.
   * @returns {string | null} An error message string if validation fails, otherwise null.
   */
  private validateCommand(command: ExecuteFormulaCommand): string | null {
    if (!command) {
      return 'Invalid command: The request is empty or malformed.';
    }

    const { formula, context } = command;

    if (
      typeof formula !== 'string' ||
      formula.trim().length === 0
    ) {
      return 'Invalid formula: The formula must be a non-empty string.';
    }

    if (
      context === null ||
      typeof context !== 'object' ||
      Array.isArray(context)
    ) {
      return 'Invalid context: The context must be a valid key-value object.';
    }

    // Additional validation can be added here, for example, checking context value types.
    for (const key in context) {
      if (Object.prototype.hasOwnProperty.call(context, key)) {
          const value = context[key];
          if (typeof value !== 'number' || !isFinite(value)) {
              return `Invalid context value for key "${key}": All context values must be finite numbers.`;
          }
      }
    }


    return null;
  }
}