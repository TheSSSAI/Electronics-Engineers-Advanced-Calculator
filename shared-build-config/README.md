# Shared Build Configuration (@calculator/build-config)

This repository serves as the single source of truth for build-time configurations across the entire Calculator project. It provides centralized, versioned, and sharable configurations for ESLint, Prettier, and TypeScript.

## Overview

By centralizing these configurations, we ensure:
- **Consistency**: All projects adhere to the same code style, formatting, and quality standards.
- **Maintainability**: Rules and compiler options can be updated in one place and propagated to all consuming projects by updating the package version.
- **Developer Experience**: New projects can be set up quickly with battle-tested configurations, and developers get consistent feedback in their IDEs.

This package is designed to support both the **React frontend** and the **Node.js (NestJS) backend** by providing specific, extensible configurations for each environment.

## Installation

Install this package as a development dependency in your project:

```bash
npm install --save-dev @calculator/build-config
# or
yarn add --dev @calculator/build-config
```

You will also need to install the `peerDependencies` listed in this package's `package.json` into your project. This allows your project to control the versions of core tools like TypeScript and ESLint.

## Usage

### Prettier

To use the shared Prettier configuration, add the following to your project's `package.json`:

```json
{
  "prettier": "@calculator/build-config/prettier.config.js"
}
```

Alternatively, you can create a `prettier.config.js` file in your project root with the following content:

```javascript
module.exports = require('@calculator/build-config/prettier.config.js');
```

### TypeScript

To use the shared TypeScript configurations, extend the appropriate file in your project's `tsconfig.json`.

**For a React/Vite Frontend App (REQ-1-016, REQ-1-055):**

```json
{
  "extends": "@calculator/build-config/tsconfig.react.json",
  "compilerOptions": {
    // Project-specific overrides can go here
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**For a Node.js/NestJS Backend Service (REQ-1-017, REQ-1-056):**

```json
{
  "extends": "@calculator/build-config/tsconfig.node.json",
  "compilerOptions": {
    // Project-specific overrides can go here
    "outDir": "./dist",
    "baseUrl": "./"
  }
}
```

### ESLint

To use the shared ESLint configurations, extend the appropriate file in your project's `.eslintrc.js` file.

**For a React/Vite Frontend App (REQ-1-016, REQ-1-034, REQ-1-055):**

```javascript
/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [require.resolve('@calculator/build-config/eslint.react.js')],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  // Project-specific rule overrides can go here
  rules: {},
};
```

**For a Node.js/NestJS Backend Service (REQ-1-017, REQ-1-056):**

```javascript
/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [require.resolve('@calculator/build-config/eslint.node.js')],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  // Project-specific rule overrides can go here
  rules: {},
};
```

By following these patterns, all projects will benefit from a centralized, consistent, and maintainable set of development standards.