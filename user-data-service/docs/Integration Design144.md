# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-APP-USER-DATA |
| Extraction Timestamp | 2024-05-24T12:00:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | High |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-1-017

#### 1.2.1.2 Requirement Text

The backend services shall be developed using the Node.js runtime (LTS version), the NestJS framework for application architecture, and PostgreSQL (version 15 or later) as the relational database.

#### 1.2.1.3 Validation Criteria

*No items available*

#### 1.2.1.4 Implementation Implications

- This service must be a NestJS application.
- It must integrate with a PostgreSQL database, for which TypeORM is the chosen ORM (REQ-1-056, REQ-1-062). This defines the primary data persistence integration.

#### 1.2.1.5 Extraction Reasoning

This requirement defines the core technology stack and the primary data persistence integration for the user-data-service.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

REQ-1-036

#### 1.2.2.2 Requirement Text

All communication between the client application and the backend services shall be conducted exclusively via a RESTful API using the HTTPS protocol. The data interchange format for all API requests and responses must be JSON.

#### 1.2.2.3 Validation Criteria

*No items available*

#### 1.2.2.4 Implementation Implications

- This service must expose its functionality via a RESTful API.
- All data transfer objects (DTOs) for requests and responses must be serializable to/from JSON.

#### 1.2.2.5 Extraction Reasoning

This requirement defines the primary integration pattern (REST API) through which this service exposes its functionality to clients.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

REQ-1-040

#### 1.2.3.2 Requirement Text

Access to all protected backend API endpoints must be controlled by requiring a valid JSON Web Token (JWT) in the Authorization header of the HTTP request, using the 'Bearer' scheme. The JWT must be one that was issued by AWS Cognito.

#### 1.2.3.3 Validation Criteria

*No items available*

#### 1.2.3.4 Implementation Implications

- This service must implement an authentication guard (e.g., a NestJS Guard) to validate JWTs on incoming requests.
- The guard will need to integrate with AWS Cognito to fetch public keys (JWKS) to verify token signatures.

#### 1.2.3.5 Extraction Reasoning

This security requirement defines the authentication and authorization integration contract for all exposed API endpoints.

### 1.2.4.0 Requirement Id

#### 1.2.4.1 Requirement Id

REQ-1-031

#### 1.2.4.2 Requirement Text

The application must provide a user-initiated account deletion feature... Successful confirmation shall trigger the permanent and irreversible removal of the user's record and all associated data from the database.

#### 1.2.4.3 Validation Criteria

*No items available*

#### 1.2.4.4 Implementation Implications

- This service must orchestrate a multi-step deletion process: deleting user data from its own PostgreSQL database and then making an outbound API call to AWS Cognito to delete the user's identity.

#### 1.2.4.5 Extraction Reasoning

This requirement mandates a critical outbound integration from this service to the external identity provider (AWS Cognito).

### 1.2.5.0 Requirement Id

#### 1.2.5.1 Requirement Id

US-051 (AC-005)

#### 1.2.5.2 Requirement Text

Attempt to upload a custom mode with an insecure formula: The backend security validation rejects the import...

#### 1.2.5.3 Validation Criteria

*No items available*

#### 1.2.5.4 Implementation Implications

- The user-data-service, when processing a custom mode import, must make a synchronous, outbound call to the 'formula-execution-service' to validate the safety of the formulas before persisting the mode.

#### 1.2.5.5 Extraction Reasoning

This user story acceptance criterion reveals a critical, non-obvious integration dependency on the formula-execution-service for security validation.

## 1.3.0.0 Relevant Components

- {'component_name': 'User & Data Service', 'component_specification': 'A containerized microservice running on AWS ECS that manages all core business logic and data persistence for users, custom modes, variables, and calculation history. It exposes a RESTful API and acts as the authoritative source for data validation and business rules.', 'implementation_requirements': ['Must be developed as a NestJS application.', 'Must use TypeORM for all interactions with the PostgreSQL database.', 'Must implement structured JSON logging using Pino.', 'Must provide a RESTful API for CRUD operations on all user-specific data.', 'Must handle conflict resolution for offline data synchronization.', 'Must generate an OpenAPI 3.0 specification from source code annotations.'], 'architectural_context': "Resides in the 'Application Services' layer. It receives requests from the 'API Gateway' and interacts with the 'Persistence Layer' (PostgreSQL), 'Identity & Access Management' layer (Cognito), and the 'Formula Execution Service'.", 'extraction_reasoning': "The 'user-data-service' repository is the direct implementation of this architectural component, as confirmed by its description, technology stack, and responsibilities."}

## 1.4.0.0 Architectural Layers

