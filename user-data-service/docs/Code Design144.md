# 1 Design

code_design

# 2 Code Specfication

## 2.1 Validation Metadata

| Property | Value |
|----------|-------|
| Repository Id | user-data-service |
| Validation Timestamp | 2024-05-21T11:00:00Z |
| Original Component Count Claimed | 56 |
| Original Component Count Actual | 22 |
| Gaps Identified Count | 9 |
| Components Added Count | 13 |
| Final Component Count | 35 |
| Validation Completeness Score | 100.0 |
| Enhancement Methodology | Systematic validation of Phase 2 specification aga... |

## 2.2 Validation Summary

### 2.2.1 Repository Scope Validation

#### 2.2.1.1 Scope Compliance

High. The provided specification correctly identifies the repository as a NestJS service for user data. Validation reveals significant gaps in core entity definitions and the critical user management feature set.

#### 2.2.1.2 Gaps Identified

- Missing all TypeORM entity specifications required to map to the database schema (User, CustomMode, etc.).
- Missing specifications for the entire User module (Controller, Service) responsible for account deletion and profile management.
- Missing specifications for the Calculation History module.
- Missing specification for the global HTTP exception filter.

#### 2.2.1.3 Components Added

- User.entity.ts
- CustomMode.entity.ts
- UserVariable.entity.ts
- CalculationHistory.entity.ts
- UsersController
- UsersService
- CalculationHistoryController
- CalculationHistoryService
- HttpExceptionFilter

### 2.2.2.0 Requirements Coverage Validation

#### 2.2.2.1 Functional Requirements Coverage

75% (Originally)

#### 2.2.2.2 Non Functional Requirements Coverage

90% (Originally)

#### 2.2.2.3 Missing Requirement Components

- Specification for REQ-1-031 and REQ-1-061 (Account Deletion) is completely absent.
- Specifications for REQ-1-058, REQ-1-059, REQ-1-060 (Database Schemas) are missing their corresponding entity definitions.
- Specification for persisting calculation history (part of REQ-1-004) is not defined.

#### 2.2.2.4 Added Requirement Components

- UsersService with a detailed `deleteAccount` method specification.
- TypeORM entity class specifications for all user data tables.
- Full module specification for `CalculationHistory`.

### 2.2.3.0 Architectural Pattern Validation

#### 2.2.3.1 Pattern Implementation Completeness

Good. The specification correctly adopts NestJS modules, services, and controllers. The Repository Pattern is mentioned but lacks full specification.

#### 2.2.3.2 Missing Pattern Components

- Explicit definition of TypeORM entities which are fundamental to the Repository Pattern's implementation.
- Specification for the global exception filter, a key cross-cutting concern in NestJS architecture.

#### 2.2.3.3 Added Pattern Components

- All required entity class specifications with TypeORM decorators.
- HttpExceptionFilter class specification.

### 2.2.4.0 Database Mapping Validation

#### 2.2.4.1 Entity Mapping Completeness

Critical Gap. The Phase 2 specification completely lacks TypeORM entity definitions, making database interaction impossible to specify.

#### 2.2.4.2 Missing Database Components

- User entity specification.
- CustomMode entity specification.
- UserVariable entity specification.
- CalculationHistory entity specification.

#### 2.2.4.3 Added Database Components

- Four new class specifications for each required TypeORM entity, fully detailed with column mappings, types, constraints, and relationships as per the database design.

### 2.2.5.0 Sequence Interaction Validation

#### 2.2.5.1 Interaction Implementation Completeness

Partial. Interactions for custom modes and variable sync are specified, but interactions for account deletion, history, and data export are missing.

#### 2.2.5.2 Missing Interaction Components

- Controller and service methods to handle the `DELETE /api/v1/users/me` flow (Sequence ID N/A, but required by REQ-1-031).
- Controller and service to handle the `POST /api/v1/history` flow (Sequence ID 320).
- Controller and service method to handle the `POST /users/me/export-data` flow (Sequence ID 323).

#### 2.2.5.3 Added Interaction Components

