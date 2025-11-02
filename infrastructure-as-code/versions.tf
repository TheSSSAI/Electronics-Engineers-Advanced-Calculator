# REQ-1-051: This file establishes the core dependency versions for the Terraform project,
# ensuring consistent and repeatable builds as part of the Infrastructure as Code (IaC) strategy.
terraform {
  required_version = ">= 1.3.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.5"
    }
  }
}