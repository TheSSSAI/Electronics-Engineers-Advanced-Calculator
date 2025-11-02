# 1 Style

CloudNative

# 2 Patterns

## 2.1 Microservices

### 2.1.1 Name

Microservices

### 2.1.2 Description

The backend is decomposed into small, independent services. A core 'User & Data Service' handles persistent data and business logic, while a separate 'Formula Execution Service' handles computationally intensive, isolated tasks.

### 2.1.3 Benefits

- Independent deployment and scaling of services.
- Improved fault isolation; an issue in one service does not take down the entire application.
- Technology diversity; allows using the best tool for the job (e.g., ECS for stateful services, Lambda for ephemeral tasks).
- Clear ownership boundaries for development teams.

### 2.1.4 Tradeoffs

- Increased operational complexity in deployment and monitoring.
- Challenges with distributed data management and consistency.
- Requires robust inter-service communication and service discovery mechanisms.

## 2.2.0 Serverless (FaaS)

### 2.2.1 Name

Serverless (FaaS)

### 2.2.2 Description

The user-defined formula execution is implemented as a serverless AWS Lambda function. This component is event-driven, stateless, and ephemeral, triggered only when a formula needs to be calculated.

### 2.2.3 Benefits

- Automatic scaling based on demand.
- Reduced operational overhead; no servers to manage.
- Pay-per-use cost model, which is efficient for sporadic workloads.
- Enhanced security through a highly isolated execution environment.

### 2.2.4 Tradeoffs

- Potential for 'cold start' latency on the first invocation.
- Limited execution duration and resource constraints.
- Vendor lock-in to the specific cloud provider's serverless platform.

## 2.3.0 API Gateway

### 2.3.1 Name

API Gateway

### 2.3.2 Description

An Amazon API Gateway serves as the single entry point for the frontend client. It routes requests to the appropriate backend microservice or serverless function.

### 2.3.3 Benefits

- Decouples clients from backend services, simplifying client-side code.
- Centralizes cross-cutting concerns like authentication (JWT validation), rate limiting, logging, and monitoring.
- Provides a unified and consistent API to consumers, even with a distributed backend.

### 2.3.4 Tradeoffs

- Can become a single point of failure if not configured for high availability.
- Adds a potential performance bottleneck if not managed correctly.
- Can increase complexity in configuration and management.

## 2.4.0 Infrastructure as Code (IaC)

### 2.4.1 Name

Infrastructure as Code (IaC)

### 2.4.2 Description

All cloud infrastructure resources (ECS services, Lambda functions, RDS databases, etc.) are defined and managed using Terraform. This enables automated, version-controlled, and repeatable environment provisioning.

### 2.4.3 Benefits

- Enables automation of infrastructure deployment and updates.
- Increases consistency and reduces human error across environments (dev, staging, prod).
- Provides version control for infrastructure changes, allowing for audits and rollbacks.

### 2.4.4 Tradeoffs

- Requires specialized skills in the chosen IaC tool (Terraform).
- Can have a steep initial learning curve.
- Managing state files requires careful planning to avoid corruption or conflicts.

# 3.0.0 Layers

## 3.1.0 Presentation

### 3.1.1 Id

layer_presentation

### 3.1.2 Name

Client SPA (Presentation)

### 3.1.3 Description

The user-facing Single Page Application built with React, responsible for rendering the UI, managing client-side state, and communicating with the backend API. It includes offline capabilities.

### 3.1.4 Technologystack

React 18+, TypeScript, Vite, Redux Toolkit, Material-UI, Styled-components, Jest, React Testing Library, Cypress, IndexedDB

### 3.1.5 Language

TypeScript

### 3.1.6 Type

🔹 Presentation

### 3.1.7 Responsibilities

- Render all user interface components for the calculator, modes, and user management.
- Manage client-side state, including UI state and cached user data.
- Handle user authentication flow with AWS Cognito (OAuth 2.0 with PKCE).
- Implement offline data modification queuing using IndexedDB (REQ-1-014).
- Synchronize local offline data with the backend upon network restoration.
- Enforce WCAG 2.1 Level AA accessibility standards (REQ-1-034).
- Provide an entry point to the in-app help system (REQ-1-038).

