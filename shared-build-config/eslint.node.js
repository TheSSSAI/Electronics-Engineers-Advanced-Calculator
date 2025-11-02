/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ['./eslint.base.js'],
  env: {
    node: true, // Enables Node.js global variables and Node.js scoping.
    jest: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    // Node.js/NestJS specific rules can be added here
    // For example, to align with NestJS conventions:
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};