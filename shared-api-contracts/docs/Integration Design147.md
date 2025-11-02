# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-LIB-API-CONTRACTS |
| Extraction Timestamp | 2024-05-24T18:00:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | Fully Ready |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-1-036

#### 1.2.1.2 Requirement Text

All communication between the client application and the backend services shall be conducted exclusively via a RESTful API using the HTTPS protocol. The data interchange format for all API requests and responses must be JSON.

#### 1.2.1.3 Validation Criteria

- Monitor network traffic from the client and verify all calls to the backend are HTTP requests to REST API endpoints.
- Verify all API requests are sent over HTTPS, not HTTP.
- Inspect the `Content-Type` header of API requests and responses to confirm it is `application/json`.

#### 1.2.1.4 Implementation Implications

- This repository provides the TypeScript types that define the structure of the JSON payloads for both requests and responses.
- By sharing this library between the frontend and backend, it ensures compile-time consistency of the data interchange format.
- Any change to the API's data structure must be made in this repository, versioned, and then updated in the consuming client and server applications.

#### 1.2.1.5 Extraction Reasoning

This repository's sole purpose is to serve as the single source of truth for the API's data contract. It directly implements and enforces the requirement for a consistent JSON data interchange format by providing shared, statically-typed definitions for all payloads that cross the network boundary.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

REQ-1-100

#### 1.2.2.2 Requirement Text

The backend RESTful API must be documented using the OpenAPI 3.0 specification. This specification file shall be automatically generated from the NestJS source code annotations and made available through a dedicated, publicly accessible API endpoint (e.g., `/api-docs`).

#### 1.2.2.3 Validation Criteria

- Access the API documentation endpoint and verify that it serves a valid OpenAPI 3.0 specification document.
- Add a new endpoint to the backend code, and verify that the documentation is automatically updated upon redeployment.

#### 1.2.2.4 Implementation Implications

- This library's DTOs will be consumed by the backend service.
- The DTOs should be defined using a library like Zod, which allows the backend (NestJS) to automatically infer both TypeScript types and OpenAPI schemas from a single definition.
- This creates a single source of truth for type safety, runtime validation, and API documentation.

#### 1.2.2.5 Extraction Reasoning

This requirement influences the technology choice for this repository. Using a schema-first library like Zod within this repository is the optimal way to enable automated OpenAPI generation in the consuming backend service.

## 1.3.0.0 Relevant Components

- {'component_name': 'Shared API Contracts Library', 'component_specification': 'A build-time library that contains only TypeScript type definitions, interfaces, and Data Transfer Objects (DTOs), derived from Zod schemas. It serves as the formal, versioned contract for all data structures exchanged between the frontend SPA and the backend services. This component contains no executable logic.', 'implementation_requirements': ['Must be published as a versioned NPM package to be consumed by other repositories.', 'Must not contain any executable code, business logic, or framework-specific dependencies.', 'All DTOs must be defined as Zod schemas, from which TypeScript types are inferred to create a single source of truth.', 'The project must have devDependencies (like TypeScript and Zod) but must have an empty `dependencies` list in its package.json.'], 'architectural_context': "This component exists at a conceptual 'Contracts' layer, acting as a shared kernel between the Presentation Layer (frontend-app) and the Application Services Layer (user-data-service). It is a build-time dependency, not a runtime component.", 'extraction_reasoning': 'This repository *is* the component. Its entire definition describes this shared library component, which is critical for ensuring type safety and contract consistency across the distributed parts of the system (client and server).'}

## 1.4.0.0 Architectural Layers

- {'layer_name': 'Contracts Layer (Logical)', 'layer_responsibilities': 'To provide a single, versioned source of truth for the data structures (DTOs, interfaces) used in API communication between different architectural layers, primarily the Presentation and Application Services layers. It formalizes the contract between clients and servers.', 'layer_constraints': ['Must not contain executable business logic.', 'Must be technology-agnostic, containing only language-specific type definitions (TypeScript in this case).', 'Must not have runtime dependencies on other services or frameworks.'], 'implementation_patterns': ['Shared Kernel', 'Published Language (Domain-Driven Design)'], 'extraction_reasoning': "The repository is explicitly designed to be a library that defines the API contract. This establishes a logical 'Contracts Layer' that sits between the consuming layers (Presentation and Application Services) to ensure they communicate correctly, as described in the repository's purpose."}

