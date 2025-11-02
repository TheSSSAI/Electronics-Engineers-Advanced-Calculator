/**
 * @fileoverview This is the main entry point for the calculator-domain-logic library.
 * It serves as a public facade, exporting all the necessary functions, types,
 * and errors from the individual domain modules.
 *
 * This barrel file simplifies the import process for consumers of the library,
 * allowing them to import all components from a single entry point.
 *
 * @packageDocumentation
 */

// Export all common errors and types.
export * from './common';

// Export all Ohm's Law related types and the calculator function.
export * from './ohms-law';

// Export all Resistor Combination related types and calculator functions.
export * from './resistor-combinations';

// Export all 555 Timer related types and calculator functions.
export * from './timer-555';