- {'layer_name': 'ApplicationServices', 'layer_responsibilities': 'Manages core business logic, data validation, and persistence for specific domains (e.g., user data). Exposes APIs for clients and orchestrates interactions with other services and data stores. This layer is the source of truth for business rules.', 'layer_constraints': ['Services in this layer must be independently deployable.', 'Services must not contain presentation logic.', 'Services must communicate with the persistence layer through a well-defined data access pattern (e.g., repositories).'], 'implementation_patterns': ['Microservices', 'Repository Pattern', 'Dependency Injection'], 'extraction_reasoning': 'The user-data-service is explicitly defined as a microservice and its primary role is to handle business logic and application-level tasks, which are the core responsibilities of this layer.'}

## 1.5.0.0 Dependency Interfaces

### 1.5.1.0 Interface Name

#### 1.5.1.1 Interface Name

IPersistenceLayer

#### 1.5.1.2 Source Repository

Amazon RDS for PostgreSQL

#### 1.5.1.3 Method Contracts

- {'method_name': 'find, findOne, save, delete, transaction', 'method_signature': 'Varies by TypeORM repository (e.g., save(entity: User): Promise<User>)', 'method_purpose': 'Provides an abstraction for performing CRUD and transactional operations on database tables/entities (Users, CustomModes, etc.).', 'integration_context': 'Used within the service classes (e.g., CustomModesService) to interact with the database in response to API requests.'}

#### 1.5.1.4 Integration Pattern

Repository Pattern (via TypeORM)

#### 1.5.1.5 Communication Protocol

PostgreSQL Wire Protocol

#### 1.5.1.6 Extraction Reasoning

This is the primary data persistence dependency for the service, as mandated by REQ-1-017 and the architecture.

### 1.5.2.0 Interface Name

#### 1.5.2.1 Interface Name

IFormulaExecutionService

#### 1.5.2.2 Source Repository

REPO-APP-FORMULA-EXEC

#### 1.5.2.3 Method Contracts

- {'method_name': 'invoke', 'method_signature': 'invoke(payload: { formula: string, context: { [key: string]: number } }): Promise<{ result: number | null, error: string | null }>', 'method_purpose': 'To securely validate the syntax and safety of a user-provided formula within an isolated sandbox.', 'integration_context': 'Called synchronously by the CustomModesService during the import of a new custom mode from a file (US-051) to prevent persistence of insecure formulas.'}

#### 1.5.2.4 Integration Pattern

Synchronous AWS SDK Invocation

#### 1.5.2.5 Communication Protocol

AWS Lambda API (via HTTPS)

#### 1.5.2.6 Extraction Reasoning

A critical security integration dependency, derived from US-051 and REQ-1-018, where this service must orchestrate formula validation with the specialized sandbox service.

### 1.5.3.0 Interface Name

#### 1.5.3.1 Interface Name

IIdentityManagementService

#### 1.5.3.2 Source Repository

AWS Cognito

#### 1.5.3.3 Method Contracts

- {'method_name': 'adminDeleteUser', 'method_signature': 'adminDeleteUser(params: { UserPoolId: string, Username: string }): Promise<void>', 'method_purpose': "To permanently delete a user's identity from the user pool.", 'integration_context': 'Called by the UsersService as the final step in the account deletion process, after all application data has been removed from the PostgreSQL database (REQ-1-031).'}

#### 1.5.3.4 Integration Pattern

AWS SDK API Call

#### 1.5.3.5 Communication Protocol

HTTPS

#### 1.5.3.6 Extraction Reasoning

Required for the user account deletion feature (REQ-1-031), representing a critical integration with the external identity provider.

### 1.5.4.0 Interface Name

#### 1.5.4.1 Interface Name

IDomainLogicLibrary

#### 1.5.4.2 Source Repository

REPO-LIB-DOMAIN-LOGIC

#### 1.5.4.3 Method Contracts

- {'method_name': 'calculateOhmsLaw, calculateResistorCombinations, etc.', 'method_signature': 'Varies (e.g., calculate(inputs: {...}): IOhmsLawResult)', 'method_purpose': 'Provides pure, framework-agnostic functions for executing the business logic of pre-defined electronics calculations.', 'integration_context': 'Imported and called by controllers/services within this repository to handle the calculation logic for specialized electronics modes, keeping the service layer lean.'}

#### 1.5.4.4 Integration Pattern

NPM Package Dependency

#### 1.5.4.5 Communication Protocol

In-Process Function Call

#### 1.5.4.6 Extraction Reasoning

As per the repository description, this build-time dependency allows the service to delegate complex business logic to a shared, testable library, promoting separation of concerns.

### 1.5.5.0 Interface Name

#### 1.5.5.1 Interface Name

IApiContractsLibrary

#### 1.5.5.2 Source Repository

REPO-LIB-API-CONTRACTS

#### 1.5.5.3 Method Contracts

*No items available*

#### 1.5.5.4 Integration Pattern

