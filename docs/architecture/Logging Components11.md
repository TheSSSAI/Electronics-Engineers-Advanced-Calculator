# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Technology Stack

- React/TypeScript
- Node.js/NestJS
- PostgreSQL
- AWS (ECS, Lambda, API Gateway, RDS, Cognito, CloudWatch)

## 1.3 Monitoring Requirements

- REQ-1-067: Formal structured logging standard with Correlation ID.
- REQ-1-068: CloudWatch Alarms for critical events.
- REQ-1-042: P95 response time < 200ms for data retrieval APIs.
- REQ-1-043: P95 response time < 500ms for formula execution.
- REQ-1-056: Logging implemented using Pino for structured JSON logging.

## 1.4 System Architecture

CloudNative Microservices/Serverless Hybrid on AWS

## 1.5 Environment

production

# 2.0 Log Level And Category Strategy

## 2.1 Default Log Level

INFO

## 2.2 Environment Specific Levels

### 2.2.1 Environment

#### 2.2.1.1 Environment

dev

#### 2.2.1.2 Log Level

DEBUG

#### 2.2.1.3 Justification

Provides detailed information for developers during feature development and debugging.

### 2.2.2.0 Environment

#### 2.2.2.1 Environment

staging

#### 2.2.2.2 Log Level

DEBUG

#### 2.2.2.3 Justification

Enables comprehensive logging for pre-production testing and validation of new features.

### 2.2.3.0 Environment

#### 2.2.3.1 Environment

prod

#### 2.2.3.2 Log Level

INFO

#### 2.2.3.3 Justification

Balances operational visibility with performance and cost, capturing all standard application flow events without excessive verbosity. Errors will be logged at ERROR level automatically.

## 2.3.0.0 Component Categories

### 2.3.1.0 Component

#### 2.3.1.1 Component

User & Data Service

#### 2.3.1.2 Category

🔹 ApplicationLogic

#### 2.3.1.3 Log Level

INFO

#### 2.3.1.4 Verbose Logging

❌ No

#### 2.3.1.5 Justification

Core service managing business logic. INFO level is sufficient for production monitoring.

### 2.3.2.0 Component

#### 2.3.2.1 Component

Formula Execution Service

#### 2.3.2.2 Category

🔹 SecuritySandbox

#### 2.3.2.3 Log Level

INFO

#### 2.3.2.4 Verbose Logging

✅ Yes

#### 2.3.2.5 Justification

Security-sensitive component as per REQ-1-018. Verbose logging should be enabled for all error paths and security-related events (e.g., disallowed function calls) to ensure auditability.

### 2.3.3.0 Component

#### 2.3.3.1 Component

API Gateway

#### 2.3.3.2 Category

🔹 APIGateway

#### 2.3.3.3 Log Level

INFO

#### 2.3.3.4 Verbose Logging

❌ No

#### 2.3.3.5 Justification

Logs all incoming requests and outgoing responses, providing a complete entry-point audit trail.

## 2.4.0.0 Sampling Strategies

*No items available*

## 2.5.0.0 Logging Approach

### 2.5.1.0 Structured

✅ Yes

### 2.5.2.0 Format

JSON

### 2.5.3.0 Standard Fields

- timestamp
- logLevel
- serviceName
- correlationId
- message

### 2.5.4.0 Custom Fields

- errorStack
- requestPath
- httpMethod
- durationMs

# 3.0.0.0 Log Aggregation Architecture

## 3.1.0.0 Collection Mechanism

### 3.1.1.0 Type

🔹 direct

### 3.1.2.0 Technology

Amazon CloudWatch Logs

### 3.1.3.0 Configuration

#### 3.1.3.1 Ecslog Driver

awslogs

#### 3.1.3.2 Lambda Integration

Native

### 3.1.4.0 Justification

As the entire infrastructure is on AWS (REQ-1-012), CloudWatch Logs is the native, most direct, and essential log aggregator for ECS and Lambda services, requiring no additional agents.

## 3.2.0.0 Strategy