### 3.1.8 Components

- CoreCalculatorUI
- ElectronicsModesUI
- CustomModeManagerUI
- UserAccountUI
- OfflineSyncManager
- ApiServiceClient

### 3.1.9 Dependencies

- {'layerId': 'layer_api_gateway', 'type': 'Required'}

## 3.2.0 APIGateway

### 3.2.1 Id

layer_api_gateway

### 3.2.2 Name

API Gateway

### 3.2.3 Description

A managed service (Amazon API Gateway) that acts as the single entry point for all API requests from the client. It handles routing, authentication, and other cross-cutting concerns.

### 3.2.4 Technologystack

Amazon API Gateway

### 3.2.5 Language

N/A

### 3.2.6 Type

🔹 APIGateway

### 3.2.7 Responsibilities

- Route incoming HTTP requests to the appropriate backend service (UserData Service or FormulaExecution Service).
- Validate JSON Web Tokens (JWTs) issued by AWS Cognito to protect API endpoints (REQ-1-103).
- Generate a Correlation ID for each request and propagate it to downstream services for distributed tracing.
- Enforce rate limiting and throttling policies to protect backend services.
- Log all API requests and responses for monitoring and auditing purposes.

### 3.2.8 Components

- Request Router
- JWT Authorizer
- Logging and Monitoring Integration

### 3.2.9 Dependencies

#### 3.2.9.1 Required

##### 3.2.9.1.1 Layer Id

layer_app_userdata

##### 3.2.9.1.2 Type

🔹 Required

#### 3.2.9.2.0 Required

##### 3.2.9.2.1 Layer Id

layer_app_formulaexec

##### 3.2.9.2.2 Type

🔹 Required

#### 3.2.9.3.0 Required

##### 3.2.9.3.1 Layer Id

layer_security_identity

##### 3.2.9.3.2 Type

🔹 Required

## 3.3.0.0.0 ApplicationServices

### 3.3.1.0.0 Id

layer_app_userdata

### 3.3.2.0.0 Name

User & Data Service

### 3.3.3.0.0 Description

A containerized microservice running on AWS ECS that manages all core business logic and data persistence for users, custom modes, variables, and calculation history.

### 3.3.4.0.0 Technologystack

Node.js (LTS), NestJS, TypeORM, Pino, Jest, Supertest

### 3.3.5.0.0 Language

TypeScript

### 3.3.6.0.0 Type

🔹 ApplicationServices

### 3.3.7.0.0 Responsibilities

- Provide a RESTful API for CRUD operations on users, custom modes, variables, and history.
- Enforce all business rules and perform authoritative data validation on incoming requests (REQ-1-069).
- Interact with the PostgreSQL database via a data access layer.
- Handle conflict resolution logic for offline data synchronization (REQ-1-078).
- Implement the logic for permanent user data deletion (REQ-1-061).
- Generate OpenAPI 3.0 specification from source code annotations (REQ-1-100).

### 3.3.8.0.0 Components

- UserController
- CustomModeController
- UserVariableController
- BusinessLogicServices
- DataAccessRepositories

### 3.3.9.0.0 Dependencies

- {'layerId': 'layer_data_access', 'type': 'Required'}

## 3.4.0.0.0 ApplicationServices

### 3.4.1.0.0 Id

layer_app_formulaexec

### 3.4.2.0.0 Name

Formula Execution Service

### 3.4.3.0.0 Description

A secure, serverless AWS Lambda function responsible for executing user-defined formulas in an isolated sandbox environment.

### 3.4.4.0.0 Technologystack

AWS Lambda, Node.js (LTS), isolated-vm

### 3.4.5.0.0 Language

JavaScript

### 3.4.6.0.0 Type

🔹 ApplicationServices

### 3.4.7.0.0 Responsibilities

