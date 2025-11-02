# Defines the input contract for the ECS Cluster module.

variable "project_name" {
  description = "The name of the project."
  type        = string
}

variable "environment" {
  description = "The name of the environment (e.g., dev, staging, prod)."
  type        = string
}

variable "tags" {
  description = "A map of tags to apply to the ECS cluster."
  type        = map(string)
  default     = {}
}