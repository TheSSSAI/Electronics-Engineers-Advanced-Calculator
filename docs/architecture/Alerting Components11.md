# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Technology Stack

- React
- NestJS
- PostgreSQL
- AWS ECS
- AWS Lambda
- Amazon API Gateway
- AWS Cognito

## 1.3 Metrics Configuration

- Amazon CloudWatch Metrics for AWS services (API Gateway, ECS, Lambda, RDS)
- Amazon CloudWatch RUM for frontend performance
- Amazon CloudWatch Logs with structured JSON logging
- AWS X-Ray for distributed tracing

## 1.4 Monitoring Needs

- Service Availability (Uptime)
- API & Service Performance (Latency)
- Frontend User Experience (Core Web Vitals)
- Resource Utilization (CPU, Memory, Connections)
- Application Error Rates
- Security & Authentication Health

## 1.5 Environment

production

# 2.0 Alert Condition And Threshold Design

## 2.1 Critical Metrics Alerts

### 2.1.1 Metric

#### 2.1.1.1 Metric

AWS/ApiGateway 5XXError Rate

#### 2.1.1.2 Condition

Average rate of server-side errors exceeds 1% over a 5-minute period.

#### 2.1.1.3 Threshold Type

static

#### 2.1.1.4 Value

> 0.01

#### 2.1.1.5 Justification

Directly measures service availability against the 99.9% uptime requirement (REQ-1-050).

#### 2.1.1.6 Business Impact

Critical. Indicates a partial or full service outage, preventing users from performing any actions.

### 2.1.2.0 Metric

#### 2.1.2.1 Metric

AWS/ApiGateway Latency (p95)

#### 2.1.2.2 Condition

95th percentile latency for data retrieval endpoints exceeds 200ms over a 5-minute period.

#### 2.1.2.3 Threshold Type

static

#### 2.1.2.4 Value

> 200ms

#### 2.1.2.5 Justification

Directly measures backend performance against the specified NFR (REQ-1-042).

#### 2.1.2.6 Business Impact

High. Degraded user experience, application feels slow and unresponsive.

### 2.1.3.0 Metric

#### 2.1.3.1 Metric

AWS/Lambda Error Rate (Formula Execution Service)

#### 2.1.3.2 Condition

Percentage of failed invocations exceeds 2% over a 5-minute period.

#### 2.1.3.3 Threshold Type

static

#### 2.1.3.4 Value

> 0.02

#### 2.1.3.5 Justification

A core feature (custom calculations) is failing, impacting a key user value proposition (REQ-1-018).

#### 2.1.3.6 Business Impact

High. Users cannot use their custom-created modes, leading to frustration and potential loss of trust.

### 2.1.4.0 Metric

#### 2.1.4.1 Metric

AWS/Lambda Duration (p95, Formula Execution Service)

#### 2.1.4.2 Condition

95th percentile execution duration exceeds 500ms over a 10-minute period.

#### 2.1.4.3 Threshold Type

static

#### 2.1.4.4 Value

> 500ms

#### 2.1.4.5 Justification

Directly measures the performance of the secure formula execution sandbox against its NFR (REQ-1-043).

#### 2.1.4.6 Business Impact

High. Custom mode calculations are slow, leading to a poor user experience.

### 2.1.5.0 Metric

#### 2.1.5.1 Metric

AWS/RDS CPUUtilization

#### 2.1.5.2 Condition

Average CPU utilization exceeds 85% for a sustained period of 15 minutes.

#### 2.1.5.3 Threshold Type

static

#### 2.1.5.4 Value

> 85%

#### 2.1.5.5 Justification

Proactively indicates database stress that will lead to severe performance degradation or an outage, violating REQ-1-042 and REQ-1-050.

#### 2.1.5.6 Business Impact

High to Critical. At-risk of system-wide slowdowns or complete data layer failure.

### 2.1.6.0 Metric

#### 2.1.6.1 Metric

AWS/ECS CPUUtilization

#### 2.1.6.2 Condition

Average CPU utilization of the User & Data Service exceeds 80% for a sustained period of 15 minutes.

#### 2.1.6.3 Threshold Type

static

#### 2.1.6.4 Value

> 80%

