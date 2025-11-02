# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Technology Stack

- React
- TypeScript
- NestJS
- Docker
- AWS ECS
- AWS Lambda
- Terraform
- GitHub Actions

## 1.3 Key Requirements

- REQ-DEV-001: Defines core pipeline stages (Lint, Test, Scan, Build, Deploy).
- REQ-NFS-001: Mandates SAST, SCA, and container vulnerability scanning.
- REQ-TRN-001: Requires Blue/Green deployment strategy for subsequent releases.
- REQ-NFQ-001: Specifies 85% unit test coverage for backend.
- REQ-ARC-001: Implies separate build/deployment lifecycles for Frontend (SPA) and Backend (ECS/Lambda).

# 2.0 Pipelines

## 2.1 Frontend Application Pipeline

### 2.1.1 Id

pl-frontend-spa-001

### 2.1.2 Name

Frontend Application Pipeline

### 2.1.3 Description

Handles the CI/CD for the React/TypeScript Single Page Application, including the Docusaurus help content. It builds, tests, scans, and deploys the static assets to AWS S3, fronted by CloudFront.

### 2.1.4 Technology

GitHub Actions

### 2.1.5 Triggers

#### 2.1.5.1 Event

##### 2.1.5.1.1 Event

push

##### 2.1.5.1.2 Branch