- Receive formula strings and input variables via an API Gateway trigger.
- Execute the formula within a secure `isolated-vm` sandbox (REQ-1-018).
- Enforce strict resource limits on execution time and memory.
- Enforce a strict allow-list of callable functions and accessible constants (REQ-1-082).
- Prevent any network or filesystem access from within the sandbox.
- Return the calculated result or an error message.

### 3.4.8.0.0 Components

- LambdaHandler
- SandboxManager
- FunctionAllowListValidator

### 3.4.9.0.0 Dependencies

*No items available*

## 3.5.0.0.0 DataAccess

### 3.5.1.0.0 Id

layer_data_access

### 3.5.2.0.0 Name

Persistence Layer

### 3.5.3.0.0 Description

The relational database that stores all application data. It is a managed service to ensure reliability, scalability, and security.

### 3.5.4.0.0 Technologystack

Amazon RDS for PostgreSQL (v15+)

### 3.5.5.0.0 Language

SQL

### 3.5.6.0.0 Type

🔹 DataAccess

### 3.5.7.0.0 Responsibilities

- Store and retrieve user-specific data, including accounts, custom modes, variables, and history.
- Ensure data integrity through constraints, primary keys, and foreign keys.
- Provide automated daily snapshots and Point-In-Time Recovery (PITR) (REQ-1-044).
- Encrypt all data at rest using AWS KMS (REQ-1-047).
- Operate in a Multi-AZ configuration for high availability (REQ-1-046).

### 3.5.8.0.0 Components

- Users Table
- CustomModes Table
- UserVariables Table
- CalculationHistory Table

### 3.5.9.0.0 Dependencies

*No items available*

## 3.6.0.0.0 Security

### 3.6.1.0.0 Id

layer_security_identity

### 3.6.2.0.0 Name

Identity & Access Management

### 3.6.3.0.0 Description

A managed service responsible for all user identity operations, including authentication and authorization.

### 3.6.4.0.0 Technologystack

AWS Cognito

### 3.6.5.0.0 Language

N/A

### 3.6.6.0.0 Type

🔹 Security

### 3.6.7.0.0 Responsibilities

- Manage user registration, login, and session lifecycle (REQ-1-029).
- Enforce strong password policies as defined in the requirements (REQ-1-134).
- Issue JSON Web Tokens (JWTs) upon successful authentication.
- Implement the OAuth 2.0 Authorization Code flow with PKCE for secure client interaction (REQ-1-102).

### 3.6.8.0.0 Components

- Cognito User Pool
- Cognito Identity Pool (if needed for AWS resource access)

### 3.6.9.0.0 Dependencies

*No items available*

## 3.7.0.0.0 Infrastructure

### 3.7.1.0.0 Id

layer_infrastructure_devops

### 3.7.2.0.0 Name

Infrastructure & DevOps

### 3.7.3.0.0 Description

The collection of tools and services that define, deploy, and manage the application's infrastructure and lifecycle.

### 3.7.4.0.0 Technologystack

Terraform, Docker, AWS ECS (Fargate), GitHub Actions, AWS Secrets Manager, Amazon CloudWatch

### 3.7.5.0.0 Language

HCL, YAML

### 3.7.6.0.0 Type

🔹 Infrastructure

### 3.7.7.0.0 Responsibilities

- Define all cloud infrastructure as code using Terraform (REQ-1-051).
- Containerize backend services using Docker.
- Implement and manage a CI/CD pipeline using GitHub Actions (REQ-1-063).
- Automate testing, security scanning (SAST, SCA, container scanning), and deployment (REQ-1-048).
- Manage application secrets securely using AWS Secrets Manager (REQ-1-066).
- Configure structured logging, monitoring, and alerting using CloudWatch (REQ-1-067, REQ-1-068).

### 3.7.8.0.0 Components

- Terraform Scripts
- GitHub Actions Workflows
- Dockerfiles
- CloudWatch Alarms & Dashboards

### 3.7.9.0.0 Dependencies

*No items available*