## 1.5.0.0 Dependency Interfaces

*No items available*

## 1.6.0.0 Exposed Interfaces

### 1.6.1.0 Interface Name

#### 1.6.1.1 Interface Name

AuthenticationContracts

#### 1.6.1.2 Consumer Repositories

- REPO-APP-FRONTEND
- REPO-APP-USER-DATA

#### 1.6.1.3 Method Contracts

##### 1.6.1.3.1 Method Name

###### 1.6.1.3.1.1 Method Name

RegisterRequestDto

###### 1.6.1.3.1.2 Method Signature

{ email: string; password: string; termsAccepted: true; }

###### 1.6.1.3.1.3 Method Purpose

Defines the payload for the user registration endpoint, as required by US-052 and REQ-1-075.

###### 1.6.1.3.1.4 Implementation Requirements

Payload for `POST /api/v1/auth/register`.

##### 1.6.1.3.2.0 Method Name

###### 1.6.1.3.2.1 Method Name

LoginRequestDto

###### 1.6.1.3.2.2 Method Signature

{ email: string; password: string; }

###### 1.6.1.3.2.3 Method Purpose

Defines the payload for the user login endpoint, as required by US-053.

###### 1.6.1.3.2.4 Implementation Requirements

Payload for `POST /api/v1/auth/login`.

##### 1.6.1.3.3.0 Method Name

###### 1.6.1.3.3.1 Method Name

AuthResponseDto

###### 1.6.1.3.3.2 Method Signature

{ accessToken: string; refreshToken: string; idToken: string; }

###### 1.6.1.3.3.3 Method Purpose

Defines the response payload containing JWTs upon successful login or registration.

###### 1.6.1.3.3.4 Implementation Requirements

Response for successful authentication.

#### 1.6.1.4.0.0 Service Level Requirements

*No items available*

#### 1.6.1.5.0.0 Implementation Constraints

*No items available*

#### 1.6.1.6.0.0 Extraction Reasoning

Defines the data structures for the entire user authentication lifecycle, which is a fundamental integration point between the client and backend.

### 1.6.2.0.0.0 Interface Name

#### 1.6.2.1.0.0 Interface Name

DataContracts

#### 1.6.2.2.0.0 Consumer Repositories

- REPO-APP-FRONTEND
- REPO-APP-USER-DATA
- REPO-LIB-FRONTEND-UTILS
- REPO-LIB-UI-COMPONENTS

#### 1.6.2.3.0.0 Method Contracts

##### 1.6.2.3.1.0 Method Name

###### 1.6.2.3.1.1 Method Name

UserDto

###### 1.6.2.3.1.2 Method Signature

{ id: string; email: string; }

###### 1.6.2.3.1.3 Method Purpose

Defines the public representation of a user's profile data.

###### 1.6.2.3.1.4 Implementation Requirements

Response for `GET /api/v1/users/me`.

##### 1.6.2.3.2.0 Method Name

###### 1.6.2.3.2.1 Method Name

CustomModeDto

###### 1.6.2.3.2.2 Method Signature

{ id: string; name: string; description?: string; definition: object; createdAt: Date; updatedAt: Date; }

###### 1.6.2.3.2.3 Method Purpose

Defines the full structure of a custom calculation mode, as required by REQ-1-059 and REQ-1-026.

###### 1.6.2.3.2.4 Implementation Requirements

Used for `GET /api/v1/modes`, `POST /api/v1/modes`, and `PUT /api/v1/modes/:id`.

##### 1.6.2.3.3.0 Method Name

###### 1.6.2.3.3.1 Method Name

UserVariableDto

###### 1.6.2.3.3.2 Method Signature

{ id: string; name: string; value: string; updatedAt: Date; }

###### 1.6.2.3.3.3 Method Purpose

Defines the structure of a user-defined variable, as required by REQ-1-060.

###### 1.6.2.3.3.4 Implementation Requirements

Used for `GET /api/v1/variables` and `POST /api/v1/variables`.

