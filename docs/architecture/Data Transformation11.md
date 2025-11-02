# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Technology Stack

- React
- TypeScript
- NestJS
- PostgreSQL (Amazon RDS)
- AWS Lambda
- Amazon API Gateway
- AWS Cognito

## 1.3 Service Interfaces

- RESTful API (JSON over HTTPS)
- File Export/Import (JSON)

## 1.4 Data Models

- API Data Transfer Objects (DTOs)
- Database Entities (User, CustomMode, UserVariable, CalculationHistory)
- Custom Mode Export File Schema

# 2.0 Data Mapping Strategy

## 2.1 Essential Mappings

### 2.1.1 Mapping Id

#### 2.1.1.1 Mapping Id

API-DTO-to-DB-Entity

#### 2.1.1.2 Source

API Data Transfer Object (DTO)

#### 2.1.1.3 Target

Database Entity

#### 2.1.1.4 Transformation

direct

#### 2.1.1.5 Configuration

*No data available*

#### 2.1.1.6 Mapping Technique

Object-to-object mapping within the service layer.

#### 2.1.1.7 Justification

Core application requirement to persist data received from the client API into the PostgreSQL database.

#### 2.1.1.8 Complexity

medium

### 2.1.2.0 Mapping Id

#### 2.1.2.1 Mapping Id

DB-Entity-to-API-DTO

#### 2.1.2.2 Source

Database Entity

#### 2.1.2.3 Target

API Data Transfer Object (DTO)

#### 2.1.2.4 Transformation

direct

#### 2.1.2.5 Configuration

*No data available*

#### 2.1.2.6 Mapping Technique

Object-to-object mapping to shape data for client consumption, removing sensitive or internal fields.

#### 2.1.2.7 Justification

Core application requirement to send persisted data back to the client in a structured format.

#### 2.1.2.8 Complexity

medium

### 2.1.3.0 Mapping Id

#### 2.1.3.1 Mapping Id

CustomMode-to-ExportFile

#### 2.1.3.2 Source

CustomMode Database Entity

#### 2.1.3.3 Target

Custom Mode JSON Export File

#### 2.1.3.4 Transformation

direct

#### 2.1.3.5 Configuration

##### 2.1.3.5.1 Schema Version

1.0

#### 2.1.3.6.0 Mapping Technique

Serializing a database entity into a structured JSON format as specified in REQ-1-020.

#### 2.1.3.7.0 Justification

Fulfills the explicit requirement REQ-1-008 for exporting custom modes.

#### 2.1.3.8.0 Complexity

simple

### 2.1.4.0.0 Mapping Id

#### 2.1.4.1.0 Mapping Id

SI-Prefix-to-Number

#### 2.1.4.2.0 Source

User Input String (e.g., '10k')

#### 2.1.4.3.0 Target

Numeric Value (e.g., 10000)

#### 2.1.4.4.0 Transformation

custom

#### 2.1.4.5.0 Configuration

##### 2.1.4.5.1 Prefixes

p, n, μ, m, k, M, G

#### 2.1.4.6.0 Mapping Technique

Input string parsing and conversion within the backend services before calculation.

#### 2.1.4.7.0 Justification

Fulfills the explicit requirement REQ-1-023 to support SI prefixes in numerical inputs.

#### 2.1.4.8.0 Complexity

simple

## 2.2.0.0.0 Object To Object Mappings

- {'sourceObject': 'CreateCustomModeDTO', 'targetObject': 'CustomMode Entity', 'fieldMappings': [{'sourceField': 'name', 'targetField': 'name', 'transformation': 'Direct', 'dataTypeConversion': 'None'}, {'sourceField': 'description', 'targetField': 'description', 'transformation': 'Direct', 'dataTypeConversion': 'None'}, {'sourceField': 'definition', 'targetField': 'definition', 'transformation': 'Serialization', 'dataTypeConversion': 'Object to JSONB'}]}

## 2.3.0.0.0 Data Type Conversions

### 2.3.1.0.0 From

#### 2.3.1.1.0 From

TypeScript Object

#### 2.3.1.2.0 To

PostgreSQL JSONB

#### 2.3.1.3.0 Conversion Method

JSON serialization (e.g., JSON.stringify)

#### 2.3.1.4.0 Validation Required

✅ Yes

### 2.3.2.0.0 From

#### 2.3.2.1.0 From

PostgreSQL JSONB

#### 2.3.2.2.0 To

TypeScript Object

#### 2.3.2.3.0 Conversion Method

JSON parsing (e.g., JSON.parse)

