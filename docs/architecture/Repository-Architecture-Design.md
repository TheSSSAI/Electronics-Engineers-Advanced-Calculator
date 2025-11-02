# Web-Based Scientific & Electronics Calculator - Enterprise Architecture Documentation

## Executive Summary
This document outlines the enterprise architecture for the Web-Based Scientific & Electronics Calculator, a comprehensive cloud-native platform. The solution provides a core scientific calculator, specialized electronics modules, and a user-extensible framework for creating custom calculation modes, all supported by a robust user account system for data persistence.

The architecture is a **Hybrid Microservices/Serverless model hosted entirely on Amazon Web Services (AWS)**. The primary technology stack is TypeScript-centric, leveraging **React** for the frontend Single Page Application (SPA) and **NestJS** for the primary backend microservice. This consistency streamlines development and fosters a cohesive engineering culture.

Key architectural decisions include:
1.  **Security-First Design**: Untrusted user-defined code is executed in a highly secure, isolated **AWS Lambda sandbox** using `isolated-vm`, with no network or filesystem access, mitigating significant security risks.
2.  **Decoupled Poly-Repo Structure**: The system is decomposed into multiple, single-responsibility repositories for applications, reusable libraries (UI, domain logic), and infrastructure. This strategy enables independent development, testing, and deployment, maximizing team autonomy and accelerating delivery cycles.
3.  **Managed Services for Reliability**: The architecture heavily relies on managed AWS services, including **ECS Fargate, RDS for PostgreSQL, and Cognito**, to reduce operational overhead and ensure high availability, scalability, and security.

The business value of this architecture lies in its ability to deliver a secure, highly performant, and scalable platform. The extensible framework for custom modes provides a key competitive differentiator, while the decoupled repository structure ensures the system is maintainable and can evolve efficiently over time.

## Solution Architecture Overview

*   **Technology Stack**: The system employs a modern, end-to-end TypeScript stack. The frontend is built with **React**, Vite, and Redux Toolkit, with a component library based on **Material-UI**. The primary backend service uses **NestJS** on Node.js, with **TypeORM** for data access to a **PostgreSQL** database. The secure formula execution component is an **AWS Lambda** function.

*   **Architectural Patterns**: 
    *   **Hybrid Microservices/Serverless**: A containerized NestJS microservice on **ECS Fargate** handles core business logic, while a stateless, event-driven **AWS Lambda** function manages the high-security task of code execution.
    *   **API Gateway**: **Amazon API Gateway** serves as the single, managed entry point for the frontend client. It centralizes request routing, JWT validation, rate limiting, and the generation of Correlation IDs for distributed tracing.
    *   **Infrastructure as Code (IaC)**: The entire cloud infrastructure is defined declaratively using **Terraform**, enabling automated, version-controlled, and repeatable environment provisioning.

*   **Integration Approach**: Communication between the client and backend is exclusively through a versioned **RESTful API (`/api/v1`) over HTTPS**, with JSON as the data format. User authentication is managed by **AWS Cognito** using the **OAuth 2.0 Authorization Code flow with PKCE**, with access to protected endpoints controlled by JWT Bearer tokens.

## Repository Architecture Strategy

The project has been strategically decomposed from a monolithic concept into a **poly-repo architecture** to foster modularity, reusability, and independent delivery.

*   **Decomposition Rationale**: The core principle was to separate concerns based on domain, technical function, and release cadence. This led to the extraction of:
    *   **Reusable Libraries**: A `ui-components-library` for complex React features, a `calculator-domain-logic` library for pure business rules, and a `shared-api-contracts` library for type safety.
    *   **Application Shells**: The `frontend-app` and `user-data-service` repositories are now leaner, focusing on orchestration and integration rather than low-level implementation.
    *   **Cross-Cutting Concerns**: Infrastructure (`infrastructure-as-code`) and documentation (`docs-site`) are managed in dedicated repositories, decoupling their lifecycles from application code.

*   **Optimization Benefits**: This structure significantly improves the development workflow by allowing teams to work in parallel on different components. For example, the UI components team can release a new version of the library independently of the backend or frontend application shell. This reduces cognitive load, minimizes deployment risk, and accelerates the delivery of new features.

## System Architecture Diagrams

### Runtime Component & Integration Architecture
This diagram illustrates the runtime components of the system and the flow of communication for a typical user request. It shows the clear boundaries between the client, the API facade, the backend services, and the data/identity providers.


### Repository Dependency Architecture
This diagram shows the compile-time dependencies between the different repositories in the poly-repo structure. It visualizes the architectural layers and how reusable libraries are consumed by the main application repositories, enforcing a clean and manageable dependency graph.


