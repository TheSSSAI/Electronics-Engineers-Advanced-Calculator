/**
 * @file number-formatter.ts
 * @description Provides a utility function for formatting numbers into engineering notation.
 * This is crucial for displaying results in a professional format, as required by US-015.
 */

/**
 * A map of exponent thresholds to their corresponding SI prefixes for engineering notation.
 * The exponents must be multiples of 3.
 */
const engineeringPrefixes: Readonly<Record<number, string>> = {
  '-12': 'p', // pico
  '-9': 'n',  // nano
  '-6': 'μ',  // micro
  '-3': 'm',  // milli
  '0': '',    // base
  '3': 'k',   // kilo
  '6': 'M',   // mega
  '9': 'G',   // giga
};

const exponents = Object.keys(engineeringPrefixes).map(Number).sort((a, b) => a - b);

interface FormatOptions {
  significantFigures?: number;
  unit?: string;
}

/**
 * Formats a number into engineering notation with a specified number of significant figures.
 *
 * @param value The number to format.
 * @param options Optional configuration for formatting.
 * @param options.significantFigures The number of significant figures to display (default: 4).
 * @param options.unit An optional unit to append to the formatted string (e.g., 'Ω').
 * @returns The formatted string in engineering notation.
 *
 * @example
 * formatToEngineering(12345); // returns "12.35 k"
 * formatToEngineering(12345, { significantFigures: 6 }); // returns "12.3450 k"
 * formatToEngineering(0.00012345, { unit: 'F' }); // returns "123.5 μF"
 * formatToEngineering(0); // returns "0"
 */
export function formatToEngineering(
  value: number,
  options: FormatOptions = {}
): string {
  const { significantFigures = 4, unit = '' } = options;

  if (value === 0) {
    return '0';
  }
  
  if (isNaN(value) || !isFinite(value)) {
    return String(value); // Return 'NaN', 'Infinity', '-Infinity' as is
  }

  const isNegative = value < 0;
  const absValue = Math.abs(value);

  const exponent = Math.floor(Math.log10(absValue));
  const nearestExponent = exponents.reduce((prev, curr) => {
    return Math.abs(curr - exponent) < Math.abs(prev - exponent) ? curr : prev;
  });
  
  // A slightly more robust way to find the correct exponent
  let engExponent = 0;
  if (exponent >= 0) {
    engExponent = Math.floor(exponent / 3) * 3;
  } else {
    engExponent = Math.ceil(exponent / 3) * 3 - 3;
    if (exponent % 3 === 0) engExponent += 3; // Correct for exact matches like 1e-3
  }
  
  // Clamp to available prefixes
  engExponent = Math.max(Math.min(...exponents), Math.min(Math.max(...exponents), engExponent));
  
  const scaledValue = absValue / Math.pow(10, engExponent);
  const prefix = engineeringPrefixes[engExponent] || '';
  const sign = isNegative ? '-' : '';
  const unitString = unit ? ` ${unit}` : '';

  // toPrecision handles significant figures correctly.
  const formattedValue = scaledValue.toPrecision(significantFigures);

  // Remove trailing zeros after decimal point if they are not needed for sig figs
  // Example: 1000 -> 1.000 k -> we want 1 k if sig figs is 1.
  // toPrecision is generally correct, but let's refine.
  const numValue = parseFloat(formattedValue);
  const finalFormattedValue = Number(numValue.toPrecision(significantFigures));

  return `${sign}${finalFormattedValue}${prefix}${unitString}`;
}