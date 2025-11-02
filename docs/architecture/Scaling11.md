# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Technology Stack

- React
- NestJS
- PostgreSQL
- AWS ECS
- AWS Lambda
- Terraform

## 1.3 Architecture Patterns

- Serverless Microservices Hybrid
- Single Page Application (SPA)

## 1.4 Resource Needs

- Containerized Compute (ECS)
- Serverless Functions (Lambda)
- Managed Relational Database (RDS)
- Content Delivery Network (CloudFront)

## 1.5 Performance Expectations

High availability (99.9%) with low latency API responses (<200ms P95) and fast frontend load times (<2.5s LCP).

## 1.6 Data Processing Volumes

Primarily transactional user data with low-to-moderate volume. No large-scale batch processing required.

# 2.0 Workload Characterization

## 2.1 Processing Resource Consumption

### 2.1.1 Operation

#### 2.1.1.1 Operation

User & Data Service (ECS)

#### 2.1.1.2 Cpu Pattern

bursty

#### 2.1.1.3 Cpu Utilization

| Property | Value |
|----------|-------|
| Baseline | 10-20% |
| Peak | 60-80% |
| Average | 30% |

#### 2.1.1.4 Memory Pattern

steady

#### 2.1.1.5 Memory Requirements

| Property | Value |
|----------|-------|
| Baseline | 512MB |
| Peak | 1.5GB |
| Growth | low |

#### 2.1.1.6 Io Characteristics

| Property | Value |
|----------|-------|
| Disk Iops | Low (ephemeral storage) |
| Network Throughput | High (to RDS) |
| Io Pattern | mixed |

### 2.1.2.0 Operation

#### 2.1.2.1 Operation

Formula Execution Service (Lambda)

#### 2.1.2.2 Cpu Pattern

event-driven

#### 2.1.2.3 Cpu Utilization

| Property | Value |
|----------|-------|
| Baseline | N/A |
| Peak | 100% during invocation |
| Average | N/A |

#### 2.1.2.4 Memory Pattern

steady

#### 2.1.2.5 Memory Requirements

| Property | Value |
|----------|-------|
| Baseline | 128MB |
| Peak | 256MB |
| Growth | none |

#### 2.1.2.6 Io Characteristics

| Property | Value |
|----------|-------|
| Disk Iops | None |
| Network Throughput | None (no network access) |
| Io Pattern | N/A |

## 2.2.0.0 Concurrency Requirements

*No items available*

## 2.3.0.0 Database Access Patterns

- {'accessType': 'mixed', 'connectionRequirements': 'Moderate, connection pooling required', 'queryComplexity': 'simple', 'transactionVolume': 'Moderate', 'cacheHitRatio': 'High (target for user data)'}

## 2.4.0.0 Frontend Resource Demands

- {'component': 'React SPA', 'renderingLoad': 'light', 'staticContentSize': '2-5MB', 'dynamicContentVolume': 'Low', 'userConcurrency': 'Targeting horizontal scalability'}

## 2.5.0.0 Load Patterns

- {'pattern': 'peak-trough', 'description': 'Load follows typical daily usage patterns, with peaks during business hours and troughs overnight.', 'frequency': 'daily', 'magnitude': 'Moderate', 'predictability': 'high'}

# 3.0.0.0 Scaling Strategy Design

## 3.1.0.0 Scaling Approaches

### 3.1.1.0 Component

#### 3.1.1.1 Component

User & Data Service (AWS ECS)

#### 3.1.1.2 Primary Strategy

horizontal

#### 3.1.1.3 Justification

Required by REQ-NFQ-001 to handle an increasing number of concurrent users without performance degradation. ECS Fargate is ideal for this.

#### 3.1.1.4 Limitations

- Dependent on database connection limits.

#### 3.1.1.5 Implementation

AWS Application Auto Scaling policies on the ECS Service.

### 3.1.2.0 Component

#### 3.1.2.1 Component

Formula Execution Service (AWS Lambda)

#### 3.1.2.2 Primary Strategy

horizontal

#### 3.1.2.3 Justification

AWS Lambda scales concurrency automatically based on incoming requests, which is inherent to the service and requires no specific configuration.

