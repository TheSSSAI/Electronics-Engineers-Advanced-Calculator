# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Technology Stack

- React/TypeScript
- Node.js/NestJS
- PostgreSQL
- AWS ECS
- AWS Lambda
- Amazon API Gateway
- Amazon RDS
- AWS Cognito
- Terraform
- GitHub Actions
- Docker

## 1.3 Architecture Patterns

- Serverless Microservices Hybrid
- Single Page Application (SPA)
- API Gateway

## 1.4 Data Handling Needs

- User personal data (email)
- User-generated content (custom modes, variables, history)
- Secure secret management

## 1.5 Performance Expectations

Strict NFRs on API latency (<200ms P95), formula execution (<500ms P95), and frontend load time (LCP < 2.5s).

## 1.6 Regulatory Requirements

- GDPR
- CCPA

# 2.0 Environment Strategy

## 2.1 Environment Types

### 2.1.1 Development

#### 2.1.1.1 Type

🔹 Development

#### 2.1.1.2 Purpose

Used by developers for feature development, unit testing, and initial integration testing.

#### 2.1.1.3 Usage Patterns

- CI/CD triggered deployments on feature branches
- Individual developer sandboxes

#### 2.1.1.4 Isolation Level

complete

#### 2.1.1.5 Data Policy

Anonymized/masked data only. Seed data generated via scripts.

#### 2.1.1.6 Lifecycle Management

Can be ephemeral, torn down and rebuilt frequently via IaC.

### 2.1.2.0 Staging

#### 2.1.2.1 Type

🔹 Staging

#### 2.1.2.2 Purpose

A production-like environment for User Acceptance Testing (UAT), end-to-end testing, and performance testing before release.

#### 2.1.2.3 Usage Patterns

- CI/CD triggered deployments on release candidate branches
- Pre-release validation by QA and product teams

#### 2.1.2.4 Isolation Level

complete

#### 2.1.2.5 Data Policy

Anonymized/masked subset of production data, restored periodically.

#### 2.1.2.6 Lifecycle Management

Persistent, but rebuildable from IaC.

### 2.1.3.0 Production

#### 2.1.3.1 Type

🔹 Production

#### 2.1.3.2 Purpose

The live environment serving end-users. All NFRs for availability, performance, and security are strictly enforced.

#### 2.1.3.3 Usage Patterns

- Serves all public user traffic
- Blue/Green deployments for zero-downtime releases

#### 2.1.3.4 Isolation Level

complete

#### 2.1.3.5 Data Policy

Live user data. Access is highly restricted and audited.

#### 2.1.3.6 Lifecycle Management

Persistent and long-lived.

### 2.1.4.0 DR

#### 2.1.4.1 Type

🔹 DR

#### 2.1.4.2 Purpose

Disaster Recovery environment in a secondary AWS region to meet RTO/RPO requirements in case of a primary region failure.

#### 2.1.4.3 Usage Patterns

- Passive (Warm Standby)
- Activated only upon declaration of a disaster

#### 2.1.4.4 Isolation Level

complete

#### 2.1.4.5 Data Policy

Asynchronously replicated production data.

#### 2.1.4.6 Lifecycle Management

Persistent, but minimal resource footprint until failover.

## 2.2.0.0 Promotion Strategy

### 2.2.1.0 Workflow

Development -> Staging -> Production

### 2.2.2.0 Approval Gates

- Automated tests pass in CI
- QA sign-off in Staging
- Product Owner sign-off in Staging

### 2.2.3.0 Automation Level

automated

### 2.2.4.0 Rollback Procedure

Automated rollback via CI/CD pipeline by redeploying the previous stable artifact. For Blue/Green, switch DNS back to the old environment.

## 2.3.0.0 Isolation Strategies

- {'environment': 'All', 'isolationType': 'complete', 'implementation': 'Use separate AWS Accounts per environment (e.g., Dev Account, Staging Account, Prod Account). This provides the strongest security and billing boundary.', 'justification': 'Prevents any possibility of cross-environment contamination, simplifies IAM policies, and aligns with AWS best practices for security and governance.'}

## 2.4.0.0 Scaling Approaches

### 2.4.1.0 Environment

#### 2.4.1.1 Environment

Development

#### 2.4.1.2 Scaling Type

vertical

#### 2.4.1.3 Triggers

- Manual developer request

#### 2.4.1.4 Limits

Fixed, small instance sizes to control costs.

### 2.4.2.0 Environment

#### 2.4.2.1 Environment

