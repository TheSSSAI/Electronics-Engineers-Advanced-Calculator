# 1 Id

REPO-APP-USER-DATA

# 2 Name

user-data-service

# 3 Description

This repository houses the primary backend microservice for the platform. It exposes a RESTful API and is responsible for core business logic and data persistence. Its duties include managing user data (variables, calculation history), handling the CRUD operations for Custom Modes, and enforcing all authoritative business rules and data validation as specified in REQ-BIZ-001. Built with NestJS, it acts as the central orchestrator for data, interacting with the PostgreSQL database. It has been refined to delegate domain-specific calculation logic to the 'calculator-domain-logic' library, making this service a leaner, more focused application layer responsible for handling HTTP requests, authorization, and data access.

# 4 Type

🔹 Application Services

# 5 Namespace

Calculator.Service.UserData

# 6 Output Path

apps/user-data

# 7 Framework

NestJS

# 8 Language

TypeScript

# 9 Technology

NestJS, TypeORM, PostgreSQL

# 10 Thirdparty Libraries

- @nestjs/core
- typeorm
- pg
- pino

# 11 Layer Ids

- application-services-layer
- data-access-layer

# 12 Dependencies

- REPO-LIB-DOMAIN-LOGIC
- REPO-LIB-API-CONTRACTS

# 13 Requirements

## 13.1 Requirement Id

### 13.1.1 Requirement Id

REQ-FRU-001

## 13.2.0 Requirement Id

### 13.2.1 Requirement Id

REQ-BIZ-001

# 14.0.0 Generate Tests

✅ Yes

# 15.0.0 Generate Documentation

✅ Yes

# 16.0.0 Architecture Style

Microservice

# 17.0.0 Architecture Map

- service-user-data-012

# 18.0.0 Components Map

- service-user-data-012

# 19.0.0 Requirements Map

- REQ-FRU-001
- REQ-BIZ-001

# 20.0.0 Decomposition Rationale

## 20.1.0 Operation Type

RESTRUCTURED_CORE

## 20.2.0 Source Repository

REPO-APP-USER-DATA (original concept)

## 20.3.0 Decomposition Reasoning

The initial service contained both application/transport layer logic and complex domain logic. It was decomposed to separate these concerns. This service now focuses on being an effective API layer, while the pure, state-free business rules are handled by a dedicated domain library.

## 20.4.0 Extracted Responsibilities

- The mathematical formulas and validation rules for Ohm's Law and 555 Timers.

## 20.5.0 Reusability Scope

- This service is specific to this application, but it consumes the reusable domain logic library.

## 20.6.0 Development Benefits

- Simplifies the service controllers and providers.
- Allows business logic to be tested independently of the web framework.
- Enforces a clean separation between application and domain layers (Hexagonal Architecture principle).

# 21.0.0 Dependency Contracts

## 21.1.0 Repo-Lib-Domain-Logic

### 21.1.1 Required Interfaces

- {'interface': 'OhmsLawCalculator', 'methods': ['calculate({v, i, r, p}): IOhmsLawResult'], 'events': [], 'properties': []}

### 21.1.2 Integration Pattern

Library Import / Dependency Injection

### 21.1.3 Communication Protocol

NPM Package Dependency

# 22.0.0 Exposed Contracts

## 22.1.0 Public Interfaces

- {'interface': 'CustomModes API', 'methods': ['GET /modes', 'POST /modes', 'DELETE /modes/:id'], 'events': [], 'properties': [], 'consumers': ['REPO-APP-FRONTEND (via API Gateway)']}

# 23.0.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | NestJS's built-in DI container is used extensively... |
| Event Communication | For future extension, it can publish events to SNS... |
| Data Flow | Receives DTOs from API Gateway, transforms them to... |
| Error Handling | Uses NestJS Exception Filters to catch errors and ... |
| Async Patterns | Promises and async/await are used for all I/O oper... |

# 24.0.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | Leverage NestJS modules to organize code by featur... |
| Performance Considerations | Implement caching (Cache-Aside pattern with Redis)... |
| Security Considerations | Never trust client input. All business rules and v... |
| Testing Approach | Focus on integration tests (using Supertest) that ... |

# 25.0.0 Scope Boundaries

## 25.1.0 Must Implement

- All REST API endpoints.
- User authentication and authorization checks (validating JWTs).
- All database interactions (CRUD operations).

## 25.2.0 Must Not Implement

- The secure execution of user-defined formulas (delegated to 'formula-execution-service').
- Core mathematical algorithms for pre-defined electronics modes (delegated to 'calculator-domain-logic').

## 25.3.0 Extension Points

- New API endpoints and modules can be added to support new features.

## 25.4.0 Validation Rules

- Authoritative validation of all incoming data against business rules (REQ-BIZ-001).