##### 1.6.2.3.4.0 Method Name

###### 1.6.2.3.4.1 Method Name

CalculationHistoryItemDto

###### 1.6.2.3.4.2 Method Signature

{ id: string; expression: string; result: string; createdAt: Date; }

###### 1.6.2.3.4.3 Method Purpose

Defines the structure of a single calculation history entry.

###### 1.6.2.3.4.4 Implementation Requirements

Used for `GET /api/v1/history` and `POST /api/v1/history`.

##### 1.6.2.3.5.0 Method Name

###### 1.6.2.3.5.1 Method Name

ExportedDataJson

###### 1.6.2.3.5.2 Method Signature

{ user: UserDto; calculation_history: CalculationHistoryItemDto[]; user_variables: UserVariableDto[]; custom_modes: CustomModeDto[]; }

###### 1.6.2.3.5.3 Method Purpose

Defines the structure of the JSON file exported for user data requests (US-071), ensuring compliance with GDPR/CCPA data portability.

###### 1.6.2.3.5.4 Implementation Requirements

This is the contract for the file generated by the asynchronous data export process.

#### 1.6.2.4.0.0 Service Level Requirements

*No items available*

#### 1.6.2.5.0.0 Implementation Constraints

*No items available*

#### 1.6.2.6.0.0 Extraction Reasoning

Provides the core, versioned data contracts for all user-managed entities, ensuring type safety and consistency across all consuming repositories.

### 1.6.3.0.0.0 Interface Name

#### 1.6.3.1.0.0 Interface Name

SharedApiContracts

#### 1.6.3.2.0.0 Consumer Repositories

- REPO-APP-FRONTEND
- REPO-APP-USER-DATA

#### 1.6.3.3.0.0 Method Contracts

##### 1.6.3.3.1.0 Method Name

###### 1.6.3.3.1.1 Method Name

PaginatedResponseDto<T>

###### 1.6.3.3.1.2 Method Signature

{ items: T[]; totalItems: number; currentPage: number; totalPages: number; }

###### 1.6.3.3.1.3 Method Purpose

Defines a standardized wrapper for all API responses that return paginated lists (e.g., custom modes, history).

###### 1.6.3.3.1.4 Implementation Requirements

Supports performance NFR REQ-1-042 by enabling scalable data fetching.

##### 1.6.3.3.2.0 Method Name

###### 1.6.3.3.2.1 Method Name

ApiErrorDto

###### 1.6.3.3.2.2 Method Signature

{ statusCode: number; message: string | string[]; error: string; }

###### 1.6.3.3.2.3 Method Purpose

Defines a consistent error response structure for all 4xx and 5xx API errors, improving client-side error handling.

###### 1.6.3.3.2.4 Implementation Requirements

Aligns with NestJS default error formats and provides clear feedback to clients.

#### 1.6.3.4.0.0 Service Level Requirements

*No items available*

#### 1.6.3.5.0.0 Implementation Constraints

*No items available*

#### 1.6.3.6.0.0 Extraction Reasoning

Defines cross-cutting contracts for common API patterns like pagination and error handling, promoting API consistency and reducing boilerplate in consumers.

## 1.7.0.0.0.0 Technology Context

### 1.7.1.0.0.0 Framework Requirements

This repository has no framework requirements. It must be written in pure TypeScript.

### 1.7.2.0.0.0 Integration Technologies

- NPM (or a compatible package manager) for versioning and distribution.
- Zod for schema definition and type inference.

### 1.7.3.0.0.0 Performance Constraints

N/A. This is a non-executable library of type definitions.

### 1.7.4.0.0.0 Security Requirements

N/A. As a library with no executable code, it has no direct security vulnerabilities, but its DTO definitions must be carefully designed to avoid exposing sensitive backend data (e.g., password hashes).

## 1.8.0.0.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | The repository is correctly mapped to its primary ... |
| Cross Reference Validation | The exposed DTOs (e.g., CustomModeDto, UserVariabl... |
| Implementation Readiness Assessment | The repository is fully implementation-ready. The ... |
| Quality Assurance Confirmation | Systematic validation confirms that all context ex... |

