# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Technology Stack

- React
- TypeScript
- Node.js
- NestJS
- PostgreSQL
- AWS ECS
- AWS Lambda
- Amazon API Gateway

## 1.3 Monitoring Components

- Amazon CloudWatch Logs
- Amazon CloudWatch Metrics
- Amazon CloudWatch RUM
- AWS X-Ray

## 1.4 Requirements

- REQ-1-041 (Frontend LCP < 2.5s)
- REQ-1-042 (API P95 Latency < 200ms)
- REQ-1-043 (Formula P95 Latency < 500ms)
- REQ-1-050 (Uptime 99.9%)
- REQ-1-067 (Structured Logging)
- REQ-1-068 (Critical Event Alerting)

## 1.5 Environment

production

# 2.0 Standard System Metrics Selection

## 2.1 Hardware Utilization Metrics

### 2.1.1 gauge

#### 2.1.1.1 Name

aws.ecs.cpu.utilization

#### 2.1.1.2 Type

🔹 gauge

#### 2.1.1.3 Unit

percent

#### 2.1.1.4 Description

CPU utilization for the User & Data Service running on ECS Fargate.

#### 2.1.1.5 Collection

##### 2.1.1.5.1 Interval

60s

##### 2.1.1.5.2 Method

CloudWatch Agentless

#### 2.1.1.6.0 Thresholds

##### 2.1.1.6.1 Warning

> 70%

##### 2.1.1.6.2 Critical

> 80%

#### 2.1.1.7.0 Justification

Required by REQ-1-068 for critical resource utilization alerting.

### 2.1.2.0.0 gauge

#### 2.1.2.1.0 Name

aws.ecs.memory.utilization

#### 2.1.2.2.0 Type

🔹 gauge

#### 2.1.2.3.0 Unit

percent

#### 2.1.2.4.0 Description

Memory utilization for the User & Data Service running on ECS Fargate.

#### 2.1.2.5.0 Collection

##### 2.1.2.5.1 Interval

60s

##### 2.1.2.5.2 Method

CloudWatch Agentless

#### 2.1.2.6.0 Thresholds

##### 2.1.2.6.1 Warning

> 70%

##### 2.1.2.6.2 Critical

> 80%

#### 2.1.2.7.0 Justification

Required by REQ-1-068 for critical resource utilization alerting and to detect potential memory leaks.

### 2.1.3.0.0 gauge

#### 2.1.3.1.0 Name

aws.rds.cpu.utilization

#### 2.1.3.2.0 Type

🔹 gauge

#### 2.1.3.3.0 Unit

percent

#### 2.1.3.4.0 Description

CPU utilization for the PostgreSQL database instance.

#### 2.1.3.5.0 Collection

##### 2.1.3.5.1 Interval

60s

##### 2.1.3.5.2 Method

CloudWatch Agentless

#### 2.1.3.6.0 Thresholds

##### 2.1.3.6.1 Warning

> 75%

##### 2.1.3.6.2 Critical

> 85%

#### 2.1.3.7.0 Justification

Essential for database health monitoring and capacity planning.

## 2.2.0.0.0 Runtime Metrics

### 2.2.1.0.0 gauge

#### 2.2.1.1.0 Name

nodejs.eventloop.lag

#### 2.2.1.2.0 Type

🔹 gauge

#### 2.2.1.3.0 Unit

milliseconds

#### 2.2.1.4.0 Description

Measures the event loop lag for the User & Data Service, indicating if the main thread is blocked.

#### 2.2.1.5.0 Technology

Node.js

#### 2.2.1.6.0 Collection

##### 2.2.1.6.1 Interval

10s

##### 2.2.1.6.2 Method

Custom Metric (via Pino logger or dedicated agent)

#### 2.2.1.7.0 Criticality

high

### 2.2.2.0.0 histogram

#### 2.2.2.1.0 Name

aws.lambda.duration

#### 2.2.2.2.0 Type

🔹 histogram

#### 2.2.2.3.0 Unit

milliseconds

#### 2.2.2.4.0 Description

Execution duration for the Formula Execution Service Lambda.

#### 2.2.2.5.0 Technology

Node.js

#### 2.2.2.6.0 Collection

##### 2.2.2.6.1 Interval

on-invocation

##### 2.2.2.6.2 Method

CloudWatch Agentless

#### 2.2.2.7.0 Criticality

high

## 2.3.0.0.0 Request Response Metrics

### 2.3.1.0.0 histogram

#### 2.3.1.1.0 Name

