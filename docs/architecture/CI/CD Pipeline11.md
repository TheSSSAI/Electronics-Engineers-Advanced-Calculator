# 1 Pipelines

## 1.1 Frontend SPA Delivery Pipeline

### 1.1.1 Id

pipeline-frontend-spa

### 1.1.2 Name

Frontend SPA Delivery Pipeline

### 1.1.3 Description

Builds, tests, scans, and deploys the React SPA to AWS S3/CloudFront. Triggered on push to main branch.

### 1.1.4 Stages

#### 1.1.4.1 Lint & Test

##### 1.1.4.1.1 Name

Lint & Test

##### 1.1.4.1.2 Steps

- npm ci
- npm run lint
- npm run test:unit -- --coverage

##### 1.1.4.1.3 Environment

###### 1.1.4.1.3.1 Node Env

test

##### 1.1.4.1.4.0 Quality Gates

- {'name': 'Static Analysis & Unit Tests', 'criteria': ['Linting passes with zero errors', 'All unit tests (Jest/RTL) pass'], 'blocking': True}

#### 1.1.4.2.0.0 Security Scan

##### 1.1.4.2.1.0 Name

Security Scan

##### 1.1.4.2.2.0 Steps

- npm audit --audit-level=high
- sast-scan --fail-on=high

##### 1.1.4.2.3.0 Environment

*No data available*

##### 1.1.4.2.4.0 Quality Gates

- {'name': 'Vulnerability Check (SCA & SAST)', 'criteria': ['Zero critical or high severity vulnerabilities found'], 'blocking': True}

#### 1.1.4.3.0.0 Build Application and Docs

##### 1.1.4.3.1.0 Name

Build Application and Docs

##### 1.1.4.3.2.0 Steps

- npm ci
- npm run build:app
- npm run build:docs

##### 1.1.4.3.3.0 Environment

###### 1.1.4.3.3.1 Node Env

production

##### 1.1.4.3.4.0 Quality Gates

*No items available*

#### 1.1.4.4.0.0 End-to-End Testing

##### 1.1.4.4.1.0 Name

End-to-End Testing

##### 1.1.4.4.2.0 Steps

- start-server-and-test start http://localhost:3000 'npx cypress run'

##### 1.1.4.4.3.0 Environment

###### 1.1.4.4.3.1 Api Endpoint

🔗 [https://api.staging.example.com](https://api.staging.example.com)

###### 1.1.4.4.3.2 Cypress Base Url

🔗 [http://localhost:3000](http://localhost:3000)

##### 1.1.4.4.4.0 Quality Gates

- {'name': 'E2E Test Suite', 'criteria': ['All Cypress tests pass against staging backend'], 'blocking': True}

#### 1.1.4.5.0.0 Deploy to Production (Blue/Green)

##### 1.1.4.5.1.0 Name

Deploy to Production (Blue/Green)

##### 1.1.4.5.2.0 Steps

- aws s3 sync ./build s3://production-bucket-blue/
- aws cloudfront update-distribution --origin-path /blue --id PRODUCTION_DIST_ID
- run-smoke-test --url https://www.example.com
- aws cloudfront update-distribution --origin-path /green --id PRODUCTION_DIST_ID

##### 1.1.4.5.3.0 Environment

###### 1.1.4.5.3.1 Aws Region

us-east-1

##### 1.1.4.5.4.0 Quality Gates

*No items available*

## 1.2.0.0.0.0 Backend Services Delivery Pipeline

### 1.2.1.0.0.0 Id

pipeline-backend-services

### 1.2.2.0.0.0 Name

Backend Services Delivery Pipeline

### 1.2.3.0.0.0 Description

Builds, tests, scans, and deploys the backend services (ECS & Lambda) and runs database migrations. Triggered on push to main branch.

### 1.2.4.0.0.0 Stages

#### 1.2.4.1.0.0 Lint & Unit Test

##### 1.2.4.1.1.0 Name

Lint & Unit Test

##### 1.2.4.1.2.0 Steps

- npm ci
- npm run lint
- npm run test:unit -- --coverage

##### 1.2.4.1.3.0 Environment

###### 1.2.4.1.3.1 Node Env

test

##### 1.2.4.1.4.0 Quality Gates

- {'name': 'Backend Code Quality', 'criteria': ['Linting passes with zero errors', 'All unit tests pass', 'Unit test coverage >= 85%'], 'blocking': True}

#### 1.2.4.2.0.0 Security Scan

##### 1.2.4.2.1.0 Name

Security Scan

##### 1.2.4.2.2.0 Steps

- npm audit --audit-level=high
- sast-scan --fail-on=high

##### 1.2.4.2.3.0 Environment

*No data available*

##### 1.2.4.2.4.0 Quality Gates

- {'name': 'Dependency & Code Vulnerabilities', 'criteria': ['Zero critical or high severity vulnerabilities found'], 'blocking': True}

#### 1.2.4.3.0.0 Build, Package & Push

##### 1.2.4.3.1.0 Name

Build, Package & Push

##### 1.2.4.3.2.0 Steps

- npm run build
- npm run generate:api-spec
- docker build -t user-data-service .
- docker-vulnerability-scan user-data-service --fail-on=high
- aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REPO_URI
- docker push $ECR_REPO_URI/user-data-service:$IMAGE_TAG
- zip -r formula-execution-service.zip dist node_modules

##### 1.2.4.3.3.0 Environment

*No data available*

##### 1.2.4.3.4.0 Quality Gates

- {'name': 'Container Vulnerability Scan', 'criteria': ['Zero critical or high severity vulnerabilities found in container image'], 'blocking': True}

#### 1.2.4.4.0.0 Integration Test

##### 1.2.4.4.1.0 Name

Integration Test

##### 1.2.4.4.2.0 Steps

- docker-compose -f docker-compose.test.yml up -d
- npm run test:integration
- docker-compose -f docker-compose.test.yml down

##### 1.2.4.4.3.0 Environment

*No data available*

##### 1.2.4.4.4.0 Quality Gates

- {'name': 'API Integration Tests', 'criteria': ['All Supertest API integration tests pass'], 'blocking': True}

#### 1.2.4.5.0.0 Deploy to Production

##### 1.2.4.5.1.0 Name

Deploy to Production

##### 1.2.4.5.2.0 Steps

- terraform init
- terraform workspace select prod
- terraform plan -out=tfplan
- npm run db:migrate --env=production
- terraform apply tfplan

##### 1.2.4.5.3.0 Environment

###### 1.2.4.5.3.1 Aws Region

us-east-1

###### 1.2.4.5.3.2 Tf Var Image Tag

$IMAGE_TAG

##### 1.2.4.5.4.0 Quality Gates

- {'name': 'Manual Production Approval', 'criteria': ['Approval granted by DevOps Lead'], 'blocking': True}

# 2.0.0.0.0.0 Configuration

| Property | Value |
|----------|-------|
| Artifact Repository | Amazon Elastic Container Registry (ECR) |
| Default Branch | main |
| Retention Policy | Keep artifacts for 90 days |
| Notification Channel | slack#devops-alerts |