#### 3.1.2.4 Limitations

- Subject to AWS account concurrency limits.

#### 3.1.2.5 Implementation

Native AWS Lambda scaling model.

### 3.1.3.0 Component

#### 3.1.3.1 Component

PostgreSQL Database (Amazon RDS)

#### 3.1.3.2 Primary Strategy

vertical

#### 3.1.3.3 Justification

The primary method to scale a relational database is by increasing instance size (CPU/Memory/IOPS). Read replicas can be added for horizontal read scaling if required in the future, but are not in the initial scope.

#### 3.1.3.4 Limitations

- Requires downtime for instance type changes (minimized by Multi-AZ).
- Finite upper limit on instance size.

#### 3.1.3.5 Implementation

Manual or scheduled modification of the RDS instance class.

## 3.2.0.0 Instance Specifications

*No items available*

## 3.3.0.0 Multithreading Considerations

*No items available*

## 3.4.0.0 Specialized Hardware

*No items available*

## 3.5.0.0 Storage Scaling

*No items available*

## 3.6.0.0 Licensing Implications

*No items available*

# 4.0.0.0 Auto Scaling Trigger Metrics

## 4.1.0.0 Cpu Utilization Triggers

- {'component': 'User & Data Service (ECS)', 'scaleUpThreshold': 80, 'scaleDownThreshold': 40, 'evaluationPeriods': 3, 'dataPoints': 2, 'justification': 'Directly implements the alert threshold defined in REQ-MON-001. Scaling proactively prevents the service from becoming resource-starved and unresponsive.'}

## 4.2.0.0 Memory Consumption Triggers

- {'component': 'User & Data Service (ECS)', 'scaleUpThreshold': 80, 'scaleDownThreshold': 40, 'evaluationPeriods': 3, 'triggerCondition': 'used', 'justification': 'Directly implements the alert threshold defined in REQ-MON-001. Protects against performance degradation due to high memory pressure or potential memory leaks.'}

## 4.3.0.0 Database Connection Triggers

*No items available*

## 4.4.0.0 Queue Length Triggers

*No items available*

## 4.5.0.0 Response Time Triggers

*No items available*

## 4.6.0.0 Custom Metric Triggers

*No items available*

## 4.7.0.0 Disk Iotriggers

*No items available*

# 5.0.0.0 Scaling Limits And Safeguards

## 5.1.0.0 Instance Limits

- {'component': 'User & Data Service (ECS)', 'minInstances': 2, 'maxInstances': 10, 'justification': 'A minimum of 2 instances are required to meet the high availability requirement (REQ-NFR-001) of deploying across two Availability Zones. A maximum of 10 provides a safe upper bound to control costs while allowing for significant load increase.', 'costImplication': 'Sets a predictable range for compute costs.'}

## 5.2.0.0 Cooldown Periods

### 5.2.1.0 Action

#### 5.2.1.1 Action

scale-up

#### 5.2.1.2 Duration

300s

#### 5.2.1.3 Reasoning

Prevents the system from adding new instances too rapidly before the effect of a previous scale-up event is fully realized.

#### 5.2.1.4 Component

User & Data Service (ECS)

### 5.2.2.0 Action

#### 5.2.2.1 Action

scale-down

#### 5.2.2.2 Duration

600s

#### 5.2.2.3 Reasoning

A longer cooldown for scale-down prevents thrashing, where the system rapidly removes and then re-adds capacity in response to fluctuating load.

#### 5.2.2.4 Component

User & Data Service (ECS)

## 5.3.0.0 Scaling Step Sizes

*No items available*

## 5.4.0.0 Runaway Protection

*No items available*

## 5.5.0.0 Graceful Degradation

*No items available*

## 5.6.0.0 Resource Quotas

*No items available*

## 5.7.0.0 Workload Prioritization

*No items available*

# 6.0.0.0 Cost Optimization Strategy

## 6.1.0.0 Instance Right Sizing

*No items available*

## 6.2.0.0 Time Based Scaling

*No items available*

## 6.3.0.0 Instance Termination Policies

*No items available*

## 6.4.0.0 Spot Instance Strategies