aws.apigateway.latency

#### 2.3.1.2.0 Type

🔹 histogram

#### 2.3.1.3.0 Unit

milliseconds

#### 2.3.1.4.0 Description

End-to-end latency for all API requests, from the time the request is received by API Gateway to when the response is sent.

#### 2.3.1.5.0 Dimensions

- ApiName
- Resource
- Method

#### 2.3.1.6.0 Percentiles

- p95
- p99

#### 2.3.1.7.0 Collection

##### 2.3.1.7.1 Interval

60s

##### 2.3.1.7.2 Method

CloudWatch Agentless

### 2.3.2.0.0 gauge

#### 2.3.2.1.0 Name

aws.apigateway.5xx.error.rate

#### 2.3.2.2.0 Type

🔹 gauge

#### 2.3.2.3.0 Unit

percent

#### 2.3.2.4.0 Description

The percentage of requests that result in a server-side error (5xx status code).

#### 2.3.2.5.0 Dimensions

- ApiName

#### 2.3.2.6.0 Percentiles

*No items available*

#### 2.3.2.7.0 Collection

##### 2.3.2.7.1 Interval

60s

##### 2.3.2.7.2 Method

CloudWatch Agentless

## 2.4.0.0.0 Availability Metrics

- {'name': 'system.uptime.percentage', 'type': 'gauge', 'unit': 'percent', 'description': 'Calculated service availability based on the success rate of API calls.', 'calculation': '100 - (aws.apigateway.5xx.error.count / aws.apigateway.count) * 100', 'slaTarget': '99.9%'}

## 2.5.0.0.0 Scalability Metrics

- {'name': 'aws.ecs.service.running.task.count', 'type': 'gauge', 'unit': 'count', 'description': 'The number of running tasks for the User & Data Service, used to monitor auto-scaling activity.', 'capacityThreshold': 'Defined by auto-scaling policy', 'autoScalingTrigger': True}

# 3.0.0.0.0 Application Specific Metrics Design

## 3.1.0.0.0 Transaction Metrics

- {'name': 'app.formula.execution', 'type': 'timer', 'unit': 'milliseconds', 'description': 'Measures the execution time of a user-defined formula within the secure sandbox.', 'business_context': 'Core feature performance monitoring.', 'dimensions': ['success'], 'collection': {'interval': 'on-invocation', 'method': 'Custom Metric via EMF'}, 'aggregation': {'functions': ['avg', 'p95', 'p99'], 'window': '60s'}}

## 3.2.0.0.0 Cache Performance Metrics

- {'name': 'app.cache.hit.ratio', 'type': 'gauge', 'unit': 'percent', 'description': 'The ratio of cache hits to total cache lookups for the Redis cache.', 'cacheType': 'Redis', 'hitRatioTarget': '> 90%'}

## 3.3.0.0.0 External Dependency Metrics

- {'name': 'dependency.cognito.latency', 'type': 'histogram', 'unit': 'milliseconds', 'description': 'Latency of authentication and token validation calls to AWS Cognito.', 'dependency': 'AWS Cognito', 'circuitBreakerIntegration': False, 'sla': {'responseTime': '< 300ms', 'availability': '99.9%'}}

## 3.4.0.0.0 Error Metrics

- {'name': 'app.formula.execution.error.count', 'type': 'counter', 'unit': 'count', 'description': 'Counts failures within the Formula Execution Service sandbox.', 'errorTypes': ['SandboxTimeout', 'SecurityViolation', 'SyntaxError'], 'dimensions': ['errorType'], 'alertThreshold': '> 5 per minute'}

## 3.5.0.0.0 Throughput And Latency Metrics

- {'name': 'app.frontend.lcp.time', 'type': 'histogram', 'unit': 'seconds', 'description': 'Largest Contentful Paint (LCP) as measured from real user browsers.', 'percentiles': ['p75'], 'buckets': ['0-2.5', '2.5-4.0', '4.0+'], 'slaTargets': {'p75': '< 2.5s', 'p99': '< 4.0s'}}

# 4.0.0.0.0 Business Kpi Identification

## 4.1.0.0.0 Critical Business Metrics

- {'name': 'business.daily.active.users', 'type': 'gauge', 'unit': 'count', 'description': 'Number of unique users who have logged in within a 24-hour period.', 'businessOwner': 'Product Management', 'calculation': "COUNT(DISTINCT userId) FROM session_logs WHERE event_type = 'login' GROUP BY day", 'reportingFrequency': 'daily', 'target': 'N/A'}

