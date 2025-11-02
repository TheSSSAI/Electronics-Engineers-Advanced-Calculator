import { ExecutionResult } from '../entities/execution-result.entity';

/**
 * @interface ISandboxService
 * @description Defines the contract for a service that securely executes untrusted code
 * within an isolated environment. This serves as a port in the Clean Architecture,
 * decoupling the application's use cases from the specific implementation of the sandbox
 * (e.g., isolated-vm, Docker, etc.).
 *
 * This contract is central to fulfilling the security requirements REQ-1-018 and REQ-1-019.
 */
export interface ISandboxService {
  /**
   * Executes a given formula string with a provided context in a secure, isolated sandbox.
   * Implementations of this method are responsible for the entire lifecycle of the sandbox:
   * creation, context injection, secure execution with resource limits, and teardown.
   *
   * @param {string} formula - The untrusted, user-defined formula string to be executed.
   * @param {Record<string, number>} context - A key-value map of variables to be made
   * available in the global scope of the sandbox during execution. This directly supports
   * the use of user-defined variables in custom modes.
   * @returns {Promise<ExecutionResult>} A promise that resolves to an `ExecutionResult` entity.
   * This entity encapsulates either the successful numerical result of the computation
   * or a structured error if the execution fails (e.g., syntax error, timeout, security violation).
   * This pattern avoids throwing exceptions for predictable execution failures, providing a clean
   * and robust error handling mechanism across architectural boundaries.
   */
  execute(
    formula: string,
    context: Record<string, number>,
  ): Promise<ExecutionResult>;
}

/**
 * @const SANDBOX_SERVICE
 * @description A constant used as a dependency injection token for the ISandboxService.
 * This allows for a loosely coupled architecture where the concrete implementation of the
 * sandbox can be injected at runtime.
 */
export const SANDBOX_SERVICE = Symbol('ISandboxService');