| Property | Value |
|----------|-------|
| Approach | centralized |
| Reasoning | A centralized approach using CloudWatch Logs is re... |
| Local Retention | None |

## 3.3.0.0 Shipping Methods

*No items available*

## 3.4.0.0 Buffering And Batching

| Property | Value |
|----------|-------|
| Buffer Size | Managed by AWS |
| Batch Size | 0 |
| Flush Interval | Managed by AWS |
| Backpressure Handling | Managed by AWS |

## 3.5.0.0 Transformation And Enrichment

- {'transformation': 'None at collection', 'purpose': 'REQ-1-056 specifies Pino for backend logging, which generates pre-formatted structured JSON logs. No further transformation is necessary at the collection stage.', 'stage': 'collection'}

## 3.6.0.0 High Availability

| Property | Value |
|----------|-------|
| Required | ✅ |
| Redundancy | Multi-AZ Replication (CloudWatch Native) |
| Failover Strategy | Managed by AWS |

# 4.0.0.0 Retention Policy Design

## 4.1.0.0 Retention Periods

### 4.1.1.0 Log Type

#### 4.1.1.1 Log Type

Application Logs (ECS/Lambda)

#### 4.1.1.2 Retention Period

30 days

#### 4.1.1.3 Justification

Standard operational retention period for troubleshooting recent issues. Avoids indefinite storage costs while providing a reasonable window for analysis.

#### 4.1.1.4 Compliance Requirement

N/A (No specific period defined in requirements)

### 4.1.2.0 Log Type

#### 4.1.2.1 Log Type

API Gateway Access Logs

#### 4.1.2.2 Retention Period

30 days

#### 4.1.2.3 Justification

Matches application log retention for consistent traceability during incident investigation.

#### 4.1.2.4 Compliance Requirement

N/A

## 4.2.0.0 Compliance Requirements

- {'regulation': 'GDPR/CCPA (as per REQ-1-074)', 'applicableLogTypes': ['Application Logs'], 'minimumRetention': 'Not specified', 'specialHandling': 'PII such as user email addresses should not be logged at INFO level to minimize exposure. Error-level logs containing PII must have access strictly controlled.'}

## 4.3.0.0 Volume Impact Analysis

| Property | Value |
|----------|-------|
| Estimated Daily Volume | TBD |
| Storage Cost Projection | TBD |
| Compression Ratio | N/A (Managed by CloudWatch) |

## 4.4.0.0 Storage Tiering

### 4.4.1.0 Hot Storage

| Property | Value |
|----------|-------|
| Duration | 30 days |
| Accessibility | immediate |
| Cost | standard |

### 4.4.2.0 Warm Storage

| Property | Value |
|----------|-------|
| Duration | N/A |
| Accessibility | N/A |
| Cost | N/A |

### 4.4.3.0 Cold Storage

| Property | Value |
|----------|-------|
| Duration | N/A |
| Accessibility | N/A |
| Cost | N/A |

## 4.5.0.0 Compression Strategy

| Property | Value |
|----------|-------|
| Algorithm | Managed by AWS |
| Compression Level | Managed by AWS |
| Expected Ratio | N/A |

## 4.6.0.0 Anonymization Requirements

*No items available*

# 5.0.0.0 Search Capability Requirements

## 5.1.0.0 Essential Capabilities

### 5.1.1.0 Capability

#### 5.1.1.1 Capability

Search by Correlation ID

#### 5.1.1.2 Performance Requirement

< 5 seconds

#### 5.1.1.3 Justification

The primary troubleshooting requirement derived from REQ-1-067 is to trace a single user request across all services.

### 5.1.2.0 Capability

#### 5.1.2.1 Capability

Filter by log level and service name

#### 5.1.2.2 Performance Requirement

< 5 seconds

#### 5.1.2.3 Justification

Essential for isolating errors or specific service behavior.

### 5.1.3.0 Capability

#### 5.1.3.1 Capability

Full-text search on 'message' field

#### 5.1.3.2 Performance Requirement

< 10 seconds

