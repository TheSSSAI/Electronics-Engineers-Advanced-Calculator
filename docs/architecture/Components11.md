# 1 Components

## 1.1 Components

### 1.1.1 UIComponent

#### 1.1.1.1 Id

client-core-calculator-ui-001

#### 1.1.1.2 Name

CoreCalculatorUI

#### 1.1.1.3 Description

Renders the primary scientific calculator interface, including the display, keypad, history panel, and angle mode selector. Manages the state for standard calculations.

#### 1.1.1.4 Type

🔹 UIComponent

#### 1.1.1.5 Dependencies

- client-api-service-client-007
- client-state-management-008

#### 1.1.1.6 Properties

| Property | Value |
|----------|-------|
| Framework | React |
| Library | Material-UI |

#### 1.1.1.7 Interfaces

- ICalculatorProps

#### 1.1.1.8 Technology

React, TypeScript

#### 1.1.1.9 Resources

*No data available*

#### 1.1.1.10 Configuration

##### 1.1.1.10.1 Angle Modes

- Degrees
- Radians
- Gradians

#### 1.1.1.11.0 Health Check

*No data available*

#### 1.1.1.12.0 Responsible Features

- REQ-1-001: Core scientific calculator
- REQ-1-021: Angle modes (Deg/Rad/Grad)
- REQ-1-022: Calculation history panel
- REQ-1-023: SI unit prefix parsing

#### 1.1.1.13.0 Security

##### 1.1.1.13.1 Requires Authentication

❌ No

### 1.1.2.0.0 UIComponent

#### 1.1.2.1.0 Id

client-electronics-modes-ui-002

#### 1.1.2.2.0 Name

ElectronicsModesUI

#### 1.1.2.3.0 Description

A container UI component that provides the user interface for the four specialized electronics calculation modes.

#### 1.1.2.4.0 Type

🔹 UIComponent

#### 1.1.2.5.0 Dependencies

- client-api-service-client-007
- client-state-management-008

#### 1.1.2.6.0 Properties

| Property | Value |
|----------|-------|
| Framework | React |
| Library | Material-UI |

#### 1.1.2.7.0 Interfaces

*No items available*

#### 1.1.2.8.0 Technology

React, TypeScript

#### 1.1.2.9.0 Resources

*No data available*

#### 1.1.2.10.0 Configuration

*No data available*

#### 1.1.2.11.0 Health Check

*No data available*

#### 1.1.2.12.0 Responsible Features

- REQ-1-002: Specialized electronics calculation modes
- REQ-1-032: Ohm's Law & Power mode
- REQ-1-033: 555 Timer Astable mode

#### 1.1.2.13.0 Security

##### 1.1.2.13.1 Requires Authentication

❌ No

### 1.1.3.0.0 UIComponent

#### 1.1.3.1.0 Id

client-custom-mode-manager-ui-003

#### 1.1.3.2.0 Name

CustomModeManagerUI

#### 1.1.3.3.0 Description

Provides the complete user interface for creating, managing, editing, deleting, importing, and exporting user-defined calculation modes.

#### 1.1.3.4.0 Type

🔹 UIComponent

#### 1.1.3.5.0 Dependencies

- client-api-service-client-007
- client-state-management-008

#### 1.1.3.6.0 Properties

| Property | Value |
|----------|-------|
| Wizard Steps | 4 |

#### 1.1.3.7.0 Interfaces

*No items available*

#### 1.1.3.8.0 Technology

React, TypeScript

#### 1.1.3.9.0 Resources

*No data available*

#### 1.1.3.10.0 Configuration

##### 1.1.3.10.1 Export Format

JSON

##### 1.1.3.10.2 Import Max Size

1MB

#### 1.1.3.11.0 Health Check

*No data available*

#### 1.1.3.12.0 Responsible Features

- REQ-1-003: User-defined calculation modes framework
- REQ-1-026: Custom mode creation wizard
- REQ-1-027: Automatic recalculation in custom modes
- REQ-1-028: Export/Import functionality

#### 1.1.3.13.0 Security

##### 1.1.3.13.1 Requires Authentication

✅ Yes

### 1.1.4.0.0 UIComponent

#### 1.1.4.1.0 Id

client-user-account-ui-004

#### 1.1.4.2.0 Name

UserAccountUI

#### 1.1.4.3.0 Description

Handles all user-facing aspects of account management, including registration, login, profile management, variable management, and account deletion.

#### 1.1.4.4.0 Type

🔹 UIComponent

#### 1.1.4.5.0 Dependencies

- client-api-service-client-007
- client-state-management-008

#### 1.1.4.6.0 Properties

*No data available*

#### 1.1.4.7.0 Interfaces

*No items available*

#### 1.1.4.8.0 Technology

React, TypeScript

#### 1.1.4.9.0 Resources

*No data available*

#### 1.1.4.10.0 Configuration

*No data available*

#### 1.1.4.11.0 Health Check

*No data available*

#### 1.1.4.12.0 Responsible Features

- REQ-1-004: User account system
- REQ-1-024: User-defined variables management
- REQ-1-031: User-initiated account deletion
- REQ-1-073: New user guided tour

#### 1.1.4.13.0 Security

##### 1.1.4.13.1 Requires Authentication

✅ Yes

### 1.1.5.0.0 ClientService

#### 1.1.5.1.0 Id

client-offline-sync-manager-005

#### 1.1.5.2.0 Name

OfflineSyncManager

#### 1.1.5.3.0 Description

A client-side service that queues data modifications in IndexedDB when the application is offline and synchronizes them with the backend upon network restoration.

#### 1.1.5.4.0 Type

🔹 ClientService

#### 1.1.5.5.0 Dependencies

- client-api-service-client-007

#### 1.1.5.6.0 Properties

| Property | Value |
|----------|-------|
| Storage | IndexedDB |

#### 1.1.5.7.0 Interfaces

- IOfflineQueue

#### 1.1.5.8.0 Technology

TypeScript, IndexedDB API

#### 1.1.5.9.0 Resources

*No data available*

#### 1.1.5.10.0 Configuration

##### 1.1.5.10.1 Sync Interval

300s

#### 1.1.5.11.0 Health Check

*No data available*

#### 1.1.5.12.0 Responsible Features