#### 2.1.6.5 Justification

Proactively indicates the core service is under stress and may become unresponsive or crash.

#### 2.1.6.6 Business Impact

Medium. Risk of performance degradation and potential service unavailability.

## 2.2.0.0 Threshold Strategies

- {'strategy': 'static', 'applicableMetrics': ['Error Rates', 'Latency Percentiles', 'Resource Utilization'], 'implementation': 'Thresholds are defined as fixed values in CloudWatch Alarms, directly derived from the non-functional requirements (NFRs) documented in the project.', 'advantages': ['Simple to implement and understand.', 'Directly maps to business and technical SLAs/SLOs.', 'Low rate of false positives if thresholds are well-defined.']}

## 2.3.0.0 Baseline Deviation Alerts

*No items available*

## 2.4.0.0 Predictive Alerts

*No items available*

## 2.5.0.0 Compound Conditions

- {'name': 'Service Outage with Unhealthy Host', 'conditions': ["ALARM('API_Gateway_High_5xx_Error_Rate')", "ALARM('ECS_Service_Unhealthy_Host_Count')"], 'logic': 'AND', 'timeWindow': '5 minutes', 'justification': 'Correlates a user-facing symptom (5xx errors) with a root cause (unhealthy ECS hosts) to provide immediate context to the on-call engineer, reducing diagnosis time.'}

# 3.0.0.0 Severity Level Classification

## 3.1.0.0 Severity Definitions

### 3.1.1.0 Level

#### 3.1.1.1 Level

🚨 Critical

#### 3.1.1.2 Criteria

System is down or a major, user-facing feature is completely unavailable. Significant data loss or security breach has occurred. Violates uptime SLO (REQ-1-050).

#### 3.1.1.3 Business Impact

Catastrophic impact on users and business reputation. Application is unusable.

#### 3.1.1.4 Customer Impact

Severe. All or a majority of users are unable to use the service.

#### 3.1.1.5 Response Time

< 5 minutes (acknowledgment)

#### 3.1.1.6 Escalation Required

✅ Yes

### 3.1.2.0 Level

#### 3.1.2.1 Level

🔴 High

#### 3.1.2.2 Criteria

A core feature is failing intermittently or for a subset of users. Significant performance degradation violating NFRs (REQ-1-042, REQ-1-043). Imminent risk of a critical failure (e.g., database connections exhausted).

#### 3.1.2.3 Business Impact

Significant impact. Core functionality is impaired, leading to user frustration and potential abandonment.

#### 3.1.2.4 Customer Impact

Significant. A large subset of users are impacted, or all users experience a severely degraded service.

#### 3.1.2.5 Response Time

< 15 minutes (acknowledgment)

#### 3.1.2.6 Escalation Required

✅ Yes

### 3.1.3.0 Level

#### 3.1.3.1 Level

🟡 Medium

#### 3.1.3.2 Criteria

Sustained high resource utilization indicating a potential future problem. A non-critical feature is failing. Frontend performance NFRs are breached (REQ-1-041).

#### 3.1.3.3 Business Impact

Moderate. User experience is affected, but core functionality remains available. Poses a risk if not addressed.

#### 3.1.3.4 Customer Impact

Moderate. Some users may be affected, or all users notice minor performance issues.

#### 3.1.3.5 Response Time

< 1 hour (acknowledgment)

#### 3.1.3.6 Escalation Required

❌ No

### 3.1.4.0 Level

#### 3.1.4.1 Level

⚠️ Warning

#### 3.1.4.2 Criteria

Anomalies, isolated errors, or metrics trending towards a threshold. Does not currently impact users but requires investigation.

#### 3.1.4.3 Business Impact

Low. No immediate user or business impact.

#### 3.1.4.4 Customer Impact

Minimal to none.

#### 3.1.4.5 Response Time

Business hours

#### 3.1.4.6 Escalation Required

❌ No

## 3.2.0.0 Business Impact Matrix

*No items available*

## 3.3.0.0 Customer Impact Criteria

*No items available*

## 3.4.0.0 Sla Violation Severity

*No items available*

## 3.5.0.0 System Health Severity

*No items available*

# 4.0.0.0 Notification Channel Strategy

## 4.1.0.0 Channel Configuration