feature/*

##### 2.1.5.1.3 Actions

- Run Lint, Test, Security Scan, and Build stages

#### 2.1.5.2.0 Event

##### 2.1.5.2.1 Event

push

##### 2.1.5.2.2 Branch

develop

##### 2.1.5.2.3 Actions

- Run all stages through Deploy to Staging

#### 2.1.5.3.0 Event

##### 2.1.5.3.1 Event

push

##### 2.1.5.3.2 Branch

main

##### 2.1.5.3.3 Actions

- Run all stages, requiring manual approval before Deploy to Production

### 2.1.6.0.0 Stages

#### 2.1.6.1.0 Setup Environment

##### 2.1.6.1.1 Name

Setup Environment

##### 2.1.6.1.2 Description

Checks out the source code and installs all required dependencies.

##### 2.1.6.1.3 Steps

- actions/checkout@v4
- actions/setup-node@v4 with node-version: 20.x
- npm ci

#### 2.1.6.2.0 Lint & Test

##### 2.1.6.2.1 Name

Lint & Test

##### 2.1.6.2.2 Description

Runs static analysis and unit/component tests to ensure code quality.

##### 2.1.6.2.3 Steps

- Run ESLint for code style and quality checks.
- Run Jest unit and React Testing Library component tests.

##### 2.1.6.2.4 Quality Gates

- Pipeline fails if any linting errors are found.
- Pipeline fails if any tests fail.

#### 2.1.6.3.0 Security Scan

##### 2.1.6.3.1 Name

Security Scan

##### 2.1.6.3.2 Description

Performs static analysis security testing and software composition analysis.

##### 2.1.6.3.3 Steps

- Run SAST scan using GitHub CodeQL.
- Run SCA scan for vulnerable dependencies (e.g., Snyk Orb or 'npm audit --audit-level=high').

##### 2.1.6.3.4 Quality Gates

- Pipeline fails if any high or critical severity vulnerabilities are detected.

#### 2.1.6.4.0 Build

##### 2.1.6.4.1 Name

Build

##### 2.1.6.4.2 Description

Compiles the React application and Docusaurus documentation into static assets, generating hashed filenames for cache-busting as per REQ-DEV-001.

##### 2.1.6.4.3 Steps

- Run 'vite build' to create the production SPA bundle.
- Run 'docusaurus build' to create the production help system bundle.

##### 2.1.6.4.4 Artifacts Produced

###### 2.1.6.4.4.1 Static Web Assets

####### 2.1.6.4.4.1.1 Name

spa-build-artifact

####### 2.1.6.4.4.1.2 Path

./dist

####### 2.1.6.4.4.1.3 Type

🔹 Static Web Assets

###### 2.1.6.4.4.2.0 Static Web Assets

####### 2.1.6.4.4.2.1 Name

docs-build-artifact

####### 2.1.6.4.4.2.2 Path

./docs/build

####### 2.1.6.4.4.2.3 Type

🔹 Static Web Assets

#### 2.1.6.5.0.0.0 Deploy to Staging

##### 2.1.6.5.1.0.0 Name

Deploy to Staging

##### 2.1.6.5.2.0.0 Description

Deploys the built static assets to the staging environment's S3 bucket.

##### 2.1.6.5.3.0.0 Condition

Triggered on push to 'develop' branch.

##### 2.1.6.5.4.0.0 Steps

- Configure AWS credentials for the staging environment.
- Sync 'spa-build-artifact' to the staging S3 bucket.
- Sync 'docs-build-artifact' to a sub-path in the staging S3 bucket.
- Create CloudFront invalidation for the staging distribution.

#### 2.1.6.6.0.0.0 Production Deployment Approval

##### 2.1.6.6.1.0.0 Name

Production Deployment Approval

##### 2.1.6.6.2.0.0 Description

A manual approval gate to prevent accidental deployments to production.

##### 2.1.6.6.3.0.0 Condition

Triggered on push to 'main' branch, before deployment stage.

##### 2.1.6.6.4.0.0 Steps

- Utilize GitHub Actions environments with a required reviewer to pause the workflow.

#### 2.1.6.7.0.0.0 Deploy to Production

##### 2.1.6.7.1.0.0 Name

Deploy to Production

##### 2.1.6.7.2.0.0 Description

Deploys the built static assets to the production environment's S3 bucket.

##### 2.1.6.7.3.0.0 Condition

Triggered on push to 'main' branch after manual approval.

##### 2.1.6.7.4.0.0 Steps

- Configure AWS credentials for the production environment.
- Sync 'spa-build-artifact' to the production S3 bucket.
- Sync 'docs-build-artifact' to a sub-path in the production S3 bucket.
- Create CloudFront invalidation for the production distribution.

## 2.2.0.0.0.0.0 Backend Services Pipeline

### 2.2.1.0.0.0.0 Id

pl-backend-services-002

### 2.2.2.0.0.0.0 Name

Backend Services Pipeline

### 2.2.3.0.0.0.0 Description

Handles CI/CD for all backend components, including the NestJS containerized service and the AWS Lambda function for formula execution. It builds, tests, scans, packages artifacts, and deploys infrastructure updates using Terraform.

### 2.2.4.0.0.0.0 Technology

GitHub Actions

### 2.2.5.0.0.0.0 Triggers

#### 2.2.5.1.0.0.0 Event

##### 2.2.5.1.1.0.0 Event

push

##### 2.2.5.1.2.0.0 Branch

feature/*

##### 2.2.5.1.3.0.0 Actions

- Run all stages up to and including 'Push & Scan Artifacts'

#### 2.2.5.2.0.0.0 Event

##### 2.2.5.2.1.0.0 Event

push

##### 2.2.5.2.2.0.0 Branch

develop

##### 2.2.5.2.3.0.0 Actions

- Run all stages through Deploy to Staging

#### 2.2.5.3.0.0.0 Event

##### 2.2.5.3.1.0.0 Event

push

##### 2.2.5.3.2.0.0 Branch

main

##### 2.2.5.3.3.0.0 Actions

- Run all stages, requiring manual approval before Deploy to Production

### 2.2.6.0.0.0.0 Stages

#### 2.2.6.1.0.0.0 Setup Environment

##### 2.2.6.1.1.0.0 Name

Setup Environment

##### 2.2.6.1.2.0.0 Description

Checks out the source code and installs dependencies for the backend services.

##### 2.2.6.1.3.0.0 Steps

- actions/checkout@v4
- actions/setup-node@v4 with node-version: 20.x
- npm ci

#### 2.2.6.2.0.0.0 Lint & Test

##### 2.2.6.2.1.0.0 Name

Lint & Test

##### 2.2.6.2.2.0.0 Description

Runs static analysis, unit tests, and integration tests, enforcing the 85% code coverage requirement from REQ-NFQ-001.

##### 2.2.6.2.3.0.0 Steps

- Run ESLint for code style and quality checks.
- Run Jest unit and integration tests with code coverage.

##### 2.2.6.2.4.0.0 Quality Gates

- Pipeline fails if tests fail.
- Pipeline fails if backend code coverage is below 85%.

#### 2.2.6.3.0.0.0 Security Scan

##### 2.2.6.3.1.0.0 Name

Security Scan

##### 2.2.6.3.2.0.0 Description

Performs SAST and SCA scans on the backend codebase.

##### 2.2.6.3.3.0.0 Steps

- Run SAST scan using GitHub CodeQL.
- Run SCA scan for vulnerable dependencies.

##### 2.2.6.3.4.0.0 Quality Gates

- Pipeline fails if high or critical severity vulnerabilities are detected.

#### 2.2.6.4.0.0.0 Build & Package

##### 2.2.6.4.1.0.0 Name

Build & Package

##### 2.2.6.4.2.0.0 Description

Compiles the TypeScript code and packages the services into their respective deployment artifacts.

##### 2.2.6.4.3.0.0 Steps

- Build Docker image for the NestJS User & Data Service.
- Create a ZIP archive for the AWS Lambda Formula Execution Service.

##### 2.2.6.4.4.0.0 Artifacts Produced

###### 2.2.6.4.4.1.0 Docker Image

####### 2.2.6.4.4.1.1 Name

nestjs-service-image

####### 2.2.6.4.4.1.2 Type

🔹 Docker Image

###### 2.2.6.4.4.2.0 ZIP Archive

####### 2.2.6.4.4.2.1 Name

lambda-function-zip

####### 2.2.6.4.4.2.2 Path

./dist/lambda.zip

####### 2.2.6.4.4.2.3 Type

🔹 ZIP Archive

#### 2.2.6.5.0.0.0 Push & Scan Artifacts

##### 2.2.6.5.1.0.0 Name

Push & Scan Artifacts

##### 2.2.6.5.2.0.0 Description

Pushes artifacts to their repositories and performs a final vulnerability scan on the container image.

##### 2.2.6.5.3.0.0 Steps

- Login to Amazon ECR.
- Tag and push the Docker image to ECR.
- Scan the pushed image in ECR for vulnerabilities (as per REQ-NFS-001).
- Upload the Lambda ZIP archive to an S3 artifact bucket.

##### 2.2.6.5.4.0.0 Quality Gates

- Pipeline fails if ECR scan finds high or critical vulnerabilities.

#### 2.2.6.6.0.0.0 Deploy to Staging

##### 2.2.6.6.1.0.0 Name

Deploy to Staging

##### 2.2.6.6.2.0.0 Description

Deploys the new versions of the services and any infrastructure changes to the staging environment using Terraform.

##### 2.2.6.6.3.0.0 Condition

Triggered on push to 'develop' branch.

##### 2.2.6.6.4.0.0 Steps

- Configure AWS credentials for the staging environment.
- Setup Terraform and select the 'staging' workspace.
- Run 'terraform plan' to preview changes.
- Run database migrations against the staging database (pre-deployment as per REQ-DEV-001).
- Run 'terraform apply' to deploy the changes.

#### 2.2.6.7.0.0.0 Production Deployment Approval

##### 2.2.6.7.1.0.0 Name

Production Deployment Approval

##### 2.2.6.7.2.0.0 Description

A manual approval gate to prevent accidental deployments to production.

##### 2.2.6.7.3.0.0 Condition

Triggered on push to 'main' branch, before deployment stage.

##### 2.2.6.7.4.0.0 Steps

- Utilize GitHub Actions environments with a required reviewer.

#### 2.2.6.8.0.0.0 Deploy to Production

##### 2.2.6.8.1.0.0 Name

Deploy to Production

##### 2.2.6.8.2.0.0 Description

Deploys all backend changes to the production environment using Terraform and a Blue/Green strategy.

##### 2.2.6.8.3.0.0 Condition

Triggered on push to 'main' branch after manual approval.

##### 2.2.6.8.4.0.0 Steps

- Configure AWS credentials for the production environment.
- Setup Terraform and select the 'prod' workspace.
- Run 'terraform plan' to preview changes.
- Run database migrations against the production database.
- Run 'terraform apply' which executes the Blue/Green deployment logic defined in the Terraform configuration (as per REQ-TRN-001).

# 3.0.0.0.0.0.0 Artifact Management

## 3.1.0.0.0.0.0 Strategy

Immutable artifacts versioned with the Git commit SHA.

## 3.2.0.0.0.0.0 Repositories

### 3.2.1.0.0.0.0 Container Registry

#### 3.2.1.1.0.0.0 Type

🔹 Container Registry

#### 3.2.1.2.0.0.0 Name

Amazon ECR

#### 3.2.1.3.0.0.0 Usage

Stores Docker images for the NestJS User & Data Service.

### 3.2.2.0.0.0.0 Object Storage

#### 3.2.2.1.0.0.0 Type

🔹 Object Storage

#### 3.2.2.2.0.0.0 Name

Amazon S3

#### 3.2.2.3.0.0.0 Usage

Stores static assets for the frontend SPA and ZIP archives for the AWS Lambda function.

## 3.3.0.0.0.0.0 Retention Policy

ECR images and S3 artifacts related to non-production deployments will be pruned after 30 days. Production artifacts will be retained for 1 year.

# 4.0.0.0.0.0.0 Deployment Strategies

## 4.1.0.0.0.0.0 Environment

### 4.1.1.0.0.0.0 Environment

Staging

### 4.1.2.0.0.0.0 Pattern

Rolling Update

### 4.1.3.0.0.0.0 Description

A standard rolling update is sufficient for the staging environment where brief interruptions during deployment are acceptable.

## 4.2.0.0.0.0.0 Environment

### 4.2.1.0.0.0.0 Environment

Production

### 4.2.2.0.0.0.0 Pattern

Blue/Green

### 4.2.3.0.0.0.0 Description

As required by REQ-TRN-001, a Blue/Green strategy will be used for all production updates to ensure zero-downtime deployments and provide an immediate rollback capability. This will be orchestrated by Terraform, likely by updating ECS task definitions and using load balancer listener rules.

# 5.0.0.0.0.0.0 Security Integration

## 5.1.0.0.0.0.0 Approach

Shift-left security is integrated directly into the pipelines.

## 5.2.0.0.0.0.0 Stages

### 5.2.1.0.0.0.0 SAST (Static Application Security Testing)

#### 5.2.1.1.0.0.0 Name

SAST (Static Application Security Testing)

#### 5.2.1.2.0.0.0 Tool

GitHub CodeQL

#### 5.2.1.3.0.0.0 Placement

Integrated into both Frontend and Backend pipelines after checkout and before build.

### 5.2.2.0.0.0.0 SCA (Software Composition Analysis)

#### 5.2.2.1.0.0.0 Name

SCA (Software Composition Analysis)

#### 5.2.2.2.0.0.0 Tool

Snyk or npm audit

#### 5.2.2.3.0.0.0 Placement

Integrated into both pipelines to scan for vulnerable open-source dependencies.

### 5.2.3.0.0.0.0 Container Vulnerability Scanning

#### 5.2.3.1.0.0.0 Name

Container Vulnerability Scanning

#### 5.2.3.2.0.0.0 Tool

Amazon ECR's integrated scanner (Clair/Trivy)

#### 5.2.3.3.0.0.0 Placement

Runs automatically in the Backend pipeline after the new container image is pushed to ECR.

# 6.0.0.0.0.0.0 Rollback Strategy

## 6.1.0.0.0.0.0 Frontend

| Property | Value |
|----------|-------|
| Method | Re-deploy Previous Artifact |
| Trigger | Manual trigger or automated on failed post-deploym... |
| Procedure | A previous version of the static assets is maintai... |

## 6.2.0.0.0.0.0 Backend

| Property | Value |
|----------|-------|
| Method | Activate Green Deployment (Rollback) |
| Trigger | Manual trigger or automated on failed post-deploym... |
| Procedure | The Blue/Green strategy ensures the previous, stab... |

## 6.3.0.0.0.0.0 Database

| Property | Value |
|----------|-------|
| Method | Forward-Fix or Restore |
| Trigger | Critical failure post-migration. |
| Procedure | Database migrations are designed to be non-destruc... |

