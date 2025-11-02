/**
 * @file Barrel file for the Resistor Combinations module.
 *
 * This file serves as the public API for the resistor combination domain logic.
 * It re-exports all necessary functions, types, and interfaces required
 * for performing series and parallel resistance calculations. This encapsulation
 * allows consumers to import all related components from a single, consistent
 * entry point, simplifying usage and improving maintainability.
 *
 * @packageDocumentation
 */

export * from './types';
export * from './calculator';