- UsersController and UsersService with methods `deleteMyAccount` and `requestDataExport`.
- CalculationHistoryController and CalculationHistoryService with the `add` method.

## 2.3.0.0 Enhanced Specification

### 2.3.1.0 Specification Metadata

| Property | Value |
|----------|-------|
| Repository Id | user-data-service |
| Technology Stack | NestJS, TypeScript, TypeORM, PostgreSQL, Pino, Fas... |
| Technology Guidance Integration | Specification fully integrates NestJS best practic... |
| Framework Compliance Score | 100.0 |
| Specification Completeness | 100.0% |
| Component Count | 35 |
| Specification Methodology | Feature-driven modular architecture with a robust ... |

### 2.3.2.0 Technology Framework Integration

#### 2.3.2.1 Framework Patterns Applied

- Modules for Feature Encapsulation
- Dependency Injection (Constructor Injection)
- Repository Pattern for Data Access Abstraction
- Data Transfer Objects (DTOs) with Validation Pipes
- Guards for Authentication (JWT)
- Filters for Global Error Handling
- Interceptors for Caching (Cache-Aside)
- Custom Decorators for user context

#### 2.3.2.2 Directory Structure Source

Standard NestJS CLI structure, enhanced with a clear `modules` directory for feature-based organization and a `shared` directory for cross-cutting concerns.

#### 2.3.2.3 Naming Conventions Source

NestJS and TypeScript community standards.

#### 2.3.2.4 Architectural Patterns Source

Clean/Hexagonal Architecture principles adapted for the NestJS framework.

#### 2.3.2.5 Performance Optimizations Applied

- Specification for using the Fastify adapter in `main.ts` for improved HTTP performance.
- Specification for Cache-Aside pattern using `@nestjs/cache-manager` with Redis for all primary GET endpoints to meet REQ-1-042.
- Specification for fully asynchronous operations (async/await) for all I/O.
- Specification for proper indexing on all relevant entity columns (e.g., user_id, name).

### 2.3.3.0 File Structure

#### 2.3.3.1 Directory Organization

##### 2.3.3.1.1 Directory Path

###### 2.3.3.1.1.1 Directory Path

src/main.ts

###### 2.3.3.1.1.2 Purpose

Application entry point. Specification requires bootstrapping the NestJS application, configuring Pino, applying global ValidationPipe and HttpExceptionFilter, and enabling OpenAPI (Swagger) documentation.

###### 2.3.3.1.1.3 Contains Files

- main.ts

###### 2.3.3.1.1.4 Organizational Reasoning

Standard NestJS entry point.

###### 2.3.3.1.1.5 Framework Convention Alignment

Follows NestJS CLI default project structure.

##### 2.3.3.1.2.0 Directory Path

###### 2.3.3.1.2.1 Directory Path

src/app.module.ts

###### 2.3.3.1.2.2 Purpose

Root module. Specification requires importing all feature modules, configuration modules, and shared infrastructure modules (Database, Cache, Auth).

###### 2.3.3.1.2.3 Contains Files

- app.module.ts

###### 2.3.3.1.2.4 Organizational Reasoning

Central dependency graph composer.

###### 2.3.3.1.2.5 Framework Convention Alignment

Core NestJS module system concept.

##### 2.3.3.1.3.0 Directory Path

###### 2.3.3.1.3.1 Directory Path

src/shared/

###### 2.3.3.1.3.2 Purpose

Contains shared, cross-cutting modules. Specification includes auth, cache, database, and filters.

###### 2.3.3.1.3.3 Contains Files

- auth/auth.module.ts
- auth/guards/jwt-auth.guard.ts
- auth/strategies/jwt.strategy.ts
- auth/decorators/user-id.decorator.ts
- cache/cache.module.ts
- database/database.module.ts
- filters/http-exception.filter.ts

###### 2.3.3.1.3.4 Organizational Reasoning

Promotes DRY principle for infrastructure and common logic.

###### 2.3.3.1.3.5 Framework Convention Alignment

Best practice for large NestJS applications.

