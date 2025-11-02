import { describe, it, expect } from 'vitest';
import { parseWithSIPrefix } from './si-prefix-parser';

describe('parseWithSIPrefix', () => {
  // REQ-FRC-023 and US-014: Test large-magnitude prefixes
  it('should correctly parse large-magnitude SI prefixes', () => {
    expect(parseWithSIPrefix('1k')).toBe(1000);
    expect(parseWithSIPrefix('2.5M')).toBe(2500000);
    expect(parseWithSIPrefix('0.7G')).toBe(700000000);
  });

  // REQ-FRC-023 and US-014: Test small-magnitude prefixes
  it('should correctly parse small-magnitude SI prefixes', () => {
    expect(parseWithSIPrefix('5m')).toBe(0.005);
    expect(parseWithSIPrefix('100μ')).toBe(0.0001);
    expect(parseWithSIPrefix('10n')).toBe(0.00000001);
    expect(parseWithSIPrefix('250p')).toBe(0.00000000025);
  });
  
  it('should handle the micro symbol "u" as well', () => {
    expect(parseWithSIPrefix('100u')).toBe(0.0001);
  });

  it('should handle numbers without prefixes', () => {
    expect(parseWithSIPrefix('123')).toBe(123);
    expect(parseWithSIPrefix('0.456')).toBe(0.456);
    expect(parseWithSIPrefix('0')).toBe(0);
  });

  it('should handle negative numbers with prefixes', () => {
    expect(parseWithSIPrefix('-1k')).toBe(-1000);
    expect(parseWithSIPrefix('-2.5M')).toBe(-2500000);
    expect(parseWithSIPrefix('-5m')).toBe(-0.005);
    expect(parseWithSIPrefix('-100n')).toBe(-0.0000001);
  });

  it('should return null for invalid input string', () => {
    expect(parseWithSIPrefix('abc')).toBeNull();
    expect(parseWithSIPrefix('1k ')).toBeNull(); // trailing space
    expect(parseWithSIPrefix(' 1k')).toBeNull(); // leading space
    expect(parseWithSIPrefix('1 k')).toBeNull(); // space in middle
    expect(parseWithSIPrefix('1kk')).toBeNull(); // multiple prefixes
    expect(parseWithSIPrefix('k1')).toBeNull(); // prefix before number
  });
  
  // REQ-BIZ-001 (case-sensitivity)
  it('should be case-sensitive and reject invalid cases', () => {
    expect(parseWithSIPrefix('1K')).toBeNull(); // K is not k
    expect(parseWithSIPrefix('1g')).toBeNull(); // g is not G
    expect(parseWithSIPrefix('1P')).toBeNull(); // P is not p
  });

  it('should handle empty, null, or undefined input', () => {
    expect(parseWithSIPrefix('')).toBeNull();
    expect(parseWithSIPrefix(null)).toBeNull();
    expect(parseWithSIPrefix(undefined)).toBeNull();
  });

  it('should correctly parse when prefix is the only character after number', () => {
    expect(parseWithSIPrefix('1000m')).toBe(1);
    expect(parseWithSIPrefix('0.001k')).toBe(1);
  });
  
  it('should handle complex decimal and prefix combinations', () => {
    expect(parseWithSIPrefix('123.456k')).toBe(123456);
    expect(parseWithSIPrefix('0.000123M')).toBe(123);
  });
});