#### 2.3.2.4.0 Validation Required

✅ Yes

## 2.4.0.0.0 Bidirectional Mappings

- {'entity': 'CustomMode', 'forwardMapping': 'CreateCustomModeDTO -> CustomMode Entity', 'reverseMapping': 'CustomMode Entity -> CustomModeResponseDTO', 'consistencyStrategy': 'Use dedicated mapper functions for each direction to ensure consistency and prevent accidental data leakage.'}

# 3.0.0.0.0 Schema Validation Requirements

## 3.1.0.0.0 Field Level Validations

### 3.1.1.0.0 Field

#### 3.1.1.1.0 Field

User.email

#### 3.1.1.2.0 Rules

- IsRequired
- IsEmail

#### 3.1.1.3.0 Priority

🚨 critical

#### 3.1.1.4.0 Error Message

A valid email address is required.

### 3.1.2.0.0 Field

#### 3.1.2.1.0 Field

CustomMode.name

#### 3.1.2.2.0 Rules

- IsRequired
- MaxLength(100)

#### 3.1.2.3.0 Priority

🔴 high

#### 3.1.2.4.0 Error Message

Custom mode name is required and cannot exceed 100 characters.

### 3.1.3.0.0 Field

#### 3.1.3.1.0 Field

CustomMode.definition

#### 3.1.3.2.0 Rules

- IsRequired
- IsValidJSON

#### 3.1.3.3.0 Priority

🚨 critical

#### 3.1.3.4.0 Error Message

The mode definition must be a valid structured object.

## 3.2.0.0.0 Cross Field Validations

- {'validationId': "Ohm's Law Input Count", 'fields': ['voltage', 'current', 'resistance', 'power'], 'rule': 'Exactly two of the four fields must contain valid numerical inputs.', 'condition': "When performing an Ohm's Law calculation (REQ-1-032).", 'errorHandling': 'Reject request with a 400 Bad Request status and a descriptive error message.'}

## 3.3.0.0.0 Business Rule Validations

- {'ruleId': 'BR-555-01', 'description': 'The requested duty cycle in the 555 Timer Astable mode must be greater than 50% and less than 100%.', 'fields': ['dutyCycle'], 'logic': 'value > 50 AND value < 100', 'priority': 'high'}

## 3.4.0.0.0 Conditional Validations

- {'condition': "Calculation mode is '555 Timer Astable'", 'applicableFields': ['dutyCycle'], 'validationRules': ['BR-555-01']}

## 3.5.0.0.0 Validation Groups

### 3.5.1.0.0 Group Name

#### 3.5.1.1.0 Group Name

UserRegistration

#### 3.5.1.2.0 Validations

- User.email
- PasswordPolicy

#### 3.5.1.3.0 Execution Order

1

#### 3.5.1.4.0 Stop On First Failure

✅ Yes

### 3.5.2.0.0 Group Name

#### 3.5.2.1.0 Group Name

CustomModeCreation

#### 3.5.2.2.0 Validations

- CustomMode.name
- CustomMode.definition

#### 3.5.2.3.0 Execution Order

1

#### 3.5.2.4.0 Stop On First Failure

✅ Yes

# 4.0.0.0.0 Transformation Pattern Evaluation

## 4.1.0.0.0 Selected Patterns

### 4.1.1.0.0 Pattern

#### 4.1.1.1.0 Pattern

converter

#### 4.1.1.2.0 Use Case

Converting between API DTOs and Database Entities.

#### 4.1.1.3.0 Implementation

Dedicated mapper classes or functions within the NestJS service layer.

#### 4.1.1.4.0 Justification

Standard pattern for decoupling the API layer from the persistence layer, improving maintainability and security.

### 4.1.2.0.0 Pattern

#### 4.1.2.1.0 Pattern

adapter

#### 4.1.2.2.0 Use Case

The ApiServiceClient in the React SPA.

#### 4.1.2.3.0 Implementation

A client-side service that adapts the Redux state management actions and data structures to the backend's REST API contract.

#### 4.1.2.4.0 Justification

Decouples UI components from direct API communication, centralizing data fetching and error handling on the client.

## 4.2.0.0.0 Pipeline Processing

### 4.2.1.0.0 Required

❌ No

### 4.2.2.0.0 Stages

*No items available*

### 4.2.3.0.0 Parallelization

❌ No

## 4.3.0.0.0 Processing Mode

### 4.3.1.0.0 Real Time

#### 4.3.1.1.0 Required

✅ Yes

#### 4.3.1.2.0 Scenarios

