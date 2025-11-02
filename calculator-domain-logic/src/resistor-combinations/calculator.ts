import { ValidationError, DivisionByZeroError } from '../common/errors';

/**
 * Calculates the total equivalent resistance of resistors connected in series.
 * The total resistance is the arithmetic sum of all individual resistances.
 *
 * @param resistances An array of resistor values in Ohms.
 * @returns The total series resistance in Ohms. Returns 0 for an empty list.
 * @throws {ValidationError} if any resistance value is not a positive number.
 */
export const calculateSeries = (resistances: number[]): number => {
  if (resistances.length === 0) {
    return 0;
  }

  for (const r of resistances) {
    if (typeof r !== 'number' || !isFinite(r) || r <= 0) {
      throw new ValidationError('All resistance values must be positive numbers.');
    }
  }

  return resistances.reduce((sum, current) => sum + current, 0);
};

/**
 * Calculates the total equivalent resistance of resistors connected in parallel.
 * The formula is 1 / (1/R1 + 1/R2 + ... + 1/Rn).
 *
 * @param resistances An array of resistor values in Ohms.
 * @returns The total parallel resistance in Ohms. Returns Infinity for an empty list (open circuit).
 * @throws {ValidationError} if any resistance value is not a positive number.
 * @throws {DivisionByZeroError} if any resistance value is exactly zero.
 */
export const calculateParallel = (resistances: number[]): number => {
  if (resistances.length === 0) {
    return Infinity; // Represents an open circuit
  }
  
  let sumOfReciprocals = 0;

  for (const r of resistances) {
    if (typeof r !== 'number' || !isFinite(r) || r < 0) {
      throw new ValidationError('All resistance values must be non-negative numbers.');
    }
    if (r === 0) {
      // A zero-ohm resistor in parallel shorts the circuit, resulting in 0 total resistance.
      return 0;
    }
    sumOfReciprocals += 1 / r;
  }
  
  if (sumOfReciprocals === 0) {
      // This case should not be reachable with positive resistances, but as a safeguard:
      return Infinity;
  }

  return 1 / sumOfReciprocals;
};