- {'component': 'User & Data Service (ECS)', 'spotPercentage': 0, 'fallbackStrategy': 'On-Demand', 'interruptionHandling': 'N/A', 'costSavings': 'Spot instances are not recommended for the production user-facing service due to the 99.9% uptime requirement, but could be considered for `staging` or `dev` environments.'}

## 6.5.0.0 Reserved Instance Planning

- {'instanceType': 'Amazon RDS, AWS Fargate', 'reservationTerm': '1-year', 'utilizationForecast': 'Baseline load requires 2 Fargate tasks and 1 RDS instance running 24/7.', 'baselineInstances': 2, 'paymentOption': 'partial-upfront'}

## 6.6.0.0 Resource Tracking

*No items available*

## 6.7.0.0 Cleanup Policies

*No items available*

# 7.0.0.0 Load Testing And Validation

## 7.1.0.0 Baseline Metrics

*No items available*

## 7.2.0.0 Validation Procedures

- {'procedure': 'Perform load testing in the `staging` environment to validate that auto-scaling policies trigger correctly and that the system remains stable and performant under expected peak load.', 'frequency': 'Before every major release.', 'successCriteria': ['P95 API latency remains below 200ms.', 'ECS service scales out before CPU utilization exceeds 80% for a sustained period.', 'No increase in 5xx error rate during scaling events.'], 'failureActions': ['Halt deployment.', 'Review and tune scaling policies and/or instance sizes.']}

## 7.3.0.0 Synthetic Load Scenarios

*No items available*

## 7.4.0.0 Scaling Event Monitoring

*No items available*

## 7.5.0.0 Policy Refinement

*No items available*

## 7.6.0.0 Effectiveness Kpis

*No items available*

## 7.7.0.0 Feedback Mechanisms

*No items available*

# 8.0.0.0 Project Specific Scaling Policies

## 8.1.0.0 Policies

- {'id': 'ecs-user-data-service-cpu-scaling', 'type': 'Auto', 'component': 'User & Data Service (AWS ECS)', 'rules': [{'metric': 'CPUUtilization', 'threshold': 80, 'operator': 'GREATER_THAN_OR_EQUAL', 'scaleChange': 1, 'cooldown': {'scaleUpSeconds': 300, 'scaleDownSeconds': 0}, 'evaluationPeriods': 3, 'dataPointsToAlarm': 2}, {'metric': 'CPUUtilization', 'threshold': 40, 'operator': 'LESS_THAN', 'scaleChange': -1, 'cooldown': {'scaleUpSeconds': 0, 'scaleDownSeconds': 600}, 'evaluationPeriods': 5, 'dataPointsToAlarm': 4}], 'safeguards': {'minInstances': 2, 'maxInstances': 10, 'maxScalingRate': 'N/A', 'costThreshold': 'N/A'}, 'schedule': {'enabled': False, 'timezone': 'UTC', 'rules': []}}

## 8.2.0.0 Configuration

*No data available*

## 8.3.0.0 Environment Specific Policies

### 8.3.1.0 Environment

#### 8.3.1.1 Environment

production

#### 8.3.1.2 Scaling Enabled

✅ Yes

#### 8.3.1.3 Aggressiveness

moderate

#### 8.3.1.4 Cost Priority

balanced

### 8.3.2.0 Environment

#### 8.3.2.1 Environment

staging

#### 8.3.2.2 Scaling Enabled

✅ Yes

#### 8.3.2.3 Aggressiveness

aggressive

#### 8.3.2.4 Cost Priority

performance

### 8.3.3.0 Environment

#### 8.3.3.1 Environment

development

#### 8.3.3.2 Scaling Enabled

❌ No

#### 8.3.3.3 Aggressiveness

conservative

#### 8.3.3.4 Cost Priority

cost-optimized

# 9.0.0.0 Implementation Priority

## 9.1.0.0 Component

### 9.1.1.0 Component

Baseline Infrastructure (VPC, RDS, ECR)

### 9.1.2.0 Priority

🔴 high

### 9.1.3.0 Dependencies

*No items available*

### 9.1.4.0 Estimated Effort

Medium

### 9.1.5.0 Risk Level

low

## 9.2.0.0 Component

### 9.2.1.0 Component

ECS Service with Auto-Scaling