### 4.1.1.0 Channel

#### 4.1.1.1 Channel

pagerduty

#### 4.1.1.2 Purpose

Primary on-call alerting for urgent, actionable incidents.

#### 4.1.1.3 Applicable Severities

- Critical
- High

#### 4.1.1.4 Time Constraints

24/7

#### 4.1.1.5 Configuration

*No data available*

### 4.1.2.0 Channel

#### 4.1.2.1 Channel

slack

#### 4.1.2.2 Purpose

Real-time incident communication and general alerting.

#### 4.1.2.3 Applicable Severities

- Critical
- High
- Medium
- Warning

#### 4.1.2.4 Time Constraints

24/7

#### 4.1.2.5 Configuration

##### 4.1.2.5.1 Channels

| Property | Value |
|----------|-------|
| Critical | #ops-alerts-critical |
| High | #ops-alerts-critical |
| Medium | #ops-alerts-medium |
| Warning | #ops-feed |

### 4.1.3.0.0 Channel

#### 4.1.3.1.0 Channel

jira

#### 4.1.3.2.0 Purpose

Automated ticket creation for tracking and post-mortem analysis.

#### 4.1.3.3.0 Applicable Severities

- Critical
- High
- Medium

#### 4.1.3.4.0 Time Constraints

24/7

#### 4.1.3.5.0 Configuration

*No data available*

### 4.1.4.0.0 Channel

#### 4.1.4.1.0 Channel

email

#### 4.1.4.2.0 Purpose

Fallback notification and summary reporting.

#### 4.1.4.3.0 Applicable Severities

- Critical
- High

#### 4.1.4.4.0 Time Constraints

24/7

#### 4.1.4.5.0 Configuration

*No data available*

## 4.2.0.0.0 Routing Rules

### 4.2.1.0.0 Condition

#### 4.2.1.1.0 Condition

Severity == 'Critical'

#### 4.2.1.2.0 Severity

Critical

#### 4.2.1.3.0 Alert Type

any

#### 4.2.1.4.0 Channels

- pagerduty
- slack
- jira
- email

#### 4.2.1.5.0 Priority

🔹 1

### 4.2.2.0.0 Condition

#### 4.2.2.1.0 Condition

Severity == 'High'

#### 4.2.2.2.0 Severity

High

#### 4.2.2.3.0 Alert Type

any

#### 4.2.2.4.0 Channels

- pagerduty
- slack
- jira

#### 4.2.2.5.0 Priority

🔹 2

### 4.2.3.0.0 Condition

#### 4.2.3.1.0 Condition

Severity == 'Medium'

#### 4.2.3.2.0 Severity

Medium

#### 4.2.3.3.0 Alert Type

any

#### 4.2.3.4.0 Channels

- slack
- jira

#### 4.2.3.5.0 Priority

🔹 3

## 4.3.0.0.0 Time Based Routing

*No items available*

## 4.4.0.0.0 Ticketing Integration

- {'system': 'jira', 'triggerConditions': ["Severity IN ('Critical', 'High', 'Medium')"], 'ticketPriority': 'Maps to alert severity', 'autoAssignment': True}

## 4.5.0.0.0 Emergency Notifications

*No items available*

## 4.6.0.0.0 Chat Platform Integration

*No items available*

# 5.0.0.0.0 Alert Correlation Implementation

## 5.1.0.0.0 Grouping Requirements

- {'groupingCriteria': 'CloudWatch Alarm Name, Service Name', 'timeWindow': '5 minutes', 'maxGroupSize': 0, 'suppressionStrategy': 'Group subsequent occurrences of the same alert into a single incident notification to reduce noise.'}

## 5.2.0.0.0 Parent Child Relationships

- {'parentCondition': "ALARM('RDS_Database_Under_Stress')", 'childConditions': ["ALARM('API_Availability_Degraded')"], 'suppressionDuration': 'While parent is firing', 'propagationRules': 'The notification for the child alert will be annotated with a message indicating the parent alert is also active, guiding the engineer to the likely root cause.'}

## 5.3.0.0.0 Topology Based Correlation

*No items available*

## 5.4.0.0.0 Time Window Correlation

*No items available*

