# REQ-1-065: This file configures the remote state backend for Terraform.
# It uses an S3 bucket to store the state file and a DynamoDB table for state locking.
# The S3 key is dynamically generated based on the current workspace (dev, staging, prod),
# which ensures that each environment has a completely isolated state.
# This prevents cross-environment modifications and is a critical part of managing
# multiple environments with Terraform.

terraform {
  backend "s3" {
    # The bucket name and dynamodb_table name should be created manually or via a separate
    # bootstrapping script as Terraform cannot manage its own backend configuration.
    # These are placeholders and should be replaced with the actual resource names.
    bucket         = "calculator-app-terraform-state-bucket"
    key            = "state/terraform.tfstate" # This will be prefixed by the workspace name
    region         = "us-east-1"
    dynamodb_table = "calculator-app-terraform-lock-table"
    encrypt        = true
  }
}