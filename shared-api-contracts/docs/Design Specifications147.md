# 1 Analysis Metadata

| Property | Value |
|----------|-------|
| Analysis Timestamp | 2024-05-20T10:00:00Z |
| Repository Component Id | shared-api-contracts |
| Analysis Completeness Score | 100 |
| Critical Findings Count | 0 |
| Analysis Methodology | Systematic analysis of cached context (requirement... |

# 2 Repository Analysis

## 2.1 Repository Definition

### 2.1.1 Scope Boundaries

- To serve as the single source of truth for all API data contracts (DTOs, types, interfaces) between the frontend client and all backend services.
- To contain only TypeScript type definitions and Zod schemas, with no executable business logic, ensuring the repository is a lightweight, shareable contract library.

### 2.1.2 Technology Stack

- TypeScript
- Zod (for schema definition and validation)

### 2.1.3 Architectural Constraints

- Must be consumable as a versioned NPM package by both the frontend (React) and backend (NestJS) repositories.
- Changes to the contracts are considered breaking changes and require coordinated version updates across all consuming services to maintain system integrity.

### 2.1.4 Dependency Relationships

#### 2.1.4.1 Consumer: frontend-app

##### 2.1.4.1.1 Dependency Type

Consumer

##### 2.1.4.1.2 Target Component

frontend-app

##### 2.1.4.1.3 Integration Pattern

NPM Package Dependency

##### 2.1.4.1.4 Reasoning

The frontend client imports types and schemas from this library to ensure type-safe API communication and client-side validation, fulfilling requirements for a responsive SPA.

#### 2.1.4.2.0 Consumer: user-data-service

##### 2.1.4.2.1 Dependency Type

Consumer

##### 2.1.4.2.2 Target Component

user-data-service

##### 2.1.4.2.3 Integration Pattern

NPM Package Dependency

##### 2.1.4.2.4 Reasoning

The backend service imports DTOs and schemas to define controller method signatures and perform incoming request validation, fulfilling REQ-1-069 and enabling auto-generation of OpenAPI specs (REQ-1-100).

### 2.1.5.0.0 Analysis Insights

This repository is the critical connective tissue of the entire distributed system. Its primary value is enforcing consistency and enabling end-to-end type safety, which significantly reduces runtime errors. The use of Zod schemas as the source of truth for both static types and runtime validation is the optimal implementation strategy, directly supporting backend validation (REQ-1-069) and OpenAPI generation (REQ-1-100).

# 3.0.0.0.0 Requirements Mapping

## 3.1.0.0.0 Functional Requirements

### 3.1.1.0.0 Requirement Id

#### 3.1.1.1.0 Requirement Id

REQ-1-004

#### 3.1.1.2.0 Requirement Description

User account system for registration, login, and data persistence.

#### 3.1.1.3.0 Implementation Implications

- Requires DTOs for user registration ('RegisterDto'), login response ('AuthResponseDto' with JWTs), and user profile data ('UserDto').
- The 'UserDto' must exclude sensitive information like password hashes.

#### 3.1.1.4.0 Required Components

- auth.schema.ts
- user.schema.ts

#### 3.1.1.5.0 Analysis Reasoning

Defines the data structures necessary for the entire authentication and user management lifecycle as detailed in sequences 319, 323, and US-052/053.

### 3.1.2.0.0 Requirement Id

#### 3.1.2.1.0 Requirement Id

REQ-1-003

#### 3.1.2.2.0 Requirement Description

Framework for user-defined calculation modes.

#### 3.1.2.3.0 Implementation Implications

- Requires DTOs for creating, updating, and retrieving custom modes ('CreateCustomModeDto', 'UpdateCustomModeDto', 'CustomModeDto').
- The 'CustomModeDto' must model the structure from REQ-1-026, including name, description, and strongly-typed definitions for inputs, outputs, and formulas.

#### 3.1.2.4.0 Required Components

- custom-mode.schema.ts

#### 3.1.2.5.0 Analysis Reasoning

This requirement, along with its dependencies REQ-1-020, REQ-1-026, and REQ-1-028, defines the entire data model for the custom mode feature, which is a core part of the API contract and is visualized in sequence 328.

### 3.1.3.0.0 Requirement Id

#### 3.1.3.1.0 Requirement Id

REQ-1-024

#### 3.1.3.2.0 Requirement Description

System for user-managed named variables.

#### 3.1.3.3.0 Implementation Implications

- Requires DTOs for creating/updating and retrieving user variables ('UserVariableDto', 'CreateOrUpdateVariableDto').
- A schema for batch synchronization ('SyncVariablesDto') is required to support offline mode (REQ-1-014).

#### 3.1.3.4.0 Required Components

- user-variable.schema.ts

#### 3.1.3.5.0 Analysis Reasoning

Directly maps to the 'user_variables' database entity and supports the functionality specified in US-020, US-021, US-022, US-023 and the offline sync sequence 322.

### 3.1.4.0.0 Requirement Id

#### 3.1.4.1.0 Requirement Id

REQ-1-022

#### 3.1.4.2.0 Requirement Description

Scrollable history panel for previous calculations.

#### 3.1.4.3.0 Implementation Implications

- Requires DTOs for creating and retrieving history items ('CalculationHistoryDto', 'CreateHistoryItemDto').
- A schema for batch synchronization ('SyncHistoryDto') is needed for offline mode (REQ-1-014).

#### 3.1.4.4.0 Required Components

- calculation-history.schema.ts

#### 3.1.4.5.0 Analysis Reasoning

Defines the data contract for the calculation history feature as detailed in sequence 320 and user stories US-012, US-013, and US-054.

### 3.1.5.0.0 Requirement Id

#### 3.1.5.1.0 Requirement Id

REQ-1-032

#### 3.1.5.2.0 Requirement Description

Ohm's Law & Power calculation mode.

#### 3.1.5.3.0 Implementation Implications

- Requires a DTO ('OhmsLawDto') with nullable fields for Voltage, Current, Resistance, and Power to represent the inputs and outputs of the calculation.

#### 3.1.5.4.0 Required Components

- electronics.schema.ts

#### 3.1.5.5.0 Analysis Reasoning

Provides the data structure for the interactive Ohm's Law calculator, enabling both frontend and potential backend validation.

## 3.2.0.0.0 Non Functional Requirements

### 3.2.1.0.0 Requirement Type

#### 3.2.1.1.0 Requirement Type

Technical

#### 3.2.1.2.0 Requirement Specification

REQ-1-036: All communication between client and backend shall be via a RESTful API using HTTPS, with JSON as the data interchange format.

#### 3.2.1.3.0 Implementation Impact

This requirement is the primary justification for this repository's existence. All TypeScript types and Zod schemas defined here directly model the JSON payloads for the REST API.

#### 3.2.1.4.0 Design Constraints

- All defined models must be serializable to and from JSON.
- Field names should follow a consistent convention (e.g., camelCase) for JSON output.

#### 3.2.1.5.0 Analysis Reasoning

This repository is the implementation of the 'contract' part of the API-first design implied by this requirement.

### 3.2.2.0.0 Requirement Type

#### 3.2.2.1.0 Requirement Type

Technical

#### 3.2.2.2.0 Requirement Specification

REQ-1-100: The backend RESTful API must be documented using the OpenAPI 3.0 specification, auto-generated from source code.

#### 3.2.2.3.0 Implementation Impact

Using Zod schemas in this library allows the NestJS backend to leverage them for both validation and automatic generation of OpenAPI schema definitions via libraries like 'nestjs-zod'. This creates a single source of truth for types, validation, and documentation.

#### 3.2.2.4.0 Design Constraints

- Zod schemas should include '.describe()' calls to provide descriptions for OpenAPI generation.
- DTOs must be structured in a way that is compatible with OpenAPI schema objects.

#### 3.2.2.5.0 Analysis Reasoning

This non-functional requirement strongly influences the technology choice (Zod) and implementation details within this repository to achieve seamless automation.

## 3.3.0.0.0 Requirements Analysis Summary

The repository must define a comprehensive set of DTOs and schemas that cover all user-related entities (User, CustomMode, UserVariable, CalculationHistory) and specialized calculation modes. These contracts are fundamental for enabling a type-safe, RESTful architecture with automated documentation, fulfilling both functional and key technical requirements.

# 4.0.0.0.0 Architecture Analysis

## 4.1.0.0.0 Architectural Patterns

- {'pattern_name': 'API Contract / Shared Kernel', 'pattern_application': 'This repository acts as a Shared Kernel between the frontend client and the backend services. It contains the shared data models (DTOs) and types that define the API contract, ensuring both sides of the communication channel adhere to the same structure.', 'required_components': ['frontend-app', 'user-data-service'], 'implementation_strategy': 'The repository is built and published as a versioned NPM package. Consuming applications install it as a dependency, allowing them to import the TypeScript types and Zod schemas directly.', 'analysis_reasoning': 'This pattern is essential for maintaining consistency and enabling type safety in a distributed system, directly supporting the Microservices and API Gateway patterns by providing a stable, explicit interface contract.'}

## 4.2.0.0.0 Integration Points

- {'integration_type': 'API Contract', 'target_components': ['frontend-app', 'user-data-service'], 'communication_pattern': 'Synchronous (Request/Response)', 'interface_requirements': ['All data structures exchanged must conform to the TypeScript types and Zod schemas defined in this library.', 'The data format is exclusively JSON.'], 'analysis_reasoning': 'This library defines the contracts for the primary integration point between the Presentation and Application layers, as specified by the architecture and REQ-1-036.'}

## 4.3.0.0.0 Layering Strategy

| Property | Value |
|----------|-------|
| Layer Organization | This repository represents a cross-cutting concern... |
| Component Placement | The library will be organized into domain-specific... |
| Analysis Reasoning | This modular, domain-centric structure aligns with... |

# 5.0.0.0.0 Database Analysis

## 5.1.0.0.0 Entity Mappings

### 5.1.1.0.0 Entity Name

#### 5.1.1.1.0 Entity Name

CustomMode

#### 5.1.1.2.0 Database Table

custom_modes

#### 5.1.1.3.0 Required Properties

- 'id' (UUID), 'name' (string), 'description' (string, optional), 'definition' (JSONB).
- The 'definition' property will be a nested object with 'inputs', 'outputs', and 'formulas' arrays.

#### 5.1.1.4.0 Relationship Mappings

- Maps to 'CustomModeDto', 'CreateCustomModeDto', and 'UpdateCustomModeDto'.

#### 5.1.1.5.0 Access Patterns

- Full object retrieval for editing/viewing, partial object for list views.

#### 5.1.1.6.0 Analysis Reasoning

The DTOs for CustomMode directly reflect the database schema from REQ-1-059 and the functional requirements for the creation wizard (REQ-1-026), providing a type-safe representation of the 'definition' JSONB field.

### 5.1.2.0.0 Entity Name

#### 5.1.2.1.0 Entity Name

UserVariable

#### 5.1.2.2.0 Database Table

user_variables

#### 5.1.2.3.0 Required Properties

- 'id' (UUID), 'name' (string), 'value' (string).

#### 5.1.2.4.0 Relationship Mappings

- Maps to 'UserVariableDto' and 'CreateOrUpdateVariableDto'.

#### 5.1.2.5.0 Access Patterns

- CRUD operations on individual variables, and batch updates for offline sync.

#### 5.1.2.6.0 Analysis Reasoning

The DTOs provide the contract for managing user variables as per REQ-1-024 and REQ-1-060, enabling both single and batch operations required by offline sync (REQ-1-014).

### 5.1.3.0.0 Entity Name

#### 5.1.3.1.0 Entity Name

User

#### 5.1.3.2.0 Database Table

users

#### 5.1.3.3.0 Required Properties

- 'id' (UUID), 'email' (string), 'created_at' (timestamp).

#### 5.1.3.4.0 Relationship Mappings

- Maps to 'UserDto' for profile information and 'RegisterDto' for account creation. The DTOs will explicitly omit sensitive or internal fields like 'auth_provider_id'.

#### 5.1.3.5.0 Access Patterns

- Retrieval of user profile data upon login.

#### 5.1.3.6.0 Analysis Reasoning

Defines the public-facing representation of a user, ensuring sensitive data stored in the database (REQ-1-058) is not exposed via the API, aligning with security best practices.

## 5.2.0.0.0 Data Access Requirements

### 5.2.1.0.0 Operation Type

#### 5.2.1.1.0 Operation Type

Read (List)

#### 5.2.1.2.0 Required Methods

- A generic 'PaginatedResponseDto<T>' is required to support paginated lists of entities like custom modes (US-046) and calculation history.
- This DTO will contain 'items: T[]', 'totalItems: number', 'currentPage: number', 'totalPages: number'.

#### 5.2.1.3.0 Performance Constraints

Supports scalable data retrieval by avoiding unbounded queries, aligning with performance NFRs.

#### 5.2.1.4.0 Analysis Reasoning

A standardized pagination contract is essential for performance and a consistent API design for all list-based endpoints.

### 5.2.2.0.0 Operation Type

#### 5.2.2.1.0 Operation Type

Error Handling

#### 5.2.2.2.0 Required Methods

- A standardized 'ErrorResponseDto' is required for all 4xx and 5xx API responses.
- This DTO will contain 'statusCode: number', 'message: string | string[]', and 'error: string' to align with NestJS default error formats and provide clear feedback to the client.

#### 5.2.2.3.0 Performance Constraints

N/A

#### 5.2.2.4.0 Analysis Reasoning

A consistent error contract simplifies client-side error handling and provides a better developer and user experience.

## 5.3.0.0.0 Persistence Strategy

| Property | Value |
|----------|-------|
| Orm Configuration | This repository does not interact with an ORM. How... |
| Migration Requirements | Any breaking change in the database schema that af... |
| Analysis Reasoning | This library serves as the boundary between the AP... |

# 6.0.0.0.0 Sequence Analysis

## 6.1.0.0.0 Interaction Patterns

### 6.1.1.0.0 Sequence Name

#### 6.1.1.1.0 Sequence Name

User Login and Data Hydration

#### 6.1.1.2.0 Repository Role

Defines the 'AuthResponseDto' (containing JWTs) and 'UserDto' (containing profile data) which are exchanged during the login sequence (ID 319).

#### 6.1.1.3.0 Required Interfaces

- AuthResponseDto
- UserDto

#### 6.1.1.4.0 Method Specifications

##### 6.1.1.4.1 Method Name

###### 6.1.1.4.1.1 Method Name

POST /api/v1/auth/login

###### 6.1.1.4.1.2 Interaction Context

When user submits credentials.

###### 6.1.1.4.1.3 Parameter Analysis

Request body defined by 'LoginDto' (email, password).

###### 6.1.1.4.1.4 Return Type Analysis

Response body defined by 'AuthResponseDto' (accessToken, refreshToken).

###### 6.1.1.4.1.5 Analysis Reasoning

Defines the contract for the primary user authentication flow.

##### 6.1.1.4.2.0 Method Name

###### 6.1.1.4.2.1 Method Name

GET /api/v1/user/profile

###### 6.1.1.4.2.2 Interaction Context

Called immediately after login to fetch user data.

###### 6.1.1.4.2.3 Parameter Analysis

No body; user identified via JWT.

###### 6.1.1.4.2.4 Return Type Analysis

Response body defined by 'UserDto'.

###### 6.1.1.4.2.5 Analysis Reasoning

Defines the contract for fetching the authenticated user's profile.

#### 6.1.1.5.0.0 Analysis Reasoning

These contracts are fundamental for the user authentication and session initialization process.

### 6.1.2.0.0.0 Sequence Name

#### 6.1.2.1.0.0 Sequence Name

Create Custom Calculation Mode

#### 6.1.2.2.0.0 Repository Role

Defines the 'CreateCustomModeDto' sent by the client and the 'CustomModeDto' returned by the server upon successful creation (sequence ID 328).

#### 6.1.2.3.0.0 Required Interfaces

- CreateCustomModeDto
- CustomModeDto

#### 6.1.2.4.0.0 Method Specifications

- {'method_name': 'POST /api/v1/custom-modes', 'interaction_context': 'When user saves a new custom mode from the wizard.', 'parameter_analysis': "Request body defined by 'CreateCustomModeDto', containing name, description, and the mode definition.", 'return_type_analysis': "Response body defined by 'CustomModeDto', including the server-generated ID and timestamps.", 'analysis_reasoning': 'Provides the type-safe contract for the core user-extensible functionality.'}

#### 6.1.2.5.0.0 Analysis Reasoning

This contract enables the creation of user-generated content, a key feature of the application.

### 6.1.3.0.0.0 Sequence Name

#### 6.1.3.1.0.0 Sequence Name

Offline Data Synchronization

#### 6.1.3.2.0.0 Repository Role

Defines the batch update DTOs, such as 'SyncVariablesDto', used to send queued offline changes to the server (sequence ID 322).

#### 6.1.3.3.0.0 Required Interfaces

- SyncVariablesDto
- SyncHistoryDto

#### 6.1.3.4.0.0 Method Specifications

- {'method_name': 'POST /api/v1/variables/sync', 'interaction_context': 'When the application reconnects to the network with pending offline variable changes.', 'parameter_analysis': "Request body is an array of variable objects, defined by 'SyncVariablesDto'.", 'return_type_analysis': "Response body could be a 'SyncResultDto' indicating success or conflicts.", 'analysis_reasoning': 'Defines the contract for the robust offline-first synchronization feature, as required by REQ-1-014.'}

#### 6.1.3.5.0.0 Analysis Reasoning

These batch-oriented contracts are crucial for the efficiency and reliability of the offline sync feature.

## 6.2.0.0.0.0 Communication Protocols

- {'protocol_type': 'REST/JSON', 'implementation_requirements': 'This library defines the schemas for the JSON payloads used in all RESTful API calls between the client and backend, as mandated by REQ-1-036.', 'analysis_reasoning': 'The choice of TypeScript interfaces and Zod schemas is the optimal way to model JSON structures for this technology stack, providing both static type checking and runtime validation.'}

# 7.0.0.0.0.0 Critical Analysis Findings

- {'finding_category': 'Dependency Management', 'finding_description': "As the central contract, this library's versioning is critical. A robust versioning and release strategy (e.g., Semantic Versioning) must be strictly enforced. Any breaking change must result in a major version bump, and consuming services must be updated in a coordinated manner to prevent runtime failures.", 'implementation_impact': 'The CI/CD pipeline for this repository must include automated versioning and publishing to a package registry. The pipelines for consuming repositories must have a strategy for managing and updating this dependency.', 'priority_level': 'High', 'analysis_reasoning': 'Failure to manage versions correctly will undermine the stability of the entire system, reintroducing the very class of errors this library is meant to prevent.'}

# 8.0.0.0.0.0 Analysis Traceability

## 8.1.0.0.0.0 Cached Context Utilization

This analysis is derived entirely from the provided context. Functional requirements and user stories were parsed to identify necessary DTOs. Database ERDs and technical requirements defined the structure of these DTOs. Architectural diagrams and sequences confirmed the interactions where these DTOs are used. Non-functional requirements guided technology choices and implementation strategies (e.g., Zod for OpenAPI generation).

## 8.2.0.0.0.0 Analysis Decision Trail

- Identified need for DTOs from functional requirements (e.g., REQ-1-003 -> CustomModeDto).
- Structured DTOs based on database schemas (e.g., REQ-1-059 -> CustomModeDto fields).
- Confirmed DTO usage in sequence diagrams (e.g., Sequence 328 uses CreateCustomModeDto).
- Selected Zod as the implementation technology to satisfy both static typing and runtime validation/OpenAPI generation (REQ-1-100).

## 8.3.0.0.0.0 Assumption Validations

- Assumed that a private NPM registry is available for package distribution, as implied by the architecture.
- Assumed the backend (NestJS) will use a compatible library (e.g., 'nestjs-zod') to consume the Zod schemas for validation and OpenAPI generation.

## 8.4.0.0.0.0 Cross Reference Checks

- The 'custom_modes' table schema (REQ-1-059) was cross-referenced with the custom mode creation wizard steps (REQ-1-026) to define a comprehensive 'CustomModeDto'.
- The offline sync conflict resolution strategy (REQ-1-015) was reviewed to ensure sync-related DTOs can support timestamp-based 'last-write-wins' logic.

