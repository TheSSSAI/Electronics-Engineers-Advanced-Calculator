### **Software Requirements Specification**

**1.0 Introduction**

**1.1 Purpose**
This document specifies the software requirements for a comprehensive, web-based scientific and electronics calculator. It details the functional and non-functional requirements, interfaces, and constraints that will guide the design, development, and testing of the system.

**1.2 Project Scope (REQ-SCP-001)**
*   The system shall provide a fully functional scientific calculator with standard arithmetic, trigonometric, and scientific operations.
*   The system shall provide specialized modes for Ohm's Law & Power, Resistor Combinations (Series/Parallel), Resistor Color Code Conversion, and 555 Timer design.
*   The system shall provide a user-extensible framework for users to create, save, manage, and share their own custom calculation modes using a guided interface.
*   The system shall provide a user account system for persisting variables, calculation history, and custom modes.
*   The system shall be implemented as a responsive web application, accessible on modern desktop and mobile browsers.
*   The system shall not be a native mobile application (iOS/Android).
*   The system shall not provide a centralized, public repository or "marketplace" for sharing custom modes.
*   The system shall limit sharing to file-based export and import.
*   The system shall not provide real-time collaboration features between users.
*   The system shall not provide circuit simulation or schematic drawing capabilities.

**2.0 Overall Description**

**2.1 Operating Environment (REQ-ENV-001)**
*   The client application shall run on a modern, standards-compliant web browser, including the latest versions of Chrome, Firefox, Safari, and Edge.
*   The client application shall run on any desktop or mobile operating system.
*   The entire backend infrastructure shall be hosted on Amazon Web Services (AWS).
*   The client shall require an active internet connection to authenticate and synchronize data with the backend.
*   Core calculator functions shall operate offline after the initial application load.
*   Custom modes and data persistence shall require an active internet connection.
*   The system shall implement a non-destructive offline data synchronization strategy. Changes made to user data (e.g., variables, history) while offline shall be queued locally using IndexedDB. Upon reconnection to the backend, the application shall automatically attempt to sync the queued changes. For append-only data like calculation history, offline items shall be merged with the server's list. For mutable data like user variables, a last-write-wins strategy shall be used based on timestamps, with the server's timestamp being authoritative in any conflict resolution scenario.

**2.2 Design and Implementation Constraints (REQ-CON-001)**
*   The application shall be built using a technology stack of React/TypeScript for the frontend.
*   The application shall be built using a technology stack of Node.js/NestJS/PostgreSQL for the backend.
*   The application shall be deployed on AWS.
*   The application shall leverage AWS managed services including ECS, Lambda, and RDS.
*   All user-defined formulas shall be executed within a secure, isolated sandbox using the `isolated-vm` library on AWS Lambda. The `vm2` library is explicitly forbidden due to critical, unpatched security vulnerabilities.
*   The sandbox environment shall have no network access.
*   The sandbox environment shall have no filesystem access.
*   The sandbox environment shall have strict resource limits (timeout, memory).
*   The sandbox environment shall be configured with an explicit allow-list of mathematical functions and constants available for use in custom formulas, as defined in REQ-FRX-001.
*   The file format for exporting and importing custom modes shall be JSON.

**3.0 Functional Requirements**

**3.1 Core Calculator Functionality (REQ-FRC-001)**
*   The system shall correctly perform addition (+), subtraction (-), multiplication (×), and division (÷).
*   The system shall provide trigonometric functions: sin, cos, tan.
*   The system shall provide inverse trigonometric functions: asin, acos, atan.
*   The system shall provide the logarithm function (log), natural log function (ln), exponential function (exp), power function (x^y), square root function (√), and factorial function (!).
*   The calculator shall support calculations in Degrees, Radians, and Gradians, with a UI control to switch between modes and a clear display of the active mode.
*   The output of all trigonometric functions shall correctly reflect the selected angle mode.
*   The UI shall provide dedicated access to constants Pi (π), Euler's number (e), Boltzmann constant (k), and elementary charge (e_charge).
*   The calculator shall support undo (Ctrl+Z) and redo (Ctrl+Y) for the input expression.
*   The primary display shall show the current input and result, with a scrollable history panel for previous calculations. Clicking a history item shall load it for re-use.
*   The system shall correctly parse inputs with SI prefixes (p, n, μ, m, k, M, G).
*   The system shall provide configurable engineering notation for results, allowing the user to specify the number of significant figures and a default unit.
*   The calculator shall provide memory functions (M+, M-, MR, MC).
*   Users shall be able to assign, use, view, and manage variables (`variableName = expression`).
*   All memory values and user-defined variables shall be persisted across sessions.
*   The system shall provide clear, non-destructive error messages for invalid operations or syntax errors, preserving the user's original input.
*   The system shall include a comprehensive, searchable in-app help system accessible from a global UI element as defined in REQ-UI-001. This system shall provide clear documentation on all application features, including: (a) Core calculator functions and constants, (b) Specialized electronics modes, (c) The custom mode creation process, and (d) User account management. The implementation shall leverage Docusaurus for help content authoring and presentation, aligning with the React-based frontend stack. A formal process for creating, reviewing, and maintaining help content shall be established, with ownership assigned to the product team to ensure accuracy and completeness.