#### 5.1.3.3 Justification

Required for searching for specific error messages or keywords during investigations.

## 5.2.0.0 Performance Characteristics

| Property | Value |
|----------|-------|
| Search Latency | < 10 seconds for typical queries |
| Concurrent Users | 5 |
| Query Complexity | simple |
| Indexing Strategy | Automatic indexing by CloudWatch Logs Insights |

## 5.3.0.0 Indexed Fields

### 5.3.1.0 Field

#### 5.3.1.1 Field

correlationId

#### 5.3.1.2 Index Type

JSON Field

#### 5.3.1.3 Search Pattern

Exact match

#### 5.3.1.4 Frequency

high

### 5.3.2.0 Field

#### 5.3.2.1 Field

logLevel

#### 5.3.2.2 Index Type

JSON Field

#### 5.3.2.3 Search Pattern

Exact match

#### 5.3.2.4 Frequency

high

### 5.3.3.0 Field

#### 5.3.3.1 Field

serviceName

#### 5.3.3.2 Index Type

JSON Field

#### 5.3.3.3 Search Pattern

Exact match

#### 5.3.3.4 Frequency

medium

## 5.4.0.0 Full Text Search

### 5.4.1.0 Required

✅ Yes

### 5.4.2.0 Fields

- message

### 5.4.3.0 Search Engine

CloudWatch Logs Insights

### 5.4.4.0 Relevance Scoring

✅ Yes

## 5.5.0.0 Correlation And Tracing

### 5.5.1.0 Correlation Ids

- correlationId

### 5.5.2.0 Trace Id Propagation

HTTP Header (X-Correlation-ID)

### 5.5.3.0 Span Correlation

❌ No

### 5.5.4.0 Cross Service Tracing

✅ Yes

## 5.6.0.0 Dashboard Requirements

- {'dashboard': 'High-Level Service Health', 'purpose': 'To monitor metrics and alerts required by REQ-1-068, such as API Gateway 5xx errors, Lambda errors, and ECS CPU utilization.', 'refreshInterval': '5 minutes', 'audience': 'Development Team'}

# 6.0.0.0 Storage Solution Selection

## 6.1.0.0 Selected Technology

### 6.1.1.0 Primary

Amazon CloudWatch Logs

### 6.1.2.0 Reasoning

It is the native, fully managed, and integrated logging solution for the AWS services (ECS, Lambda) used in the architecture. It directly fulfills the requirements with minimal operational overhead.

### 6.1.3.0 Alternatives

- ELK Stack (Elasticsearch, Logstash, Kibana)
- Datadog
- Splunk

## 6.2.0.0 Scalability Requirements

| Property | Value |
|----------|-------|
| Expected Growth Rate | TBD |
| Peak Load Handling | Managed by AWS |
| Horizontal Scaling | ✅ |

## 6.3.0.0 Cost Performance Analysis

- {'solution': 'Amazon CloudWatch Logs', 'costPerGB': 'Pay-as-you-go', 'queryPerformance': 'Sufficient for specified requirements', 'operationalComplexity': 'low'}

## 6.4.0.0 Backup And Recovery

| Property | Value |
|----------|-------|
| Backup Frequency | N/A (Managed by AWS) |
| Recovery Time Objective | N/A |
| Recovery Point Objective | N/A |
| Testing Frequency | N/A |

## 6.5.0.0 Geo Distribution

### 6.5.1.0 Required

❌ No

### 6.5.2.0 Regions

*No items available*

### 6.5.3.0 Replication Strategy



## 6.6.0.0 Data Sovereignty

*No items available*

# 7.0.0.0 Access Control And Compliance

## 7.1.0.0 Access Control Requirements

- {'role': 'Developer', 'permissions': ['logs:DescribeLogGroups', 'logs:DescribeLogStreams', 'logs:GetLogEvents', 'logs:FilterLogEvents', 'logs:StartQuery', 'logs:GetQueryResults'], 'logTypes': ['Application Logs', 'API Gateway Access Logs'], 'justification': 'Provide read-only access to logs for troubleshooting and debugging purposes.'}

