/**
 * @file Provides a utility function for parsing strings containing numbers with SI unit prefixes.
 * This is a pure, stateless function designed for reuse across the application.
 * @see REQ-1-023, REQ-BIZ-001
 */

/**
 * A map of supported SI unit prefixes to their corresponding numeric multipliers.
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
 * Regular expression to parse a number with an optional SI prefix.
 * It captures two groups:
 * 1. The numerical part (e.g., "-1.23", "47", ".5").
 * 2. The optional single-character SI prefix.
 */
const siPrefixRegex = new RegExp(
  `^([-+]?\\d*\\.?\\d+)([${Object.keys(siPrefixMultipliers).join('')}]?)$`,
);

/**
 * Parses a string containing a number and an optional, case-sensitive SI unit prefix.
 *
 * This function is compliant with REQ-1-023, supporting prefixes p, n, μ, m, k, M, G.
 * It is also compliant with REQ-BIZ-001 regarding case-sensitivity and no-space requirement.
 *
 * @param input The string to parse (e.g., "1.2k", "500m", "10μ", "47").
 * @returns The parsed numeric value.
 * @throws {Error} If the input string is malformed, contains an invalid number,
 * or has a character that is not a supported SI prefix.
 *
 * @example
 * parseWithSIPrefix("1.2k"); // Returns 1200
 * parseWithSIPrefix("100n"); // Returns 1e-7
 * parseWithSIPrefix("-5M");  // Returns -5000000
 * parseWithSIPrefix("47");   // Returns 47
 */
export function parseWithSIPrefix(input: string): number {
  if (typeof input !== 'string' || input.trim() === '') {
    throw new Error('Invalid input: Must be a non-empty string.');
  }

  const trimmedInput = input.trim();
  const match = trimmedInput.match(siPrefixRegex);

  if (!match) {
    throw new Error(
      `Invalid format: Input "${trimmedInput}" is not a valid number with an optional SI prefix.`,
    );
  }

  const [, numericPart, prefix] = match;

  const numericValue = parseFloat(numericPart);
  if (isNaN(numericValue)) {
    // This case should theoretically not be hit if the regex is correct,
    // but it provides an extra layer of defense.
    throw new Error(`Invalid numeric value in input: "${numericPart}".`);
  }

  if (prefix) {
    const multiplier = siPrefixMultipliers[prefix];
    // The check for multiplier should also not be strictly necessary due to the regex,
    // but it ensures type safety and robustness.
    if (multiplier !== undefined) {
      return numericValue * multiplier;
    }
  }

  return numericValue;
}