/**
 * @file validation-rules.ts
 * @description Provides reusable, pure functions for common business rule validations
 * required by various electronic calculator components.
 */

// --- General Validation Functions ---

/**
 * Checks if a numerical value is positive (greater than zero).
 * Fulfills business rule BR-RES-001 (US-033) and BR-OHM-01 (US-029).
 * @param value The number to check.
 * @returns `true` if the value is greater than 0, otherwise `false`.
 */
export const isPositive = (value: number): boolean => value > 0;

/**
 * Checks if a numerical value is non-negative (greater than or equal to zero).
 * Fulfills business rule BR-OHM-02 (US-029).
 * @param value The number to check.
 * @returns `true` if the value is greater than or equal to 0, otherwise `false`.
 */
export const isNonNegative = (value: number): boolean => value >= 0;


// --- 555 Timer Validation Rules (US-038, US-040) ---

/**
 * Checks if a duty cycle percentage is within the valid range for a 555 astable circuit.
 * The range is (50, 100) - exclusive of the boundaries.
 * Fulfills business rule BR-555-DC-01.
 * @param dutyCycle The duty cycle percentage to check.
 * @returns `true` if 50 < dutyCycle < 100, otherwise `false`.
 */
export const isValidAstableDutyCycle = (dutyCycle: number): boolean =>
  dutyCycle > 50 && dutyCycle < 100;

/**
 * Defines the practical component value ranges for 555 timer designs.
 * Used to provide warnings to the user as per US-040.
 */
export const TIMER_555_PRACTICAL_RANGES = {
  RESISTOR: {
    MIN: 1e3, // 1 kΩ
    MAX: 10e6, // 10 MΩ
    DESCRIPTION: '1kΩ - 10MΩ',
  },
  CAPACITOR: {
    MIN: 100e-12, // 100 pF
    MAX: 1000e-6, // 1000 μF
    DESCRIPTION: '100pF - 1000μF',
  },
};

/**
 * Checks if a resistor value is within the typical practical range for a 555 timer circuit.
 * @param resistance The resistance value in Ohms.
 * @returns `true` if the value is within the practical range, otherwise `false`.
 */
export const isPracticalResistorValue = (resistance: number): boolean => {
  const { MIN, MAX } = TIMER_555_PRACTICAL_RANGES.RESISTOR;
  return resistance >= MIN && resistance <= MAX;
};

/**
 * Checks if a capacitor value is within the typical practical range for a 555 timer circuit.
 * @param capacitance The capacitance value in Farads.
 * @returns `true` if the value is within the practical range, otherwise `false`.
 */
export const isPracticalCapacitorValue = (capacitance: number): boolean => {
  const { MIN, MAX } = TIMER_555_PRACTICAL_RANGES.CAPACITOR;
  return capacitance >= MIN && capacitance <= MAX;
};