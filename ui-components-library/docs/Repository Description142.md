# 1 Id

REPO-LIB-UI-COMPONENTS

# 2 Name

ui-components-library

# 3 Description

This repository is a reusable React component library containing all specialized, feature-rich UI modules for the calculator platform. It encapsulates the complex UI and client-side logic for the Ohm's Law calculator, Resistor Combinations tool, Resistor Color Code converter, 555 Timer designer, and the comprehensive Custom Mode creation wizard. Extracted from the main frontend application, this library promotes reusability and independent development. Each component is self-contained and exposes a clear API via props. The library is designed to be consumed by the 'frontend-app' and potentially other future applications. It is published as a versioned NPM package to ensure stable dependency management.

# 4 Type

🔹 Cross-Cutting Library

# 5 Namespace

Calculator.Lib.UIComponents

# 6 Output Path

packages/ui-components

# 7 Framework

React

# 8 Language

TypeScript

# 9 Technology

React, Material-UI, Storybook

# 10 Thirdparty Libraries

- react
- material-ui
- styled-components

# 11 Layer Ids

- presentation-layer

# 12 Dependencies

- REPO-LIB-API-CONTRACTS

# 13 Requirements

## 13.1 Requirement Id

### 13.1.1 Requirement Id

REQ-FRE-001

## 13.2.0 Requirement Id

### 13.2.1 Requirement Id

REQ-FRX-001

# 14.0.0 Generate Tests

✅ Yes

# 15.0.0 Generate Documentation

✅ Yes

# 16.0.0 Architecture Style

Component Library

# 17.0.0 Architecture Map

- client-electronics-modes-ui-002

# 18.0.0 Components Map

- client-electronics-modes-ui-002
- client-custom-mode-manager-ui-003

# 19.0.0 Requirements Map

- REQ-FRE-001
- REQ-FRX-001

# 20.0.0 Decomposition Rationale

## 20.1.0 Operation Type

NEW_DECOMPOSED

## 20.2.0 Source Repository

REPO-APP-FRONTEND (original concept)

## 20.3.0 Decomposition Reasoning

To isolate complex, feature-specific UI logic from the main application shell. This allows a dedicated team to focus on building and maintaining these interactive calculators as independent, testable, and reusable units, improving code quality and development speed.

## 20.4.0 Extracted Responsibilities

- UI and interaction logic for Ohm's Law & Power mode.
- UI and interaction logic for Resistor Combinations.
- UI and interaction logic for Resistor Color Code converter.
- Multi-step wizard UI for Custom Mode creation and management.

## 20.5.0 Reusability Scope

- These components can be used in any React-based application that requires electronics calculation tools.
- Storybook is used to develop and showcase components in isolation.

## 20.6.0 Development Benefits

- Enables independent development and release cycles for features.
- Reduces the complexity and build time of the main 'frontend-app'.
- Promotes visual consistency and high-quality component design.

# 21.0.0 Dependency Contracts

*No data available*

# 22.0.0 Exposed Contracts

## 22.1.0 Public Interfaces

### 22.1.1 Interface

#### 22.1.1.1 Interface

OhmsLawCalculatorComponent

#### 22.1.1.2 Methods

*No items available*

#### 22.1.1.3 Events

- onCalculation(result)

#### 22.1.1.4 Properties

- initialValues: IOhmsLawValues

#### 22.1.1.5 Consumers

- REPO-APP-FRONTEND

### 22.1.2.0 Interface

#### 22.1.2.1 Interface

CustomModeBuilderComponent

#### 22.1.2.2 Methods

*No items available*

#### 22.1.2.3 Events

- onSave(modeDefinition)

#### 22.1.2.4 Properties

- modeToEdit: CustomModeDTO

#### 22.1.2.5 Consumers

- REPO-APP-FRONTEND

# 23.0.0.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | N/A |
| Event Communication | Callback props (e.g., 'onSave', 'onCalculation') a... |
| Data Flow | Data is passed into components via props. |
| Error Handling | Components manage their internal state and validat... |
| Async Patterns | Components should be stateless regarding server da... |

# 24.0.0.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | Each component should be developed in isolation us... |
| Performance Considerations | Optimize component re-rendering using `React.memo`... |
| Security Considerations | Ensure all props are validated and default values ... |
| Testing Approach | Focus on component-level testing with React Testin... |

# 25.0.0.0 Scope Boundaries

## 25.1.0.0 Must Implement

- All UI elements and interaction logic for the specified electronics modes.
- Client-side validation logic for component inputs.

## 25.2.0.0 Must Not Implement

- Any direct API calls to the backend.
- Access or manipulation of global application state (Redux store).

## 25.3.0.0 Extension Points

- New calculator modes can be added as new, independent components to this library.

## 25.4.0.0 Validation Rules

- Validation of user input for each field within a component (e.g., duty cycle for 555 timer).