## 7.2.0.0 Sensitive Data Handling

- {'dataType': 'PII (e.g., email address)', 'handlingStrategy': 'exclude', 'fields': ['email'], 'complianceRequirement': 'GDPR/CCPA (REQ-1-074)'}

## 7.3.0.0 Encryption Requirements

### 7.3.1.0 In Transit

| Property | Value |
|----------|-------|
| Required | ✅ |
| Protocol | TLS (Managed by AWS) |
| Certificate Management | Managed by AWS |

### 7.3.2.0 At Rest

| Property | Value |
|----------|-------|
| Required | ✅ |
| Algorithm | AES-256 (Managed by AWS) |
| Key Management | AWS KMS |

## 7.4.0.0 Audit Trail

| Property | Value |
|----------|-------|
| Log Access | ✅ |
| Retention Period | 90 days |
| Audit Log Location | AWS CloudTrail |
| Compliance Reporting | ❌ |

## 7.5.0.0 Regulatory Compliance

- {'regulation': 'GDPR', 'applicableComponents': ['User & Data Service', 'Amazon CloudWatch Logs'], 'specificRequirements': ['Right to be forgotten implies logs should have a finite retention period.', 'PII should not be logged unnecessarily.'], 'evidenceCollection': 'IAM policies, CloudWatch retention settings.'}

## 7.6.0.0 Data Protection Measures

- {'measure': 'Exclude PII from non-error logs', 'implementation': 'Code review and static analysis to prevent logging of sensitive data fields.', 'monitoringRequired': False}

# 8.0.0.0 Project Specific Logging Config

## 8.1.0.0 Logging Config

### 8.1.1.0 Level

🔹 INFO

### 8.1.2.0 Retention

30 days

### 8.1.3.0 Aggregation

Amazon CloudWatch Logs

### 8.1.4.0 Storage

Amazon CloudWatch Logs

### 8.1.5.0 Configuration

*No data available*

## 8.2.0.0 Component Configurations

### 8.2.1.0 Component

#### 8.2.1.1 Component

User & Data Service (NestJS/Pino)

#### 8.2.1.2 Log Level

INFO

#### 8.2.1.3 Output Format

JSON

#### 8.2.1.4 Destinations

- stdout

#### 8.2.1.5 Sampling

##### 8.2.1.5.1 Enabled

❌ No

##### 8.2.1.5.2 Rate

N/A

#### 8.2.1.6.0 Custom Fields

- correlationId
- serviceName

### 8.2.2.0.0 Component

#### 8.2.2.1.0 Component

Formula Execution Service (Lambda)

#### 8.2.2.2.0 Log Level

INFO

#### 8.2.2.3.0 Output Format

JSON

#### 8.2.2.4.0 Destinations

- stdout

#### 8.2.2.5.0 Sampling

##### 8.2.2.5.1 Enabled

❌ No

##### 8.2.2.5.2 Rate

N/A

#### 8.2.2.6.0 Custom Fields

- correlationId
- serviceName

## 8.3.0.0.0 Metrics

### 8.3.1.0.0 Custom Metrics

*No data available*

## 8.4.0.0.0 Alert Rules

### 8.4.1.0.0 APIGateway5xxErrorRate

#### 8.4.1.1.0 Name

APIGateway5xxErrorRate

#### 8.4.1.2.0 Condition

SUM(5xxError) > 1% over 5 minutes

#### 8.4.1.3.0 Severity

Critical

#### 8.4.1.4.0 Actions

- {'type': 'SNS', 'target': 'DevelopmentTeamTopic', 'configuration': {}}

#### 8.4.1.5.0 Suppression Rules

*No items available*

#### 8.4.1.6.0 Escalation Path

*No items available*

### 8.4.2.0.0 FormulaExecutionErrorRate

#### 8.4.2.1.0 Name

FormulaExecutionErrorRate

#### 8.4.2.2.0 Condition

SUM(Errors) > 1% over 5 minutes