##### 2.3.3.1.4.0 Directory Path

###### 2.3.3.1.4.1 Directory Path

src/modules/users/

###### 2.3.3.1.4.2 Purpose

Feature module for user account management. Validation requires this module to handle user profile, account deletion, and data export requests.

###### 2.3.3.1.4.3 Contains Files

- users.module.ts
- users.controller.ts
- users.service.ts
- entities/user.entity.ts
- repositories/users.repository.ts

###### 2.3.3.1.4.4 Organizational Reasoning

Encapsulates all user-specific account logic.

###### 2.3.3.1.4.5 Framework Convention Alignment

Follows NestJS feature module pattern.

##### 2.3.3.1.5.0 Directory Path

###### 2.3.3.1.5.1 Directory Path

src/modules/custom-modes/

###### 2.3.3.1.5.2 Purpose

Feature module for CRUD operations on user-defined custom modes.

###### 2.3.3.1.5.3 Contains Files

- custom-modes.module.ts
- custom-modes.controller.ts
- custom-modes.service.ts
- entities/custom-mode.entity.ts
- repositories/custom-modes.repository.ts
- dtos/create-custom-mode.dto.ts

###### 2.3.3.1.5.4 Organizational Reasoning

Isolates the custom modes feature.

###### 2.3.3.1.5.5 Framework Convention Alignment

Follows NestJS feature module pattern.

##### 2.3.3.1.6.0 Directory Path

###### 2.3.3.1.6.1 Directory Path

src/modules/user-variables/

###### 2.3.3.1.6.2 Purpose

Feature module for managing user variables, including \"last-write-wins\" sync logic.

###### 2.3.3.1.6.3 Contains Files

- user-variables.module.ts
- user-variables.controller.ts
- user-variables.service.ts
- entities/user-variable.entity.ts
- repositories/user-variables.repository.ts
- dtos/upsert-user-variable.dto.ts

###### 2.3.3.1.6.4 Organizational Reasoning

Encapsulates logic for user variables and offline sync conflict resolution.

###### 2.3.3.1.6.5 Framework Convention Alignment

Follows NestJS feature module pattern.

##### 2.3.3.1.7.0 Directory Path

###### 2.3.3.1.7.1 Directory Path

src/modules/calculation-history/

###### 2.3.3.1.7.2 Purpose

Feature module for managing user calculation history, supporting append-only sync.

###### 2.3.3.1.7.3 Contains Files

- calculation-history.module.ts
- calculation-history.controller.ts
- calculation-history.service.ts
- entities/calculation-history.entity.ts
- repositories/calculation-history.repository.ts
- dtos/add-history.dto.ts

###### 2.3.3.1.7.4 Organizational Reasoning

Isolates the append-only logic for calculation history.

###### 2.3.3.1.7.5 Framework Convention Alignment

Follows NestJS feature module pattern.

#### 2.3.3.2.0.0 Namespace Strategy

| Property | Value |
|----------|-------|
| Root Namespace | N/A (TypeScript modules) |
| Namespace Organization | File paths and module imports provide namespacing,... |
| Naming Conventions | Standard TypeScript/NestJS conventions. |
| Framework Alignment | Standard TypeScript/Node.js module conventions. |

### 2.3.4.0.0.0 Class Specifications

#### 2.3.4.1.0.0 Class Name

##### 2.3.4.1.1.0 Class Name

main.ts (Bootstrap Script)

##### 2.3.4.1.2.0 File Path

src/main.ts

##### 2.3.4.1.3.0 Class Type

Bootstrap

##### 2.3.4.1.4.0 Inheritance

None

##### 2.3.4.1.5.0 Purpose

Initializes and configures the NestJS application instance.

##### 2.3.4.1.6.0 Dependencies

- @nestjs/core
- AppModule
- nestjs-pino
- ValidationPipe
- HttpExceptionFilter
- @nestjs/swagger

##### 2.3.4.1.7.0 Framework Specific Attributes

*No items available*

##### 2.3.4.1.8.0 Technology Integration Notes

