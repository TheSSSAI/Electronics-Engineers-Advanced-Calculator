/**
 * @file common.types.ts
 * @description Defines common, reusable TypeScript types and interfaces used across the component library.
 * These types are foundational and not specific to any single feature.
 */

/**
 * Represents the angle modes available in the calculator.
 * Corresponds to requirement REQ-1-021.
 */
export type AngleMode = 'deg' | 'rad' | 'grad';

/**
 * Represents the state of a value that can be either user-input or system-calculated.
 * This is useful in components where some fields are derived from others.
 */
export type ValueSource = 'user' | 'calculated';

/**
 * Defines a generic structure for a value that includes its numerical representation
 * and its source (user-input or calculated).
 */
export interface SourcedValue {
  value: number | null;
  source: ValueSource;
}

/**
 * A generic type for representing a set of named values, often used for form states.
 */
export type ValueSet<T extends string> = Record<T, number | null>;

/**
 * A more detailed version of ValueSet that includes the source of each value.
 */
export type SourcedValueSet<T extends string> = Record<T, SourcedValue>;

/**
 * Defines the structure for localization strings (i18n) that components expect.
 * This allows the consuming application to provide all user-facing text,
 * fulfilling requirement REQ-1-035.
 */
export interface ComponentLabels {
  [key: string]: string | ComponentLabels;
}