/**
 * @file si-prefix-parser.ts
 * @description Provides a utility function to parse numerical strings containing SI prefixes.
 * This utility is crucial for user stories like US-014 and requirements REQ-1-023 and REQ-BIZ-001.
 */

/**
 * A map of supported SI prefixes to their corresponding numerical multipliers.
 * The keys are case-sensitive as per REQ-BIZ-001.
 */
const siPrefixMultipliers: Readonly<Record<string, number>> = {
  p: 1e-12, // pico
  n: 1e-9,  // nano
  μ: 1e-6,  // micro
  m: 1e-3,  // milli
  k: 1e3,   // kilo
  M: 1e6,   // mega
  G: 1e9,   // giga
};

/**
 * A regular expression to capture the numerical part and the optional SI prefix.
 * - Group 1: The number (integer or decimal, possibly with a sign).
 * - Group 2: The single-character SI prefix.
 */
const siPrefixRegex = /^(-?\d*\.?\d+)([pnuμmkMG])?$/;

/**
 * Parses a string that may contain a number and an SI prefix into its numerical value.
 *
 * @param input The string to parse (e.g., "1.2k", "100n", "500").
 * @returns The parsed numerical value, or NaN if the input is invalid.
 *
 * @example
 * parseWithSIPrefix("10k"); // returns 10000
 * parseWithSIPrefix("2.5M"); // returns 2500000
 * parseWithSIPrefix("100μ"); // returns 0.0001
 * parseWithSIPrefix("invalid"); // returns NaN
 * parseWithSIPrefix("10 k"); // returns NaN (space is invalid per REQ-BIZ-001)
 */
export function parseWithSIPrefix(input: string): number {
  const trimmedInput = input.trim();
  if (trimmedInput === '') {
    return NaN;
  }

  // Handle plain numbers without prefixes first for performance
  const plainNumber = Number(trimmedInput);
  if (!isNaN(plainNumber) && isFinite(plainNumber)) {
     // Check if a valid prefix char is at the end, which would be invalid for a plain number.
     const lastChar = trimmedInput[trimmedInput.length - 1];
     if (siPrefixMultipliers[lastChar] && isNaN(parseInt(lastChar))) {
        // This case is like '10k' which Number() would parse as NaN
     } else {
        return plainNumber;
     }
  }

  const match = trimmedInput.match(siPrefixRegex);

  if (!match) {
    return NaN;
  }

  const [, numStr, prefix] = match;
  const num = parseFloat(numStr);

  if (isNaN(num)) {
    return NaN;
  }

  if (prefix) {
    const multiplier = siPrefixMultipliers[prefix];
    if (multiplier !== undefined) {
      return num * multiplier;
    }
  }
  
  // This path is taken if a number was matched but no prefix.
  // This case can happen if the initial plain number check fails for some reason.
  if(!prefix) {
    return num;
  }

  return NaN;
}