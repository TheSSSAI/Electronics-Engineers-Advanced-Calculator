# Calculator Application - Infrastructure as Code

This repository is the definitive source of truth for all cloud infrastructure required to run the Calculator application. It contains all Terraform code needed to provision and manage the AWS resources, including networking, compute, databases, and identity services.

In alignment with **REQ-1-051**, all cloud infrastructure is defined, provisioned, and managed using Terraform. Manual changes to the production infrastructure via the AWS console are strictly forbidden.

## Project Overview

This Terraform project provisions the following core components of the application architecture (**REQ-1-054**):

-   **Networking**: A custom Virtual Private Cloud (VPC) with public and private subnets across multiple Availability Zones for high availability (**REQ-1-046**).
-   **Database**: An Amazon RDS for PostgreSQL instance, configured for Multi-AZ deployment, with encryption at rest and automated backups (**REQ-1-044**, **REQ-1-046**, **REQ-1-047**).
-   **Identity**: An AWS Cognito User Pool to handle user registration, authentication, and identity management (**REQ-1-029**).
-   **Compute (Backend Service)**: An AWS ECS Cluster with a Fargate service to run the containerized 'User & Data Service'.
-   **Compute (Serverless Function)**: An AWS Lambda function for the secure 'Formula Execution Service' (**REQ-1-018**).
-   **API Layer**: An Amazon API Gateway to manage and route API requests to the ECS and Lambda services.
-   **Security**: IAM roles with least-privilege permissions, security groups, and AWS Secrets Manager for managing sensitive credentials like the database password (**REQ-1-066**).
-   **Monitoring**: A basic set of Amazon CloudWatch alarms for critical metrics (**REQ-1-068**).

## Prerequisites

Before you begin, ensure you have the following installed:

-   [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli) (version specified in `versions.tf`)
-   [AWS CLI](https://aws.amazon.com/cli/) (latest version)
-   [pre-commit](https://pre-commit.com/#install) (for local development)
-   [tflint](https://github.com/terraform-linters/tflint)
-   [tfsec](https://github.com/aquasecurity/tfsec)

You must also have your AWS credentials configured correctly (e.g., via environment variables or an IAM role).

## Repository Structure

This repository follows a standard Terraform project structure:

-   `/`: Root module containing global configurations (`providers.tf`, `backend.tf`, etc.).
-   `/environments`: Contains environment-specific configurations. This project uses a directory-per-environment approach for strong isolation.
-   `/modules`: Contains reusable, self-contained modules for each architectural component (e.g., `vpc`, `rds-postgres`, `ecs-service`).
-   `/test`: Contains infrastructure tests written using Terratest.

## Getting Started (Local Development)

### 1. Backend Setup (One-time)

This project uses an S3 bucket for remote state management. This bucket must be created manually *before* you can run Terraform.

1.  Create an S3 bucket in your AWS account (e.g., `my-calculator-tfstate-bucket`).
2.  Create a DynamoDB table for state locking (e.g., `my-calculator-tfstate-lock`) with a primary key named `LockID` (Type: String).
3.  Update the `backend.tf` file with your bucket name and region.

### 2. Install Pre-Commit Hooks

To ensure code quality and consistency, install the pre-commit hooks:

```bash
pre-commit install
```

This will automatically run formatters and linters before each commit.

### 3. Initialize and Deploy an Environment

This project uses a directory-based approach for environments as a clear implementation of **REQ-1-065** for environment isolation.

1.  **Navigate to the environment directory:**

    ```bash
    cd environments/dev
    ```

2.  **Initialize Terraform:**
    This command downloads the necessary providers and configures the backend.

    ```bash
    terraform init
    ```

3.  **Review the Execution Plan:**
    This command shows you what resources Terraform will create, change, or destroy. Always review this carefully.

    ```bash
    terraform plan
    ```

4.  **Apply the Configuration:**
    This command provisions the infrastructure in your AWS account.

    ```bash
    terraform apply
    ```

    Enter `yes` when prompted to confirm.

### 4. Cleaning Up

To destroy the infrastructure created for an environment, run the following command from the environment's directory:

```bash
terraform destroy
```

## Environments

As per **REQ-1-065**, this project manages multiple environments (`dev`, `staging`, `prod`). The core logic is defined in reusable modules, and each directory under `/environments` composes these modules with environment-specific configurations defined in its `terraform.tfvars` file.

The CI/CD pipeline (defined in a separate repository) is responsible for promoting changes through these environments.