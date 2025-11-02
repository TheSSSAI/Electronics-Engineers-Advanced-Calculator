import { ValidationError } from '../common/errors';
import { IOhmsLawInputs, IOhmsLawResult } from './types';

/**
 * Calculates the missing two values (Voltage, Current, Resistance, Power)
 * when any two are provided, based on Ohm's Law (V=IR) and the Power Law (P=VI).
 *
 * @param inputs An object containing exactly two of the four possible values.
 * @returns A fully populated object with all four calculated values.
 * @throws {ValidationError} if the number of provided inputs is not exactly two.
 * @throws {ValidationError} if resistance is provided and is not positive (> 0).
 * @throws {ValidationError} if power is provided and is not non-negative (>= 0).
 * @throws {ValidationError} for impossible calculations, e.g., zero voltage with non-zero current.
 */
export const calculateOhmsLaw = (inputs: IOhmsLawInputs): IOhmsLawResult => {
  const providedValues = Object.entries(inputs)
    .filter(([, value]) => value !== null && value !== undefined && typeof value === 'number' && isFinite(value))
    .map(([key, value]) => ({ key, value: value as number }));

  if (providedValues.length !== 2) {
    throw new ValidationError('Exactly two values must be provided for Ohm\'s Law calculation.');
  }

  let { voltage, current, resistance, power } = inputs;

  // Validate physical constraints of provided inputs
  if (resistance !== undefined && resistance !== null && resistance <= 0) {
    throw new ValidationError('Resistance must be a positive value.');
  }
  if (power !== undefined && power !== null && power < 0) {
    throw new ValidationError('Power must be a non-negative value.');
  }

  // Case 1: Voltage and Current are known
  if (voltage !== undefined && voltage !== null && current !== undefined && current !== null) {
    resistance = current === 0 ? Infinity : voltage / current;
    power = voltage * current;
  }
  // Case 2: Voltage and Resistance are known
  else if (voltage !== undefined && voltage !== null && resistance !== undefined && resistance !== null) {
    current = voltage / resistance;
    power = (voltage * voltage) / resistance;
  }
  // Case 3: Voltage and Power are known
  else if (voltage !== undefined && voltage !== null && power !== undefined && power !== null) {
    if (voltage === 0 && power > 0) {
        throw new ValidationError('Cannot have positive power with zero voltage.');
    }
    current = voltage === 0 ? 0 : power / voltage;
    resistance = power === 0 ? Infinity : (voltage * voltage) / power;
  }
  // Case 4: Current and Resistance are known
  else if (current !== undefined && current !== null && resistance !== undefined && resistance !== null) {
    voltage = current * resistance;
    power = current * current * resistance;
  }
  // Case 5: Current and Power are known
  else if (current !== undefined && current !== null && power !== undefined && power !== null) {
     if (current === 0 && power > 0) {
        throw new ValidationError('Cannot have positive power with zero current.');
    }
    voltage = current === 0 ? 0 : power / current;
    resistance = current === 0 ? Infinity : power / (current * current);
  }
  // Case 6: Resistance and Power are known
  else if (resistance !== undefined && resistance !== null && power !== undefined && power !== null) {
    voltage = Math.sqrt(power * resistance);
    current = Math.sqrt(power / resistance);
  }
  
  const result: IOhmsLawResult = {
    voltage: voltage!,
    current: current!,
    resistance: resistance!,
    power: power!,
  };

  // Final validation on calculated results
  if (result.resistance <= 0 && isFinite(result.resistance)) {
      throw new ValidationError('Calculation resulted in an invalid non-positive resistance.');
  }

  return result;
};