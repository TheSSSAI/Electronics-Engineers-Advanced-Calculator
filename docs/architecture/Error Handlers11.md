# 1 Strategies

## 1.1 Retry

### 1.1.1 Type

🔹 Retry

### 1.1.2 Configuration

#### 1.1.2.1 Scope

Client-Side SPA to API Gateway

#### 1.1.2.2 Retry Attempts

3

#### 1.1.2.3 Backoff Strategy

Exponential with Jitter

#### 1.1.2.4 Retry Intervals

##### 1.1.2.4.1 Initial Delay

1s

##### 1.1.2.4.2 Max Delay

5s

#### 1.1.2.5.0 Error Handling Rules

- NetworkError
- ApiServerError(5xx)

#### 1.1.2.6.0 Description

Handles transient network and server-side failures for all API calls, critical for the offline data synchronization mechanism (REQ-1-014) to recover gracefully upon reconnection.

## 1.2.0.0.0 Retry

### 1.2.1.0.0 Type

🔹 Retry

### 1.2.2.0.0 Configuration

#### 1.2.2.1.0 Scope

User & Data Service to PostgreSQL DB

#### 1.2.2.2.0 Retry Attempts

3

#### 1.2.2.3.0 Backoff Strategy

Linear

#### 1.2.2.4.0 Retry Intervals

##### 1.2.2.4.1 Initial Delay

100ms

##### 1.2.2.4.2 Max Delay

500ms

#### 1.2.2.5.0 Error Handling Rules

- DatabaseConnectionError
- DatabaseTransientError

#### 1.2.2.6.0 Description

Ensures resilience against temporary database issues like connection drops or brief unavailability during Multi-AZ failover, protecting core data operations.

## 1.3.0.0.0 CircuitBreaker

### 1.3.1.0.0 Type

🔹 CircuitBreaker

### 1.3.2.0.0 Configuration

#### 1.3.2.1.0 Scope

User & Data Service to Formula Execution Service

#### 1.3.2.2.0 Failure Threshold Percentage

50%

#### 1.3.2.3.0 Failure Threshold Window

60s

#### 1.3.2.4.0 Open Duration

30s

#### 1.3.2.5.0 Error Handling Rules

- FormulaServiceTimeout
- FormulaServiceUnavailable

#### 1.3.2.6.0 Description

Protects the core User & Data Service from cascading failures if the downstream Formula Execution Lambda is consistently failing or timing out, preventing resource exhaustion.

## 1.4.0.0.0 Fallback

### 1.4.1.0.0 Type

🔹 Fallback

### 1.4.2.0.0 Configuration

#### 1.4.2.1.0 Scope

Client-Side SPA

#### 1.4.2.2.0 Error Handling Rules

- ApiAvailabilityFailure

#### 1.4.2.3.0 Fallback Response

Engage client-side offline mode; core calculator remains functional, data changes are queued locally for later synchronization per REQ-1-013 and REQ-1-014.

#### 1.4.2.4.0 Description

Provides graceful degradation by leveraging the application's designed offline capabilities as the primary fallback, ensuring core functionality remains available during API outages.

# 2.0.0.0.0 Monitoring

## 2.1.0.0.0 Error Types

- NetworkError
- ApiServerError(5xx)
- DatabaseConnectionError
- DatabaseTransientError
- FormulaServiceTimeout
- FormulaServiceUnavailable
- LambdaExecutionError
- AuthenticationError(4xx)

## 2.2.0.0.0 Alerting

Per REQ-1-068, critical alerts are configured in Amazon CloudWatch. Triggers include: API Gateway 5xx error rate (>1%), P99 API latency (>1s), ECS service high CPU/memory utilization (>80%), and high Lambda function error/timeout rates. All errors are logged as structured JSON with a propagated Correlation ID for distributed tracing, as mandated by REQ-1-067, to enable rapid diagnosis. Notifications are sent via AWS SNS to the development team.

