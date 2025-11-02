# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-APP-FORMULA-EXEC |
| Extraction Timestamp | 2024-05-24T12:00:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | High |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-1-018

#### 1.2.1.2 Requirement Text

The execution of all user-defined formulas from custom modes must occur within a secure, isolated sandbox environment. This environment shall be implemented on AWS Lambda using the isolated-vm library. The use of the vm2 library is strictly prohibited.

#### 1.2.1.3 Validation Criteria

- Verify through code review that the formula execution service is an AWS Lambda function.
- Verify that the isolated-vm library is a dependency and is used to execute the formula code.
- Verify that the vm2 library is not present in the project's dependencies.

#### 1.2.1.4 Implementation Implications

- The core technology for this service is mandated as the isolated-vm library, running within an AWS Lambda function.
- The service must be designed without any filesystem or network access, as per the constraints.
- Strict resource limits (timeout, memory) must be configured for the Lambda function.

#### 1.2.1.5 Extraction Reasoning

This requirement is the primary driver for the existence and core technical implementation of the formula-execution-service repository.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

REQ-1-019

#### 1.2.2.2 Requirement Text

The formula execution sandbox must be configured with a strict allow-list of callable functions and accessible constants. Only the following shall be exposed: functions sin, cos, tan, asin, acos, atan, log, ln, exp, sqrt, and constants pi, e, k, e_charge.

#### 1.2.2.3 Validation Criteria

- Create a custom formula that uses an allowed function (e.g., sin(pi)) and verify it executes correctly.
- Create a custom formula that attempts to use a disallowed function or object (e.g., Math.random(), process.exit()) and verify that the execution fails with a security or reference error.

#### 1.2.2.4 Implementation Implications

- The sandbox environment must be explicitly configured to inject only the specified functions and constants into the execution context.
- No other global objects or functions (e.g., Math, process, require) should be accessible from within the executed code.

#### 1.2.2.5 Extraction Reasoning

This requirement defines the specific functional contract and security boundary for the sandbox that this service must implement.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

REQ-1-043

#### 1.2.3.2 Requirement Text

The end-to-end processing time for executing a user-defined custom formula, measured from the API request to the formula execution service until the response is returned, must be less than 500 milliseconds at the 95th percentile (P95).

#### 1.2.3.3 Validation Criteria

- Conduct a load test specifically targeting the custom formula execution endpoint.
- Monitor the P95 latency for this endpoint.
- Verify the P95 latency remains below the 500ms threshold.

#### 1.2.3.4 Implementation Implications

- The Lambda function's memory allocation must be optimized to balance cost and performance, as more memory also provides more CPU.
- Cold starts must be mitigated using Provisioned Concurrency to ensure the P95 latency target is met.

#### 1.2.3.5 Extraction Reasoning

This is a critical non-functional requirement that directly governs the performance and operational configuration of this service.

## 1.3.0.0 Relevant Components

- {'component_name': 'FormulaExecutionService', 'component_specification': "A secure, serverless AWS Lambda function responsible for executing user-defined formulas in an isolated sandbox environment using the 'isolated-vm' library. It is stateless, has no network or filesystem access, and is the sole component of this repository.", 'implementation_requirements': ['Must be triggered via API Gateway using a Lambda Proxy Integration.', 'Must implement a handler that parses the incoming event, calls a sandboxing service, and formats the response.', "Must use the 'isolated-vm' library to create a V8 Isolate, inject an allow-list of functions/constants, execute the user's formula with a strict timeout, and safely dispose of the Isolate.", 'Must be packaged for deployment with native dependencies compiled for the Amazon Linux 2 environment.'], 'architectural_context': "This component is the entirety of the 'Formula Execution Service' application layer. It is a specialized, security-hardened microservice within the system's Cloud-Native architecture.", 'extraction_reasoning': "This is the single component implemented by the 'formula-execution-service' repository. Its specification is derived from the repository's description and its governing requirements (REQ-1-018, REQ-1-019)."}

