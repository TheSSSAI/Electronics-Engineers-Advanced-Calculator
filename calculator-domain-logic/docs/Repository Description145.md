# 1 Id

REPO-LIB-DOMAIN-LOGIC

# 2 Name

calculator-domain-logic

# 3 Description

A pure, framework-agnostic TypeScript library that encapsulates the core business logic and calculation algorithms for the pre-defined electronics modes. This repository contains the mathematical models and validation rules for Ohm's Law, Resistor Combinations, and the 555 Timer calculations, as defined in REQ-FRE-001 and REQ-BIZ-001. Extracted from the 'user-data-service', this library has zero dependencies on web frameworks, databases, or external services. Its purpose is to create a highly testable, reusable, and maintainable core of the system's business knowledge, which can be consumed by any backend service or even a command-line tool. It is published as a versioned NPM package.

# 4 Type

🔹 Domain Library

# 5 Namespace

Calculator.Lib.DomainLogic

# 6 Output Path

packages/domain-logic

# 7 Framework

N/A

# 8 Language

TypeScript

# 9 Technology

TypeScript

# 10 Thirdparty Libraries

*No items available*

# 11 Layer Ids

- domain-logic-layer

# 12 Dependencies

*No items available*

# 13 Requirements

## 13.1 Requirement Id

### 13.1.1 Requirement Id

REQ-FRE-001

## 13.2.0 Requirement Id

### 13.2.1 Requirement Id

REQ-BIZ-001

# 14.0.0 Generate Tests

✅ Yes

# 15.0.0 Generate Documentation

✅ Yes

# 16.0.0 Architecture Style

Functional Core

# 17.0.0 Architecture Map

*No items available*

# 18.0.0 Components Map

*No items available*

# 19.0.0 Requirements Map

- REQ-FRE-001
- REQ-BIZ-001

# 20.0.0 Decomposition Rationale

## 20.1.0 Operation Type

NEW_DECOMPOSED

## 20.2.0 Source Repository

REPO-APP-USER-DATA (original concept)

## 20.3.0 Decomposition Reasoning

To implement the 'Functional Core, Imperative Shell' pattern. By extracting pure business logic, we create a component that is extremely easy to test, reason about, and reuse. It completely decouples the valuable business rules from the delivery mechanism (REST API).

## 20.4.0 Extracted Responsibilities

- Formula implementation for V=IR and P=VI.
- Algorithm for series and parallel resistor calculation.
- Equations for 555 Timer astable and monostable modes.
- Validation logic for duty cycle (>50% and <100%).

## 20.5.0 Reusability Scope

- This library could be reused in a native desktop application, a different backend service, or any other JavaScript/TypeScript environment.
- It serves as a single source of truth for the calculation logic.

## 20.6.0 Development Benefits

- Enables 100% unit test coverage of critical business logic.
- Allows domain experts to work on the logic without needing to understand the web framework.
- Reduces the complexity of the 'user-data-service'.

# 21.0.0 Dependency Contracts

*No data available*

# 22.0.0 Exposed Contracts

## 22.1.0 Public Interfaces

- {'interface': 'Timer555', 'methods': ['calculateAstable(params): IAstableResult', 'calculateMonostable(params): IMonostableResult'], 'events': [], 'properties': [], 'consumers': ['REPO-APP-USER-DATA']}

# 23.0.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | N/A |
| Event Communication | N/A |
| Data Flow | Pure functions: receives data transfer objects, re... |
| Error Handling | Throws specific, typed errors for validation failu... |
| Async Patterns | N/A (All calculations are synchronous). |

# 24.0.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | Must contain zero dependencies on NestJS, TypeORM,... |
| Performance Considerations | Ensure all algorithms are computationally efficien... |
| Security Considerations | All input data must be strictly validated to preve... |
| Testing Approach | Should be tested exclusively with unit tests (e.g.... |

# 25.0.0 Scope Boundaries

## 25.1.0 Must Implement

- All mathematical formulas and algorithms for electronics modes.
- Validation of inputs according to business rules.

## 25.2.0 Must Not Implement

- Any database access.
- Any HTTP-related logic.
- Any form of state management.

## 25.3.0 Extension Points

- New calculation modules can be added as new classes or functions.

## 25.4.0 Validation Rules

- Defines the core validation logic that the application layer will use.

