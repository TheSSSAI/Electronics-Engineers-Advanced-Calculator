.config.js
/** @type {import("prettier").Config} */
const config = {
  // Use single quotes instead of double quotes.
  singleQuote: true,
  // Use trailing commas where valid in ES5 (objects, arrays, etc.).
  trailingComma: 'es5',
  // Specify the line length that the printer will wrap on.
  printWidth: 80,
  // Print semicolons at the ends of statements.
  semi: true,
  // Specify the number of spaces per indentation-level.
  tabWidth: 2,
  // Use tabs for indentation. (Set to false to use spaces)
  useTabs: false,
  // Print spaces between brackets in object literals.
  bracketSpacing: true,
};

module.exports = config;