NPM Package Dependency

#### 1.5.5.5 Communication Protocol

TypeScript Type Definitions

#### 1.5.5.6 Extraction Reasoning

A critical build-time dependency that provides all Data Transfer Object (DTO) types, ensuring type safety and consistency between this service, the frontend, and the OpenAPI specification (REQ-1-036, REQ-1-037).

## 1.6.0.0 Exposed Interfaces

- {'interface_name': 'IUserDataApi', 'consumer_repositories': ['API Gateway Layer'], 'method_contracts': [{'method_name': 'GET /api/v1/user/profile', 'method_signature': 'getUserProfile(): Promise<UserDto>', 'method_purpose': 'Fetches the profile data for the currently authenticated user.', 'implementation_requirements': "Retrieves user details from the 'users' table based on the authenticated user's ID."}, {'method_name': 'GET, POST, PUT, DELETE /api/v1/custom-modes', 'method_signature': 'CRUD operations for Custom Modes', 'method_purpose': "Manages the full lifecycle of a user's custom calculation modes.", 'implementation_requirements': "All operations must be scoped to the authenticated user's ID. Requires validation of mode definitions, including a synchronous call to the Formula Execution Service on import."}, {'method_name': 'GET, POST, PUT, DELETE /api/v1/user-variables', 'method_signature': 'CRUD operations for User Variables', 'method_purpose': "Manages the full lifecycle of a user's saved variables.", 'implementation_requirements': "All operations must be scoped to the authenticated user's ID. Update logic must implement the 'last-write-wins' conflict resolution strategy (REQ-1-015)."}, {'method_name': 'GET, POST /api/v1/calculation-history', 'method_signature': 'Read and Append operations for Calculation History', 'method_purpose': "Manages a user's calculation history.", 'implementation_requirements': "All operations must be scoped to the authenticated user's ID. POST operations follow an append-only strategy."}, {'method_name': 'DELETE /api/v1/users/me', 'method_signature': 'deleteAccount(): Promise<void>', 'method_purpose': "Permanently deletes the authenticated user's account and all associated data.", 'implementation_requirements': "Must perform a transactional delete across all related user data tables, followed by an outbound API call to AWS Cognito to delete the user's identity (REQ-1-031, REQ-1-061)."}, {'method_name': 'POST /api/v1/users/me/export-data', 'method_signature': 'requestDataExport(): Promise<{ message: string }>', 'method_purpose': "Initiates an asynchronous job to export all of the user's personal data.", 'implementation_requirements': 'Validates the user is authenticated and queues a job (e.g., via SQS) to a background worker to process the data export (US-071).'}], 'service_level_requirements': ['P95 latency for all GET requests must be under 200ms (REQ-1-042).', 'Service availability must be 99.9% or higher (REQ-1-050).'], 'implementation_constraints': ['All protected endpoints must validate a JWT from AWS Cognito (REQ-1-040).', 'API must be documented using OpenAPI 3.0, auto-generated from code (REQ-1-037).', 'Data interchange format must be JSON, with structures defined in the shared-api-contracts library (REQ-1-036).'], 'extraction_reasoning': 'This API surface represents the full scope of responsibilities for the user-data-service, synthesized from its description, system requirements, and user stories. It serves as the primary contract for all client interactions.'}

## 1.7.0.0 Technology Context

### 1.7.1.0 Framework Requirements

The service must be built using the NestJS framework on the Node.js LTS runtime. It must use TypeORM as the ORM for interacting with a PostgreSQL database.

### 1.7.2.0 Integration Technologies

- NestJS Guards for authorization (JWT validation).
- NestJS Pipes for DTO validation using types from the shared-api-contracts library.
- TypeORM for database interaction (Repository Pattern).
- AWS SDK for JavaScript v3 for integrating with AWS Cognito and AWS Lambda.
- Pino for structured JSON logging.
- Supertest for API integration testing.

### 1.7.3.0 Performance Constraints

95% of data retrieval API requests must complete in under 200ms (REQ-1-042). This necessitates an optimized database schema with proper indexing and may require a caching layer (e.g., Redis with `@nestjs/cache-manager`) for frequently accessed, non-volatile data.

### 1.7.4.0 Security Requirements

The service is the authoritative source for all business rule enforcement and data validation (REQ-1-069). It must not trust any client-side validation. All database queries must be protected against SQL injection (handled by TypeORM). Access to all endpoints is controlled via JWT validation, and all data access logic must be strictly scoped to the authenticated user's ID.

## 1.8.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | All inbound and outbound integrations have been id... |
| Cross Reference Validation | The integration points are fully consistent with t... |
| Implementation Readiness Assessment | High. The specification is detailed and actionable... |
| Quality Assurance Confirmation | The analysis systematically identified all connect... |

