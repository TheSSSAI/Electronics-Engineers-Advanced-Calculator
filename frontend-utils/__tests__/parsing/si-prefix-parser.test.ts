import { describe, it, expect } from 'vitest';
import { parseWithSIPrefix } from '../../src/parsing/si-prefix-parser';

describe('parseWithSIPrefix', () => {
  // Test cases for valid inputs
  const validTestCases = [
    // Integers and decimals without prefixes
    { input: '123', expected: 123 },
    { input: '45.67', expected: 45.67 },
    { input: '0.123', expected: 0.123 },
    { input: '-50', expected: -50 },
    { input: '-0.25', expected: -0.25 },

    // Large-magnitude prefixes (k, M, G)
    { input: '1k', expected: 1000 },
    { input: '2.5k', expected: 2500 },
    { input: '1M', expected: 1_000_000 },
    { input: '0.75M', expected: 750_000 },
    { input: '1G', expected: 1_000_000_000 },
    { input: '3.1G', expected: 3_100_000_000 },
    { input: '-2k', expected: -2000 },

    // Small-magnitude prefixes (m, μ, n, p)
    { input: '1m', expected: 0.001 },
    { input: '250m', expected: 0.25 },
    { input: '1μ', expected: 0.000_001 },
    { input: '100μ', expected: 0.000_1 },
    { input: '1n', expected: 0.000_000_001 },
    { input: '47.5n', expected: 4.75e-8 },
    { input: '1p', expected: 0.000_000_000_001 },
    { input: '500p', expected: 5e-10 },
    { input: '-10m', expected: -0.01 },
    { input: '-1.5μ', expected: -0.0000015 },
  ];

  it.each(validTestCases)(
    'should correctly parse "$input" to $expected',
    ({ input, expected }) => {
      expect(parseWithSIPrefix(input)).toBeCloseTo(expected);
    },
  );

  // Test cases for invalid inputs that should throw an error
  const invalidTestCases = [
    { input: '1 K', description: 'space between number and prefix' },
    { input: '1K', description: 'incorrect case for kilo (K)' },
    { input: '1g', description: 'incorrect case for giga (g)' },
    { input: '1x', description: 'invalid prefix character' },
    { input: 'kk', description: 'prefix without a number' },
    { input: '1kk', description: 'multiple prefixes' },
    { input: 'k1', description: 'prefix before number' },
    { input: '1.2.3', description: 'malformed number' },
    { input: 'abc', description: 'non-numeric string' },
    { input: '', description: 'empty string' },
    { input: '  ', description: 'whitespace string' },
    { input: '1e2k', description: 'scientific notation with prefix' },
    { input: '1 k', description: 'space between number and prefix' },
  ];

  it.each(invalidTestCases)(
    'should throw an error for invalid input "$input" ($description)',
    ({ input }) => {
      expect(() => parseWithSIPrefix(input)).toThrow();
    },
  );

  it('should throw a specific error for malformed input', () => {
    expect(() => parseWithSIPrefix('abc')).toThrow(
      "Invalid numeric string 'abc'",
    );
  });

  it('should throw a specific error for an unsupported prefix', () => {
    expect(() => parseWithSIPrefix('10z')).toThrow(
      "Unsupported SI prefix 'z' in '10z'",
    );
  });

  // REQ-BIZ-001 Case-sensitivity test
  describe('case sensitivity', () => {
    it("should distinguish 'm' (milli) from 'M' (mega)", () => {
      expect(parseWithSIPrefix('1m')).toBe(0.001);
      expect(parseWithSIPrefix('1M')).toBe(1_000_000);
    });

    it('should reject uppercase K for kilo', () => {
      expect(() => parseWithSIPrefix('1K')).toThrow();
    });

    it('should reject lowercase g for giga', () => {
      expect(() => parseWithSIPrefix('1g')).toThrow();
    });
  });
});