- All user interactions via the REST API, including calculations, data saving, and data retrieval.

#### 4.3.1.3.0 Latency Requirements

<200ms P95 for data retrieval, <500ms P95 for formula execution.

### 4.3.2.0.0 Batch

| Property | Value |
|----------|-------|
| Required | ❌ |
| Batch Size | 0 |
| Frequency |  |

### 4.3.3.0.0 Streaming

| Property | Value |
|----------|-------|
| Required | ❌ |
| Streaming Framework |  |
| Windowing Strategy |  |

## 4.4.0.0.0 Canonical Data Model

### 4.4.1.0.0 Applicable

❌ No

### 4.4.2.0.0 Scope

*No items available*

### 4.4.3.0.0 Benefits

- Not applicable. The system is simple enough that direct DTO-to-Entity mapping is sufficient and introducing a canonical model would be over-engineering.

# 5.0.0.0.0 Version Handling Strategy

## 5.1.0.0.0 Schema Evolution

### 5.1.1.0.0 Strategy

Additive, non-breaking changes.

### 5.1.2.0.0 Versioning Scheme

Semantic versioning for API, sequential numbering for DB migrations.

### 5.1.3.0.0 Compatibility

| Property | Value |
|----------|-------|
| Backward | ✅ |
| Forward | ❌ |
| Reasoning | The primary goal is to ensure older clients can st... |

## 5.2.0.0.0 Transformation Versioning

| Property | Value |
|----------|-------|
| Mechanism | A 'schemaVersion' key within the exported JSON fil... |
| Version Identification | The import transformation logic will read this key... |
| Migration Strategy | The import function will support older versions or... |

## 5.3.0.0.0 Data Model Changes

| Property | Value |
|----------|-------|
| Migration Path | Managed via versioned TypeORM migration scripts, e... |
| Rollback Strategy | Database restoration from backups (REQ-1-044) is t... |
| Validation Strategy | Migrations are tested in staging environments befo... |

## 5.4.0.0.0 Schema Registry

| Property | Value |
|----------|-------|
| Required | ❌ |
| Technology | N/A |
| Governance | Not required for a single-team, self-contained sys... |

# 6.0.0.0.0 Performance Optimization

## 6.1.0.0.0 Critical Requirements

### 6.1.1.0.0 Operation

#### 6.1.1.1.0 Operation

API Data Retrieval

#### 6.1.1.2.0 Max Latency

200ms (P95)

#### 6.1.1.3.0 Throughput Target

N/A

#### 6.1.1.4.0 Justification

Requirement REQ-1-042, ensuring a responsive user experience.

### 6.1.2.0.0 Operation

#### 6.1.2.1.0 Operation

Custom Formula Execution

#### 6.1.2.2.0 Max Latency

500ms (P95)

#### 6.1.2.3.0 Throughput Target

N/A

#### 6.1.2.4.0 Justification

Requirement REQ-1-043, balancing security sandbox overhead with performance.

## 6.2.0.0.0 Parallelization Opportunities

*No items available*

## 6.3.0.0.0 Caching Strategies

- {'cacheType': 'In-Memory (Redis)', 'cacheScope': "User profile data, user's set of custom modes, user's set of variables.", 'evictionPolicy': 'LRU (Least Recently Used)', 'applicableTransformations': ['DB-Entity-to-API-DTO']}

## 6.4.0.0.0 Memory Optimization

### 6.4.1.0.0 Techniques

- Using streaming for large data sets is not currently required, but pagination will be used for calculation history.

### 6.4.2.0.0 Thresholds

N/A

### 6.4.3.0.0 Monitoring Required

✅ Yes

## 6.5.0.0.0 Lazy Evaluation

### 6.5.1.0.0 Applicable

✅ Yes

### 6.5.2.0.0 Scenarios

- Fetching a user's calculation history, which could become very large over time.

### 6.5.3.0.0 Implementation

API endpoints for history will be paginated.

## 6.6.0.0.0 Bulk Processing

### 6.6.1.0.0 Required

❌ No

### 6.6.2.0.0 Batch Sizes

#### 6.6.2.1.0 Optimal

0

#### 6.6.2.2.0 Maximum

0

### 6.6.3.0.0 Parallelism

0

# 7.0.0.0.0 Error Handling And Recovery

## 7.1.0.0.0 Error Handling Strategies

### 7.1.1.0.0 Error Type

#### 7.1.1.1.0 Error Type

Input Validation Error

#### 7.1.1.2.0 Strategy

Reject request with a 400/422 HTTP status code and a JSON payload detailing the errors.