#### 8.4.2.3.0 Severity

High

#### 8.4.2.4.0 Actions

- {'type': 'SNS', 'target': 'DevelopmentTeamTopic', 'configuration': {}}

#### 8.4.2.5.0 Suppression Rules

*No items available*

#### 8.4.2.6.0 Escalation Path

*No items available*

# 9.0.0.0.0 Implementation Priority

## 9.1.0.0.0 Component

### 9.1.1.0.0 Component

Structured Logging in Backend Services (Pino)

### 9.1.2.0.0 Priority

🔴 high

### 9.1.3.0.0 Dependencies

*No items available*

### 9.1.4.0.0 Estimated Effort

Medium

### 9.1.5.0.0 Risk Level

low

## 9.2.0.0.0 Component

### 9.2.1.0.0 Component

CloudWatch Logs Configuration (IaC)

### 9.2.2.0.0 Priority

🔴 high

### 9.2.3.0.0 Dependencies

*No items available*

### 9.2.4.0.0 Estimated Effort

Low

### 9.2.5.0.0 Risk Level

low

## 9.3.0.0.0 Component

### 9.3.1.0.0 Component

Correlation ID Propagation Logic

### 9.3.2.0.0 Priority

🔴 high

### 9.3.3.0.0 Dependencies

- Structured Logging in Backend Services (Pino)

### 9.3.4.0.0 Estimated Effort

Medium

### 9.3.5.0.0 Risk Level

medium

# 10.0.0.0.0 Risk Assessment

## 10.1.0.0.0 Risk

### 10.1.1.0.0 Risk

Excessive logging volume impacts performance and cost.

### 10.1.2.0.0 Impact

medium

### 10.1.3.0.0 Probability

medium

### 10.1.4.0.0 Mitigation

Set default production log level to INFO. Conduct code reviews to ensure DEBUG/TRACE logs are not used in production code paths. Monitor CloudWatch ingestion costs.

### 10.1.5.0.0 Contingency Plan

Dynamically adjust log levels via configuration without redeploying the application.

## 10.2.0.0.0 Risk

### 10.2.1.0.0 Risk

Failure to propagate Correlation ID breaks distributed tracing.

### 10.2.2.0.0 Impact

high

### 10.2.3.0.0 Probability

low

### 10.2.4.0.0 Mitigation

Implement propagation logic in a centralized middleware in NestJS. Write automated integration tests that verify the presence and correctness of the correlation ID header in downstream calls.

### 10.2.5.0.0 Contingency Plan

Fall back to searching logs by other request-specific attributes (e.g., userId, unique input values) which is less efficient.

# 11.0.0.0.0 Recommendations

## 11.1.0.0.0 Category

### 11.1.1.0.0 Category

🔹 Implementation

### 11.1.2.0.0 Recommendation

Implement the structured logging standard and correlation ID propagation as a core, first-class feature of the backend services from the beginning of development.

### 11.1.3.0.0 Justification

REQ-1-067 makes this a non-negotiable requirement. Retrofitting observability is significantly more difficult and less effective than building it in from the start. It is essential for troubleshooting in a distributed system.

### 11.1.4.0.0 Priority

🔴 high

### 11.1.5.0.0 Implementation Notes

Create a NestJS middleware to extract the Correlation ID header from incoming requests and attach it to a request-scoped context that the Pino logger can automatically access.

## 11.2.0.0.0 Category

### 11.2.1.0.0 Category

🔹 Compliance

### 11.2.2.0.0 Recommendation

Establish and enforce a strict policy via code reviews and static analysis to prevent logging of PII (e.g., user email) at the INFO level.

### 11.2.3.0.0 Justification

This is a direct mitigation for compliance risks identified in REQ-1-074 (GDPR/CCPA). Proactive prevention is cheaper and safer than reactive data scrubbing.

### 11.2.4.0.0 Priority

🔴 high

### 11.2.5.0.0 Implementation Notes

Configure ESLint rules to flag the use of sensitive object properties within logger.info() calls.