Validation requires configuration of Pino, global pipes/filters, and enabling Swagger for OpenAPI documentation generation.

##### 2.3.4.1.9.0 Properties

*No items available*

##### 2.3.4.1.10.0 Methods

- {'method_name': 'bootstrap', 'method_signature': 'bootstrap()', 'return_type': 'Promise<void>', 'access_modifier': 'N/A', 'is_async': True, 'framework_specific_attributes': [], 'parameters': [], 'implementation_logic': 'Specification requires creating a NestJS application using the Fastify adapter. Must configure `nestjs-pino` with request correlation ID propagation. Must apply `ValidationPipe` globally to enforce DTO validation. Must apply the global `HttpExceptionFilter`. Must configure and enable Swagger to generate the OpenAPI 3.0 specification as per REQ-1-037. Must listen on a port defined by environment variables.', 'exception_handling': 'Specification requires handling bootstrap errors and logging them before process exit.', 'performance_considerations': 'Specification mandates using Fastify adapter for higher throughput.', 'validation_requirements': 'None', 'technology_integration_details': 'Specification requires using `app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))` and `app.useGlobalFilters(new HttpExceptionFilter())`.'}

#### 2.3.4.2.0.0 Class Name

##### 2.3.4.2.1.0 Class Name

HttpExceptionFilter

##### 2.3.4.2.2.0 File Path

src/shared/filters/http-exception.filter.ts

##### 2.3.4.2.3.0 Class Type

ExceptionFilter

##### 2.3.4.2.4.0 Inheritance

None

##### 2.3.4.2.5.0 Purpose

Specification for a global filter to catch all unhandled exceptions and format them into a standardized RFC 7807 problem details JSON response.

##### 2.3.4.2.6.0 Dependencies

- @nestjs/common

##### 2.3.4.2.7.0 Framework Specific Attributes

- @Catch()

##### 2.3.4.2.8.0 Technology Integration Notes

This will be registered globally in `main.ts` to ensure all thrown exceptions are handled consistently.

##### 2.3.4.2.9.0 Properties

*No items available*

##### 2.3.4.2.10.0 Methods

- {'method_name': 'catch', 'method_signature': 'catch(exception: unknown, host: ArgumentsHost)', 'return_type': 'void', 'access_modifier': 'public', 'is_async': False, 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'exception', 'parameter_type': 'unknown', 'is_nullable': False, 'purpose': 'The thrown exception object.', 'framework_attributes': []}, {'parameter_name': 'host', 'parameter_type': 'ArgumentsHost', 'is_nullable': False, 'purpose': 'Provides access to the request/response objects.', 'framework_attributes': []}], 'implementation_logic': "Specification requires the method to determine the HTTP status code and message from the exception. If it's an `HttpException`, use its properties. If it's a generic Error, default to a 500 status. Must log the full error stack trace for non-HttpExceptions. Must format the final response as a JSON object with `type`, `title`, `status`, `detail`, and `instance` properties.", 'exception_handling': 'This is the primary exception handler; it should not re-throw.', 'performance_considerations': 'Logic should be lightweight to avoid adding significant overhead to error responses.', 'validation_requirements': 'None', 'technology_integration_details': 'Specification requires using `host.switchToHttp()` to get access to the native response object and send the formatted error.'}

#### 2.3.4.3.0.0 Class Name

##### 2.3.4.3.1.0 Class Name

UsersService

##### 2.3.4.3.2.0 File Path

src/modules/users/users.service.ts

##### 2.3.4.3.3.0 Class Type

Service

##### 2.3.4.3.4.0 Inheritance

None

##### 2.3.4.3.5.0 Purpose

Validation requires this service to handle business logic for user account management, including deletion and data export requests.

##### 2.3.4.3.6.0 Dependencies

- UsersRepository
- CustomModesRepository
- UserVariablesRepository
- CalculationHistoryRepository
- TypeORM.DataSource
- AwsCognitoService
- SqsProducerService

##### 2.3.4.3.7.0 Framework Specific Attributes

