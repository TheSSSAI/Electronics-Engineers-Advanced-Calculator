import * as ivm from 'isolated-vm';
import { ISandboxService } from '../../domain/interfaces/sandbox.service.interface';
import { ExecutionResult } from '../../domain/entities/execution-result.entity';
import {
  MEMORY_LIMIT_MB,
  EXECUTION_TIMEOUT_MS,
  ALLOWED_FUNCTIONS,
  ALLOWED_CONSTANTS,
} from '../config/sandbox.config';

/**
 * Implements the ISandboxService interface using the 'isolated-vm' library.
 * This service is responsible for executing untrusted user-defined formulas
 * in a secure, isolated V8 environment. It adheres to the strict security
 * and performance requirements of the application.
 *
 * @class IsolatedVmSandboxService
 * @implements {ISandboxService}
 */
export class IsolatedVmSandboxService implements ISandboxService {
  /**
   * Executes a given formula string in a secure sandbox.
   *
   * @param {string} formula - The user-defined formula to execute.
   * @param {Record<string, number>} context - A map of variable names to their numeric values.
   * @returns {Promise<ExecutionResult>} A promise that resolves to an ExecutionResult entity,
   * containing either the calculated value or an error message.
   */
  public async execute(
    formula: string,
    context: Record<string, number>,
  ): Promise<ExecutionResult> {
    let isolate: ivm.Isolate | null = null;

    try {
      // 1. Create a new V8 Isolate with a strict memory limit.
      isolate = new ivm.Isolate({ memoryLimit: MEMORY_LIMIT_MB });

      // 2. Create a new context (a distinct global environment) within the isolate.
      const ivmContext = await isolate.createContext();

      // 3. Get a reference to the global object within the context (the "jail").
      const jail = ivmContext.global;

      // Prevent the script from accessing the real 'global' object.
      await jail.set('global', jail.derefInto());

      // 4. Inject the allow-listed mathematical functions into the jail.
      for (const funcName in ALLOWED_FUNCTIONS) {
        if (Object.prototype.hasOwnProperty.call(ALLOWED_FUNCTIONS, funcName)) {
          await jail.set(
            funcName,
            new ivm.Reference(ALLOWED_FUNCTIONS[funcName]),
          );
        }
      }

      // 5. Inject the allow-listed mathematical constants into the jail.
      for (const constName in ALLOWED_CONSTANTS) {
        if (
          Object.prototype.hasOwnProperty.call(ALLOWED_CONSTANTS, constName)
        ) {
          await jail.set(constName, ALLOWED_CONSTANTS[constName]);
        }
      }

      // 6. Inject the user-provided context variables into the jail.
      for (const varName in context) {
        if (Object.prototype.hasOwnProperty.call(context, varName)) {
          // Using ExternalCopy to transfer the primitive value securely.
          await jail.set(varName, new ivm.ExternalCopy(context[varName]).copyInto());
        }
      }
      
      // 7. Construct the final script to be executed. We wrap the user formula in an IIFE
      // to ensure it returns a value.
      const fullScript = `(function() { return ${formula}; })();`;

      // 8. Compile the script with a strict execution timeout.
      const script = await isolate.createScript(fullScript, {
        timeout: EXECUTION_TIMEOUT_MS,
      });

      // 9. Run the compiled script within the secured context.
      const rawResult = await script.run(ivmContext, {
        timeout: EXECUTION_TIMEOUT_MS,
      });

      // 10. Validate the result type. We expect a number.
      if (typeof rawResult !== 'number' || !isFinite(rawResult)) {
        return ExecutionResult.createFailure(
          'Calculation did not result in a valid number.',
        );
      }

      return ExecutionResult.createSuccess(rawResult);
    } catch (error) {
      // 11. Catch all errors and format them into a user-friendly message.
      const errorMessage = this.formatExecutionError(error);
      return ExecutionResult.createFailure(errorMessage);
    } finally {
      // 12. CRITICAL: Always dispose of the isolate to release its memory.
      // Failure to do so will cause a severe memory leak in the Lambda environment.
      if (isolate) {
        isolate.dispose();
      }
    }
  }

  /**
   * Formats various types of execution errors into a single, user-friendly string.
   * @param {unknown} error - The error caught during script execution.
   * @returns {string} A formatted, user-friendly error message.
   */
  private formatExecutionError(error: unknown): string {
    if (error instanceof Error) {
      if (error.message.includes('Script execution timed out')) {
        return `Execution Error: Calculation timed out after ${EXECUTION_TIMEOUT_MS}ms.`;
      }
      if (error.message.includes('Isolate was disposed')) {
        return 'Execution Error: The calculation environment was terminated unexpectedly.';
      }
      if (error.name === 'SyntaxError') {
        return `Syntax Error: ${error.message}`;
      }
      if (error.name === 'ReferenceError') {
        return `Reference Error: ${error.message}. Ensure all variables and functions are defined and allowed.`;
      }
      return `Execution Error: ${error.message}`;
    }
    return 'An unknown error occurred during execution.';
  }
}