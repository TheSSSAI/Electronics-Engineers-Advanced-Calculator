/**
 * @file Defines the data contracts (types and interfaces) for the 555 Timer design calculator.
 * These types ensure strong typing for inputs and outputs of both astable and monostable modes.
 *
 * @see REQ-1-033
 * @see US-039
 */

/**
 * Represents the one known component and its value for an Astable mode calculation.
 * This is a discriminated union to ensure type safety, allowing for only one
 * known component type at a time.
 */
export type AstableKnownComponent =
  | { type: 'RA'; value: number }
  | { type: 'RB'; value: number }
  | { type: 'C'; value: number };

/**
 * Defines the input contract for the 555 Timer Astable mode calculator.
 */
export interface IAstableInput {
  /**
   * The target frequency in Hertz (Hz).
   */
  frequency: number;

  /**
   * The target duty cycle as a percentage (e.g., 75 for 75%).
   * Must be strictly between 50 and 100.
   * @see REQ-1-070
   */
  dutyCycle: number;

  /**
   * The single known component (RA, RB, or C) and its value.
   * The value for RA or RB is in Ohms (Ω).
   * The value for C is in Farads (F).
   */
  knownComponent: AstableKnownComponent;
}

/**
 * Defines the output contract for a successful 555 Timer Astable mode calculation.
 * The result object will be fully populated with all three component values.
 */
export interface IAstableResult {
  /**
   * The calculated value for resistor RA in Ohms (Ω).
   */
  ra: number;

  /**
   * The calculated value for resistor RB in Ohms (Ω).
   */
  rb: number;

  /**
   * The calculated value for capacitor C in Farads (F).
   */
  c: number;
}

/**
 * Represents the one known component and its value for a Monostable mode calculation.
 * This is a discriminated union for type safety.
 */
export type MonostableKnownComponent =
  | { type: 'R'; value: number }
  | { type: 'C'; value: number };

/**
 * Defines the input contract for the 555 Timer Monostable mode calculator.
 * @see US-039
 */
export interface IMonostableInput {
  /**
   * The target pulse width (T) in seconds (s).
   */
  pulseWidth: number;

  /**
   * The single known component (R or C) and its value.
   * The value for R is in Ohms (Ω).
   * The value for C is in Farads (F).
   */
  knownComponent: MonostableKnownComponent;
}

/**
 * Defines the output contract for a successful 555 Timer Monostable mode calculation.
 * The result object will be fully populated with both component values.
 */
export interface IMonostableResult {
  /**
   * The calculated value for resistor R in Ohms (Ω).
   */
  r: number;

  /**
   * The calculated value for capacitor C in Farads (F).
   */
  c: number;
}