/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  // Specifies the ESLint parser for TypeScript.
  parser: '@typescript-eslint/parser',

  // Specifies the parser options.
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  // Defines the environments where the code will run.
  env: {
    browser: true, // For frontend code
    node: true, // For backend and build scripts
    es2021: true,
  },

  // Specifies the plugins that provide additional rules.
  plugins: [
    '@typescript-eslint',
    'security', // For identifying potential security vulnerabilities (SAST) - REQ-1-048
  ],

  // Extends recommended rule sets.
  extends: [
    'eslint:recommended', // ESLint's built-in recommended rules
    'plugin:@typescript-eslint/recommended', // Recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:security/recommended', // Recommended security rules from eslint-plugin-security
    'prettier', // Disables ESLint rules that conflict with Prettier
  ],

  // Custom rules configuration.
  rules: {
    // Enforce consistent use of `type` imports.
    '@typescript-eslint/consistent-type-imports': 'error',

    // Disallow the use of `any` type.
    '@typescript-eslint/no-explicit-any': 'warn',

    // Disallow unused variables, but allow them if they are prefixed with an underscore.
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    // Enforce camelCase naming convention.
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],

    // Security rules
    'security/detect-object-injection': 'error',
    'security/detect-unsafe-regex': 'error',
    'security/detect-buffer-noassert': 'error',
    'security/detect-child-process': 'warn', // May be legitimate in build scripts
    'security/detect-eval-with-expression': 'error',

    // General best practices
    'no-console': 'warn', // Discourage use of console.log in production code
    eqeqeq: ['error', 'always'], // Enforce the use of === and !==
    'no-implicit-coercion': 'error',
  },
};