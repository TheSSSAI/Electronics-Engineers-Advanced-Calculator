/**
 * @file Defines the data contracts (types and interfaces) for the Ohm's Law & Power calculator.
 * These types ensure strong typing for inputs and outputs of the calculation logic.
 *
 * @see REQ-1-032
 */

/**
 * Defines the input contract for the Ohm's Law calculator.
 * The calculation logic expects an object of this shape where exactly two
 * properties are provided as numbers, and the other two are null or undefined.
 */
export interface IOhmsLawInputs {
  /**
   * The voltage value in Volts (V).
   */
  voltage?: number | null;

  /**
   * The current value in Amperes (A).
   */
  current?: number | null;

  /**
   * The resistance value in Ohms (Ω).
   */
  resistance?: number | null;

  /**
   * The power value in Watts (W).
   */
  power?: number | null;
}

/**
 * Defines the output contract for a successful Ohm's Law calculation.
 * The result object will always be fully populated with all four calculated values.
 */
export interface IOhmsLawResult {
  /**
   * The calculated voltage value in Volts (V).
   */
  voltage: number;

  /**
   * The calculated current value in Amperes (A).
   */
  current: number;

  /**
   * The calculated resistance value in Ohms (Ω).
   */
  resistance: number;

  /**
   * The calculated power value in Watts (W).
   */
  power: number;
}