#### 7.1.1.3.0 Fallback Action

None

#### 7.1.1.4.0 Escalation Path

*No items available*

### 7.1.2.0.0 Error Type

#### 7.1.2.1.0 Error Type

Server-side Exception

#### 7.1.2.2.0 Strategy

Log the full exception with correlation ID, return a generic 500 HTTP status code.

#### 7.1.2.3.0 Fallback Action

None

#### 7.1.2.4.0 Escalation Path

- CloudWatch Alarm

## 7.2.0.0.0 Logging Requirements

### 7.2.1.0.0 Log Level

info

### 7.2.2.0.0 Included Data

- timestamp
- log level
- service name
- Correlation ID
- detailed message

### 7.2.3.0.0 Retention Period

30 days (CloudWatch default)

### 7.2.4.0.0 Alerting

✅ Yes

## 7.3.0.0.0 Partial Success Handling

### 7.3.1.0.0 Strategy

Not applicable; all API operations are atomic (either fully succeed or fully fail).

### 7.3.2.0.0 Reporting Mechanism

N/A

### 7.3.3.0.0 Recovery Actions

*No items available*

## 7.4.0.0.0 Circuit Breaking

*No items available*

## 7.5.0.0.0 Retry Strategies

- {'operation': 'Client-side API requests', 'maxRetries': 2, 'backoffStrategy': 'exponential', 'retryConditions': ['503 Service Unavailable', 'Network Timeout']}

## 7.6.0.0.0 Error Notifications

- {'condition': 'API Gateway 5xx error rate > 1% over 5 minutes', 'recipients': ['Development Team'], 'severity': 'critical', 'channel': 'Email via SNS'}

# 8.0.0.0.0 Project Specific Transformations

## 8.1.0.0.0 API Request DTO to Database Entity

### 8.1.1.0.0 Transformation Id

PST-001

### 8.1.2.0.0 Name

API Request DTO to Database Entity

### 8.1.3.0.0 Description

Maps incoming JSON payloads from API POST/PUT requests to TypeORM entities for persistence. This includes validation and serialization of complex types like the JSONB definition for Custom Modes.

### 8.1.4.0.0 Source

#### 8.1.4.1.0 Service

Client SPA

#### 8.1.4.2.0 Model

API DTO

#### 8.1.4.3.0 Fields

- name
- description
- definition

### 8.1.5.0.0 Target

#### 8.1.5.1.0 Service

User & Data Service

#### 8.1.5.2.0 Model

Database Entity

#### 8.1.5.3.0 Fields

- name
- description
- definition (JSONB)

### 8.1.6.0.0 Transformation

#### 8.1.6.1.0 Type

🔹 direct

#### 8.1.6.2.0 Logic

Use a library like class-transformer to map fields and serialize the 'definition' object to a JSON string for the JSONB column.

#### 8.1.6.3.0 Configuration

*No data available*

### 8.1.7.0.0 Frequency

real-time

### 8.1.8.0.0 Criticality

critical

### 8.1.9.0.0 Dependencies

- REQ-1-003
- REQ-1-024

### 8.1.10.0.0 Validation

#### 8.1.10.1.0 Pre Transformation

- NestJS ValidationPipe using class-validator decorators on DTOs.

#### 8.1.10.2.0 Post Transformation

- Database unique constraints (e.g., UC_UserVariable_User_Name).

### 8.1.11.0.0 Performance

| Property | Value |
|----------|-------|
| Expected Volume | Medium |
| Latency Requirement | <50ms |
| Optimization Strategy | Efficient mapping logic, avoiding unnecessary look... |

## 8.2.0.0.0 Custom Mode Entity to Export File

### 8.2.1.0.0 Transformation Id

PST-002

### 8.2.2.0.0 Name

Custom Mode Entity to Export File

### 8.2.3.0.0 Description

Transforms a CustomMode entity from the database into a structured JSON file for user download, including a schema version number.

### 8.2.4.0.0 Source

#### 8.2.4.1.0 Service

User & Data Service

#### 8.2.4.2.0 Model

CustomMode Entity

#### 8.2.4.3.0 Fields

- name
- description
- definition

### 8.2.5.0.0 Target

#### 8.2.5.1.0 Service

Client SPA

#### 8.2.5.2.0 Model

JSON Download File

#### 8.2.5.3.0 Fields

- schemaVersion
- name
- description
- definition

### 8.2.6.0.0 Transformation

#### 8.2.6.1.0 Type

🔹 direct

#### 8.2.6.2.0 Logic

