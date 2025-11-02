# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-LIB-DOMAIN-LOGIC |
| Extraction Timestamp | 2024-05-24T10:00:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | High |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-1-032

#### 1.2.1.2 Requirement Text

In the Ohm's Law & Power mode, the UI shall contain four input fields (Voltage, Current, Resistance, Power). When a user provides valid numerical input in any two of these fields, the system must immediately calculate and populate the remaining two fields based on the formulas V=IR and P=VI.

#### 1.2.1.3 Validation Criteria

- Enter V=12 and R=100. Verify I is calculated as 0.12 and P is calculated as 1.44.
- Enter I=2 and P=50. Verify V is calculated as 25 and R is calculated as 12.5.

#### 1.2.1.4 Implementation Implications

- The library must contain a function that accepts an object with any two of {V, I, R, P} and returns a fully populated object.
- The internal logic must handle all six possible combinations of inputs.
- The logic must be able to handle division by zero gracefully (e.g., when calculating R = V / I and I is 0).

#### 1.2.1.5 Extraction Reasoning

This requirement defines the core calculation logic for the Ohm's Law feature, which is a primary responsibility of this domain logic library.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

REQ-1-033

#### 1.2.2.2 Requirement Text

The 555 Timer Astable mode calculator must accept three inputs: the target Frequency, the target Duty Cycle, and the value of one known component (either resistor RA, resistor RB, or capacitor C). Based on these inputs, the system shall calculate and display the required values for the other two unknown components.

#### 1.2.2.3 Validation Criteria

- Enter F=1kHz, Duty Cycle=75%, and C=10nF. Verify the system calculates correct values for RA and RB.

#### 1.2.2.4 Implementation Implications

- The library must implement the core algebraic formulas for the 555 astable oscillator.
- The logic must be able to solve for the two unknown components given any one of the three as a known value.
- The function must validate that the duty cycle is within the physically possible range (>50% and <100%).

#### 1.2.2.5 Extraction Reasoning

This requirement specifies the exact calculation and validation logic for the 555 Timer Astable mode, which this library is designated to implement.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

REQ-1-070

#### 1.2.3.2 Requirement Text

The backend validation for the 555 Timer Astable mode calculation must enforce that the input value for 'Duty Cycle' is a number strictly greater than 50 and strictly less than 100 (representing percentage).

#### 1.2.3.3 Validation Criteria

- Attempt a 555 Astable calculation via the API with a duty cycle of 49%. Verify the request is rejected.

#### 1.2.3.4 Implementation Implications

- The library's calculateAstable function must perform this range check on the duty cycle input.
- If the validation fails, the function must throw a specific, typed error (e.g., InvalidDutyCycleError) that the consuming service can catch and translate into an HTTP 400 error.

#### 1.2.3.5 Extraction Reasoning

This is a specific business rule that must be enforced. This domain library is the authoritative source for implementing this rule, which is then exposed by the backend service.

### 1.2.4.0 Requirement Id

#### 1.2.4.1 Requirement Id

REQ-1-069

#### 1.2.4.2 Requirement Text

The backend API shall be the authoritative enforcer of all business rules and data validation logic. It must independently validate all incoming data to ensure integrity, without trusting client-side validation.

#### 1.2.4.3 Validation Criteria

