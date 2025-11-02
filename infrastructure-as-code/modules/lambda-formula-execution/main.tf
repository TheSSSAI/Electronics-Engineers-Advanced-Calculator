# main.tf for lambda-formula-execution module

# This module creates the secure AWS Lambda function for executing user-defined formulas.
# It adheres to REQ-1-018 by creating an isolated environment with strict resource limits.
# The IAM role is expected to be minimal, providing only logging permissions.

# Manages the log group for the Lambda function, including log retention.
resource "aws_cloudwatch_log_group" "formula_execution" {
  name              = "/aws/lambda/${var.function_name}"
  retention_in_days = var.log_retention_days

  tags = merge(
    var.tags,
    {
      Name = "${var.function_name}-log-group"
    }
  )
}

# Creates the Lambda function itself.
# The source code is assumed to be packaged and available in an S3 bucket, which is a standard
# CI/CD practice for deploying Lambda functions.
resource "aws_lambda_function" "formula_execution" {
  function_name = var.function_name
  role          = var.iam_execution_role_arn

  # Source code location passed from CI/CD
  s3_bucket = var.s3_bucket_name
  s3_key    = var.s3_bucket_key
  # Use source_code_hash to trigger updates when the code changes
  source_code_hash = var.source_code_hash

  # Runtime and handler configuration as per REQ-1-017 (Node.js LTS)
  handler = var.handler
  runtime = var.runtime

  # Strict resource limits as per REQ-1-018 constraints
  memory_size = var.memory_size_mb
  timeout     = var.timeout_seconds

  # Environment variables, if any are needed (e.g., for logging levels)
  environment {
    variables = var.environment_variables
  }

  # VPC configuration to control network access. By default, this can be configured
  # to run outside a VPC for no network access, or within a VPC with security groups
  # that block all egress for enhanced security.
  vpc_config {
    subnet_ids         = var.subnet_ids
    security_group_ids = var.security_group_ids
  }

  # Ensure the log group is created before the function
  depends_on = [aws_cloudwatch_log_group.formula_execution]

  tags = merge(
    var.tags,
    {
      Name = var.function_name
    }
  )
}

# Optional: Provisioned concurrency configuration to mitigate cold starts,
# which helps in meeting the performance NFR (REQ-1-043).
# This is created conditionally based on a variable.
resource "aws_lambda_provisioned_concurrency_config" "formula_execution" {
  count = var.provisioned_concurrency > 0 ? 1 : 0

  function_name                     = aws_lambda_function.formula_execution.function_name
  provisioned_concurrent_executions = var.provisioned_concurrency
}