Fetch the entity, parse the 'definition' JSONB field back into an object, and construct the final JSON structure for export.

#### 8.2.6.3.0 Configuration

##### 8.2.6.3.1 Version

1.0

### 8.2.7.0.0 Frequency

on-demand

### 8.2.8.0.0 Criticality

medium

### 8.2.9.0.0 Dependencies

- REQ-1-008
- REQ-1-020

### 8.2.10.0.0 Validation

#### 8.2.10.1.0 Pre Transformation

- Verify user ownership of the custom mode.

#### 8.2.10.2.0 Post Transformation

- Ensure the generated file is valid JSON.

### 8.2.11.0.0 Performance

| Property | Value |
|----------|-------|
| Expected Volume | Low |
| Latency Requirement | <200ms |
| Optimization Strategy | N/A |

# 9.0.0.0.0 Implementation Priority

## 9.1.0.0.0 Component

### 9.1.1.0.0 Component

DTO <-> Entity Mapping and Validation

### 9.1.2.0.0 Priority

🔴 high

### 9.1.3.0.0 Dependencies

*No items available*

### 9.1.4.0.0 Estimated Effort

Medium

### 9.1.5.0.0 Risk Level

medium

## 9.2.0.0.0 Component

### 9.2.1.0.0 Component

Custom Mode Export/Import Transformation

### 9.2.2.0.0 Priority

🟡 medium

### 9.2.3.0.0 Dependencies

- DTO <-> Entity Mapping and Validation

### 9.2.4.0.0 Estimated Effort

Low

### 9.2.5.0.0 Risk Level

low

## 9.3.0.0.0 Component

### 9.3.1.0.0 Component

SI Prefix Input Parsing

### 9.3.2.0.0 Priority

🟡 medium

### 9.3.3.0.0 Dependencies

*No items available*

### 9.3.4.0.0 Estimated Effort

Low

### 9.3.5.0.0 Risk Level

low

## 9.4.0.0.0 Component

### 9.4.1.0.0 Component

Offline Sync Conflict Resolution Transformation

### 9.4.2.0.0 Priority

🟡 medium

### 9.4.3.0.0 Dependencies

- DTO <-> Entity Mapping and Validation

### 9.4.4.0.0 Estimated Effort

High

### 9.4.5.0.0 Risk Level

high

# 10.0.0.0.0 Risk Assessment

## 10.1.0.0.0 Risk

### 10.1.1.0.0 Risk

Incorrect implementation of offline sync conflict resolution logic (last-write-wins).

### 10.1.2.0.0 Impact

high

### 10.1.3.0.0 Probability

medium

### 10.1.4.0.0 Mitigation

Develop a comprehensive suite of automated integration tests covering various online/offline conflict scenarios as described in REQ-1-015.

### 10.1.5.0.0 Contingency Plan

In case of data corruption, use database Point-In-Time-Recovery (PITR) to restore user data.

## 10.2.0.0.0 Risk

### 10.2.1.0.0 Risk

Insecure parsing of imported Custom Mode JSON files.

### 10.2.2.0.0 Impact

high

### 10.2.3.0.0 Probability

low

### 10.2.4.0.0 Mitigation

Implement strict schema validation on all imported JSON files. Ensure the formula execution sandbox is robustly isolated.

### 10.2.5.0.0 Contingency Plan

Disable the import feature temporarily if a vulnerability is discovered.

# 11.0.0.0.0 Recommendations

## 11.1.0.0.0 Category

### 11.1.1.0.0 Category

🔹 Data Mapping

### 11.1.2.0.0 Recommendation

Use the `class-transformer` library in conjunction with `class-validator` in the NestJS backend.

### 11.1.3.0.0 Justification

This provides a declarative, decorator-based approach for both validation and transformation (DTOs <-> Entities), reducing boilerplate code and improving maintainability.

### 11.1.4.0.0 Priority

🔴 high

### 11.1.5.0.0 Implementation Notes

Integrate this with the global `ValidationPipe` in NestJS for automatic request validation.

## 11.2.0.0.0 Category

### 11.2.1.0.0 Category

🔹 Schema Validation

### 11.2.2.0.0 Recommendation

Enforce all business rule validations (e.g., REQ-1-070) exclusively in the backend service layer.

### 11.2.3.0.0 Justification

The backend must be the authoritative source of truth for validation to ensure data integrity, as client-side validation can be bypassed (REQ-1-069).

### 11.2.4.0.0 Priority

🔴 high

### 11.2.5.0.0 Implementation Notes

Validation logic should reside in NestJS services, called from the controllers before data is passed to repositories.