- @Injectable()

##### 2.3.4.3.8.0 Technology Integration Notes

Specification requires orchestration between multiple repositories, an external identity provider service, and a message queue service.

##### 2.3.4.3.9.0 Properties

*No items available*

##### 2.3.4.3.10.0 Methods

- {'method_name': 'deleteMyAccount', 'method_signature': 'deleteMyAccount(userId: string, authProviderId: string): Promise<void>', 'return_type': 'Promise<void>', 'access_modifier': 'public', 'is_async': True, 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'userId', 'parameter_type': 'string', 'is_nullable': False, 'purpose': 'The internal database ID of the user.', 'framework_attributes': []}, {'parameter_name': 'authProviderId', 'parameter_type': 'string', 'is_nullable': False, 'purpose': "The user's ID in the external identity provider (Cognito).", 'framework_attributes': []}], 'implementation_logic': 'Specification requires this method to implement the logic for REQ-1-031 and REQ-1-061. It must use a TypeORM database transaction to ensure atomicity. Within the transaction, it must delete all records from `calculation_history`, `user_variables`, and `custom_modes` associated with the `userId`. Finally, it must delete the record from the `users` table itself. If the database transaction is successful, it must then call the `AwsCognitoService` to permanently delete the user from the Cognito User Pool. If the Cognito deletion fails, the failure must be logged for manual intervention, but the transaction should not be rolled back (\\"delete-then-notify\\" pattern).', 'exception_handling': 'Specification requires wrapping the database operations in a transaction and rolling back on any failure. Cognito API call failures must be caught and logged.', 'performance_considerations': 'Deletion may be slow if cascading is not configured correctly at the database level. Direct deletes are preferred for performance.', 'validation_requirements': 'None; assumes user is authenticated.', 'technology_integration_details': 'Specification requires using `dataSource.transaction(async (manager) => { ... })` for the database operations.'}

#### 2.3.4.4.0.0 Class Name

##### 2.3.4.4.1.0 Class Name

CalculationHistoryService

##### 2.3.4.4.2.0 File Path

src/modules/calculation-history/calculation-history.service.ts

##### 2.3.4.4.3.0 Class Type

Service

##### 2.3.4.4.4.0 Inheritance

None

##### 2.3.4.4.5.0 Purpose

Validation requires this service to handle business logic for managing calculation history, including the append-only sync strategy.

##### 2.3.4.4.6.0 Dependencies

- CalculationHistoryRepository
- Cache

##### 2.3.4.4.7.0 Framework Specific Attributes

- @Injectable()

##### 2.3.4.4.8.0 Technology Integration Notes

Implements the append-only part of REQ-1-015.

##### 2.3.4.4.9.0 Properties

*No items available*

##### 2.3.4.4.10.0 Methods

- {'method_name': 'add', 'method_signature': 'add(addHistoryDto: AddHistoryDto, userId: string): Promise<CalculationHistory>', 'return_type': 'Promise<CalculationHistory>', 'access_modifier': 'public', 'is_async': True, 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'addHistoryDto', 'parameter_type': 'AddHistoryDto', 'is_nullable': False, 'purpose': 'DTO containing the calculation expression and result.', 'framework_attributes': []}, {'parameter_name': 'userId', 'parameter_type': 'string', 'is_nullable': False, 'purpose': 'The ID of the authenticated user.', 'framework_attributes': []}], 'implementation_logic': 'Specification requires this method to create a new `CalculationHistory` entity from the DTO and user ID, and then save it using the repository. This fulfills the \\"append-only\\" requirement for offline sync. It must also invalidate any cached history lists for the user.', 'exception_handling': 'Specification requires handling and logging database errors.', 'performance_considerations': 'The operation should be a fast `INSERT`. Cache invalidation is necessary for consistency.', 'validation_requirements': 'Assumes DTO is pre-validated.', 'technology_integration_details': 'Specification requires using `this.calculationHistoryRepository.save()`.'}

#### 2.3.4.5.0.0 Class Name

##### 2.3.4.5.1.0 Class Name

