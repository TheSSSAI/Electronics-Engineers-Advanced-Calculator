# This file defines global variables that are common across all environments.
# Environment-specific overrides are provided in the respective .tfvars files.

variable "aws_region" {
  description = "The AWS region where resources will be provisioned."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "The name of the project, used for resource naming and tagging."
  type        = string
  default     = "CalculatorApp"
}

variable "tags" {
  description = "A map of common tags to apply to all resources."
  type        = map(string)
  default     = {}
}