## 5.5.0.0.0 Causal Relationship Detection

*No items available*

## 5.6.0.0.0 Maintenance Window Suppression

- {'maintenanceType': 'Planned Deployments, Database Migrations', 'suppressionScope': ['All alerts'], 'automaticDetection': False, 'manualOverride': True}

# 6.0.0.0.0 False Positive Mitigation

## 6.1.0.0.0 Noise Reduction Strategies

- {'strategy': 'Alerting on rates and sustained conditions, not single events.', 'implementation': 'CloudWatch Alarms are configured to evaluate metrics over a time period (e.g., average over 5 minutes) rather than firing on a single data point.', 'applicableAlerts': ['API_Availability_Degraded', 'ECS_Service_Resource_Exhaustion_Risk'], 'effectiveness': 'High'}

## 6.2.0.0.0 Confirmation Counts

- {'alertType': 'Resource Utilization', 'confirmationThreshold': 3, 'confirmationWindow': '15 minutes (3 datapoints over 5-minute periods)', 'resetCondition': 'Metric falls below threshold for 1 datapoint.'}

## 6.3.0.0.0 Dampening And Flapping

- {'metric': 'ECS Service Health', 'dampeningPeriod': '10 minutes', 'flappingThreshold': 3, 'suppressionDuration': '30 minutes'}

## 6.4.0.0.0 Alert Validation

*No items available*

## 6.5.0.0.0 Smart Filtering

*No items available*

## 6.6.0.0.0 Quorum Based Alerting

*No items available*

# 7.0.0.0.0 On Call Management Integration

## 7.1.0.0.0 Escalation Paths

- {'severity': 'Critical', 'escalationLevels': [{'level': 1, 'recipients': ['Primary On-Call Engineer'], 'escalationTime': '10 minutes', 'requiresAcknowledgment': True}, {'level': 2, 'recipients': ['Secondary On-Call Engineer'], 'escalationTime': '15 minutes', 'requiresAcknowledgment': True}, {'level': 3, 'recipients': ['Engineering Manager'], 'escalationTime': '20 minutes', 'requiresAcknowledgment': True}], 'ultimateEscalation': 'Head of Engineering'}

## 7.2.0.0.0 Escalation Timeframes

*No items available*

## 7.3.0.0.0 On Call Rotation

- {'team': 'Backend Platform Team', 'rotationType': 'weekly', 'handoffTime': 'Monday 10:00 UTC', 'backupEscalation': 'Secondary On-Call Engineer'}

## 7.4.0.0.0 Acknowledgment Requirements

### 7.4.1.0.0 Severity

#### 7.4.1.1.0 Severity

Critical

#### 7.4.1.2.0 Acknowledgment Timeout

10 minutes

#### 7.4.1.3.0 Auto Escalation

✅ Yes

#### 7.4.1.4.0 Requires Comment

❌ No

### 7.4.2.0.0 Severity

#### 7.4.2.1.0 Severity

High

#### 7.4.2.2.0 Acknowledgment Timeout

15 minutes

#### 7.4.2.3.0 Auto Escalation

✅ Yes

#### 7.4.2.4.0 Requires Comment

❌ No

## 7.5.0.0.0 Incident Ownership

*No items available*

## 7.6.0.0.0 Follow The Sun Support

*No items available*

# 8.0.0.0.0 Project Specific Alerts Config

## 8.1.0.0.0 Alerts

### 8.1.1.0.0 API_Availability_Degraded

#### 8.1.1.1.0 Name

API_Availability_Degraded

#### 8.1.1.2.0 Description

Monitors the rate of server-side errors (5xx) from the API Gateway. A high rate indicates a major service outage.

#### 8.1.1.3.0 Condition

Average(AWS/ApiGateway 5XXError) > 0.01 for 5 minutes.

#### 8.1.1.4.0 Threshold

1%

#### 8.1.1.5.0 Severity

Critical

#### 8.1.1.6.0 Channels

- pagerduty
- slack
- jira

#### 8.1.1.7.0 Correlation

##### 8.1.1.7.1 Group Id

api-gateway

##### 8.1.1.7.2 Suppression Rules

- Suppress if RDS_Database_Under_Stress is active.

#### 8.1.1.8.0 Escalation