- REQ-1-013: Offline calculator functionality
- REQ-1-014: Offline data modifications and sync

#### 1.1.5.13.0 Security

*No data available*

### 1.1.6.0.0 UIComponent

#### 1.1.6.1.0 Id

client-help-system-ui-006

#### 1.1.6.2.0 Name

HelpSystemUI

#### 1.1.6.3.0 Description

Provides the UI for displaying the in-app help system content, including the search functionality and navigation, powered by Docusaurus.

#### 1.1.6.4.0 Type

🔹 UIComponent

#### 1.1.6.5.0 Dependencies

*No items available*

#### 1.1.6.6.0 Properties

| Property | Value |
|----------|-------|
| Content Source | Docusaurus build artifacts |

#### 1.1.6.7.0 Interfaces

*No items available*

#### 1.1.6.8.0 Technology

React, TypeScript

#### 1.1.6.9.0 Resources

*No data available*

#### 1.1.6.10.0 Configuration

*No data available*

#### 1.1.6.11.0 Health Check

*No data available*

#### 1.1.6.12.0 Responsible Features

- REQ-1-025: In-app help system
- REQ-1-038: Persistent help icon

#### 1.1.6.13.0 Security

*No data available*

### 1.1.7.0.0 ClientService

#### 1.1.7.1.0 Id

client-api-service-client-007

#### 1.1.7.2.0 Name

ApiServiceClient

#### 1.1.7.3.0 Description

A dedicated client-side module for handling all HTTP communication with the backend API Gateway. It manages request/response formatting, error handling, and attaching JWTs to authorized requests.

#### 1.1.7.4.0 Type

🔹 ClientService

#### 1.1.7.5.0 Dependencies

- client-state-management-008

#### 1.1.7.6.0 Properties

| Property | Value |
|----------|-------|
| Client | axios |

#### 1.1.7.7.0 Interfaces

- IHttpClient

#### 1.1.7.8.0 Technology

TypeScript

#### 1.1.7.9.0 Resources

*No data available*

#### 1.1.7.10.0 Configuration

##### 1.1.7.10.1 Api Base Url

/api/v1

##### 1.1.7.10.2 Timeout

15000ms

#### 1.1.7.11.0 Health Check

*No data available*

#### 1.1.7.12.0 Responsible Features

- REQ-1-036: RESTful API communication
- REQ-1-040: JWT Bearer token usage

#### 1.1.7.13.0 Security

*No data available*

### 1.1.8.0.0 ClientService

#### 1.1.8.1.0 Id

client-state-management-008

#### 1.1.8.2.0 Name

StateManagement

#### 1.1.8.3.0 Description

Centralized state management for the entire client application using Redux Toolkit. Manages user session, cached data from the server, and global UI state.

#### 1.1.8.4.0 Type

🔹 ClientService

#### 1.1.8.5.0 Dependencies

*No items available*

#### 1.1.8.6.0 Properties

| Property | Value |
|----------|-------|
| Pattern | Flux |

#### 1.1.8.7.0 Interfaces

- IStore

#### 1.1.8.8.0 Technology

Redux Toolkit

#### 1.1.8.9.0 Resources

*No data available*

#### 1.1.8.10.0 Configuration

*No data available*

#### 1.1.8.11.0 Health Check

*No data available*

#### 1.1.8.12.0 Responsible Features

- REQ-1-055: State management technology stack

#### 1.1.8.13.0 Security

*No data available*

### 1.1.9.0.0 APIRouting

#### 1.1.9.1.0 Id

gateway-request-router-009

#### 1.1.9.2.0 Name

RequestRouter

#### 1.1.9.3.0 Description

The API Gateway configuration component that maps API endpoints and HTTP methods to the appropriate backend integrations (User & Data Service or Formula Execution Service).

#### 1.1.9.4.0 Type

🔹 APIRouting

#### 1.1.9.5.0 Dependencies

- service-user-data-012
- service-formula-execution-013

#### 1.1.9.6.0 Properties

*No data available*

#### 1.1.9.7.0 Interfaces

*No items available*

#### 1.1.9.8.0 Technology

Amazon API Gateway

#### 1.1.9.9.0 Resources

*No data available*

#### 1.1.9.10.0 Configuration

##### 1.1.9.10.1 Routes

###### 1.1.9.10.1.1 Path

####### 1.1.9.10.1.1.1 Path