## 4.2.0.0.0 User Engagement Metrics

### 4.2.1.0.0 counter

#### 4.2.1.1.0 Name

engagement.calculation.executed.count

#### 4.2.1.2.0 Type

🔹 counter

#### 4.2.1.3.0 Unit

count

#### 4.2.1.4.0 Description

Counts the number of calculations performed, segmented by calculator mode.

#### 4.2.1.5.0 Segmentation

- modeType (e.g., scientific, ohms_law, custom)

#### 4.2.1.6.0 Cohort Analysis

❌ No

### 4.2.2.0.0 counter

#### 4.2.2.1.0 Name

engagement.custom.mode.created.count

#### 4.2.2.2.0 Type

🔹 counter

#### 4.2.2.3.0 Unit

count

#### 4.2.2.4.0 Description

Total number of new custom calculation modes created by users.

#### 4.2.2.5.0 Segmentation

*No items available*

#### 4.2.2.6.0 Cohort Analysis

❌ No

## 4.3.0.0.0 Conversion Metrics

*No items available*

## 4.4.0.0.0 Operational Efficiency Kpis

*No items available*

## 4.5.0.0.0 Revenue And Cost Metrics

*No items available*

## 4.6.0.0.0 Customer Satisfaction Indicators

*No items available*

# 5.0.0.0.0 Collection Interval Optimization

## 5.1.0.0.0 Sampling Frequencies

### 5.1.1.0.0 Metric Category

#### 5.1.1.1.0 Metric Category

Standard Infrastructure

#### 5.1.1.2.0 Interval

60s

#### 5.1.1.3.0 Justification

Standard CloudWatch interval, provides a good balance between visibility and cost.

#### 5.1.1.4.0 Resource Impact

low

### 5.1.2.0.0 Metric Category

#### 5.1.2.1.0 Metric Category

Application-Level Custom

#### 5.1.2.2.0 Interval

on-event

#### 5.1.2.3.0 Justification

Application metrics are pushed as they occur for real-time visibility.

#### 5.1.2.4.0 Resource Impact

low

## 5.2.0.0.0 High Frequency Metrics

- {'name': 'aws.apigateway.latency', 'interval': '10s', 'criticality': 'high', 'costJustification': "Enabling high-resolution metrics is justified by REQ-1-042's strict P95 latency requirement, allowing for faster detection of performance degradation."}

## 5.3.0.0.0 Cardinality Considerations

- {'metricName': 'engagement.calculation.executed.count', 'estimatedCardinality': 'low (<10)', 'dimensionStrategy': "Use a fixed, low-cardinality dimension 'modeType' instead of high-cardinality dimensions like 'userId' or 'modeId'.", 'mitigationApproach': 'Pre-defined dimension values to avoid cardinality explosion.'}

## 5.4.0.0.0 Aggregation Periods

- {'metricType': 'Performance', 'periods': ['1m', '5m', '1h'], 'retentionStrategy': 'Downsample after 14 days'}

## 5.5.0.0.0 Collection Methods

- {'method': 'real-time', 'applicableMetrics': ['app.formula.execution', 'engagement.calculation.executed.count'], 'implementation': 'AWS CloudWatch Embedded Metric Format (EMF) from Lambda and ECS services.', 'performance': 'high'}

# 6.0.0.0.0 Aggregation Method Selection

## 6.1.0.0.0 Statistical Aggregations

- {'metricName': 'aws.apigateway.latency', 'aggregationFunctions': ['avg', 'p95', 'p99', 'max'], 'windows': ['1m', '5m'], 'justification': 'P95 is required by REQ-1-042. Avg and Max provide additional operational insight.'}

## 6.2.0.0.0 Histogram Requirements

- {'metricName': 'app.frontend.lcp.time', 'buckets': ['2.5', '4.0'], 'percentiles': ['p75'], 'accuracy': 'Required to verify the Core Web Vital SLA in REQ-1-041.'}

## 6.3.0.0.0 Percentile Calculations

- {'metricName': 'aws.lambda.duration', 'percentiles': ['p95', 'p99'], 'algorithm': 'CloudWatch Percentiles', 'accuracy': 'Sufficient for monitoring against the 500ms P95 SLA in REQ-1-043.'}

## 6.4.0.0.0 Metric Types

### 6.4.1.0.0 aws.apigateway.5xx.error.rate

#### 6.4.1.1.0 Name

aws.apigateway.5xx.error.rate

#### 6.4.1.2.0 Implementation

gauge

#### 6.4.1.3.0 Reasoning