- Using an API client (e.g., Postman), send a request that violates a business rule (e.g., a negative resistance for Ohm's Law).
- Verify that the API rejects the request with an appropriate 4xx status code and a descriptive error message.

#### 1.2.4.4 Implementation Implications

- This library must implement the validation logic for all its calculation inputs, such as ensuring resistor values are positive.
- All public functions in this library should be considered entry points for untrusted data and must perform validation before calculation.
- The library must throw typed errors for validation failures to allow the consuming service to act on them.

#### 1.2.4.5 Extraction Reasoning

This requirement establishes the principle that business logic is enforced on the backend. This domain library is the 'functional core' where this authoritative business logic for electronics calculations resides, to be used by the backend service.

## 1.3.0.0 Relevant Components

- {'component_name': 'DomainLogicLibrary', 'component_specification': "A pure, framework-agnostic TypeScript library that encapsulates the core calculation algorithms and business rule validation for the application's pre-defined electronics modes. It serves as the single source of truth for this logic, designed for maximum testability and reusability.", 'implementation_requirements': ['Must be written in pure TypeScript with no dependencies on web frameworks (e.g., NestJS), databases (e.g., TypeORM), or any I/O-related libraries.', 'All functions must be pure, receiving data and returning results or throwing errors, with no side effects.', 'Must be packaged and published as a versioned private NPM package for consumption by other services.', 'Must achieve a high degree of unit test coverage (>90%) due to its critical nature and ease of testing.'], 'architectural_context': "This component is the 'Functional Core' in a 'Functional Core, Imperative Shell' architecture. It is a direct dependency of the 'User & Data Service' component, which acts as the 'Imperative Shell'.", 'extraction_reasoning': 'This is the repository being analyzed. Its purpose is to centralize and isolate the core business logic of the electronics calculations, as explicitly stated in its decomposition rationale and architecture.'}

## 1.4.0.0 Architectural Layers

- {'layer_name': 'Domain Logic Layer', 'layer_responsibilities': 'To encapsulate and execute pure, state-free business logic, algorithms, and validation rules. This layer is completely decoupled from application concerns like data persistence, user interfaces, or network communication.', 'layer_constraints': ['Must not contain any I/O operations (no network, file system, or database access).', 'Must not depend on any specific application framework.', 'All dependencies must be other pure libraries or language primitives.'], 'implementation_patterns': ['Pure Functions', 'Value Objects', 'Typed Exceptions for error handling'], 'extraction_reasoning': "The repository definition explicitly maps this library to a 'domain-logic-layer'. Although not a top-level layer in the provided architecture, it exists as a conceptual layer within the 'User & Data Service' application layer, representing the extracted functional core of that service."}

## 1.5.0.0 Dependency Interfaces

*No items available*

## 1.6.0.0 Exposed Interfaces

### 1.6.1.0 Interface Name

#### 1.6.1.1 Interface Name

IOhmsLawCalculator

#### 1.6.1.2 Consumer Repositories

- REPO-APP-USER-DATA

#### 1.6.1.3 Method Contracts

- {'method_name': 'calculate', 'method_signature': 'calculate(inputs: { voltage?: number; current?: number; resistance?: number; power?: number; }): { voltage: number; current: number; resistance: number; power: number; }', 'method_purpose': 'Accepts an object with any two defined properties from V, I, R, P and calculates the remaining two, returning a fully populated object.', 'implementation_requirements': 'Must throw a ValidationError if fewer or more than two inputs are provided. Must validate that resistance and power are non-negative.'}

#### 1.6.1.4 Service Level Requirements

*No items available*

#### 1.6.1.5 Implementation Constraints

*No items available*

#### 1.6.1.6 Extraction Reasoning

Synthesized from requirement REQ-1-032. This interface is necessary to fulfill the library's responsibility for Ohm's Law calculations.

### 1.6.2.0 Interface Name

#### 1.6.2.1 Interface Name

IResistorCombinationsCalculator

#### 1.6.2.2 Consumer Repositories

- REPO-APP-USER-DATA

#### 1.6.2.3 Method Contracts

##### 1.6.2.3.1 Method Name

###### 1.6.2.3.1.1 Method Name

calculateSeries

###### 1.6.2.3.1.2 Method Signature

calculateSeries(resistances: number[]): number

###### 1.6.2.3.1.3 Method Purpose

Calculates the total equivalent resistance of a list of resistors connected in series.

###### 1.6.2.3.1.4 Implementation Requirements

The input array must be validated to ensure all values are positive.

##### 1.6.2.3.2.0 Method Name

###### 1.6.2.3.2.1 Method Name

calculateParallel

###### 1.6.2.3.2.2 Method Signature

calculateParallel(resistances: number[]): number

###### 1.6.2.3.2.3 Method Purpose

Calculates the total equivalent resistance of a list of resistors connected in parallel.

###### 1.6.2.3.2.4 Implementation Requirements

The input array must be validated to ensure all values are positive and non-zero to prevent division-by-zero errors.

#### 1.6.2.4.0.0 Service Level Requirements

*No items available*

#### 1.6.2.5.0.0 Implementation Constraints

*No items available*

#### 1.6.2.6.0.0 Extraction Reasoning

Synthesized from the responsibilities described in the repository definition and detailed in user stories US-030 and US-031. This interface is required for the resistor combination feature.

### 1.6.3.0.0.0 Interface Name

#### 1.6.3.1.0.0 Interface Name

IResistorColorCodeConverter

#### 1.6.3.2.0.0 Consumer Repositories

- REPO-APP-USER-DATA

#### 1.6.3.3.0.0 Method Contracts

##### 1.6.3.3.1.0 Method Name

###### 1.6.3.3.1.1 Method Name

colorToValue

###### 1.6.3.3.1.2 Method Signature

colorToValue(bands: string[]): { value: number; tolerance: number; tempCo?: number; }

###### 1.6.3.3.1.3 Method Purpose

Converts an array of color band names to its corresponding resistance value object.

###### 1.6.3.3.1.4 Implementation Requirements

Must validate the number of bands and the validity of each color for its specific band position.

##### 1.6.3.3.2.0 Method Name

###### 1.6.3.3.2.1 Method Name

valueToColor

###### 1.6.3.3.2.2 Method Signature

valueToColor(params: { value: number; tolerance?: number; bands: 3 | 4 | 5 | 6; }): string[]

###### 1.6.3.3.2.3 Method Purpose

Converts a numerical resistance value, optional tolerance, and band count into its color band representation.

###### 1.6.3.3.2.4 Implementation Requirements

Must correctly determine the significant digits, multiplier, and tolerance/tempco bands based on standard resistor color code rules.

#### 1.6.3.4.0.0 Service Level Requirements

*No items available*

#### 1.6.3.5.0.0 Implementation Constraints

*No items available*

#### 1.6.3.6.0.0 Extraction Reasoning

Synthesized from the repository's responsibilities for 'Resistor Color Code Conversion' (REQ-1-002) and user stories US-034, US-035, and US-036, which were missing from the initial contract specification.

### 1.6.4.0.0.0 Interface Name

#### 1.6.4.1.0.0 Interface Name

ITimer555Calculator

#### 1.6.4.2.0.0 Consumer Repositories

- REPO-APP-USER-DATA

#### 1.6.4.3.0.0 Method Contracts

##### 1.6.4.3.1.0 Method Name

###### 1.6.4.3.1.1 Method Name

calculateAstable

###### 1.6.4.3.1.2 Method Signature

calculateAstable(params: { frequency: number; dutyCycle: number; knownComponent: { type: 'RA' | 'RB' | 'C'; value: number; } }): { ra: number; rb: number; c: number; }

###### 1.6.4.3.1.3 Method Purpose

Calculates the two unknown component values for a 555 timer in astable mode, given the frequency, duty cycle, and one known component.

###### 1.6.4.3.1.4 Implementation Requirements

Must validate that the duty cycle is strictly between 50 and 100. Must throw InvalidDutyCycleError on failure.

##### 1.6.4.3.2.0 Method Name

###### 1.6.4.3.2.1 Method Name

calculateMonostable

###### 1.6.4.3.2.2 Method Signature

calculateMonostable(params: { pulseWidth: number; knownComponent: { type: 'R' | 'C'; value: number; } }): { r: number; c: number; }

###### 1.6.4.3.2.3 Method Purpose

Calculates the unknown component value for a 555 timer in monostable mode, given the pulse width and one known component.

###### 1.6.4.3.2.4 Implementation Requirements

Must validate that all inputs are positive and non-zero.

#### 1.6.4.4.0.0 Service Level Requirements

*No items available*

#### 1.6.4.5.0.0 Implementation Constraints

*No items available*

#### 1.6.4.6.0.0 Extraction Reasoning

Directly maps to requirements REQ-1-033, REQ-1-070, and user story US-039.

## 1.7.0.0.0.0 Technology Context

### 1.7.1.0.0.0 Framework Requirements

This repository must not use any application framework. It is a pure TypeScript library.

### 1.7.2.0.0.0 Integration Technologies

- NPM (as a packaging and distribution mechanism)
- Jest (for unit testing)

### 1.7.3.0.0.0 Performance Constraints

All calculation functions must be synchronous and computationally efficient, executing in well under 50ms for typical inputs.

### 1.7.4.0.0.0 Security Requirements

The library must perform strict validation on all input data to prevent calculation errors, such as division by zero or out-of-domain inputs for mathematical functions. It is the first line of defense for business rule enforcement.

## 1.8.0.0.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | The repository's responsibilities for Ohm's Law, R... |
| Cross Reference Validation | The role of this library as a dependency of the 'u... |
| Implementation Readiness Assessment | High. The scope, responsibilities, interfaces, tec... |
| Quality Assurance Confirmation | Systematic analysis confirmed all mappings. A gap ... |

