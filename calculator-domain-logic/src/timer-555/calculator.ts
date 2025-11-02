import { ValidationError, InvalidDutyCycleError } from '../common/errors';
import { IAstableInput, IAstableResult, IMonostableInput, IMonostableResult } from './types';

const LN2 = 0.69314718056; // More precise ln(2)
const RECIPROCAL_LN2 = 1 / LN2; // Approximately 1.4427

/**
 * Calculates the component values for a 555 timer in Astable mode.
 *
 * @param inputs An object containing the target frequency, duty cycle, and one known component.
 * @returns An object with the calculated values for RA, RB, and C.
 * @throws {InvalidDutyCycleError} if the duty cycle is not strictly between 50 and 100.
 * @throws {ValidationError} if any input values are not positive numbers.
 * @throws {ValidationError} if the combination of inputs is physically impossible.
 */
export const calculateAstable = (inputs: IAstableInput): IAstableResult => {
  const { frequency, dutyCycle, knownComponent } = inputs;

  if (typeof frequency !== 'number' || !isFinite(frequency) || frequency <= 0) {
    throw new ValidationError('Frequency must be a positive number.');
  }
  if (typeof dutyCycle !== 'number' || !isFinite(dutyCycle) || dutyCycle <= 50 || dutyCycle >= 100) {
    throw new InvalidDutyCycleError('Duty cycle must be strictly between 50 and 100 percent.');
  }
  if (typeof knownComponent.value !== 'number' || !isFinite(knownComponent.value) || knownComponent.value <= 0) {
    throw new ValidationError('Known component value must be a positive number.');
  }

  const d = dutyCycle / 100;
  let ra: number;
  let rb: number;
  let c: number;

  switch (knownComponent.type) {
    case 'C':
      c = knownComponent.value;
      const totalResistancePeriod = RECIPROCAL_LN2 / (frequency * c);
      rb = totalResistancePeriod * (1 - d);
      ra = totalResistancePeriod - 2 * rb;
      break;

    case 'RA':
      ra = knownComponent.value;
      // from D = (RA + RB) / (RA + 2*RB) => RB = RA * (1-D) / (2*D - 1)
      rb = ra * (1 - d) / (2 * d - 1);
      // from f = 1.44 / ((RA + 2*RB) * C) => C = 1.44 / (f * (RA + 2*RB))
      c = RECIPROCAL_LN2 / (frequency * (ra + 2 * rb));
      break;

    case 'RB':
      rb = knownComponent.value;
      // from D = (RA + RB) / (RA + 2*RB) => RA = RB * (2*D - 1) / (1-D)
      ra = rb * (2 * d - 1) / (1 - d);
      c = RECIPROCAL_LN2 / (frequency * (ra + 2 * rb));
      break;
    
    default:
        // This should be unreachable with TypeScript's discriminated union
        throw new ValidationError('Invalid known component type.');
  }

  if (!isFinite(ra) || !isFinite(rb) || !isFinite(c) || ra <= 0 || rb <= 0 || c <= 0) {
      throw new ValidationError('The provided inputs result in a physically impossible circuit (e.g., non-positive component values).');
  }

  return { ra, rb, c };
};

/**
 * Calculates the unknown component value for a 555 timer in Monostable mode.
 *
 * @param inputs An object containing the target pulse width and one known component (R or C).
 * @returns An object with the values for R and C.
 * @throws {ValidationError} if any input values are not positive numbers.
 */
export const calculateMonostable = (inputs: IMonostableInput): IMonostableResult => {
    const { pulseWidth, knownComponent } = inputs;
    const TIME_CONSTANT_FACTOR = 1.1; // Standard approximation T = 1.1 * R * C

    if (typeof pulseWidth !== 'number' || !isFinite(pulseWidth) || pulseWidth <= 0) {
        throw new ValidationError('Pulse width must be a positive number.');
    }
    if (typeof knownComponent.value !== 'number' || !isFinite(knownComponent.value) || knownComponent.value <= 0) {
        throw new ValidationError('Known component value must be a positive number.');
    }

    let r: number;
    let c: number;

    switch (knownComponent.type) {
        case 'R':
            r = knownComponent.value;
            c = pulseWidth / (TIME_CONSTANT_FACTOR * r);
            break;
        
        case 'C':
            c = knownComponent.value;
            r = pulseWidth / (TIME_CONSTANT_FACTOR * c);
            break;
        
        default:
            // This should be unreachable with TypeScript's discriminated union
            throw new ValidationError('Invalid known component type.');
    }

    if (!isFinite(r) || !isFinite(c) || r <= 0 || c <= 0) {
        throw new ValidationError('The provided inputs result in a physically impossible circuit (e.g., non-positive component values).');
    }

    return { r, c };
};