## 1.4.0.0 Architectural Layers

- {'layer_name': 'ApplicationServices', 'layer_responsibilities': 'Manages core business logic, data validation, and persistence for specific domains (e.g., user data). Exposes APIs for clients and orchestrates interactions with other services and data stores. This layer is the source of truth for business rules.', 'layer_constraints': ['Services in this layer must be independently deployable.', 'Services must not contain presentation logic.'], 'implementation_patterns': ['Microservices', 'Serverless (FaaS)'], 'extraction_reasoning': "The 'formula-execution-service' repository is explicitly defined in the system architecture as a serverless function within the 'ApplicationServices' layer, responsible for the specific domain of secure formula execution."}

## 1.5.0.0 Dependency Interfaces

- {'interface_name': 'IApiContracts', 'source_repository': 'REPO-LIB-API-CONTRACTS', 'method_contracts': [], 'integration_pattern': 'NPM Package Dependency', 'communication_protocol': 'TypeScript Type System', 'extraction_reasoning': "To ensure end-to-end type safety, this service must depend on the shared API contracts library. It will import DTOs to define the shape of its invocation payload and response, ensuring consistency with consumers like 'frontend-app' and 'user-data-service'."}

## 1.6.0.0 Exposed Interfaces

- {'interface_name': 'FormulaExecutionApi', 'consumer_repositories': ['REPO-APP-FRONTEND', 'REPO-APP-USER-DATA'], 'method_contracts': [{'method_name': 'POST /api/v1/formulas/execute', 'method_signature': 'execute(body: ExecuteFormulaRequestDto): Promise<ExecuteFormulaResponseDto>', 'method_purpose': 'Accepts a user-defined formula string and a context object of input variables. Executes the formula in a secure sandbox and returns the calculated numerical result or a structured error.', 'implementation_requirements': 'The endpoint is implemented as an AWS Lambda function triggered by API Gateway. It must handle all execution errors (syntax, timeout, security) and return appropriate HTTP status codes (200 for success, 400 for bad requests, 422 for validation errors, 500 for internal errors).'}], 'service_level_requirements': ['P95 latency must be less than 500ms (REQ-1-043).'], 'implementation_constraints': ["The endpoint must be protected by the API Gateway's JWT authorizer.", 'The payload is treated as untrusted user input and must be executed securely.', 'The service must not trust that the client has pre-validated the formula.'], 'extraction_reasoning': 'This is the single, well-defined entry point for the service, as specified by its role in the system architecture. It is consumed by the frontend for running custom modes (US-047) and by the backend for validating imported modes (US-051).'}

## 1.7.0.0 Technology Context

### 1.7.1.0 Framework Requirements

The service must be developed as a serverless function using the Node.js (LTS) runtime on AWS Lambda. It does not use a larger framework like NestJS to remain lightweight and optimized for cold starts.

### 1.7.2.0 Integration Technologies

- AWS Lambda
- Amazon API Gateway (for invocation via Lambda Proxy Integration)
- isolated-vm (for the security sandbox)
- Webpack or esbuild (for bundling and optimizing the deployment package)

### 1.7.3.0 Performance Constraints

The P95 execution time, including cold start, must be under 500ms (REQ-1-043). The Lambda function must be configured with Provisioned Concurrency in production environments to mitigate cold start latency.

### 1.7.4.0 Security Requirements

This service is a critical security boundary. It MUST use 'isolated-vm' (REQ-1-018), enforce the function/constant allow-list (REQ-1-019), and operate with an IAM role that has no network or filesystem permissions (only CloudWatch Logs access). The 'isolated-vm' native dependency must be compiled in an Amazon Linux 2 environment to ensure runtime compatibility with AWS Lambda.

## 1.8.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | All repository connections and contracts have been... |
| Cross Reference Validation | The defined API endpoint is consistent with the ne... |
| Implementation Readiness Assessment | High. The integration contracts are now fully spec... |
| Quality Assurance Confirmation | The analysis has been systematically performed, id... |