**3.2 Advanced Electronics Features (REQ-FRE-001)**
*   The UI shall present four input fields for Ohm's Law and Power mode: V, I, R, and P.
*   When the user enters valid numerical data into any two of the Ohm's Law fields, the other two fields shall be automatically calculated and populated in real-time.
*   Ohm's Law calculations shall be correct based on the formulas V=IR and P=VI.
*   Ohm's Law input fields shall only accept valid numerical data.
*   The system shall display a message prompting for more information if an Ohm's Law calculation is attempted with fewer than two inputs.
*   The system shall flag negative values entered for Resistance (R) or Power (P) with a validation error, enforced on both the client and backend.
*   The Resistor Combinations UI shall allow a user to create and manage a dynamic list of resistor values.
*   The user shall be able to add, edit, and remove values from the resistor list.
*   A "Calculate Series" button shall calculate the sum of all resistor values in the list.
*   A "Calculate Parallel" button shall calculate the equivalent resistance using the formula `1 / (1/R1 + 1/R2 + ... + 1/Rn)`.
*   The Resistor Combinations list shall only accept positive, non-zero resistance values, enforced on both the client and backend.
*   In the Resistor Color Code mode, the user shall first select the resistor type to be converted: 3, 4, 5, or 6-band.
*   For Value-to-Color conversion, the user shall enter a resistance value and select a tolerance from a dropdown of standard values.
*   For Value-to-Color conversion, the system shall display the correct sequence of color bands for the specified resistor type.
*   If a non-standard resistance value is entered, the tool shall suggest the nearest standard E-series value.
*   For Color-to-Value conversion, the UI shall display a color palette for each of the selected number of bands.
*   As the user selects colors, the system shall display the corresponding resistance value, tolerance, and (for 6-band resistors) the temperature coefficient.
*   For 555 Timer Astable Mode, the UI shall require three inputs: desired Frequency, desired Duty Cycle, and the value of ONE known component (RA, RB, or C).
*   For 555 Timer Astable Mode, the system shall calculate and display the values for the remaining two components.
*   For 555 Timer Astable Mode, the system shall validate that the desired duty cycle is greater than 50% and less than 100%, and display an informative error if it is not.
*   For 555 Timer Monostable Mode, the UI shall require two inputs: desired Pulse Width and the value of ONE known component (R or C).
*   For 555 Timer Monostable Mode, the system shall calculate and display the value for the remaining component.
*   For both 555 Timer modes, if a calculated component value falls outside a typical practical range (e.g., resistors outside 1kΩ-10MΩ, capacitors outside 100pF-1000μF), the system shall display a non-blocking warning message.

