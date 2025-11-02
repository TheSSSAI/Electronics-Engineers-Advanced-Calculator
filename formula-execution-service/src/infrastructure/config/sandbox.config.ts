/**
 * @file sandbox.config.ts
 * @description Centralizes all security and performance configuration for the
 * formula execution sandbox. This includes resource limits and the strict
- * allow-lists for functions and constants as mandated by requirements.
 * Adhering to REQ-1-018 and REQ-1-019.
 */

// Resource Limits
// REQ-1-018: "The sandbox environment shall have strict resource limits (timeout, memory)."
// REQ-1-043: "end-to-end processing time ... must be less than 500 milliseconds at the 95th percentile"
// The execution timeout is set slightly below the Lambda function's timeout to allow for graceful error handling.
export const MEMORY_LIMIT_MB = 128; // Max memory for the V8 isolate.
export const EXECUTION_TIMEOUT_MS = 450; // Max execution time for a user script.

// Allow-list of callable functions
// REQ-1-019: "Only the following shall be exposed: functions sin, cos, tan, asin, acos, atan, log, ln, exp, sqrt..."
export const ALLOWED_FUNCTIONS: Record<string, (...args: number[]) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  log: Math.log10, // 'log' is interpreted as base-10 logarithm.
  ln: Math.log, // 'ln' is the natural logarithm.
  exp: Math.exp,
  sqrt: Math.sqrt,
};

// Allow-list of accessible constants
// REQ-1-019: "...and constants pi, e, k, e_charge."
export const ALLOWED_CONSTANTS: Record<string, number> = {
  pi: Math.PI,
  e: Math.E,
  k: 1.380649e-23, // Boltzmann constant in J/K
  e_charge: 1.602176634e-19, // Elementary charge in C
};

Object.freeze(ALLOWED_FUNCTIONS);
Object.freeze(ALLOWED_CONSTANTS);