## Repository Catalog

| Repository ID             | Name                       | Description                                                                                                                                                                                                                         |
| ------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **REPO-APP-FRONTEND**     | `frontend-app`             | The main React SPA shell. Responsible for routing, global state management (Redux), and composing the UI from the `ui-components-library`.                                                                                     |
| **REPO-LIB-UI-COMPONENTS**| `ui-components-library`    | A reusable React component library containing all specialized calculator UIs (Ohm's Law, 555 Timer, Custom Mode Builder). Developed in isolation with Storybook.                                                               |
| **REPO-LIB-FRONTEND-UTILS**| `frontend-utils`           | A framework-agnostic utility library containing the client-side Offline Synchronization Manager and other shared helpers.                                                                                                         |
| **REPO-APP-USER-DATA**    | `user-data-service`        | The primary NestJS backend microservice. Manages all user data, custom modes, and business logic. Interacts with the database and orchestrates calls to other services.                                                               |
| **REPO-LIB-DOMAIN-LOGIC** | `calculator-domain-logic`  | A pure TypeScript library containing the core mathematical algorithms and validation rules for the pre-defined electronics modes. Has zero external dependencies.                                                                   |
| **REPO-APP-FORMULA-EXEC** | `formula-execution-service`| A highly secure AWS Lambda function for executing untrusted user-defined formulas in an isolated sandbox (`isolated-vm`).                                                                                                      |
| **REPO-LIB-API-CONTRACTS**| `shared-api-contracts`     | A lightweight TypeScript library containing only DTOs and type definitions for the API contract, ensuring end-to-end type safety between the frontend and backend.                                                               |
| **REPO-INFRA-TERRAFORM**  | `infrastructure-as-code`   | Contains all Terraform code to define and manage the entire AWS infrastructure, enabling automated and repeatable environment creation.                                                                                       |
| **REPO-APP-DOCS**         | `docs-site`                | A standalone Docusaurus project for all user-facing help content. Built and deployed as a static site, independent of the main application releases.                                                                          |
| **REPO-LIB-BUILD-CONFIG** | `shared-build-config`      | A configuration repository that centralizes shared ESLint, Prettier, and TypeScript settings to enforce consistent code quality across all projects.                                                                               |


## Integration Architecture

The system's components are integrated through a well-defined, secure, and versioned REST API.

*   **Primary Interface**: A RESTful API served via **Amazon API Gateway**. All communication is over **HTTPS (TLS 1.2 minimum)** using standard HTTP verbs. The API is versioned in the URL path (e.g., `/api/v1`).

*   **Data Format**: All API request and response bodies use the **JSON** format.

*   **API Contract**: The `shared-api-contracts` repository provides a single source of truth for all Data Transfer Objects (DTOs) using TypeScript interfaces. This ensures compile-time type safety between the React client and the NestJS backend.

*   **Authentication**: User authentication is handled by **AWS Cognito** using the **OAuth 2.0 Authorization Code flow with PKCE**. The client receives a **JWT Bearer token** upon successful login. This token must be included in the `Authorization` header for all subsequent requests to protected API endpoints. The API Gateway is configured with a Cognito authorizer to validate these tokens automatically.

## Technology Implementation Framework

*   **Frontend (React)**: The application follows modern React best practices with functional components and hooks. Global state is managed centrally with **Redux Toolkit**, and asynchronous operations are handled via RTK Query or thunks. Component logic is kept separate from the application shell by leveraging the `ui-components-library`.

*   **Backend (NestJS)**: The backend is built using NestJS's modular architecture, with features organized into distinct modules (e.g., `UsersModule`, `CustomModesModule`). The framework's dependency injection container is used extensively. **Guards** enforce authorization, and **Pipes** handle request validation. **TypeORM** is used as the data access layer (Repository Pattern).

*   **Secure Sandbox (Lambda)**: The `formula-execution-service` uses the `isolated-vm` library to create a V8 Isolate for each execution. This provides a strong security boundary. The Lambda handler carefully constructs a context with an explicit allow-list of functions (e.g., `Math.sin`) and constants to be exposed to the sandboxed code, as per REQ-1-019.

## Performance & Scalability Architecture

The architecture is designed to meet stringent non-functional requirements for performance and scalability.

*   **Performance**:
    *   **Frontend**: The initial load time (LCP < 2.5s) is achieved by serving the React SPA via the **AWS CloudFront CDN** and using Vite for an optimized build with code-splitting.
    *   **Backend API**: The API response time (P95 < 200ms) is met by using appropriately sized ECS tasks and RDS instances, and by implementing a **Cache-Aside pattern** with Redis for frequently accessed data.
    *   **Formula Execution**: The execution time (P95 < 500ms) is managed by tuning the AWS Lambda memory allocation, which also provisions proportional CPU power.

*   **Scalability**:
    *   **Frontend**: The CloudFront CDN provides global, automatic scaling to handle any level of traffic to the static frontend assets.
    *   **User & Data Service**: The service is containerized and deployed on **AWS ECS with Fargate**, which is configured to **auto-scale** horizontally based on CPU and memory utilization.
    *   **Formula Execution Service**: As an **AWS Lambda** function, it scales automatically and concurrently on a per-request basis, providing massive parallelization capabilities with zero configuration.
    *   **Database**: **Amazon RDS** supports vertical scaling (resizing the instance) and read replicas to handle increased load.

## Development & Deployment Strategy

*   **Team Organization**: The poly-repo structure naturally supports a feature-oriented team structure, with clear ownership boundaries (e.g., Frontend App Team, UI Library Team, Backend Platform Team, DevOps/Infra Team).

*   **Development Workflow**: All code is managed in GitHub using the **GitFlow** branching strategy. Pull requests are used for code reviews, and automated checks are triggered via GitHub Actions.

*   **Deployment Pipeline**: A comprehensive **CI/CD pipeline** is implemented in **GitHub Actions**. For each service, the pipeline includes stages for:
    1.  **Lint & Test**: Enforce code quality and run automated tests.
    2.  **Security Scan**: Perform SAST, SCA, and container vulnerability scanning.
    3.  **Build**: Create production artifacts (e.g., Docker images, static site assets).
    4.  **Deploy**: Push artifacts to their destination (ECR, S3) and apply infrastructure changes via **Terraform**.

*   **Deployment Strategy**: The initial launch is a "Big Bang" deployment. All subsequent updates to production services will use a **Blue/Green deployment strategy** to ensure zero downtime and provide an immediate rollback capability.

## Architecture Decision Records

### ADR-001: Choice of Poly-Repo over Monorepo
*   **Decision**: Adopt a poly-repo architecture instead of a monorepo.
*   **Rationale**: While a monorepo offers simplicity for a shared TypeScript stack, a poly-repo structure provides superior benefits for this project's goals. It enables independent release cycles for components (e.g., UI library vs. backend), simplifies CI/CD pipelines, enforces clear ownership boundaries, and reduces the cognitive load for developers working on a specific component.
*   **Trade-offs**: Requires more complex dependency management (versioning shared libraries) and setup for cross-repository changes. This is mitigated by using a private NPM registry and standardized build configurations.

### ADR-002: Isolation of Untrusted Code Execution in AWS Lambda
*   **Decision**: User-defined formulas will be executed in a dedicated, security-hardened AWS Lambda function, completely isolated from the main application stack.
*   **Rationale**: Executing arbitrary user code is the single greatest security risk. A Lambda function provides a stateless, ephemeral, and highly constrained environment. Using the `isolated-vm` library within Lambda adds another layer of security via V8 Isolates, preventing access to the underlying Node.js process or OS. This architectural choice moves the highest-risk operation into a secure, purpose-built component.
*   **Trade-offs**: Introduces a small amount of network latency for each calculation and can have cold start implications. These are acceptable trade-offs for the significant security gains.

### ADR-003: Use of a Shared TypeScript Contract Repository
*   **Decision**: Create a dedicated repository (`shared-api-contracts`) to store only TypeScript type definitions for API DTOs.
*   **Rationale**: This repository acts as a versionable, single source of truth for the client-server contract. It enables end-to-end type safety, allowing the compiler to catch integration errors that would otherwise only appear at runtime. It decouples the API contract's evolution from its implementation.
*   **Trade-offs**: Adds an extra package to manage and requires discipline to keep it free of executable code. The benefits of compile-time safety and clear contracts far outweigh this minor overhead.

### ADR-004: Selection of AWS Cognito as the Identity Provider
*   **Decision**: Use AWS Cognito for all user authentication and identity management.
*   **Rationale**: As the application is built entirely on AWS, Cognito offers seamless and secure integration with API Gateway and other AWS services. It is a managed, scalable, and standards-compliant (OAuth 2.0) service that offloads the significant security burden of building and maintaining a custom authentication system, including password storage, MFA, and token issuance.
*   **Trade-offs**: Locks the authentication mechanism to a specific cloud provider. This is an acceptable trade-off given the project's commitment to the AWS ecosystem.