**3.3 User-Extensible Functionality (REQ-FRX-001)**
*   The custom mode creation process shall be a multi-step wizard.
*   The user shall provide a unique Name and an optional Description for the mode.
*   The user shall define one or more Input Variables and one or more Output Variables.
*   For each variable, the user shall specify a name and may specify a unit.
*   The user shall enter one or more formulas using standard algebraic syntax.
*   The formula sandbox shall provide an explicit allow-list of functions and constants, including: `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `log`, `ln`, `exp`, `sqrt`, and the constants `pi`, `e` (Euler's number), `k` (Boltzmann constant), and `e_charge` (elementary charge).
*   The formula editor shall provide real-time syntax validation and highlight user-defined variables.
*   The user shall be able to customize display labels and choose the input control type (e.g., text field, slider).
*   Upon successful creation, the new mode shall be available for use immediately.
*   A dedicated section in the UI shall list all available custom modes.
*   Clicking on a custom mode shall open its dedicated interface, displaying the defined input and output fields.
*   As the user enters valid numerical values into the input fields, the output fields shall be calculated and updated when an input field loses focus (onBlur event) or when a dedicated 'Calculate' button is pressed.
*   A dedicated management screen shall list all user-created modes.
*   From the management screen, a user shall be able to Launch, Edit, Delete, and View the details of a mode.
*   Deleting a mode shall trigger a confirmation prompt before deletion.
*   Editing a mode shall re-open the creation wizard populated with that mode's data.
*   The Custom Mode Management screen shall provide an "Export" option for each mode.
*   Exporting a mode shall generate and prompt the user to download a structured JSON file containing the complete mode definition. The JSON file shall include a schema version number to support future upgrades.
*   The application shall provide an "Import" function that allows a user to upload a valid mode definition JSON file.
*   Upon successful import, the new mode shall be added to the user's list of custom modes and be immediately available for use.

**3.4 User Management & Persistence (REQ-FRU-001)**
*   The system shall use AWS Cognito as the external Identity Provider (IdP) for user authentication to ensure tight integration with the AWS ecosystem.
*   The system shall provide a user registration flow requiring a valid email and a secure password, managed by the IdP.
*   The system shall provide a login flow for existing users, managed by the IdP.
*   All communication during registration and login shall be encrypted.
*   Upon successful login, the user's calculation history, defined variables, and created custom modes shall be loaded from the backend.
*   Any changes to user data (new calculations, variables, modes) shall be saved to the backend.
*   User data shall be securely associated with the logged-in user and not be accessible by any other user.
*   User profile management actions (e.g., password change, email update) shall be handled through the user interface provided by the external IdP.
*   The system shall provide a mechanism for users to initiate account deletion. This action shall require the user to pass a final, non-recoverable confirmation step in the UI (e.g., typing their username). Upon confirmation, this will trigger a process to permanently remove all associated user data (`custom_modes`, `calculation_history`, `user_variables`, `users` record) from the application's database in accordance with the defined data retention policy.

**4.0 Interface Requirements**

**4.1 User Interfaces (REQ-UI-001)**
*   The UI shall be clean, modern, and intuitive.
*   The application layout shall be fully responsive, providing an optimal user experience on devices from small mobile screens to large desktop monitors.
*   The UI shall adhere to Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, including proper color contrast, full keyboard navigability, and screen reader support.
*   The system shall provide a Main Calculator View, Mode-Specific Views, a Custom Mode Wizard, a Custom Mode Management view, and Login/Registration screens.
*   The UI shall utilize a modern, professional color palette, defined in a formal style guide to ensure consistency and mitigate design subjectivity. This palette must enhance usability, reduce eye strain, and align with the application's branding.
*   The UI shall incorporate subtle, performant micro-interactions (e.g., for button presses, state changes, input validation feedback) to provide clear visual cues without disrupting the user workflow.
*   A persistent icon in the main navigation bar shall serve as the entry point to the in-app help system defined in REQ-FRC-001.
*   The application's frontend architecture shall be designed to support internationalization (i18n), with all user-facing strings externalized into resource files.

**4.2 Software & Communication Interfaces (REQ-API-001)**
*   The client application shall communicate with the backend exclusively through a RESTful API.
*   The API protocol shall be REST over HTTPS.
*   The API data format shall be JSON.
*   The API shall be documented using the OpenAPI 3.0 specification. The specification file shall be automatically generated from the backend source code and be accessible via a dedicated endpoint.
*   The application shall integrate with AWS Cognito for user authentication using the OAuth 2.0 Authorization Code flow with Proof Key for Code Exchange (PKCE).
*   All authenticated API endpoints shall require a JWT Bearer token in the `Authorization` header, issued by the IdP.
*   The API shall be versioned via the URL path (e.g., `/api/v1/...`).
*   The backend API shall be the authoritative source of truth for data integrity and any action that persists data, enforcing all business rules and data validation logic defined in REQ-BIZ-001. For non-persistent, real-time UI feedback calculations (e.g., Ohm's Law helper), the logic may be implemented on the client to provide an optimal user experience, with the understanding that this is a non-authoritative preview. The backend shall return appropriate 4xx HTTP status codes for invalid data submissions.
*   The API shall return standardized, machine-readable error responses compliant with RFC 7807 (Problem Details for HTTP APIs).
*   The API Gateway shall generate a unique Correlation ID for every incoming request and pass it in HTTP headers to all downstream services.
*   All communication between the client and server shall use HTTPS with TLS 1.3 preferred, and a minimum of TLS 1.2.

**5.0 Non-Functional Requirements**

**5.1 Performance Requirements (REQ-NFP-001)**
*   The application's initial load time, measured by Largest Contentful Paint (LCP), shall be under 2.5 seconds on a standard 4G mobile connection.
*   All client-side calculations and UI updates shall complete in under 50ms.
*   All API calls for data retrieval shall have a 95th percentile (P95) response time of less than 200ms.
*   The execution of a user-defined custom formula via the backend service shall have a P95 response time of less than 500ms.

**5.2 Safety and Reliability Requirements (REQ-NFR-001)**
*   The primary database shall be configured for automated daily snapshots with a 14-day retention period.
*   Point-in-time recovery shall be enabled for the database, allowing restoration to any second within the backup retention window.
*   The system shall adhere to a Recovery Point Objective (RPO) of 15 minutes, meaning no more than 15 minutes of data loss in a disaster scenario.
*   The system shall adhere to a Recovery Time Objective (RTO) of 4 hours, meaning the service must be restored within 4 hours of a declared disaster.
*   All backend services and the database shall be deployed across a minimum of two AWS Availability Zones (AZs) to ensure high availability.
*   In the event of a backend connection failure, the client application shall remain functional for standard, client-side calculations and display a clear, non-disruptive message indicating that cloud features are temporarily unavailable.

**5.3 Security Requirements (REQ-NFS-001)**
*   User authentication shall be managed by AWS Cognito, which handles secure password storage and supports multi-factor authentication (MFA).
*   A Role-Based Access Control (RBAC) model shall be enforced, ensuring users can only access and modify their own data.
*   All data transmitted between the client and server shall be encrypted using TLS 1.2 or higher.
*   All user data stored in the PostgreSQL database shall be encrypted at rest using AWS Key Management Service (KMS).
*   User-defined formulas shall be executed in a highly secure sandbox (`isolated-vm` on AWS Lambda) with strict timeouts, memory limits, and no access to the network or filesystem.
*   The CI/CD pipeline shall include automated security scanning: Static Application Security Testing (SAST), Software Composition Analysis (SCA), and container vulnerability scanning.
*   The API Gateway shall be configured with rate limiting and throttling to protect against denial-of-service and brute-force attacks.
*   The web application shall implement security headers, including Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), and X-Frame-Options, to mitigate common web vulnerabilities.

**5.4 Software Quality Attributes (REQ-NFQ-001)**
*   The backend services shall have a target uptime of 99.9%, excluding planned maintenance.
*   Planned maintenance windows shall be scheduled during periods of low user activity and communicated to users in advance via a system status page.
*   The system architecture shall support horizontal scaling to handle an increasing number of concurrent users without performance degradation.
*   The frontend shall be served via the AWS CloudFront global Content Delivery Network (CDN). CloudFront shall be configured to support the Single Page Application by directing all non-asset requests to `index.html` with a 200 status code.
*   The backend services shall be configured for automatic scaling based on demand.
*   The entire cloud infrastructure shall be defined as code using Terraform.
*   The backend shall be developed using a modular architecture (NestJS).
*   Both frontend and backend codebases shall use TypeScript to enforce static typing.
*   Both frontend and backend codebases shall enforce code style and quality standards using automated linting tools integrated into the CI pipeline.
*   The backend codebase shall maintain a minimum of 85% unit test coverage for all business logic.
*   The project shall maintain up-to-date technical documentation, including architecture diagrams, API documentation (auto-generated), and developer setup guides, stored within the source control repository.

**6.0 System Architecture & Technology Stack (REQ-ARC-001)**
*   The system shall employ a Serverless Microservices Hybrid architecture.
*   The system shall include a React-based Single Page Application (SPA) client, an API Gateway, a containerized User & Data Service on AWS ECS, a secure AWS Lambda for the Formula Execution Service, and a managed PostgreSQL instance (Amazon RDS).
*   The frontend framework shall be React 18+ with TypeScript, using Vite as the build tool, Redux Toolkit for state management, Material-UI for the component library, and Styled-components for styling. Testing shall be performed with Jest, React Testing Library for unit/component tests, and Cypress for end-to-end tests.
*   The backend language and framework shall be Node.js (LTS) with NestJS, exposing a RESTful API. Testing shall be performed with Jest for unit tests and Supertest for API integration tests. Logging shall be implemented using Pino for structured, high-performance JSON logging.
*   The formula execution platform shall be AWS Lambda with a Node.js runtime, using the `isolated-vm` library for sandboxing.
*   The database shall be PostgreSQL 15+ via Amazon RDS.
*   The infrastructure shall use AWS, Docker, AWS ECS with Fargate, GitHub Actions for CI/CD, Terraform for IaC, and AWS Secrets Manager for secret management.

**7.0 Data Architecture (REQ-DAT-001)**
*   The system shall have a `users` entity with fields: `id`, `auth_provider_id`, `email`, `created_at`, `updated_at`.
*   The system shall have a `custom_modes` entity with fields: `id`, `user_id`, `name`, `description`, `definition` (JSONB), `created_at`, `updated_at`.
*   The system shall have a `user_variables` entity with fields: `id`, `user_id`, `name`, `value`, `created_at`, `updated_at`, and a unique constraint on (`user_id`, `name`).
*   The system shall have a `calculation_history` entity with fields: `id`, `user_id`, `expression`, `result`, `created_at`.
*   The system shall use the `JSONB` data type in PostgreSQL for the `definition` column in the `custom_modes` table.
*   The system shall create indexes on all foreign keys and columns frequently used in `WHERE` clauses.
*   The database shall have automated daily snapshots and point-in-time recovery enabled as per REQ-NFR-001.
*   The system shall use the migration tool integrated with TypeORM to manage all schema changes. All schema modifications must be written as versioned migration scripts, stored in source control, and executed automatically as part of the CI/CD deployment process.
*   Upon confirmed user account deletion, all records associated with the `user_id` in `custom_modes`, `user_variables`, and `calculation_history` tables shall be permanently deleted.
*   The system design and data handling procedures must be compliant with relevant data protection regulations, such as GDPR and CCPA.

**8.0 DevOps & CI/CD (REQ-DEV-001)**
*   All source code shall be managed in a Git repository using a defined branching strategy, such as GitFlow, to manage feature development, releases, and hotfixes.
*   The system shall implement a CI/CD pipeline using GitHub Actions, triggered on push to any branch.
*   The pipeline shall include stages for Lint & Test, Security Scan, Build, API Spec Generation, Push to Amazon ECR, Database Migration, and Deploy via Terraform.
*   The Build stage shall be configured to handle both application code and documentation, ensuring that the help content defined in REQ-FRC-001 is built and included in the final deployment artifact. The build process for frontend assets must generate hashed filenames to enable effective cache-busting via the CDN.
*   The Database Migration stage must run before the application deployment stage to ensure the database schema is compatible with the new code version.
*   The system shall use Terraform to define and manage all cloud infrastructure resources.
*   The system shall use Terraform workspaces to maintain separate, isolated state for `dev`, `staging`, and `prod` environments.
*   All sensitive data shall be stored in AWS Secrets Manager and retrieved by the application at runtime, not hardcoded in the repository.

**9.0 Monitoring & Observability (REQ-MON-001)**
*   The system shall use Amazon CloudWatch Metrics to collect performance and utilization metrics from all AWS resources.
*   All application and system logs shall be centralized in Amazon CloudWatch Logs in a structured JSON format.
*   A formal logging standard shall be enforced. Every log entry must include a timestamp, log level, service name, a unique Correlation ID, and a detailed message. The Correlation ID must be generated at the API Gateway for each request and propagated to all downstream services, which must include it in every log message they generate for that request.
*   The system shall integrate AWS X-Ray for distributed tracing of requests.
*   CloudWatch Alarms shall be configured to automatically notify the development team for critical events.
*   An alarm shall be triggered if the API Gateway 5xx error rate exceeds 1% over a 5-minute period.
*   An alarm shall be triggered if the P99 API latency exceeds 1 second.
*   An alarm shall be triggered if an ECS service CPU or Memory utilization exceeds 80%.
*   An alarm shall be triggered for Lambda function execution errors or timeouts.
*   The system shall provide a public-facing system status page to communicate current service availability and scheduled maintenance.

**10.0 Business Rules (REQ-BIZ-001)**
*   All business rules specified in this section must be enforced within the backend API to ensure data integrity, regardless of the client-side implementation.
*   The system shall enforce that SI prefixes (p, n, μ, m, k, M, G) are case-sensitive and appended directly to a number with no space.
*   The system shall enforce that Resistance (R) in the Ohm's Law calculator is a positive number.
*   The system shall enforce that Power (P) in the Ohm's Law calculator is a non-negative number.
*   The system shall enforce that all resistor values in the Resistor Combination calculator are positive and non-zero.
*   The system shall enforce that the requested duty cycle in the 555 Timer Astable mode is greater than 50% and less than 100%.
*   The system shall warn, but not prevent, calculations that result in 555 Timer component values outside a practical range.
*   The AWS Cognito Identity Provider (IdP) shall be configured to enforce that user passwords have a minimum length of 12 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character. This rule is a configuration requirement for the IdP, not an application-level implementation.

**11.0 Transition Requirements (REQ-TRN-001)**

**11.1 Implementation Approach**
*   The initial system launch (v1.0) shall follow a "Big Bang" deployment model, making the full feature set available to all users simultaneously.
*   An internal User Acceptance Testing (UAT) phase shall be completed with a select group of beta testers one week prior to the public launch.
*   All subsequent updates and feature releases shall use a "Blue/Green" deployment strategy to minimize downtime and provide an immediate rollback capability.

**11.2 Data Migration Strategy**
*   For the initial v1.0 launch, no data migration from a preceding system is required.
*   For future major version upgrades that require schema changes incompatible with the existing data structure, a formal data migration plan must be developed. This plan shall include scripts for data extraction, transformation, and loading (ETL), along with a validation process to ensure data integrity post-migration. The migration shall be fully tested in the `staging` environment before being executed in `prod`.

**11.3 User Training and Onboarding**
*   The primary training resource shall be the in-app help system defined in REQ-FRC-001.
*   The system shall implement a one-time, dismissible guided tour for first-time users, highlighting the main UI components, mode switching, and the location of the help system.
*   A dedicated, interactive tutorial shall be implemented within the Custom Mode creation wizard to guide users through the process of creating their first custom mode.

**11.4 Cutover Plan**
*   A detailed go-live checklist shall be created and executed for the v1.0 launch. This checklist shall include:
    *   Final deployment of all services to the `prod` environment.
    *   Execution of final database migrations.
    *   Configuration of DNS records to point to the production CloudFront distribution.
    *   Execution of a post-launch smoke test suite to verify core functionality.
    *   Activation of all production monitoring and alarms.
*   A formal rollback plan shall be documented. In the event of a critical failure during cutover, the system shall be rolled back by reverting the DNS changes and scaling down the production services. The success criteria for go-live shall be the successful completion of the smoke test suite with zero critical errors.

**11.5 Legacy System Decommissioning**
*   This requirement is not applicable for the initial v1.0 launch as no legacy system is being replaced.

**12.0 Legal and Compliance Requirements (REQ-LGL-001)**

**12.1 Regulatory Compliance**
*   The system shall be compliant with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
*   The system shall provide a mechanism for users to request access to their personal data.
*   The system shall provide a mechanism for users to request the deletion of their account and all associated personal data, as specified in REQ-FRU-001.
*   The system shall obtain explicit user consent for data processing activities where required by law.

**12.2 Legal Constraints**
*   A "Terms of Service" and a "Privacy Policy" document shall be created in consultation with legal counsel.
*   Users shall be required to explicitly accept the Terms of Service and Privacy Policy during the account registration process.
*   Links to the live Terms of Service and Privacy Policy documents shall be accessible from the application's footer.
*   The Terms of Service shall clarify that users retain intellectual property rights to the custom modes they create, but grant the service a non-exclusive, worldwide, royalty-free license to store, process, and display these modes for the purpose of providing the service to that user.

**12.3 Industry Standards Adherence**
*   The system shall formally adhere to the following technical and process standards as defined throughout this document:
    *   **Accessibility:** WCAG 2.1 Level AA (REQ-UI-001)
    *   **API Communication:** REST over HTTPS, OpenAPI 3.0, RFC 7807 (REQ-API-001)
    *   **Authentication:** OAuth 2.0 Authorization Code flow with PKCE (REQ-API-001)
    *   **Security:** TLS 1.2 minimum, TLS 1.3 preferred (REQ-API-001)