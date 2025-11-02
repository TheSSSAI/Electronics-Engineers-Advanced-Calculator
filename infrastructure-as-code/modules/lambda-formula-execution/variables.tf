# Defines the input contract for the Lambda Formula Execution module.
# REQ-1-018: Specifies inputs for configuring the secure, isolated Lambda function.

variable "project_name" {
  description = "The name of the project."
  type        = string
}

variable "environment" {
  description = "The name of the environment (e.g., dev, staging, prod)."
  type        = string
}

variable "function_name" {
  description = "The name of the Lambda function."
  type        = string
}

variable "handler" {
  description = "The function entrypoint in your code."
  type        = string
  default     = "main.handler"
}

variable "runtime" {
  description = "The Lambda function runtime."
  type        = string
  default     = "nodejs18.x"
}

variable "memory_size" {
  description = "The amount of memory in MB to allocate to the function. REQ-1-018 constraint."
  type        = number
  default     = 256
}

variable "timeout" {
  description = "The maximum execution time in seconds. REQ-1-018 constraint."
  type        = number
  default     = 10
}

variable "source_code_path" {
  description = "The path to the zipped source code for the Lambda function."
  type        = string
}

variable "source_code_hash" {
  description = "A hash of the source code file to trigger updates on change."
  type        = string
}

variable "iam_role_arn" {
  description = "The ARN of the IAM role for the Lambda function."
  type        = string
}

variable "environment_variables" {
  description = "A map of environment variables for the function."
  type        = map(string)
  default     = {}
}

variable "tags" {
  description = "A map of tags to apply to the Lambda resources."
  type        = map(string)
  default     = {}
}