Represents the state of errors over a period, not a cumulative count.

#### 6.4.1.4.0 Resets Handling

Calculated by CloudWatch over the defined period.

### 6.4.2.0.0 engagement.custom.mode.created.count

#### 6.4.2.1.0 Name

engagement.custom.mode.created.count

#### 6.4.2.2.0 Implementation

counter

#### 6.4.2.3.0 Reasoning

Monotonically increasing value representing a cumulative business event.

#### 6.4.2.4.0 Resets Handling

Sum over time.

## 6.5.0.0.0 Dimensional Aggregation

- {'metricName': 'app.formula.execution.error.count', 'dimensions': ['errorType'], 'aggregationStrategy': "Sum counts for each unique 'errorType' value.", 'cardinalityImpact': 'Low, as error types are a fixed, small set.'}

## 6.6.0.0.0 Derived Metrics

- {'name': 'system.uptime.percentage', 'calculation': '100 - (SUM(aws.apigateway.5xx.error.count) / SUM(aws.apigateway.count)) * 100', 'sourceMetrics': ['aws.apigateway.5xx.error.count', 'aws.apigateway.count'], 'updateFrequency': '60s'}

# 7.0.0.0.0 Storage Requirements Planning

## 7.1.0.0.0 Retention Periods

### 7.1.1.0.0 Metric Type

#### 7.1.1.1.0 Metric Type

High-Resolution Performance

#### 7.1.1.2.0 Retention Period

15 Days

#### 7.1.1.3.0 Justification

Sufficient for short-term incident investigation and debugging.

#### 7.1.1.4.0 Compliance Requirement

None

### 7.1.2.0.0 Metric Type

#### 7.1.2.1.0 Metric Type

Aggregated Business

#### 7.1.2.2.0 Retention Period

395 Days (13 months)

#### 7.1.2.3.0 Justification

Allows for year-over-year analysis of business trends.

#### 7.1.2.4.0 Compliance Requirement

None

## 7.2.0.0.0 Data Resolution

### 7.2.1.0.0 Time Range

#### 7.2.1.1.0 Time Range

0-15 Days

#### 7.2.1.2.0 Resolution

1 Minute

#### 7.2.1.3.0 Query Performance

high

#### 7.2.1.4.0 Storage Optimization

Raw data for detailed analysis

### 7.2.2.0.0 Time Range

#### 7.2.2.1.0 Time Range

15-60 Days

#### 7.2.2.2.0 Resolution

5 Minutes

#### 7.2.2.3.0 Query Performance

medium

#### 7.2.2.4.0 Storage Optimization

Downsampled for medium-term trends

### 7.2.3.0.0 Time Range

#### 7.2.3.1.0 Time Range

60+ Days

#### 7.2.3.2.0 Resolution

1 Hour

#### 7.2.3.3.0 Query Performance

low

#### 7.2.3.4.0 Storage Optimization

Aggregated for long-term analysis at lower cost

## 7.3.0.0.0 Downsampling Strategies

- {'sourceResolution': '1 Minute', 'targetResolution': '5 Minutes', 'aggregationMethod': 'Average for gauges, Sum for counters', 'triggerCondition': 'After 15 days'}

## 7.4.0.0.0 Storage Performance

| Property | Value |
|----------|-------|
| Write Latency | < 1s |
| Query Latency | < 5s for dashboard widgets |
| Throughput Requirements | Handles peak load of 1000s of metrics per minute |
| Scalability Needs | Managed and scaled automatically by Amazon CloudWa... |

## 7.5.0.0.0 Query Optimization

- {'queryPattern': 'Troubleshooting recent incidents', 'optimizationStrategy': 'Query high-resolution (1-minute) data from the last 1-24 hours.', 'indexingRequirements': ['timestamp', 'metric_name', 'dimensions']}

## 7.6.0.0.0 Cost Optimization

- {'strategy': 'Metric Downsampling and Tiered Retention', 'implementation': 'Configure CloudWatch retention policies and potentially use Metric Streams to S3 for long-term, low-cost archival.', 'expectedSavings': '40-60% on metric storage costs', 'tradeoffs': 'Loss of high-resolution data for older time ranges.'}

# 8.0.0.0.0 Project Specific Metrics Config

## 8.1.0.0.0 Standard Metrics

*No items available*

## 8.2.0.0.0 Custom Metrics

*No items available*

## 8.3.0.0.0 Dashboard Metrics

*No items available*

# 9.0.0.0.0 Implementation Priority

