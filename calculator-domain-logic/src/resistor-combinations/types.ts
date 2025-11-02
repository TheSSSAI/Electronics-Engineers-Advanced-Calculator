/**
 * @file Defines the data contracts (types and interfaces) for the Resistor Combination calculator.
 * These types ensure strong typing for inputs and outputs of the calculation logic.
 */

/**
 * Represents an array of resistor values.
 * Each number in the array is a resistance value in Ohms (Ω).
 * These values must be positive, non-zero numbers.
 */
export type ResistanceValues = number[];

/**
 * Represents the total calculated resistance.
 * The value is in Ohms (Ω).
 */
export type TotalResistance = number;