/**
 * @file Defines custom error types for the domain logic library.
 * This allows consumers of the library to catch specific, typed errors
 * and handle them programmatically, rather than inspecting error messages.
 */

/**
 * Base error class for all domain-specific validation failures.
 * This can be used as a catch-all for any predictable input error
 * from the calculation logic.
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    // This is necessary for custom errors to work correctly with `instanceof`.
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Specific error thrown when the duty cycle for a 555 Astable calculation
 * is outside the physically possible range of (50, 100) percent.
 *
 * @see REQ-1-070
 */
export class InvalidDutyCycleError extends ValidationError {
  constructor() {
    super('Duty cycle must be strictly between 50 and 100.');
    this.name = 'InvalidDutyCycleError';
    Object.setPrototypeOf(this, InvalidDutyCycleError.prototype);
  }
}

/**
 * Specific error thrown when a calculation would result in division by zero.
 * This is particularly relevant for parallel resistor calculations where a
 * resistance of zero ohms would lead to an invalid mathematical operation.
 */
export class DivisionByZeroError extends ValidationError {
  constructor(message: string = 'Calculation resulted in division by zero.') {
    super(message);
    this.name = 'DivisionByZeroError';
    Object.setPrototypeOf(this, DivisionByZeroError.prototype);
  }
}