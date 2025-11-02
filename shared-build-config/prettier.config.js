/**
 * Prettier configuration for consistent code formatting across the project.
 * This configuration is the single source of truth for all formatting rules.
 *
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import('prettier').Config}
 */
const config = {
  // Use single quotes instead of double quotes.
  singleQuote: true,
  // Print trailing commas wherever possible in multi-line syntactic structures.
  trailingComma: 'all',
  // Print semicolons at the ends of statements.
  semi: true,
  // Specify the number of spaces per indentation-level.
  tabWidth: 2,
  // Specify the line length that the printer will wrap on.
  printWidth: 120,
  // Use spaces for indentation.
  useTabs: false,
  // Print spaces between brackets in object literals.
  bracketSpacing: true,
  // Put the `>` of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line instead of being alone on the next line.
  jsxBracketSameLine: false,
  // Include parentheses around a sole arrow function parameter.
  arrowParens: 'always',
  // Format only a segment of a file.
  rangeStart: 0,
  rangeEnd: Infinity,
  // Specify which parser to use.
  // parser: undefined, // Let Prettier infer the parser
  // Specify the file path for the file being formatted.
  // filepath: undefined, // Let Prettier infer the filepath
  // Require a pragma to be present in the file's first docblock comment to be formatted.
  requirePragma: false,
  // Insert a pragma into the file's first docblock comment if it's missing.
  insertPragma: false,
  // How to wrap prose.
  proseWrap: 'preserve',
  // How to handle whitespaces in HTML.
  htmlWhitespaceSensitivity: 'css',
  // Which end of line characters to apply.
  endOfLine: 'lf',
};

module.exports = config;