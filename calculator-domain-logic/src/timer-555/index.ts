/**
 * @file Barrel file for the 555 Timer module.
 *
 * This file serves as the public API for the 555 Timer domain logic.
 * It re-exports all necessary functions, types, and interfaces required
 * for performing both astable and monostable mode calculations. This encapsulation
 * allows consumers to import all related components from a single, consistent
 * entry point, simplifying usage and improving maintainability.
 *
 * @packageDocumentation
 */

export * from './types';
export * from './calculator';