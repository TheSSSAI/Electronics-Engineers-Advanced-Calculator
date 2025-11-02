# 1 Id

REPO-APP-FORMULA-EXEC

# 2 Name

formula-execution-service

# 3 Description

A highly specialized and security-hardened AWS Lambda function with a single responsibility: to safely execute untrusted, user-defined formulas. This service implements the secure sandbox environment using the 'isolated-vm' library as mandated by REQ-1-018. It has no network or filesystem access and operates under strict CPU and memory limits to mitigate any potential for abuse. It receives a formula and context variables, executes the code within the V8 isolate, and returns the result. Its focused nature and serverless architecture make it perfectly suited for this high-risk task, ensuring it is completely decoupled from the main application's data and infrastructure.

# 4 Type

🔹 Application Services

# 5 Namespace

Calculator.Service.FormulaExecution

# 6 Output Path

apps/formula-execution

# 7 Framework

Serverless

# 8 Language

TypeScript

# 9 Technology

AWS Lambda, Node.js, isolated-vm

# 10 Thirdparty Libraries

- isolated-vm

# 11 Layer Ids

- security-sandbox-layer

# 12 Dependencies

*No items available*

# 13 Requirements

## 13.1 Requirement Id

### 13.1.1 Requirement Id

REQ-CON-001

## 13.2.0 Requirement Id

### 13.2.1 Requirement Id

REQ-NFS-001

# 14.0.0 Generate Tests

✅ Yes

# 15.0.0 Generate Documentation

✅ Yes

# 16.0.0 Architecture Style

Serverless Function

# 17.0.0 Architecture Map

- service-formula-execution-013

# 18.0.0 Components Map

- service-formula-execution-013

# 19.0.0 Requirements Map

- REQ-CON-001
- REQ-NFS-001

# 20.0.0 Decomposition Rationale

## 20.1.0 Operation Type

PRESERVED_FOCUSED

## 20.2.0 Source Repository

REPO-APP-FORMULA-EXEC (original concept)

## 20.3.0 Decomposition Reasoning

This component was already designed with a single, critical responsibility. Decomposing it further is not necessary. Keeping it in a separate repository reinforces its security isolation and allows for a specialized, minimal-dependency deployment pipeline.

## 20.4.0 Extracted Responsibilities

*No items available*

## 20.5.0 Reusability Scope

- This service provides a generic, secure JavaScript execution environment that could be leveraged by other applications.

## 20.6.0 Development Benefits

- Security reviews can focus on this small, critical codebase.
- Can be deployed and updated independently without any risk to the main data service.
- Minimal attack surface due to serverless architecture and no inbound network access beyond the Lambda invocation.

# 21.0.0 Dependency Contracts

*No data available*

# 22.0.0 Exposed Contracts

## 22.1.0 Public Interfaces

- {'interface': 'Lambda Invocation', 'methods': ['invoke(payload: { formula: string, context: object }): Promise<{ result: any }>'], 'events': [], 'properties': [], 'consumers': ['REPO-APP-USER-DATA (via API Gateway)']}

# 23.0.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | N/A |
| Event Communication | Synchronous invocation via API Gateway. |
| Data Flow | Receives JSON payload, executes code in a sandbox,... |
| Error Handling | Catches execution errors (timeouts, memory limits,... |
| Async Patterns | The Lambda handler is an async function. |

# 24.0.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | The function should have a minimal set of dependen... |
| Performance Considerations | Monitor P95 duration to ensure it stays within the... |
| Security Considerations | This is the most critical security boundary. The '... |
| Testing Approach | Unit tests should cover the sandbox setup, context... |

# 25.0.0 Scope Boundaries

## 25.1.0 Must Implement

- Creation and configuration of the 'isolated-vm' sandbox.
- Strict enforcement of resource limits (CPU, memory).
- Logic to pass allowed functions and constants into the sandbox.

## 25.2.0 Must Not Implement

- Any form of data persistence.
- Any network or filesystem I/O.
- Any business logic other than executing the provided formula.

## 25.3.0 Extension Points

- The allow-list of functions available in the sandbox can be updated.

## 25.4.0 Validation Rules

- Validates the basic structure of the invocation payload.