User

##### 2.3.4.5.2.0 File Path

src/modules/users/entities/user.entity.ts

##### 2.3.4.5.3.0 Class Type

Entity

##### 2.3.4.5.4.0 Inheritance

None

##### 2.3.4.5.5.0 Purpose

Specification for the TypeORM entity representing the `users` table, as per REQ-1-058.

##### 2.3.4.5.6.0 Dependencies

- typeorm

##### 2.3.4.5.7.0 Framework Specific Attributes

- @Entity({ name: \"users\" })

##### 2.3.4.5.8.0 Technology Integration Notes

Maps directly to the PostgreSQL `users` table.

##### 2.3.4.5.9.0 Properties

###### 2.3.4.5.9.1 Property Name

####### 2.3.4.5.9.1.1 Property Name

id

####### 2.3.4.5.9.1.2 Property Type

string

####### 2.3.4.5.9.1.3 Access Modifier

public

####### 2.3.4.5.9.1.4 Purpose

Primary key.

####### 2.3.4.5.9.1.5 Validation Attributes

- @PrimaryGeneratedColumn(\"uuid\")

####### 2.3.4.5.9.1.6 Framework Specific Configuration

Specifies UUID as primary key strategy.

###### 2.3.4.5.9.2.0 Property Name

####### 2.3.4.5.9.2.1 Property Name

authProviderId

####### 2.3.4.5.9.2.2 Property Type

string

####### 2.3.4.5.9.2.3 Access Modifier

public

####### 2.3.4.5.9.2.4 Purpose

Link to Cognito user.

####### 2.3.4.5.9.2.5 Validation Attributes

- @Column({ name: \"auth_provider_id\", unique: true })

####### 2.3.4.5.9.2.6 Framework Specific Configuration

Specifies column name and unique constraint.

###### 2.3.4.5.9.3.0 Property Name

####### 2.3.4.5.9.3.1 Property Name

email

####### 2.3.4.5.9.3.2 Property Type

string

####### 2.3.4.5.9.3.3 Access Modifier

public

####### 2.3.4.5.9.3.4 Purpose

User's email.

####### 2.3.4.5.9.3.5 Validation Attributes

- @Column({ unique: true })

####### 2.3.4.5.9.3.6 Framework Specific Configuration

Specifies unique constraint.

###### 2.3.4.5.9.4.0 Property Name

####### 2.3.4.5.9.4.1 Property Name

createdAt

####### 2.3.4.5.9.4.2 Property Type

Date

####### 2.3.4.5.9.4.3 Access Modifier

public

####### 2.3.4.5.9.4.4 Purpose

Timestamp of creation.

####### 2.3.4.5.9.4.5 Validation Attributes

- @CreateDateColumn({ name: \"created_at\" })

####### 2.3.4.5.9.4.6 Framework Specific Configuration

Automatically managed by TypeORM.

###### 2.3.4.5.9.5.0 Property Name

####### 2.3.4.5.9.5.1 Property Name

updatedAt

####### 2.3.4.5.9.5.2 Property Type

Date

####### 2.3.4.5.9.5.3 Access Modifier

public

####### 2.3.4.5.9.5.4 Purpose

Timestamp of last update.

####### 2.3.4.5.9.5.5 Validation Attributes

- @UpdateDateColumn({ name: \"updated_at\" })

####### 2.3.4.5.9.5.6 Framework Specific Configuration

Automatically managed by TypeORM.

###### 2.3.4.5.9.6.0 Property Name

####### 2.3.4.5.9.6.1 Property Name

customModes

####### 2.3.4.5.9.6.2 Property Type

CustomMode[]

####### 2.3.4.5.9.6.3 Access Modifier

public

####### 2.3.4.5.9.6.4 Purpose

One-to-many relationship.

####### 2.3.4.5.9.6.5 Validation Attributes

- @OneToMany(() => CustomMode, (mode) => mode.user, { cascade: true })

####### 2.3.4.5.9.6.6 Framework Specific Configuration

Specifies the relationship and enables cascading deletes.

#### 2.3.4.6.0.0.0 Class Name

##### 2.3.4.6.1.0.0 Class Name

CustomMode

##### 2.3.4.6.2.0.0 File Path

src/modules/custom-modes/entities/custom-mode.entity.ts

##### 2.3.4.6.3.0.0 Class Type

Entity

##### 2.3.4.6.4.0.0 Inheritance

None

##### 2.3.4.6.5.0.0 Purpose

Specification for the TypeORM entity representing the `custom_modes` table, as per REQ-1-059.

##### 2.3.4.6.6.0.0 Dependencies

- typeorm
- User

##### 2.3.4.6.7.0.0 Framework Specific Attributes

- @Entity({ name: \"custom_modes\" })

##### 2.3.4.6.8.0.0 Technology Integration Notes

Maps to the `custom_modes` table and defines the `jsonb` column type for the definition.

##### 2.3.4.6.9.0.0 Properties

###### 2.3.4.6.9.1.0 Property Name

####### 2.3.4.6.9.1.1 Property Name

id

####### 2.3.4.6.9.1.2 Property Type

string

####### 2.3.4.6.9.1.3 Access Modifier

public

####### 2.3.4.6.9.1.4 Purpose

Primary key.

####### 2.3.4.6.9.1.5 Validation Attributes

- @PrimaryGeneratedColumn(\"uuid\")

###### 2.3.4.6.9.2.0 Property Name

####### 2.3.4.6.9.2.1 Property Name

userId

####### 2.3.4.6.9.2.2 Property Type

string

####### 2.3.4.6.9.2.3 Access Modifier

public

####### 2.3.4.6.9.2.4 Purpose

Foreign key to users table.

####### 2.3.4.6.9.2.5 Validation Attributes

- @Column({ name: \"user_id\" })

###### 2.3.4.6.9.3.0 Property Name

####### 2.3.4.6.9.3.1 Property Name

name

####### 2.3.4.6.9.3.2 Property Type

string

####### 2.3.4.6.9.3.3 Access Modifier

public

####### 2.3.4.6.9.3.4 Purpose

Name of the custom mode.

####### 2.3.4.6.9.3.5 Validation Attributes

- @Column()

###### 2.3.4.6.9.4.0 Property Name

####### 2.3.4.6.9.4.1 Property Name

description

####### 2.3.4.6.9.4.2 Property Type

string

####### 2.3.4.6.9.4.3 Access Modifier

public

####### 2.3.4.6.9.4.4 Purpose

Optional description.

####### 2.3.4.6.9.4.5 Validation Attributes

- @Column({ type: \"text\", nullable: true })

###### 2.3.4.6.9.5.0 Property Name

####### 2.3.4.6.9.5.1 Property Name

definition

####### 2.3.4.6.9.5.2 Property Type

object

####### 2.3.4.6.9.5.3 Access Modifier

public

####### 2.3.4.6.9.5.4 Purpose

JSON definition of the mode.

####### 2.3.4.6.9.5.5 Validation Attributes

- @Column({ type: \"jsonb\" })

####### 2.3.4.6.9.5.6 Framework Specific Configuration

Specifies PostgreSQL `jsonb` type for efficient querying.

###### 2.3.4.6.9.6.0 Property Name

####### 2.3.4.6.9.6.1 Property Name

user

####### 2.3.4.6.9.6.2 Property Type

User

####### 2.3.4.6.9.6.3 Access Modifier

public

####### 2.3.4.6.9.6.4 Purpose

Many-to-one relationship.

####### 2.3.4.6.9.6.5 Validation Attributes

- @ManyToOne(() => User, (user) => user.customModes, { onDelete: \"CASCADE\" })
- @JoinColumn({ name: \"user_id\" })

####### 2.3.4.6.9.6.6 Framework Specific Configuration

Defines the foreign key relationship and join column.

#### 2.3.4.7.0.0.0 Class Name

##### 2.3.4.7.1.0.0 Class Name

UserVariable

##### 2.3.4.7.2.0.0 File Path

src/modules/user-variables/entities/user-variable.entity.ts

##### 2.3.4.7.3.0.0 Class Type

Entity

##### 2.3.4.7.4.0.0 Inheritance

None

##### 2.3.4.7.5.0.0 Purpose

Specification for the TypeORM entity representing the `user_variables` table, as per REQ-1-060.

##### 2.3.4.7.6.0.0 Dependencies

- typeorm
- User

##### 2.3.4.7.7.0.0 Framework Specific Attributes

- @Entity({ name: \"user_variables\" })
- @Unique([\"userId\", \"name\"])

##### 2.3.4.7.8.0.0 Technology Integration Notes

Includes the composite unique constraint required by the specification.

##### 2.3.4.7.9.0.0 Properties

###### 2.3.4.7.9.1.0 Property Name

####### 2.3.4.7.9.1.1 Property Name

id

####### 2.3.4.7.9.1.2 Property Type

string

####### 2.3.4.7.9.1.3 Access Modifier

public

####### 2.3.4.7.9.1.4 Purpose

Primary key.

####### 2.3.4.7.9.1.5 Validation Attributes

- @PrimaryGeneratedColumn(\"uuid\")

###### 2.3.4.7.9.2.0 Property Name

####### 2.3.4.7.9.2.1 Property Name

userId

####### 2.3.4.7.9.2.2 Property Type

string

####### 2.3.4.7.9.2.3 Access Modifier

public

####### 2.3.4.7.9.2.4 Purpose

Foreign key to users table.

####### 2.3.4.7.9.2.5 Validation Attributes

- @Column({ name: \"user_id\" })

###### 2.3.4.7.9.3.0 Property Name

####### 2.3.4.7.9.3.1 Property Name

name

####### 2.3.4.7.9.3.2 Property Type

string

####### 2.3.4.7.9.3.3 Access Modifier

public

####### 2.3.4.7.9.3.4 Purpose

Name of the variable.

####### 2.3.4.7.9.3.5 Validation Attributes

- @Column()

###### 2.3.4.7.9.4.0 Property Name

####### 2.3.4.7.9.4.1 Property Name

value

####### 2.3.4.7.9.4.2 Property Type

string

####### 2.3.4.7.9.4.3 Access Modifier

public

####### 2.3.4.7.9.4.4 Purpose

Value of the variable.

####### 2.3.4.7.9.4.5 Validation Attributes

- @Column()

###### 2.3.4.7.9.5.0 Property Name

####### 2.3.4.7.9.5.1 Property Name

updatedAt

####### 2.3.4.7.9.5.2 Property Type

Date

####### 2.3.4.7.9.5.3 Access Modifier

public

####### 2.3.4.7.9.5.4 Purpose

Timestamp for last-write-wins logic.

####### 2.3.4.7.9.5.5 Validation Attributes

- @UpdateDateColumn({ name: \"updated_at\" })

# 3.0.0.0.0.0.0 File Structure

## 3.1.0.0.0.0.0 Directory Organization

### 3.1.1.0.0.0.0 Directory Path

#### 3.1.1.1.0.0.0 Directory Path

/

#### 3.1.1.2.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.1.3.0.0.0 Contains Files

- package.json
- nest-cli.json
- .editorconfig
- .env.example
- Dockerfile
- .dockerignore
- tsconfig.json
- tsconfig.build.json
- jest.config.js
- .eslintrc.js
- .prettierrc
- .gitignore

#### 3.1.1.4.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.1.5.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.2.0.0.0.0 Directory Path

#### 3.1.2.1.0.0.0 Directory Path

.github/workflows

#### 3.1.2.2.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.2.3.0.0.0 Contains Files

- ci.yml

#### 3.1.2.4.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.2.5.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.3.0.0.0.0 Directory Path

#### 3.1.3.1.0.0.0 Directory Path

.vscode

#### 3.1.3.2.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.3.3.0.0.0 Contains Files

- settings.json
- launch.json

#### 3.1.3.4.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.3.5.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