### 9.2.2.0 Priority

🔴 high

### 9.2.3.0 Dependencies

- Baseline Infrastructure

### 9.2.4.0 Estimated Effort

Medium

### 9.2.5.0 Risk Level

medium

## 9.3.0.0 Component

### 9.3.1.0 Component

Lambda Function Deployment

### 9.3.2.0 Priority

🔴 high

### 9.3.3.0 Dependencies

- Baseline Infrastructure

### 9.3.4.0 Estimated Effort

Low

### 9.3.5.0 Risk Level

low

## 9.4.0.0 Component

### 9.4.1.0 Component

CloudFront Distribution for SPA

### 9.4.2.0 Priority

🟡 medium

### 9.4.3.0 Dependencies

*No items available*

### 9.4.4.0 Estimated Effort

Low

### 9.4.5.0 Risk Level

low

# 10.0.0.0 Risk Assessment

## 10.1.0.0 Risk

### 10.1.1.0 Risk

Incorrectly configured scaling policies leading to service unavailability (failure to scale up) or excessive costs (failure to scale down).

### 10.1.2.0 Impact

high

### 10.1.3.0 Probability

medium

### 10.1.4.0 Mitigation

Thoroughly test scaling policies in a staging environment under simulated load. Set up CloudWatch alarms for both high utilization and low utilization to detect policy failures. Set a `maxInstances` safeguard to cap costs.

### 10.1.5.0 Contingency Plan

Manually adjust the desired count of the ECS service to stabilize the system, then debug the scaling policy.

## 10.2.0.0 Risk

### 10.2.1.0 Risk

Database becomes a bottleneck under load, preventing the containerized service from scaling effectively.

### 10.2.2.0 Impact

high

### 10.2.3.0 Probability

medium

### 10.2.4.0 Mitigation

Monitor RDS metrics (CPU, Connections, IOPS) alongside ECS metrics. Implement caching strategies for read-heavy workloads. Ensure the RDS instance is appropriately sized for the maximum number of ECS tasks.

### 10.2.5.0 Contingency Plan

Manually scale up the RDS instance class (vertical scaling). Activate read replicas if the bottleneck is read-specific.

# 11.0.0.0 Recommendations

## 11.1.0.0 Category

### 11.1.1.0 Category

🔹 Infrastructure as Code

### 11.1.2.0 Recommendation

All deployment components, including VPCs, subnets, security groups, ECS services, scaling policies, and IAM roles, must be defined as code using Terraform.

### 11.1.3.0 Justification

This is a mandatory requirement (REQ-1-051) and is critical for creating repeatable, version-controlled, and automated environments, reducing manual configuration errors.

### 11.1.4.0 Priority

🔴 high

### 11.1.5.0 Implementation Notes

Use Terraform workspaces to manage the state for `dev`, `staging`, and `prod` environments as specified in REQ-DEV-001.

## 11.2.0.0 Category

### 11.2.1.0 Category

🔹 High Availability

### 11.2.2.0 Recommendation

Ensure the VPC is configured with public and private subnets across at least two Availability Zones. The ECS service must be configured to place tasks in the subnets of both AZs, and the RDS instance must be deployed in a Multi-AZ configuration.

### 11.2.3.0 Justification

Directly implements the high availability requirement of REQ-NFR-001, providing resilience against the failure of a single AWS Availability Zone.

### 11.2.4.0 Priority

🔴 high

### 11.2.5.0 Implementation Notes

The Application Load Balancer for the ECS service must also be configured to span both Availability Zones.

## 11.3.0.0 Category

### 11.3.1.0 Category

🔹 CI/CD

### 11.3.2.0 Recommendation

The CI/CD pipeline in GitHub Actions should be configured to support a Blue/Green deployment strategy for the ECS User & Data Service.

### 11.3.3.0 Justification

Fulfills requirement REQ-TRN-001 for zero-downtime updates and immediate rollback capabilities for all releases after v1.0.

### 11.3.4.0 Priority

🟡 medium

### 11.3.5.0 Implementation Notes

This can be achieved using Terraform to manage two ECS task definitions and target groups, with the pipeline orchestrating traffic shifting at the Application Load Balancer listener rule level.