/users/*

####### 1.1.9.10.1.1.2 Target

service-user-data-012

###### 1.1.9.10.1.2.0 Path

####### 1.1.9.10.1.2.1 Path

/modes/*

####### 1.1.9.10.1.2.2 Target

service-user-data-012

###### 1.1.9.10.1.3.0 Path

####### 1.1.9.10.1.3.1 Path

/variables/*

####### 1.1.9.10.1.3.2 Target

service-user-data-012

###### 1.1.9.10.1.4.0 Path

####### 1.1.9.10.1.4.1 Path

/execute

####### 1.1.9.10.1.4.2 Target

service-formula-execution-013

#### 1.1.9.11.0.0.0 Health Check

*No data available*

#### 1.1.9.12.0.0.0 Responsible Features

*No items available*

#### 1.1.9.13.0.0.0 Security

*No data available*

### 1.1.10.0.0.0.0 APISecurity

#### 1.1.10.1.0.0.0 Id

gateway-jwt-authorizer-010

#### 1.1.10.2.0.0.0 Name

JWTAuthorizer

#### 1.1.10.3.0.0.0 Description

A managed authorizer within API Gateway that integrates with AWS Cognito. It validates the signature and claims of incoming JWT Bearer tokens before allowing access to protected routes.

#### 1.1.10.4.0.0.0 Type

🔹 APISecurity

#### 1.1.10.5.0.0.0 Dependencies

- security-cognito-identity-016

#### 1.1.10.6.0.0.0 Properties

| Property | Value |
|----------|-------|
| Type | JWT |

#### 1.1.10.7.0.0.0 Interfaces

*No items available*

#### 1.1.10.8.0.0.0 Technology

Amazon API Gateway, AWS Cognito

#### 1.1.10.9.0.0.0 Resources

*No data available*

#### 1.1.10.10.0.0.0 Configuration

##### 1.1.10.10.1.0.0 Issuer

🔗 [https://cognito-idp.{region}.amazonaws.com/{userPoolId}](https://cognito-idp.{region}.amazonaws.com/{userPoolId})

##### 1.1.10.10.2.0.0 Audience

{appClientId}

#### 1.1.10.11.0.0.0 Health Check

*No data available*

#### 1.1.10.12.0.0.0 Responsible Features

- REQ-1-040: Access control via JWT
- REQ-1-103: JWT validation at gateway

#### 1.1.10.13.0.0.0 Security

*No data available*

### 1.1.11.0.0.0.0 APIMonitoring

#### 1.1.11.1.0.0.0 Id

gateway-observability-config-011

#### 1.1.11.2.0.0.0 Name

ObservabilityConfig

#### 1.1.11.3.0.0.0 Description

API Gateway configuration for logging and tracing. Generates a unique Correlation ID for each request and ensures it is forwarded to downstream services via HTTP headers.

#### 1.1.11.4.0.0.0 Type

🔹 APIMonitoring

#### 1.1.11.5.0.0.0 Dependencies

*No items available*

#### 1.1.11.6.0.0.0 Properties

*No data available*

#### 1.1.11.7.0.0.0 Interfaces

*No items available*

#### 1.1.11.8.0.0.0 Technology

Amazon API Gateway, AWS CloudWatch Logs

#### 1.1.11.9.0.0.0 Resources

*No data available*

#### 1.1.11.10.0.0.0 Configuration

| Property | Value |
|----------|-------|
| Log Level | INFO |
| Log Format | JSON |
| Correlation Id Header | X-Correlation-ID |

#### 1.1.11.11.0.0.0 Health Check

*No data available*

#### 1.1.11.12.0.0.0 Responsible Features

- REQ-1-067: Structured logging with Correlation ID

#### 1.1.11.13.0.0.0 Security

*No data available*

### 1.1.12.0.0.0.0 Microservice

#### 1.1.12.1.0.0.0 Id

service-user-data-012

#### 1.1.12.2.0.0.0 Name

User & Data Service

#### 1.1.12.3.0.0.0 Description

A containerized microservice on AWS ECS that handles all core business logic and data persistence for users, custom modes, variables, and calculation history.

#### 1.1.12.4.0.0.0 Type

🔹 Microservice

#### 1.1.12.5.0.0.0 Dependencies

- data-persistence-postgres-014
- security-cognito-identity-016

#### 1.1.12.6.0.0.0 Properties

| Property | Value |
|----------|-------|
| Runtime | Node.js LTS |

#### 1.1.12.7.0.0.0 Interfaces

- RESTful API

#### 1.1.12.8.0.0.0 Technology

NestJS, TypeORM, Pino

#### 1.1.12.9.0.0.0 Resources

##### 1.1.12.9.1.0.0 Cpu

1 vCPU

##### 1.1.12.9.2.0.0 Memory

2GB

#### 1.1.12.10.0.0.0 Configuration

##### 1.1.12.10.1.0.0 Port

3000

#### 1.1.12.11.0.0.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 30 |
| Timeout | 5 |

#### 1.1.12.12.0.0.0 Responsible Features

- REQ-1-004: User account system backend logic
- REQ-1-015: Offline sync conflict resolution
- REQ-1-030: Secure data persistence
- REQ-1-061: Permanent data deletion on account removal
- REQ-1-069: Authoritative backend validation

#### 1.1.12.13.0.0.0 Security

##### 1.1.12.13.1.0.0 Requires Authentication

✅ Yes

##### 1.1.12.13.2.0.0 Requires Authorization

✅ Yes

### 1.1.13.0.0.0.0 ServerlessFunction

#### 1.1.13.1.0.0.0 Id

service-formula-execution-013

#### 1.1.13.2.0.0.0 Name

Formula Execution Service

#### 1.1.13.3.0.0.0 Description

A serverless function on AWS Lambda that executes user-defined formulas in a secure, isolated sandbox environment with strict resource and access controls.

#### 1.1.13.4.0.0.0 Type

🔹 ServerlessFunction

#### 1.1.13.5.0.0.0 Dependencies

*No items available*

#### 1.1.13.6.0.0.0 Properties

| Property | Value |
|----------|-------|
| Runtime | Node.js LTS |

#### 1.1.13.7.0.0.0 Interfaces

- Lambda Event Trigger

#### 1.1.13.8.0.0.0 Technology

AWS Lambda, isolated-vm

#### 1.1.13.9.0.0.0 Resources

##### 1.1.13.9.1.0.0 Memory

256MB

#### 1.1.13.10.0.0.0 Configuration

| Property | Value |
|----------|-------|
| Timeout | 500ms |
| Network Access | ❌ |
| Filesystem Access | ❌ |

#### 1.1.13.11.0.0.0 Health Check

*No data available*

#### 1.1.13.12.0.0.0 Responsible Features

- REQ-1-018: Secure sandbox execution
- REQ-1-019: Function and constant allow-list
- REQ-1-043: Formula execution performance

#### 1.1.13.13.0.0.0 Security

##### 1.1.13.13.1.0.0 Requires Authentication

✅ Yes

### 1.1.14.0.0.0.0 Database

#### 1.1.14.1.0.0.0 Id

data-persistence-postgres-014

#### 1.1.14.2.0.0.0 Name

PostgreSQL Database

#### 1.1.14.3.0.0.0 Description

The managed relational database (Amazon RDS) that stores all application data, configured for high availability, security, and reliability.

#### 1.1.14.4.0.0.0 Type

🔹 Database

#### 1.1.14.5.0.0.0 Dependencies

*No items available*

#### 1.1.14.6.0.0.0 Properties

| Property | Value |
|----------|-------|
| Engine Version | PostgreSQL 15+ |

#### 1.1.14.7.0.0.0 Interfaces

- SQL

#### 1.1.14.8.0.0.0 Technology

Amazon RDS for PostgreSQL

#### 1.1.14.9.0.0.0 Resources

##### 1.1.14.9.1.0.0 Storage

100GB

##### 1.1.14.9.2.0.0 Instance Class

db.t3.medium

#### 1.1.14.10.0.0.0 Configuration

| Property | Value |
|----------|-------|
| Multi Az | ✅ |
| Encryption At Rest | ✅ |
| Backup Retention Days | 14 |
| Point In Time Recovery | ✅ |

#### 1.1.14.11.0.0.0 Health Check

*No data available*

#### 1.1.14.12.0.0.0 Responsible Features

- REQ-1-044: Automated snapshots and PITR
- REQ-1-046: High availability (Multi-AZ)
- REQ-1-047: Encryption at rest
- REQ-1-058: users table schema
- REQ-1-059: custom_modes table schema
- REQ-1-060: user_variables table schema

#### 1.1.14.13.0.0.0 Security

*No data available*

### 1.1.15.0.0.0.0 IaC

#### 1.1.15.1.0.0.0 Id

devops-iac-terraform-015

#### 1.1.15.2.0.0.0 Name

Infrastructure as Code (IaC)

#### 1.1.15.3.0.0.0 Description

The collection of Terraform modules and scripts used to define, provision, and manage all cloud infrastructure resources in a version-controlled, automated manner.

#### 1.1.15.4.0.0.0 Type

🔹 IaC

#### 1.1.15.5.0.0.0 Dependencies

*No items available*

#### 1.1.15.6.0.0.0 Properties

*No data available*

#### 1.1.15.7.0.0.0 Interfaces

- Terraform CLI

#### 1.1.15.8.0.0.0 Technology

Terraform, HCL

#### 1.1.15.9.0.0.0 Resources

*No data available*

#### 1.1.15.10.0.0.0 Configuration

##### 1.1.15.10.1.0.0 Workspaces

- dev
- staging
- prod

#### 1.1.15.11.0.0.0 Health Check

*No data available*

#### 1.1.15.12.0.0.0 Responsible Features

- REQ-1-051: All infrastructure managed via Terraform
- REQ-1-065: Environment management with workspaces

#### 1.1.15.13.0.0.0 Security

*No data available*

### 1.1.16.0.0.0.0 IdentityProvider

#### 1.1.16.1.0.0.0 Id

security-cognito-identity-016

#### 1.1.16.2.0.0.0 Name

Identity & Access Management

#### 1.1.16.3.0.0.0 Description

The managed identity provider (AWS Cognito) responsible for user registration, authentication, session management, and issuing JWTs.

#### 1.1.16.4.0.0.0 Type

🔹 IdentityProvider

#### 1.1.16.5.0.0.0 Dependencies

*No items available*

#### 1.1.16.6.0.0.0 Properties

*No data available*

#### 1.1.16.7.0.0.0 Interfaces

- OAuth 2.0 API

#### 1.1.16.8.0.0.0 Technology

AWS Cognito

#### 1.1.16.9.0.0.0 Resources

*No data available*

#### 1.1.16.10.0.0.0 Configuration

##### 1.1.16.10.1.0.0 Auth Flow

Authorization Code with PKCE

##### 1.1.16.10.2.0.0 Password Policy

| Property | Value |
|----------|-------|
| Min Length | 12 |
| Require Uppercase | ✅ |
| Require Lowercase | ✅ |
| Require Numbers | ✅ |
| Require Symbols | ✅ |

#### 1.1.16.11.0.0.0 Health Check

*No data available*

#### 1.1.16.12.0.0.0 Responsible Features

- REQ-1-029: User authentication via Cognito
- REQ-1-039: OAuth 2.0 with PKCE
- REQ-1-071: Strong password policy

#### 1.1.16.13.0.0.0 Security

*No data available*

### 1.1.17.0.0.0.0 CI/CD

#### 1.1.17.1.0.0.0 Id

devops-cicd-pipeline-017

#### 1.1.17.2.0.0.0 Name

CI/CD Pipeline

#### 1.1.17.3.0.0.0 Description

The automated pipeline using GitHub Actions to build, test, scan, and deploy the application. It orchestrates the entire release process from code commit to production.

#### 1.1.17.4.0.0.0 Type

🔹 CI/CD

#### 1.1.17.5.0.0.0 Dependencies

- devops-iac-terraform-015

#### 1.1.17.6.0.0.0 Properties

*No data available*

#### 1.1.17.7.0.0.0 Interfaces

- Git push trigger

#### 1.1.17.8.0.0.0 Technology

GitHub Actions

#### 1.1.17.9.0.0.0 Resources

*No data available*

#### 1.1.17.10.0.0.0 Configuration

##### 1.1.17.10.1.0.0 Stages

- Lint & Test
- Security Scan (SAST, SCA, Container)
- Build
- Push to ECR
- Deploy

#### 1.1.17.11.0.0.0 Health Check

*No data available*

#### 1.1.17.12.0.0.0 Responsible Features

- REQ-1-048: Automated security scanning in pipeline
- REQ-1-063: CI/CD implemented with GitHub Actions
- REQ-1-064: Distinct pipeline stages
- REQ-1-072: Blue/Green deployment strategy

#### 1.1.17.13.0.0.0 Security

*No data available*

### 1.1.18.0.0.0.0 Security

#### 1.1.18.1.0.0.0 Id

devops-secrets-management-018

#### 1.1.18.2.0.0.0 Name

SecretsManagement

#### 1.1.18.3.0.0.0 Description

The centralized, secure storage for all application secrets like database credentials and API keys, preventing them from being stored in source code.

#### 1.1.18.4.0.0.0 Type

🔹 Security

#### 1.1.18.5.0.0.0 Dependencies

*No items available*

#### 1.1.18.6.0.0.0 Properties

*No data available*

#### 1.1.18.7.0.0.0 Interfaces

- AWS SDK

#### 1.1.18.8.0.0.0 Technology

AWS Secrets Manager

#### 1.1.18.9.0.0.0 Resources

*No data available*

#### 1.1.18.10.0.0.0 Configuration

##### 1.1.18.10.1.0.0 Rotation Policy

Enabled for database credentials

#### 1.1.18.11.0.0.0 Health Check

*No data available*

#### 1.1.18.12.0.0.0 Responsible Features

- REQ-1-066: Secure storage of secrets

#### 1.1.18.13.0.0.0 Security

*No data available*

## 1.2.0.0.0.0.0 Configuration

### 1.2.1.0.0.0.0 Environment

production

### 1.2.2.0.0.0.0 Logging Level

INFO

### 1.2.3.0.0.0.0 Feature Flags

#### 1.2.3.1.0.0.0 Enable New Dashboard

❌ No

#### 1.2.3.2.0.0.0 Enable Dark Theme

✅ Yes

### 1.2.4.0.0.0.0 Api Versioning

v1

# 2.0.0.0.0.0.0 Component Relations

## 2.1.0.0.0.0.0 Architecture

### 2.1.1.0.0.0.0 Components

#### 2.1.1.1.0.0.0 Frontend Component

##### 2.1.1.1.1.0.0 Id

component-client-calculator

##### 2.1.1.1.2.0.0 Name

CoreCalculatorUI

##### 2.1.1.1.3.0.0 Description

Handles the user interface and client-side logic for the core scientific calculator, including input parsing, arithmetic/trigonometric operations, history display, and angle mode switching.

##### 2.1.1.1.4.0.0 Type

🔹 Frontend Component

##### 2.1.1.1.5.0.0 Dependencies

- component-client-api
- component-client-state-manager

##### 2.1.1.1.6.0.0 Properties

| Property | Value |
|----------|-------|
| Framework | React 18+ |
| Language | TypeScript |

##### 2.1.1.1.7.0.0 Interfaces

- ICalculatorInput
- ICalculatorDisplay
- IHistoryPanel

##### 2.1.1.1.8.0.0 Technology

React, Material-UI

##### 2.1.1.1.9.0.0 Resources

| Property | Value |
|----------|-------|
| Cpu | N/A (Client-side) |
| Memory | N/A (Client-side) |
| Storage | Browser Cache |

##### 2.1.1.1.10.0.0 Configuration

*No data available*

##### 2.1.1.1.11.0.0 Health Check

*No data available*

##### 2.1.1.1.12.0.0 Responsible Features

- REQ-1-001
- REQ-1-021
- REQ-1-022
- REQ-1-023

##### 2.1.1.1.13.0.0 Security

###### 2.1.1.1.13.1.0 Requires Authentication

❌ No

###### 2.1.1.1.13.2.0 Requires Authorization

❌ No

#### 2.1.1.2.0.0.0 Frontend Component

##### 2.1.1.2.1.0.0 Id

component-client-custom-modes

##### 2.1.1.2.2.0.0 Name

CustomModeManagerUI

##### 2.1.1.2.3.0.0 Description

Provides the complete UI for user-defined modes, including the multi-step creation wizard, a management interface for viewing/editing/deleting, and the import/export functionality.

##### 2.1.1.2.4.0.0 Type

🔹 Frontend Component

##### 2.1.1.2.5.0.0 Dependencies

- component-client-api
- component-client-state-manager

##### 2.1.1.2.6.0.0 Properties

| Property | Value |
|----------|-------|
| Framework | React 18+ |
| Language | TypeScript |

##### 2.1.1.2.7.0.0 Interfaces

- ICustomModeWizard
- ICustomModeList
- IFileImportExport

##### 2.1.1.2.8.0.0 Technology

React, Material-UI, Redux Toolkit

##### 2.1.1.2.9.0.0 Resources

###### 2.1.1.2.9.1.0 Cpu

N/A (Client-side)

###### 2.1.1.2.9.2.0 Memory

N/A (Client-side)

##### 2.1.1.2.10.0.0 Configuration

*No data available*

##### 2.1.1.2.11.0.0 Health Check

*No data available*

##### 2.1.1.2.12.0.0 Responsible Features

- REQ-1-003
- REQ-1-008
- REQ-1-026
- REQ-1-028

##### 2.1.1.2.13.0.0 Security

###### 2.1.1.2.13.1.0 Requires Authentication

✅ Yes

###### 2.1.1.2.13.2.0 Requires Authorization

✅ Yes

###### 2.1.1.2.13.3.0 Allowed Roles

- AUTHENTICATED_USER

#### 2.1.1.3.0.0.0 Frontend Component

##### 2.1.1.3.1.0.0 Id

component-client-auth

##### 2.1.1.3.2.0.0 Name

UserAuthenticationUI

##### 2.1.1.3.3.0.0 Description

Manages all user-facing authentication screens and logic, including registration, login, session handling, and the user-initiated account deletion flow.

##### 2.1.1.3.4.0.0 Type

🔹 Frontend Component

##### 2.1.1.3.5.0.0 Dependencies

- component-client-api
- component-iam-cognito

##### 2.1.1.3.6.0.0 Properties

| Property | Value |
|----------|-------|
| Framework | React 18+ |
| Language | TypeScript |

##### 2.1.1.3.7.0.0 Interfaces

- IRegistrationForm
- ILoginForm
- IAccountDeletionModal

##### 2.1.1.3.8.0.0 Technology

React, AWS Amplify UI (or custom components)

##### 2.1.1.3.9.0.0 Resources

*No data available*

##### 2.1.1.3.10.0.0 Configuration

###### 2.1.1.3.10.1.0 Cognito User Pool Id

From environment config

###### 2.1.1.3.10.2.0 Cognito App Client Id

From environment config

##### 2.1.1.3.11.0.0 Health Check

*No data available*

##### 2.1.1.3.12.0.0 Responsible Features

- REQ-1-004
- REQ-1-031
- REQ-1-075

##### 2.1.1.3.13.0.0 Security

###### 2.1.1.3.13.1.0 Requires Authentication

❌ No

#### 2.1.1.4.0.0.0 Frontend Service

##### 2.1.1.4.1.0.0 Id

component-client-offline

##### 2.1.1.4.2.0.0 Name

OfflineSyncManager

##### 2.1.1.4.3.0.0 Description

A client-side service that intercepts data modification requests when offline, queues them in IndexedDB, and synchronizes them with the backend upon network restoration.

##### 2.1.1.4.4.0.0 Type

🔹 Frontend Service

##### 2.1.1.4.5.0.0 Dependencies

- component-client-api

##### 2.1.1.4.6.0.0 Properties

| Property | Value |
|----------|-------|
| Database | IndexedDB |

##### 2.1.1.4.7.0.0 Interfaces

- IOfflineQueue
- ISyncService

##### 2.1.1.4.8.0.0 Technology

TypeScript, IndexedDB API (e.g., using a library like `idb`)

##### 2.1.1.4.9.0.0 Resources

###### 2.1.1.4.9.1.0 Storage

Browser IndexedDB

##### 2.1.1.4.10.0.0 Configuration

###### 2.1.1.4.10.1.0 Sync Interval

300s

###### 2.1.1.4.10.2.0 Retry Policy

Exponential backoff

##### 2.1.1.4.11.0.0 Health Check

*No data available*

##### 2.1.1.4.12.0.0 Responsible Features

- REQ-1-014
- REQ-1-015

##### 2.1.1.4.13.0.0 Security

*No data available*

#### 2.1.1.5.0.0.0 Frontend Service

##### 2.1.1.5.1.0.0 Id

component-client-api

##### 2.1.1.5.2.0.0 Name

ApiServiceClient

##### 2.1.1.5.3.0.0 Description

A dedicated client-side module for all communication with the backend. It encapsulates API endpoints, manages JWTs in requests, and handles standard HTTP responses and errors.

##### 2.1.1.5.4.0.0 Type

🔹 Frontend Service

##### 2.1.1.5.5.0.0 Dependencies

*No items available*

##### 2.1.1.5.6.0.0 Properties

*No data available*

##### 2.1.1.5.7.0.0 Interfaces

- fetchUserData()
- saveCustomMode(mode)
- executeFormula(formula)

##### 2.1.1.5.8.0.0 Technology

TypeScript, Axios (or Fetch API)

##### 2.1.1.5.9.0.0 Resources

*No data available*

##### 2.1.1.5.10.0.0 Configuration

###### 2.1.1.5.10.1.0 Api Base Url

From environment config

##### 2.1.1.5.11.0.0 Health Check

*No data available*

##### 2.1.1.5.12.0.0 Responsible Features

- REQ-1-036

##### 2.1.1.5.13.0.0 Security

###### 2.1.1.5.13.1.0 Details

Automatically attaches the Cognito-issued JWT as a Bearer token to authenticated requests.

#### 2.1.1.6.0.0.0 API Gateway

##### 2.1.1.6.1.0.0 Id

component-gateway-router

##### 2.1.1.6.2.0.0 Name

APIGatewayRequestRouter

##### 2.1.1.6.3.0.0 Description

The routing configuration within Amazon API Gateway that directs incoming requests to the appropriate backend service based on the URL path and HTTP method.

##### 2.1.1.6.4.0.0 Type

🔹 API Gateway

##### 2.1.1.6.5.0.0 Dependencies

- component-uds-api-controller
- component-fes-handler

##### 2.1.1.6.6.0.0 Properties

*No data available*

##### 2.1.1.6.7.0.0 Interfaces

- REST API Definition (OpenAPI)

##### 2.1.1.6.8.0.0 Technology

Amazon API Gateway

##### 2.1.1.6.9.0.0 Resources

###### 2.1.1.6.9.1.0 Network

Managed by AWS

##### 2.1.1.6.10.0.0 Configuration

###### 2.1.1.6.10.1.0 Routes

- { path: '/users/{proxy+}', target: 'UserDataService' }
- { path: '/modes/{proxy+}', target: 'UserDataService' }
- { path: '/execute-formula', target: 'FormulaExecutionService' }

##### 2.1.1.6.11.0.0 Health Check

*No data available*

##### 2.1.1.6.12.0.0 Responsible Features

- REQ-1-036
- REQ-1-054

##### 2.1.1.6.13.0.0 Security

*No data available*

#### 2.1.1.7.0.0.0 API Gateway

##### 2.1.1.7.1.0.0 Id

component-gateway-auth

##### 2.1.1.7.2.0.0 Name

APIGatewayJWTAuthorizer

##### 2.1.1.7.3.0.0 Description

A managed authorizer within Amazon API Gateway configured to validate JWTs issued by the AWS Cognito user pool before forwarding requests to protected backend endpoints.

##### 2.1.1.7.4.0.0 Type

🔹 API Gateway

##### 2.1.1.7.5.0.0 Dependencies

- component-iam-cognito

##### 2.1.1.7.6.0.0 Properties

*No data available*

##### 2.1.1.7.7.0.0 Interfaces

*No items available*

##### 2.1.1.7.8.0.0 Technology

Amazon API Gateway, AWS Cognito

##### 2.1.1.7.9.0.0 Resources

*No data available*

##### 2.1.1.7.10.0.0 Configuration

###### 2.1.1.7.10.1.0 Authorizer Type

COGNITO_USER_POOLS

###### 2.1.1.7.10.2.0 Identity Source

$request.header.Authorization

##### 2.1.1.7.11.0.0 Health Check

*No data available*

##### 2.1.1.7.12.0.0 Responsible Features

- REQ-1-040

##### 2.1.1.7.13.0.0 Security

###### 2.1.1.7.13.1.0 Details

Acts as the primary gatekeeper for the backend API, enforcing authentication.

#### 2.1.1.8.0.0.0 Controller

##### 2.1.1.8.1.0.0 Id

component-uds-api-controller

##### 2.1.1.8.2.0.0 Name

UserDataServiceController

##### 2.1.1.8.3.0.0 Description

The controller layer of the User & Data Service, implemented in NestJS. It defines RESTful API endpoints, handles request/response serialization, and delegates business logic to service components.

##### 2.1.1.8.4.0.0 Type

🔹 Controller

##### 2.1.1.8.5.0.0 Dependencies

- component-uds-business-logic

##### 2.1.1.8.6.0.0 Properties

| Property | Value |
|----------|-------|
| Framework | NestJS |

##### 2.1.1.8.7.0.0 Interfaces

- REST API (OpenAPI 3.0)

##### 2.1.1.8.8.0.0 Technology

Node.js, NestJS

##### 2.1.1.8.9.0.0 Resources

###### 2.1.1.8.9.1.0 Cpu

0.5 vCPU

###### 2.1.1.8.9.2.0 Memory

1GB

##### 2.1.1.8.10.0.0 Configuration

*No data available*

##### 2.1.1.8.11.0.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 30 |
| Timeout | 5 |

##### 2.1.1.8.12.0.0 Responsible Features

- REQ-1-030
- REQ-1-069
- REQ-1-100

##### 2.1.1.8.13.0.0 Security

###### 2.1.1.8.13.1.0 Requires Authentication

✅ Yes

###### 2.1.1.8.13.2.0 Requires Authorization

✅ Yes

#### 2.1.1.9.0.0.0 Service

##### 2.1.1.9.1.0.0 Id

component-uds-business-logic

##### 2.1.1.9.2.0.0 Name

UserDataServiceLogic

##### 2.1.1.9.3.0.0 Description

The service layer containing the core business logic for managing users, custom modes, and variables. It enforces business rules and orchestrates data operations.

##### 2.1.1.9.4.0.0 Type

🔹 Service

##### 2.1.1.9.5.0.0 Dependencies

- component-uds-data-access

##### 2.1.1.9.6.0.0 Properties

| Property | Value |
|----------|-------|
| Framework | NestJS |

##### 2.1.1.9.7.0.0 Interfaces

- IUserService
- ICustomModeService

##### 2.1.1.9.8.0.0 Technology

Node.js, NestJS

##### 2.1.1.9.9.0.0 Resources

*No data available*

##### 2.1.1.9.10.0.0 Configuration

*No data available*

##### 2.1.1.9.11.0.0 Health Check

*No data available*

##### 2.1.1.9.12.0.0 Responsible Features

- REQ-1-015
- REQ-1-061
- REQ-1-070

##### 2.1.1.9.13.0.0 Security

*No data available*

#### 2.1.1.10.0.0.0 Repository

##### 2.1.1.10.1.0.0 Id

component-uds-data-access

##### 2.1.1.10.2.0.0 Name

UserDataServiceRepository

##### 2.1.1.10.3.0.0 Description

The data access layer (Repository Pattern) that abstracts all interactions with the PostgreSQL database. It handles querying, data mapping, and transaction management.

##### 2.1.1.10.4.0.0 Type

🔹 Repository

##### 2.1.1.10.5.0.0 Dependencies

- component-db-postgres

##### 2.1.1.10.6.0.0 Properties

| Property | Value |
|----------|-------|
| Orm | TypeORM |

##### 2.1.1.10.7.0.0 Interfaces

- IUserRepository
- ICustomModeRepository

##### 2.1.1.10.8.0.0 Technology

Node.js, NestJS, TypeORM

##### 2.1.1.10.9.0.0 Resources

*No data available*

##### 2.1.1.10.10.0.0 Configuration

###### 2.1.1.10.10.1.0 Database Url

From AWS Secrets Manager

###### 2.1.1.10.10.2.0 Connection Pool Size

10

##### 2.1.1.10.11.0.0 Health Check

*No data available*

##### 2.1.1.10.12.0.0 Responsible Features

- REQ-1-058
- REQ-1-059
- REQ-1-060

##### 2.1.1.10.13.0.0 Security

*No data available*

#### 2.1.1.11.0.0.0 Serverless Function

##### 2.1.1.11.1.0.0 Id

component-fes-handler

##### 2.1.1.11.2.0.0 Name

FormulaExecutionLambdaHandler

##### 2.1.1.11.3.0.0 Description

The entry point for the AWS Lambda function. It parses the incoming event from API Gateway, validates the payload, invokes the sandbox manager, and formats the response.

##### 2.1.1.11.4.0.0 Type

🔹 Serverless Function

##### 2.1.1.11.5.0.0 Dependencies

- component-fes-sandbox

##### 2.1.1.11.6.0.0 Properties

| Property | Value |
|----------|-------|
| Runtime | Node.js LTS |

##### 2.1.1.11.7.0.0 Interfaces

- AWS Lambda Event Handler

##### 2.1.1.11.8.0.0 Technology

AWS Lambda, Node.js

##### 2.1.1.11.9.0.0 Resources

###### 2.1.1.11.9.1.0 Cpu

Dynamic (AWS Managed)

###### 2.1.1.11.9.2.0 Memory

256MB

##### 2.1.1.11.10.0.0 Configuration

###### 2.1.1.11.10.1.0 Timeout

5s

##### 2.1.1.11.11.0.0 Health Check

*No data available*

##### 2.1.1.11.12.0.0 Responsible Features

- REQ-1-053

##### 2.1.1.11.13.0.0 Security

*No data available*

#### 2.1.1.12.0.0.0 Service

##### 2.1.1.12.1.0.0 Id

component-fes-sandbox

##### 2.1.1.12.2.0.0 Name

SecureFormulaSandbox

##### 2.1.1.12.3.0.0 Description

The core component of the Formula Execution Service. It creates a secure, isolated V8 environment using `isolated-vm` to execute user-defined formulas with strict resource limits and a function allow-list.

##### 2.1.1.12.4.0.0 Type

🔹 Service

##### 2.1.1.12.5.0.0 Dependencies

*No items available*

##### 2.1.1.12.6.0.0 Properties

*No data available*

##### 2.1.1.12.7.0.0 Interfaces

- execute(formula, context)

##### 2.1.1.12.8.0.0 Technology

Node.js, isolated-vm

##### 2.1.1.12.9.0.0 Resources

*No data available*

##### 2.1.1.12.10.0.0 Configuration

###### 2.1.1.12.10.1.0 Execution Timeout

500ms

###### 2.1.1.12.10.2.0 Max Memory

64MB

###### 2.1.1.12.10.3.0 Allowed Functions

- sin
- cos
- tan
- asin
- acos
- atan
- log
- ln
- exp
- sqrt

###### 2.1.1.12.10.4.0 Allowed Constants

- pi
- e
- k
- e_charge

##### 2.1.1.12.11.0.0 Health Check

*No data available*

##### 2.1.1.12.12.0.0 Responsible Features

- REQ-1-018
- REQ-1-019
- REQ-1-043

##### 2.1.1.12.13.0.0 Security

###### 2.1.1.12.13.1.0 Details

Primary security boundary for untrusted code execution. No network or filesystem access.

#### 2.1.1.13.0.0.0 Managed Service

##### 2.1.1.13.1.0.0 Id

component-iam-cognito

##### 2.1.1.13.2.0.0 Name

CognitoIdentityService

##### 2.1.1.13.3.0.0 Description

The managed AWS Cognito User Pool responsible for all user identity and access management, including registration, authentication (OAuth 2.0 with PKCE), and JWT issuance.

##### 2.1.1.13.4.0.0 Type

🔹 Managed Service

##### 2.1.1.13.5.0.0 Dependencies

*No items available*

##### 2.1.1.13.6.0.0 Properties

*No data available*

##### 2.1.1.13.7.0.0 Interfaces

- OAuth 2.0 Endpoints
- Cognito User Pool API

##### 2.1.1.13.8.0.0 Technology

AWS Cognito

##### 2.1.1.13.9.0.0 Resources

###### 2.1.1.13.9.1.0 All

Managed by AWS

##### 2.1.1.13.10.0.0 Configuration

| Property | Value |
|----------|-------|
| Password Policy | min 12 chars; 1 upper, 1 lower, 1 number, 1 specia... |
| Mfa Configuration | Off |
| Oauth Flows | Authorization Code Grant with PKCE |

##### 2.1.1.13.11.0.0 Health Check

*No data available*

##### 2.1.1.13.12.0.0 Responsible Features

- REQ-1-029
- REQ-1-039
- REQ-1-071

##### 2.1.1.13.13.0.0 Security

###### 2.1.1.13.13.1.0 Details

Central authority for application authentication and identity.

#### 2.1.1.14.0.0.0 Database

##### 2.1.1.14.1.0.0 Id

component-db-postgres

##### 2.1.1.14.2.0.0 Name

ApplicationDatabase

##### 2.1.1.14.3.0.0 Description

The managed PostgreSQL database instance on Amazon RDS. It provides persistent storage for all application data and is configured for high availability, backups, and encryption.

##### 2.1.1.14.4.0.0 Type

🔹 Database

##### 2.1.1.14.5.0.0 Dependencies

*No items available*

##### 2.1.1.14.6.0.0 Properties

| Property | Value |
|----------|-------|
| Engine | PostgreSQL 15+ |

##### 2.1.1.14.7.0.0 Interfaces

- SQL

##### 2.1.1.14.8.0.0 Technology

Amazon RDS for PostgreSQL

##### 2.1.1.14.9.0.0 Resources

| Property | Value |
|----------|-------|
| Cpu | 2 vCPU |
| Memory | 8GB |
| Storage | 100GB (auto-scaling) |

##### 2.1.1.14.10.0.0 Configuration

| Property | Value |
|----------|-------|
| Multi Az | true |
| Storage Encrypted | true (using AWS KMS) |
| Backup Retention Period | 14 days |
| Point In Time Recovery | enabled |

##### 2.1.1.14.11.0.0 Health Check

*No data available*

##### 2.1.1.14.12.0.0 Responsible Features

- REQ-1-044
- REQ-1-046
- REQ-1-047

##### 2.1.1.14.13.0.0 Security

*No data available*

#### 2.1.1.15.0.0.0 DevOps

##### 2.1.1.15.1.0.0 Id

component-cicd-github-actions

##### 2.1.1.15.2.0.0 Name

CI/CDPipeline

##### 2.1.1.15.3.0.0 Description

The automated CI/CD pipeline defined in GitHub Actions. It triggers on code push to lint, test, perform security scans, build artifacts, and deploy infrastructure and application updates.

##### 2.1.1.15.4.0.0 Type

🔹 DevOps

##### 2.1.1.15.5.0.0 Dependencies

- component-iac-terraform
- component-container-docker

##### 2.1.1.15.6.0.0 Properties

*No data available*

##### 2.1.1.15.7.0.0 Interfaces

*No items available*

##### 2.1.1.15.8.0.0 Technology

GitHub Actions, YAML

##### 2.1.1.15.9.0.0 Resources

*No data available*

##### 2.1.1.15.10.0.0 Configuration

###### 2.1.1.15.10.1.0 Stages

- Lint & Test
- Security Scan (SAST, SCA, Container)
- Build
- Push to ECR
- Deploy (Terraform Apply)

###### 2.1.1.15.10.2.0 Deployment Strategy

Blue/Green

##### 2.1.1.15.11.0.0 Health Check

*No data available*

##### 2.1.1.15.12.0.0 Responsible Features

- REQ-1-048
- REQ-1-063
- REQ-1-064
- REQ-1-072

##### 2.1.1.15.13.0.0 Security

###### 2.1.1.15.13.1.0 Details

Integrates automated security scanning tools to prevent deployment of vulnerable code.

#### 2.1.1.16.0.0.0 DevOps

##### 2.1.1.16.1.0.0 Id

component-iac-terraform

##### 2.1.1.16.2.0.0 Name

InfrastructureAsCode

##### 2.1.1.16.3.0.0 Description

The collection of Terraform scripts that define and manage all AWS cloud infrastructure resources, enabling version-controlled, automated, and repeatable environment provisioning.

##### 2.1.1.16.4.0.0 Type

🔹 DevOps

##### 2.1.1.16.5.0.0 Dependencies

*No items available*

##### 2.1.1.16.6.0.0 Properties

*No data available*

##### 2.1.1.16.7.0.0 Interfaces

*No items available*

##### 2.1.1.16.8.0.0 Technology

Terraform, HCL

##### 2.1.1.16.9.0.0 Resources

*No data available*

##### 2.1.1.16.10.0.0 Configuration

###### 2.1.1.16.10.1.0 Provider

AWS

###### 2.1.1.16.10.2.0 Backend

S3 with DynamoDB for state locking

###### 2.1.1.16.10.3.0 Workspaces

- dev
- staging
- prod

##### 2.1.1.16.11.0.0 Health Check

*No data available*

##### 2.1.1.16.12.0.0 Responsible Features

- REQ-1-051
- REQ-1-057
- REQ-1-065

##### 2.1.1.16.13.0.0 Security

###### 2.1.1.16.13.1.0 Details

Integrates with AWS Secrets Manager to avoid hardcoding secrets in configuration files, as per REQ-1-066.

### 2.1.2.0.0.0.0 Configuration

| Property | Value |
|----------|-------|
| Environment | production |
| Logging Level | INFO |
| Correlation Id Header | X-Correlation-ID |
| Observability Provider | Amazon CloudWatch |