##### 8.1.1.8.1 Enabled

✅ Yes

##### 8.1.1.8.2 Escalation Time

10 minutes

##### 8.1.1.8.3 Escalation Path

- Primary On-Call
- Secondary On-Call
- Manager

#### 8.1.1.9.0 Suppression

| Property | Value |
|----------|-------|
| Maintenance Window | ✅ |
| Dependency Failure | ✅ |
| Manual Override | ✅ |

#### 8.1.1.10.0 Validation

##### 8.1.1.10.1 Confirmation Count

2

##### 8.1.1.10.2 Confirmation Window

5 minutes

#### 8.1.1.11.0 Remediation

##### 8.1.1.11.1 Automated Actions

*No items available*

##### 8.1.1.11.2 Runbook Url

🔗 [https://runbooks.example.com/api-availability-degraded](https://runbooks.example.com/api-availability-degraded)

##### 8.1.1.11.3 Troubleshooting Steps

- Check CloudWatch logs for the User & Data Service using the Correlation ID from a failed request.
- Inspect ECS service health and container logs.
- Verify RDS database health and connection counts.

### 8.1.2.0.0 API_Performance_Degraded_DataRetrieval

#### 8.1.2.1.0 Name

API_Performance_Degraded_DataRetrieval

#### 8.1.2.2.0 Description

Monitors the 95th percentile latency for data retrieval API endpoints.

#### 8.1.2.3.0 Condition

p95(AWS/ApiGateway Latency) > 200ms for 5 minutes.

#### 8.1.2.4.0 Threshold

200ms

#### 8.1.2.5.0 Severity

High

#### 8.1.2.6.0 Channels

- pagerduty
- slack
- jira

#### 8.1.2.7.0 Correlation

##### 8.1.2.7.1 Group Id

api-gateway-perf

##### 8.1.2.7.2 Suppression Rules

*No items available*

#### 8.1.2.8.0 Escalation

##### 8.1.2.8.1 Enabled

✅ Yes

##### 8.1.2.8.2 Escalation Time

15 minutes

##### 8.1.2.8.3 Escalation Path

- Primary On-Call
- Secondary On-Call

#### 8.1.2.9.0 Suppression

| Property | Value |
|----------|-------|
| Maintenance Window | ✅ |
| Dependency Failure | ❌ |
| Manual Override | ✅ |

#### 8.1.2.10.0 Validation

##### 8.1.2.10.1 Confirmation Count

2

##### 8.1.2.10.2 Confirmation Window

5 minutes

#### 8.1.2.11.0 Remediation

##### 8.1.2.11.1 Automated Actions

*No items available*

##### 8.1.2.11.2 Runbook Url

🔗 [https://runbooks.example.com/api-performance-degraded](https://runbooks.example.com/api-performance-degraded)

##### 8.1.2.11.3 Troubleshooting Steps

- Use AWS X-Ray to trace slow requests and identify the bottleneck service.
- Check RDS for slow queries or high CPU utilization.
- Inspect ECS service for resource constraints (CPU/Memory).

### 8.1.3.0.0 FormulaExecution_Service_Failure_Rate

#### 8.1.3.1.0 Name

FormulaExecution_Service_Failure_Rate

#### 8.1.3.2.0 Description

Monitors the error rate of the secure formula execution Lambda.

#### 8.1.3.3.0 Condition

Sum(AWS/Lambda Errors) / Sum(AWS/Lambda Invocations) > 0.02 for 5 minutes.

#### 8.1.3.4.0 Threshold

2%

#### 8.1.3.5.0 Severity

High

#### 8.1.3.6.0 Channels

- pagerduty
- slack
- jira

#### 8.1.3.7.0 Correlation

##### 8.1.3.7.1 Group Id

formula-lambda

##### 8.1.3.7.2 Suppression Rules

*No items available*

#### 8.1.3.8.0 Escalation

##### 8.1.3.8.1 Enabled

✅ Yes

##### 8.1.3.8.2 Escalation Time

15 minutes

##### 8.1.3.8.3 Escalation Path

- Primary On-Call
- Secondary On-Call

#### 8.1.3.9.0 Suppression

| Property | Value |
|----------|-------|
| Maintenance Window | ✅ |
| Dependency Failure | ❌ |
| Manual Override | ✅ |

#### 8.1.3.10.0 Validation

##### 8.1.3.10.1 Confirmation Count

0

##### 8.1.3.10.2 Confirmation Window



#### 8.1.3.11.0 Remediation

##### 8.1.3.11.1 Automated Actions

*No items available*

##### 8.1.3.11.2 Runbook Url

🔗 [https://runbooks.example.com/formula-lambda-failures](https://runbooks.example.com/formula-lambda-failures)

##### 8.1.3.11.3 Troubleshooting Steps

- Check CloudWatch logs for the Lambda function for exceptions.
- Review recent code deployments for breaking changes.
- Verify IAM permissions and Lambda configuration.

### 8.1.4.0.0 RDS_Database_Under_Stress

#### 8.1.4.1.0 Name

RDS_Database_Under_Stress

#### 8.1.4.2.0 Description

Monitors sustained high CPU utilization or a high number of database connections.

#### 8.1.4.3.0 Condition

Average(AWS/RDS CPUUtilization) > 85% for 15 minutes OR Average(AWS/RDS DatabaseConnections) > (MaxConnections * 0.85) for 5 minutes.

#### 8.1.4.4.0 Threshold

85% CPU or 85% Connections

#### 8.1.4.5.0 Severity

High

#### 8.1.4.6.0 Channels

- pagerduty
- slack
- jira

#### 8.1.4.7.0 Correlation

##### 8.1.4.7.1 Group Id

database

##### 8.1.4.7.2 Suppression Rules

*No items available*

#### 8.1.4.8.0 Escalation

##### 8.1.4.8.1 Enabled

✅ Yes

##### 8.1.4.8.2 Escalation Time

15 minutes

##### 8.1.4.8.3 Escalation Path

- Primary On-Call
- Secondary On-Call

#### 8.1.4.9.0 Suppression

| Property | Value |
|----------|-------|
| Maintenance Window | ✅ |
| Dependency Failure | ❌ |
| Manual Override | ✅ |

#### 8.1.4.10.0 Validation

##### 8.1.4.10.1 Confirmation Count

3

##### 8.1.4.10.2 Confirmation Window

15 minutes

#### 8.1.4.11.0 Remediation

##### 8.1.4.11.1 Automated Actions

*No items available*

##### 8.1.4.11.2 Runbook Url

🔗 [https://runbooks.example.com/rds-stress](https://runbooks.example.com/rds-stress)

##### 8.1.4.11.3 Troubleshooting Steps

- Use RDS Performance Insights to identify slow or resource-intensive queries.
- Check for unexpected spikes in application traffic.
- Consider scaling the RDS instance if load is legitimate.

### 8.1.5.0.0 RUM_LCP_Performance_Degraded

#### 8.1.5.1.0 Name

RUM_LCP_Performance_Degraded

#### 8.1.5.2.0 Description

Monitors the 75th percentile Largest Contentful Paint (LCP) from real user data.

#### 8.1.5.3.0 Condition

p75(CloudWatch RUM Lcp) > 2500ms over a 1-hour period.

#### 8.1.5.4.0 Threshold

2.5s

#### 8.1.5.5.0 Severity

Medium

#### 8.1.5.6.0 Channels

- slack
- jira

#### 8.1.5.7.0 Correlation

##### 8.1.5.7.1 Group Id

frontend-perf

##### 8.1.5.7.2 Suppression Rules

*No items available*

#### 8.1.5.8.0 Escalation

##### 8.1.5.8.1 Enabled

❌ No

##### 8.1.5.8.2 Escalation Time



##### 8.1.5.8.3 Escalation Path

*No items available*

#### 8.1.5.9.0 Suppression

| Property | Value |
|----------|-------|
| Maintenance Window | ✅ |
| Dependency Failure | ❌ |
| Manual Override | ✅ |

#### 8.1.5.10.0 Validation

##### 8.1.5.10.1 Confirmation Count

0

##### 8.1.5.10.2 Confirmation Window



#### 8.1.5.11.0 Remediation

##### 8.1.5.11.1 Automated Actions

*No items available*

##### 8.1.5.11.2 Runbook Url

🔗 [https://runbooks.example.com/frontend-lcp-degraded](https://runbooks.example.com/frontend-lcp-degraded)

##### 8.1.5.11.3 Troubleshooting Steps

- Analyze CloudWatch RUM data to identify if degradation is tied to a specific browser, region, or page.
- Review recent frontend deployments for large asset additions or blocking JavaScript.
- Check backend API performance for corresponding slowdowns.

## 8.2.0.0.0 Alert Groups

*No items available*

## 8.3.0.0.0 Notification Templates

*No items available*

# 9.0.0.0.0 Implementation Priority

## 9.1.0.0.0 Component

### 9.1.1.0.0 Component

Availability & Core Backend Performance Alerts

### 9.1.2.0.0 Priority

🔴 high

### 9.1.3.0.0 Dependencies

- CloudWatch Metrics for API Gateway, ECS, Lambda, RDS

### 9.1.4.0.0 Estimated Effort

Low (Terraform config)

### 9.1.5.0.0 Risk Level

low

## 9.2.0.0.0 Component

### 9.2.1.0.0 Component

Frontend Performance (RUM) Alerts

### 9.2.2.0.0 Priority

🟡 medium

### 9.2.3.0.0 Dependencies

- CloudWatch RUM agent deployed to SPA

### 9.2.4.0.0 Estimated Effort

Low

### 9.2.5.0.0 Risk Level

low

## 9.3.0.0.0 Component

### 9.3.1.0.0 Component

Alert Correlation & On-Call Integration

### 9.3.2.0.0 Priority

🟡 medium

### 9.3.3.0.0 Dependencies

- PagerDuty integration

### 9.3.4.0.0 Estimated Effort

Medium

### 9.3.5.0.0 Risk Level

medium

# 10.0.0.0.0 Risk Assessment

## 10.1.0.0.0 Risk

### 10.1.1.0.0 Risk

Alert Fatigue

### 10.1.2.0.0 Impact

high

### 10.1.3.0.0 Probability

medium

### 10.1.4.0.0 Mitigation

Start with only the most critical, highest-signal alerts defined here. Avoid adding lower-severity or 'nice-to-have' alerts until the initial set is stable. Aggressively tune thresholds and suppression rules during the first month of operation based on feedback from the on-call team.

### 10.1.5.0.0 Contingency Plan

Conduct a bi-weekly alert review meeting to disable, tune, or delete noisy alerts.

## 10.2.0.0.0 Risk

### 10.2.1.0.0 Risk

Missing Runbooks

### 10.2.2.0.0 Impact

medium

### 10.2.3.0.0 Probability

high

### 10.2.4.0.0 Mitigation

Make the creation of a draft runbook a mandatory part of implementing any new alert. The runbook should at a minimum link to the relevant service dashboard and list initial troubleshooting steps.

### 10.2.5.0.0 Contingency Plan

The on-call engineer will have to rely on system knowledge and dashboards, increasing Mean Time to Resolution (MTTR).

# 11.0.0.0.0 Recommendations

## 11.1.0.0.0 Category

### 11.1.1.0.0 Category

🔹 Process

### 11.1.2.0.0 Recommendation

Implement a formal incident response process, including defining incident commander roles and communication protocols.

### 11.1.3.0.0 Justification

Having alerts is only half the battle. A defined process ensures that when a critical alert fires, the team can respond in an organized and effective manner, minimizing MTTR and business impact.

### 11.1.4.0.0 Priority

🔴 high

### 11.1.5.0.0 Implementation Notes

Start with a simple process documented in a wiki and conduct a lightweight post-mortem for every Critical and High severity incident.

## 11.2.0.0.0 Category

### 11.2.1.0.0 Category

🔹 Tooling

### 11.2.2.0.0 Recommendation

Develop a centralized 'Health Dashboard' in CloudWatch.

### 11.2.3.0.0 Justification

A single dashboard showing the status of all key alerts and associated metrics provides a one-glance overview of system health. This is the first place an on-call engineer should look when an alert fires.

### 11.2.4.0.0 Priority

🔴 high

### 11.2.5.0.0 Implementation Notes

This can be defined as code using Terraform alongside the CloudWatch Alarms for consistency.