Staging

#### 2.4.2.2 Scaling Type

horizontal

#### 2.4.2.3 Triggers

- Performance testing scripts

#### 2.4.2.4 Limits

Scaled-down version of production auto-scaling rules.

### 2.4.3.0 Environment

#### 2.4.3.1 Environment

Production

#### 2.4.3.2 Scaling Type

auto

#### 2.4.3.3 Triggers

- CPU Utilization > 80%
- Memory Utilization > 80%
- Request Count

#### 2.4.3.4 Limits

Configured min/max task count to handle peak load while managing costs.

## 2.5.0.0 Provisioning Automation

| Property | Value |
|----------|-------|
| Tool | terraform |
| Templating | Use Terraform modules for reusable components (e.g... |
| State Management | Terraform Cloud or S3 backend with DynamoDB for st... |
| Cicd Integration | ✅ |

# 3.0.0.0 Resource Requirements Analysis

## 3.1.0.0 Workload Analysis

### 3.1.1.0 Workload Type

#### 3.1.1.1 Workload Type

User & Data Service API

#### 3.1.1.2 Expected Load

Primarily read-heavy with bursts of writes. Low to medium sustained traffic.

#### 3.1.1.3 Peak Capacity

1000 requests/minute

#### 3.1.1.4 Resource Profile

balanced

### 3.1.2.0 Workload Type

#### 3.1.2.1 Workload Type

Formula Execution Service

#### 3.1.2.2 Expected Load

Infrequent, short-lived bursts of computation.

#### 3.1.2.3 Peak Capacity

500 concurrent executions

#### 3.1.2.4 Resource Profile

cpu-intensive

## 3.2.0.0 Compute Requirements

### 3.2.1.0 Environment

#### 3.2.1.1 Environment

Development

#### 3.2.1.2 Instance Type

ECS Fargate (0.5 vCPU, 1GB RAM) / Lambda (256MB)

#### 3.2.1.3 Cpu Cores

0

#### 3.2.1.4 Memory Gb

0

#### 3.2.1.5 Instance Count

1

#### 3.2.1.6 Auto Scaling

##### 3.2.1.6.1 Enabled

❌ No

##### 3.2.1.6.2 Min Instances

1

##### 3.2.1.6.3 Max Instances

1

##### 3.2.1.6.4 Scaling Triggers

*No items available*

#### 3.2.1.7.0 Justification

Minimal resources for individual developer testing and cost control.

### 3.2.2.0.0 Environment

#### 3.2.2.1.0 Environment

Staging

#### 3.2.2.2.0 Instance Type

ECS Fargate (1 vCPU, 2GB RAM) / Lambda (256MB)

#### 3.2.2.3.0 Cpu Cores

0

#### 3.2.2.4.0 Memory Gb

0

#### 3.2.2.5.0 Instance Count

2

#### 3.2.2.6.0 Auto Scaling

##### 3.2.2.6.1 Enabled

✅ Yes

##### 3.2.2.6.2 Min Instances

2

##### 3.2.2.6.3 Max Instances

4

##### 3.2.2.6.4 Scaling Triggers

- CPUUtilization > 75%

#### 3.2.2.7.0 Justification

Sufficient to run UAT and performance tests that mirror production behavior.

### 3.2.3.0.0 Environment

#### 3.2.3.1.0 Environment

Production

#### 3.2.3.2.0 Instance Type

ECS Fargate (2 vCPU, 4GB RAM) / Lambda (256MB)

#### 3.2.3.3.0 Cpu Cores

0

#### 3.2.3.4.0 Memory Gb

0

#### 3.2.3.5.0 Instance Count

2

#### 3.2.3.6.0 Auto Scaling

##### 3.2.3.6.1 Enabled

✅ Yes

##### 3.2.3.6.2 Min Instances

2

##### 3.2.3.6.3 Max Instances

10

##### 3.2.3.6.4 Scaling Triggers

- CPUUtilization > 80%
- MemoryUtilization > 80%

#### 3.2.3.7.0 Justification

Sized for high availability and performance under expected load, with auto-scaling to handle peaks.

## 3.3.0.0.0 Storage Requirements

### 3.3.1.0.0 Environment

#### 3.3.1.1.0 Environment

Development

#### 3.3.1.2.0 Storage Type

ssd

#### 3.3.1.3.0 Capacity

20 GB

#### 3.3.1.4.0 Iops Requirements

General Purpose (gp3)

#### 3.3.1.5.0 Throughput Requirements

N/A

#### 3.3.1.6.0 Redundancy

Single-AZ

#### 3.3.1.7.0 Encryption

✅ Yes

### 3.3.2.0.0 Environment

#### 3.3.2.1.0 Environment

Staging

#### 3.3.2.2.0 Storage Type

ssd

#### 3.3.2.3.0 Capacity

100 GB

#### 3.3.2.4.0 Iops Requirements

Provisioned IOPS (io2) - 1000 IOPS

#### 3.3.2.5.0 Throughput Requirements

250 MiB/s

#### 3.3.2.6.0 Redundancy

Multi-AZ

#### 3.3.2.7.0 Encryption

✅ Yes

### 3.3.3.0.0 Environment

#### 3.3.3.1.0 Environment

Production

#### 3.3.3.2.0 Storage Type

ssd

#### 3.3.3.3.0 Capacity

200 GB (with auto-scaling)

#### 3.3.3.4.0 Iops Requirements

Provisioned IOPS (io2) - 3000 IOPS

#### 3.3.3.5.0 Throughput Requirements

500 MiB/s

#### 3.3.3.6.0 Redundancy

Multi-AZ

#### 3.3.3.7.0 Encryption

✅ Yes

## 3.4.0.0.0 Special Hardware Requirements

*No items available*

## 3.5.0.0.0 Scaling Strategies

- {'environment': 'Production', 'strategy': 'reactive', 'implementation': 'AWS Application Auto Scaling policies on ECS Services and provisioned concurrency on Lambda functions based on CloudWatch metrics.', 'costOptimization': 'Scale-in policies are configured to reduce resources during periods of low traffic.'}

# 4.0.0.0.0 Security Architecture

## 4.1.0.0.0 Authentication Controls

### 4.1.1.0.0 Method

#### 4.1.1.1.0 Method

sso

#### 4.1.1.2.0 Scope

User authentication to the application

#### 4.1.1.3.0 Implementation

AWS Cognito User Pools, as per REQ-FRU-001.

#### 4.1.1.4.0 Environment

All

### 4.1.2.0.0 Method

#### 4.1.2.1.0 Method

mfa

#### 4.1.2.2.0 Scope

IAM user access to AWS Accounts

#### 4.1.2.3.0 Implementation

Enforce MFA for all IAM users with console access, especially in Staging and Production.

#### 4.1.2.4.0 Environment

Staging, Production

## 4.2.0.0.0 Authorization Controls

- {'model': 'rbac', 'implementation': 'Application-level role-based access control to ensure users can only access their own data (REQ-NFS-001). IAM Roles for service-to-service communication (e.g., ECS task role).', 'granularity': 'fine-grained', 'environment': 'All'}

## 4.3.0.0.0 Certificate Management

| Property | Value |
|----------|-------|
| Authority | external |
| Rotation Policy | Managed and automated by AWS Certificate Manager (... |
| Automation | ✅ |
| Monitoring | ✅ |

## 4.4.0.0.0 Encryption Standards

### 4.4.1.0.0 Scope

#### 4.4.1.1.0 Scope

data-at-rest

#### 4.4.1.2.0 Algorithm

AES-256

#### 4.4.1.3.0 Key Management

AWS Key Management Service (KMS) for RDS and other storage services (REQ-NFS-001).

#### 4.4.1.4.0 Compliance

- GDPR
- CCPA

### 4.4.2.0.0 Scope

#### 4.4.2.1.0 Scope

data-in-transit

#### 4.4.2.2.0 Algorithm

TLS 1.2 minimum, TLS 1.3 preferred

#### 4.4.2.3.0 Key Management

AWS Certificate Manager (ACM).

#### 4.4.2.4.0 Compliance

- GDPR
- CCPA

## 4.5.0.0.0 Access Control Mechanisms

### 4.5.1.0.0 security-groups

#### 4.5.1.1.0 Type

🔹 security-groups

#### 4.5.1.2.0 Configuration

Stateful firewalls acting at the instance/container level to enforce least-privilege access between application tiers.

#### 4.5.1.3.0 Environment

All

#### 4.5.1.4.0 Rules

- Allow traffic from ALB to ECS on app port.
- Allow traffic from ECS to RDS on DB port.

### 4.5.2.0.0 waf

#### 4.5.2.1.0 Type

🔹 waf

#### 4.5.2.2.0 Configuration

AWS WAF attached to CloudFront and API Gateway to protect against common web exploits and implement rate limiting (REQ-NFS-001).

#### 4.5.2.3.0 Environment

Production

#### 4.5.2.4.0 Rules

- AWS Managed Rules for SQLi, XSS
- Rate-based rule to block IPs making excessive requests

## 4.6.0.0.0 Data Protection Measures

- {'dataType': 'pii', 'protectionMethod': 'masking|anonymization', 'implementation': 'Automated ETL script to copy and sanitize production data for Staging/Development environments.', 'compliance': ['GDPR', 'CCPA']}

## 4.7.0.0.0 Network Security

- {'control': 'ddos-protection', 'implementation': 'AWS Shield Standard is enabled by default. AWS Shield Advanced for Production.', 'rules': [], 'monitoring': True}

## 4.8.0.0.0 Security Monitoring

### 4.8.1.0.0 vulnerability-scanning

#### 4.8.1.1.0 Type

🔹 vulnerability-scanning

#### 4.8.1.2.0 Implementation

Amazon ECR container image scanning and Software Composition Analysis (SCA) integrated into the CI/CD pipeline (REQ-NFS-001).

#### 4.8.1.3.0 Frequency

On every code push

#### 4.8.1.4.0 Alerting

✅ Yes

### 4.8.2.0.0 siem

#### 4.8.2.1.0 Type

🔹 siem

#### 4.8.2.2.0 Implementation

AWS GuardDuty for threat detection. All logs (CloudTrail, VPC Flow Logs, etc.) forwarded to a central security account's CloudWatch Logs.

#### 4.8.2.3.0 Frequency

Continuous

#### 4.8.2.4.0 Alerting

✅ Yes

## 4.9.0.0.0 Backup Security

| Property | Value |
|----------|-------|
| Encryption | ✅ |
| Access Control | IAM policies restrict access to backup files and R... |
| Offline Storage | ❌ |
| Testing Frequency | Quarterly |

## 4.10.0.0.0 Compliance Frameworks

- {'framework': 'gdpr', 'applicableEnvironments': ['Production', 'Staging'], 'controls': ['Data encryption', 'Access controls', 'Data masking for non-prod', 'User data deletion process'], 'auditFrequency': 'Annually'}

# 5.0.0.0.0 Network Design

## 5.1.0.0.0 Network Segmentation

### 5.1.1.0.0 Environment

#### 5.1.1.1.0 Environment

All

#### 5.1.1.2.0 Segment Type

private

#### 5.1.1.3.0 Purpose

Application tier (ECS Tasks) and Data tier (RDS)

#### 5.1.1.4.0 Isolation

virtual

### 5.1.2.0.0 Environment

#### 5.1.2.1.0 Environment

All

#### 5.1.2.2.0 Segment Type

public

#### 5.1.2.3.0 Purpose

Web tier (Application Load Balancer / API Gateway)

#### 5.1.2.4.0 Isolation

virtual

## 5.2.0.0.0 Subnet Strategy

### 5.2.1.0.0 Environment

#### 5.2.1.1.0 Environment

Production

#### 5.2.1.2.0 Subnet Type

private

#### 5.2.1.3.0 Cidr Block

10.0.1.0/24

#### 5.2.1.4.0 Availability Zone

us-east-1a

#### 5.2.1.5.0 Routing Table

private-rt-a

### 5.2.2.0.0 Environment

#### 5.2.2.1.0 Environment

Production

#### 5.2.2.2.0 Subnet Type

public

#### 5.2.2.3.0 Cidr Block

10.0.101.0/24

#### 5.2.2.4.0 Availability Zone

us-east-1a

#### 5.2.2.5.0 Routing Table

public-rt

### 5.2.3.0.0 Environment

#### 5.2.3.1.0 Environment

Production

#### 5.2.3.2.0 Subnet Type

database

#### 5.2.3.3.0 Cidr Block

10.0.2.0/24

#### 5.2.3.4.0 Availability Zone

us-east-1a

#### 5.2.3.5.0 Routing Table

private-rt-a

## 5.3.0.0.0 Security Group Rules

### 5.3.1.0.0 Group Name

#### 5.3.1.1.0 Group Name

sg-alb

#### 5.3.1.2.0 Direction

inbound

#### 5.3.1.3.0 Protocol

tcp

#### 5.3.1.4.0 Port Range

443

#### 5.3.1.5.0 Source

0.0.0.0/0

#### 5.3.1.6.0 Purpose

Allow HTTPS traffic from the internet.

### 5.3.2.0.0 Group Name

#### 5.3.2.1.0 Group Name

sg-ecs

#### 5.3.2.2.0 Direction

inbound

#### 5.3.2.3.0 Protocol

tcp

#### 5.3.2.4.0 Port Range

3000

#### 5.3.2.5.0 Source

sg-alb

#### 5.3.2.6.0 Purpose

Allow traffic from the load balancer to the application.

### 5.3.3.0.0 Group Name

#### 5.3.3.1.0 Group Name

sg-rds

#### 5.3.3.2.0 Direction

inbound

#### 5.3.3.3.0 Protocol

tcp

#### 5.3.3.4.0 Port Range

5432

#### 5.3.3.5.0 Source

sg-ecs

#### 5.3.3.6.0 Purpose

Allow traffic from the application to the database.

## 5.4.0.0.0 Connectivity Requirements

- {'source': 'Lambda', 'destination': 'Internet', 'protocol': 'HTTPS', 'bandwidth': 'N/A', 'latency': 'N/A'}

## 5.5.0.0.0 Network Monitoring

- {'type': 'flow-logs', 'implementation': 'VPC Flow Logs enabled for all VPCs, with logs sent to CloudWatch Logs for analysis and threat detection.', 'alerting': True, 'retention': '90 days'}

## 5.6.0.0.0 Bandwidth Controls

*No items available*

## 5.7.0.0.0 Service Discovery

| Property | Value |
|----------|-------|
| Method | dns |
| Implementation | AWS Cloud Map for ECS service discovery. Amazon Ro... |
| Health Checks | ✅ |

## 5.8.0.0.0 Environment Communication

- {'sourceEnvironment': 'Production', 'targetEnvironment': 'DR', 'communicationType': 'replication', 'securityControls': ['VPC Peering', 'Encrypted traffic']}

# 6.0.0.0.0 Data Management Strategy

## 6.1.0.0.0 Data Isolation

- {'environment': 'All', 'isolationLevel': 'complete', 'method': 'separate-instances', 'justification': 'Each environment (Dev, Staging, Prod) will have its own dedicated RDS database instance to prevent data leakage and operational impact.'}

## 6.2.0.0.0 Backup And Recovery

### 6.2.1.0.0 Environment

#### 6.2.1.1.0 Environment

Production

#### 6.2.1.2.0 Backup Frequency

Daily automated snapshots

#### 6.2.1.3.0 Retention Period

14 days

#### 6.2.1.4.0 Recovery Time Objective

4 hours

#### 6.2.1.5.0 Recovery Point Objective

15 minutes

#### 6.2.1.6.0 Testing Schedule

Quarterly

### 6.2.2.0.0 Environment

#### 6.2.2.1.0 Environment

Staging

#### 6.2.2.2.0 Backup Frequency

Daily automated snapshots

#### 6.2.2.3.0 Retention Period

7 days

#### 6.2.2.4.0 Recovery Time Objective

24 hours

#### 6.2.2.5.0 Recovery Point Objective

24 hours

#### 6.2.2.6.0 Testing Schedule

Ad-hoc

## 6.3.0.0.0 Data Masking Anonymization

- {'environment': 'Staging', 'dataType': 'PII (email)', 'maskingMethod': 'static', 'coverage': 'complete', 'compliance': ['GDPR', 'CCPA']}

## 6.4.0.0.0 Migration Processes

- {'sourceEnvironment': 'Any', 'targetEnvironment': 'Any', 'migrationMethod': 'dump-restore', 'validation': 'Schema changes managed by TypeORM migration scripts, run automatically as part of the CI/CD pipeline (REQ-DAT-001).', 'rollbackPlan': 'Restore from pre-migration snapshot.'}

## 6.5.0.0.0 Retention Policies

- {'environment': 'Production', 'dataType': 'User Account Data', 'retentionPeriod': 'Deleted upon user request per REQ-FRU-001.', 'archivalMethod': 'Permanent deletion.', 'complianceRequirement': 'GDPR Right to Erasure'}

## 6.6.0.0.0 Data Classification

- {'classification': 'confidential', 'handlingRequirements': ['Encryption at rest and in transit', 'Strict access controls'], 'accessControls': ['IAM Roles', 'Database roles'], 'environments': ['Staging', 'Production']}

## 6.7.0.0.0 Disaster Recovery

- {'environment': 'Production', 'drSite': 'Secondary AWS Region', 'replicationMethod': 'asynchronous', 'failoverTime': '< 4 hours (RTO)', 'testingFrequency': 'Annually'}

# 7.0.0.0.0 Monitoring And Observability

## 7.1.0.0.0 Monitoring Components

### 7.1.1.0.0 Component

#### 7.1.1.1.0 Component

apm

#### 7.1.1.2.0 Tool

AWS X-Ray

#### 7.1.1.3.0 Implementation

Enabled on API Gateway and Lambda; X-Ray SDK integrated into NestJS service.

#### 7.1.1.4.0 Environments

- Staging
- Production

### 7.1.2.0.0 Component

#### 7.1.2.1.0 Component

infrastructure

#### 7.1.2.2.0 Tool

Amazon CloudWatch Metrics

#### 7.1.2.3.0 Implementation

Standard metrics for ECS, Lambda, RDS, API Gateway.

#### 7.1.2.4.0 Environments

- Staging
- Production

### 7.1.3.0.0 Component

#### 7.1.3.1.0 Component

logs

#### 7.1.3.2.0 Tool

Amazon CloudWatch Logs

#### 7.1.3.3.0 Implementation

Centralized structured JSON logs from all services.

#### 7.1.3.4.0 Environments

- Development
- Staging
- Production

### 7.1.4.0.0 Component

#### 7.1.4.1.0 Component

alerting

#### 7.1.4.2.0 Tool

Amazon CloudWatch Alarms & SNS

#### 7.1.4.3.0 Implementation

Alarms configured via Terraform for critical thresholds.

#### 7.1.4.4.0 Environments

- Staging
- Production

## 7.2.0.0.0 Environment Specific Thresholds

### 7.2.1.0.0 Environment

#### 7.2.1.1.0 Environment

Staging

#### 7.2.1.2.0 Metric

API Gateway 5xx Error Rate

#### 7.2.1.3.0 Warning Threshold

> 2% over 5 mins

#### 7.2.1.4.0 Critical Threshold

> 5% over 5 mins

#### 7.2.1.5.0 Justification

More lenient thresholds to accommodate testing activities.

### 7.2.2.0.0 Environment

#### 7.2.2.1.0 Environment

Production

#### 7.2.2.2.0 Metric

API Gateway 5xx Error Rate

#### 7.2.2.3.0 Warning Threshold

> 0.5% over 5 mins

#### 7.2.2.4.0 Critical Threshold

> 1% over 5 mins

#### 7.2.2.5.0 Justification

Strict thresholds to meet 99.9% uptime SLA (REQ-MON-001).

## 7.3.0.0.0 Metrics Collection

- {'category': 'application', 'metrics': ['API Latency (p95, p99)', 'Formula Execution Duration'], 'collectionInterval': '1 minute', 'retention': '15 months'}

## 7.4.0.0.0 Health Check Endpoints

- {'component': 'User & Data Service', 'endpoint': '/health', 'checkType': 'liveness', 'timeout': '5s', 'frequency': '30s'}

## 7.5.0.0.0 Logging Configuration

### 7.5.1.0.0 Environment

#### 7.5.1.1.0 Environment

Development

#### 7.5.1.2.0 Log Level

debug

#### 7.5.1.3.0 Destinations

- CloudWatch Logs

#### 7.5.1.4.0 Retention

7 days

#### 7.5.1.5.0 Sampling

100%

### 7.5.2.0.0 Environment

#### 7.5.2.1.0 Environment

Production

#### 7.5.2.2.0 Log Level

info

#### 7.5.2.3.0 Destinations

- CloudWatch Logs

#### 7.5.2.4.0 Retention

30 days

#### 7.5.2.5.0 Sampling

100%

## 7.6.0.0.0 Escalation Policies

- {'environment': 'Production', 'severity': 'Critical', 'escalationPath': ['Primary On-Call Engineer', 'Secondary On-Call Engineer', 'Engineering Manager'], 'timeouts': ['10 mins', '15 mins'], 'channels': ['PagerDuty', 'Slack']}

## 7.7.0.0.0 Dashboard Configurations

- {'dashboardType': 'operational', 'audience': 'On-call Engineers', 'refreshInterval': '1 minute', 'metrics': ['API Latency P95', 'API 5xx Error Rate', 'ECS CPU/Memory Utilization', 'RDS CPU Utilization', 'Lambda Error Rate']}

# 8.0.0.0.0 Project Specific Environments

## 8.1.0.0.0 Environments

### 8.1.1.0.0 Development

#### 8.1.1.1.0 Id

env-dev

#### 8.1.1.2.0 Name

Development

#### 8.1.1.3.0 Type

🔹 Development

#### 8.1.1.4.0 Provider

aws

#### 8.1.1.5.0 Region

us-east-1

#### 8.1.1.6.0 Configuration

| Property | Value |
|----------|-------|
| Instance Type | Fargate 0.5 vCPU |
| Auto Scaling | disabled |
| Backup Enabled | ❌ |
| Monitoring Level | basic |

#### 8.1.1.7.0 Security Groups

- sg-dev-alb
- sg-dev-ecs
- sg-dev-rds

#### 8.1.1.8.0 Network

##### 8.1.1.8.1 Vpc Id

vpc-dev

##### 8.1.1.8.2 Subnets

- subnet-dev-public-a
- subnet-dev-private-a

##### 8.1.1.8.3 Security Groups

*No items available*

##### 8.1.1.8.4 Internet Gateway

igw-dev

##### 8.1.1.8.5 Nat Gateway

nat-dev

#### 8.1.1.9.0 Monitoring

##### 8.1.1.9.1 Enabled

✅ Yes

##### 8.1.1.9.2 Metrics

- CPUUtilization

##### 8.1.1.9.3 Alerts

*No data available*

##### 8.1.1.9.4 Dashboards

*No items available*

#### 8.1.1.10.0 Compliance

##### 8.1.1.10.1 Frameworks

*No items available*

##### 8.1.1.10.2 Controls

*No items available*

##### 8.1.1.10.3 Audit Schedule

N/A

#### 8.1.1.11.0 Data Management

| Property | Value |
|----------|-------|
| Backup Schedule | N/A |
| Retention Policy | 7 days |
| Encryption Enabled | ✅ |
| Data Masking | ✅ |

### 8.1.2.0.0 Production

#### 8.1.2.1.0 Id

env-prod

#### 8.1.2.2.0 Name

Production

#### 8.1.2.3.0 Type

🔹 Production

#### 8.1.2.4.0 Provider

aws

#### 8.1.2.5.0 Region

us-east-1

#### 8.1.2.6.0 Configuration

| Property | Value |
|----------|-------|
| Instance Type | Fargate 2 vCPU |
| Auto Scaling | enabled |
| Backup Enabled | ✅ |
| Monitoring Level | enhanced |

#### 8.1.2.7.0 Security Groups

- sg-prod-alb
- sg-prod-ecs
- sg-prod-rds

#### 8.1.2.8.0 Network

##### 8.1.2.8.1 Vpc Id

vpc-prod

##### 8.1.2.8.2 Subnets

- subnet-prod-public-a
- subnet-prod-public-b
- subnet-prod-private-a
- subnet-prod-private-b
- subnet-prod-db-a
- subnet-prod-db-b

##### 8.1.2.8.3 Security Groups

*No items available*

##### 8.1.2.8.4 Internet Gateway

igw-prod

##### 8.1.2.8.5 Nat Gateway

nat-prod

#### 8.1.2.9.0 Monitoring

##### 8.1.2.9.1 Enabled

✅ Yes

##### 8.1.2.9.2 Metrics

- APILatency
- ErrorRate
- CPUUtilization
- MemoryUtilization

##### 8.1.2.9.3 Alerts

###### 8.1.2.9.3.1 High Error Rate

Critical

###### 8.1.2.9.3.2 High Latency

High

##### 8.1.2.9.4.0 Dashboards

- OperationalHealth

#### 8.1.2.10.0.0 Compliance

##### 8.1.2.10.1.0 Frameworks

- GDPR
- CCPA

##### 8.1.2.10.2.0 Controls

- Encryption
- Access Control

##### 8.1.2.10.3.0 Audit Schedule

Annually

#### 8.1.2.11.0.0 Data Management

| Property | Value |
|----------|-------|
| Backup Schedule | Daily |
| Retention Policy | 14 days |
| Encryption Enabled | ✅ |
| Data Masking | ❌ |

## 8.2.0.0.0.0 Configuration

| Property | Value |
|----------|-------|
| Global Timeout | 30s |
| Max Instances | 10 |
| Backup Schedule | Daily |
| Deployment Strategy | blue-green |
| Rollback Strategy | DNS switchover |
| Maintenance Window | Sunday 02:00-04:00 UTC |

## 8.3.0.0.0.0 Cross Environment Policies

- {'policy': 'data-flow', 'implementation': 'No direct data flow from Production to lower environments. All data transfers must go through an approved, automated sanitization process.', 'enforcement': 'automated'}

# 9.0.0.0.0.0 Implementation Priority

## 9.1.0.0.0.0 Component

### 9.1.1.0.0.0 Component

Infrastructure as Code (Terraform) Foundation

### 9.1.2.0.0.0 Priority

🔴 high

### 9.1.3.0.0.0 Dependencies

*No items available*

### 9.1.4.0.0.0 Estimated Effort

2 Sprints

### 9.1.5.0.0.0 Risk Level

medium

## 9.2.0.0.0.0 Component

### 9.2.1.0.0.0 Component

Development Environment Provisioning

### 9.2.2.0.0.0 Priority

🔴 high

### 9.2.3.0.0.0 Dependencies

- Infrastructure as Code (Terraform) Foundation

### 9.2.4.0.0.0 Estimated Effort

1 Sprint

### 9.2.5.0.0.0 Risk Level

low

## 9.3.0.0.0.0 Component

### 9.3.1.0.0.0 Component

Production Environment Provisioning

### 9.3.2.0.0.0 Priority

🟡 medium

### 9.3.3.0.0.0 Dependencies

- Infrastructure as Code (Terraform) Foundation

### 9.3.4.0.0.0 Estimated Effort

2 Sprints

### 9.3.5.0.0.0 Risk Level

high

## 9.4.0.0.0.0 Component

### 9.4.1.0.0.0 Component

Data Masking & DR Strategy

### 9.4.2.0.0.0 Priority

🟢 low

### 9.4.3.0.0.0 Dependencies

- Production Environment Provisioning

### 9.4.4.0.0.0 Estimated Effort

3 Sprints

### 9.4.5.0.0.0 Risk Level

high

# 10.0.0.0.0.0 Risk Assessment

## 10.1.0.0.0.0 Risk

### 10.1.1.0.0.0 Risk

Data leakage from Production to non-production environments.

### 10.1.2.0.0.0 Impact

high

### 10.1.3.0.0.0 Probability

medium

### 10.1.4.0.0.0 Mitigation

Use separate AWS accounts for complete isolation. Implement a robust, automated data masking and anonymization pipeline for any data that needs to be moved to Staging.

### 10.1.5.0.0.0 Contingency Plan

In case of a breach, follow the incident response plan. Revoke all credentials and force a rebuild of the compromised non-production environment.

## 10.2.0.0.0.0 Risk

### 10.2.1.0.0.0 Risk

Cost overrun due to misconfigured auto-scaling or oversized resources.

### 10.2.2.0.0.0 Impact

medium

### 10.2.3.0.0.0 Probability

high

### 10.2.4.0.0.0 Mitigation

Implement AWS Budgets with alerts. Start with smaller instance sizes and scale up based on performance testing. Regularly review costs using AWS Cost Explorer.

### 10.2.5.0.0.0 Contingency Plan

Manually scale down resources and analyze CloudWatch metrics to right-size the environment.

# 11.0.0.0.0.0 Recommendations

## 11.1.0.0.0.0 Category

### 11.1.1.0.0.0 Category

🔹 Security & Isolation

### 11.1.2.0.0.0 Recommendation

Implement separate AWS accounts for each environment (Dev, Staging, Prod).

### 11.1.3.0.0.0 Justification

This is the strongest isolation boundary available on AWS. It prevents any possibility of a misconfiguration in a lower environment impacting production, simplifies IAM and network security, and provides clear cost allocation.

### 11.1.4.0.0.0 Priority

🔴 high

### 11.1.5.0.0.0 Implementation Notes

Use AWS Organizations to manage the accounts. Create baseline Service Control Policies (SCPs) to enforce security guardrails across all accounts.

## 11.2.0.0.0.0 Category

### 11.2.1.0.0.0 Category

🔹 Deployment & Reliability

### 11.2.2.0.0.0 Recommendation

Fully automate the Blue/Green deployment strategy within the GitHub Actions pipeline.

### 11.2.3.0.0.0 Justification

Automating the process as required by REQ-TRN-001 reduces the risk of manual error during releases, minimizes downtime to near-zero, and provides an instantaneous, low-risk rollback capability by simply switching traffic back to the old environment.

### 11.2.4.0.0.0 Priority

🔴 high

### 11.2.5.0.0.0 Implementation Notes

Use Terraform to provision two identical sets of infrastructure. The CI/CD pipeline will deploy to the inactive environment, run smoke tests, and then use a manual approval step to trigger a Route 53 DNS change to redirect traffic.

