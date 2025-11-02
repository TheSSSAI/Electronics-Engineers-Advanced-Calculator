/**
 * @file electronics.types.ts
 * @description Defines TypeScript types and interfaces specific to the specialized electronics calculator components.
 */

// --- Ohm's Law & Power Types (REQ-1-032) ---

/**
 * Defines the keys for the Ohm's Law and Power calculator.
 */
export type OhmsLawKey = 'voltage' | 'current' | 'resistance' | 'power';

/**
 * A map of Ohm's Law values, where each can be a number or null.
 */
export type OhmsLawValues = Record<OhmsLawKey, number | null>;

// --- Resistor Color Code Types (US-034, US-036) ---

/**
 * Defines the possible number of bands for a resistor.
 */
export type ResistorBandCount = 3 | 4 | 5 | 6;

/**
 * Represents the standard EIA color codes for resistors.
 * The 'none' value is typically used for the tolerance band.
 */
export type ResistorColor =
  | 'black'
  | 'brown'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'violet'
  | 'grey'
  | 'white'
  | 'gold'
  | 'silver'
  | 'none';

/**
 * Defines the structure for a single band's color selection.
 */
export interface ResistorBand {
  color: ResistorColor;
}

// --- 555 Timer Types (REQ-1-033) ---

/**
 * Represents the two primary operating modes for a 555 timer.
 */
export type Timer555Mode = 'astable' | 'monostable';

/**
 * Defines the component that is known by the user in the astable mode calculation.
 */
export type Timer555AstableKnownComponent = 'ra' | 'rb' | 'c';

/**
 * Defines the values for the 555 timer astable mode calculator.
 */
export interface Timer555AstableValues {
  frequency: number | null;
  dutyCycle: number | null;
  ra: number | null;
  rb: number | null;
  c: number | null;
}

/**
 * Defines the values for the 555 timer monostable mode calculator.
 */
export interface Timer555MonostableValues {
  pulseWidth: number | null;
  resistance: number | null;
  capacitance: number | null;
}