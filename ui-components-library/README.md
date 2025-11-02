# Calculator UI Components Library (@calculator/ui-components-library)

This repository contains a reusable React component library for the Calculator Platform. It encapsulates the complex UI and client-side logic for all specialized, feature-rich modules.

## Features

- **Specialized Electronics Calculators**:
  - Ohm's Law & Power Calculator
  - Resistor Combinations (Series/Parallel)
  - Resistor Color Code Converter (Value-to-Color and Color-to-Value)
  - 555 Timer Designer (Astable/Monostable)
- **Custom Mode Management**:
  - A comprehensive, multi-step wizard for creating and editing user-defined calculation modes.
  - A manager view to list, launch, edit, and delete custom modes.
- **Enterprise-Grade Standards**:
  - **Responsive**: All components are mobile-first and adapt to any screen size.
  - **Accessible**: Built to meet WCAG 2.1 AA standards.
  - **Internationalized**: No hardcoded text; all labels are provided via props.

## Installation

This is a private package hosted on GitHub Packages. Ensure you are authenticated with GitHub Packages before installing.

```bash
npm install @calculator/ui-components-library
```

## Usage

Each component is exported from the root of the package. Import the component you need and provide the necessary props.

**Example: OhmsLawCalculator**

```tsx
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { OhmsLawCalculator } from '@calculator/ui-components-library';
import { theme } from './theme'; // Your application's theme

const labels = {
  voltage: 'Voltage',
  current: 'Current',
  resistance: 'Resistance',
  power: 'Power',
  guidance: 'Enter any two values to calculate.',
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <OhmsLawCalculator labels={labels} />
    </ThemeProvider>
  );
}

export default App;
```

## Local Development

### Prerequisites

- Node.js (v20.x)
- npm

### Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-org/ui-components-library.git
    cd ui-components-library
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Available Scripts

- **`npm run storybook`**: Starts the Storybook development server. This is the primary way to develop and view components in isolation.

- **`npm run test`**: Runs the Jest test suite.

- **`npm run lint`**: Lints the codebase using ESLint to check for code quality and style issues.

- **`npm run build`**: Builds the library for production, creating distributable files in the `/dist` directory.

## Technology Stack

- **Framework**: React 18+ & TypeScript
- **UI Components**: Material-UI (MUI) v5
- **Styling**: Styled-components
- **Build Tool**: Vite
- **Component Development**: Storybook
- **Testing**: Jest & React Testing Library
- **Code Quality**: ESLint & Prettier

## Contributing

Contributions are welcome. Please open a pull request against the `main` branch. All pull requests must pass the CI checks (linting, testing, and building) before they can be merged.