## 9.1.0.0.0 Component

### 9.1.1.0.0 Component

API Gateway & Lambda Performance Metrics

### 9.1.2.0.0 Priority

🔴 high

### 9.1.3.0.0 Dependencies

*No items available*

### 9.1.4.0.0 Estimated Effort

Low (Standard AWS Metrics)

### 9.1.5.0.0 Risk Level

low

## 9.2.0.0.0 Component

### 9.2.1.0.0 Component

CloudWatch RUM for Frontend LCP

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

Application-Specific Error & Transaction Metrics

### 9.3.2.0.0 Priority

🟡 medium

### 9.3.3.0.0 Dependencies

- Structured Logging Implementation (Pino)

### 9.3.4.0.0 Estimated Effort

Medium

### 9.3.5.0.0 Risk Level

medium

## 9.4.0.0.0 Component

### 9.4.1.0.0 Component

Business & Engagement KPIs

### 9.4.2.0.0 Priority

🟢 low

### 9.4.3.0.0 Dependencies

- Application-Specific Error & Transaction Metrics

### 9.4.4.0.0 Estimated Effort

Medium

### 9.4.5.0.0 Risk Level

low

# 10.0.0.0.0 Risk Assessment

## 10.1.0.0.0 Risk

### 10.1.1.0.0 Risk

Alert Fatigue

### 10.1.2.0.0 Impact

medium

### 10.1.3.0.0 Probability

high

### 10.1.4.0.0 Mitigation

Set alert thresholds based on established baselines, not arbitrary numbers. Use composite alarms to reduce noise for related failures. Start with a small number of critical alerts (as per REQ-1-068) and add more only when an actionable runbook is created.

### 10.1.5.0.0 Contingency Plan

Temporarily disable noisy alarms and conduct a post-mortem to tune thresholds.

## 10.2.0.0.0 Risk

### 10.2.1.0.0 Risk

High Cardinality from Custom Metrics

### 10.2.2.0.0 Impact

medium

### 10.2.3.0.0 Probability

low

### 10.2.4.0.0 Mitigation

Enforce strict development guidelines to never include unbounded, high-cardinality values (e.g., user IDs, request IDs) as metric dimensions. Use a fixed, small set of values for dimensions like 'errorType'.

### 10.2.5.0.0 Contingency Plan

Implement a CloudWatch alarm on billing metrics to detect unexpected cost increases.

# 11.0.0.0.0 Recommendations

## 11.1.0.0.0 Category

### 11.1.1.0.0 Category

🔹 Observability Dashboards

### 11.1.2.0.0 Recommendation

Create a primary 'Service Health Dashboard' in Amazon CloudWatch.

### 11.1.3.0.0 Justification

Provides a single pane of glass for on-call engineers to quickly assess the health of the entire system. It directly supports meeting the NFRs for availability and performance.

### 11.1.4.0.0 Priority

🔴 high

### 11.1.5.0.0 Implementation Notes

Dashboard should include: API Gateway Latency (P95), API Gateway 5xx Rate, Lambda Duration (P95), Lambda Error Rate, ECS CPU/Memory Utilization, and RDS CPU Utilization.

## 11.2.0.0.0 Category

### 11.2.1.0.0 Category

🔹 Frontend Monitoring

### 11.2.2.0.0 Recommendation

Fully implement and configure Amazon CloudWatch RUM.

### 11.2.3.0.0 Justification

This is the only way to effectively measure and verify the client-side LCP performance requirement (REQ-1-041) based on real user data, and it provides invaluable insight into frontend errors.

### 11.2.4.0.0 Priority

🔴 high

### 11.2.5.0.0 Implementation Notes

Embed the RUM web client snippet in the React SPA's main HTML file. Configure to capture Core Web Vitals and JavaScript errors.

## 11.3.0.0.0 Category

### 11.3.1.0.0 Category

🔹 Logging & Tracing

### 11.3.2.0.0 Recommendation

Enforce the propagation of the Correlation ID (as the AWS X-Ray Trace ID) through all layers.

### 11.3.3.0.0 Justification

Directly fulfills REQ-1-067 and is critical for debugging issues in a distributed system. It allows developers to trace a single failed user request from the frontend, through the API Gateway, to the specific logs in the backend services.

### 11.3.4.0.0 Priority

🔴 high

### 11.3.5.0.0 Implementation Notes

Enable active tracing on API Gateway and Lambda. Use the AWS X-Ray SDK in the ECS service to automatically instrument downstream calls and inject the trace ID into Pino log messages.

