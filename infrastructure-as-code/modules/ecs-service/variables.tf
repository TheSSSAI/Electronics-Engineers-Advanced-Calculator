# Defines the input contract for the ECS Service module.
# REQ-1-046, REQ-1-054: Specifies inputs needed to deploy a highly available containerized service.

variable "project_name" {
  description = "The name of the project."
  type        = string
}

variable "environment" {
  description = "The name of the environment (e.g., dev, staging, prod)."
  type        = string
}

variable "service_name" {
  description = "A unique name for the ECS service."
  type        = string
}

variable "ecs_cluster_id" {
  description = "The ID of the ECS cluster to deploy the service to."
  type        = string
}

variable "vpc_id" {
  description = "The ID of the VPC where the service will be deployed."
  type        = string
}

variable "private_subnet_ids" {
  description = "A list of private subnet IDs for the service tasks. Must span at least two AZs for HA (REQ-1-046)."
  type        = list(string)
}

variable "container_image" {
  description = "The Docker image URI for the container."
  type        = string
}

variable "container_port" {
  description = "The port the container listens on."
  type        = number
}

variable "task_cpu" {
  description = "The amount of CPU units to reserve for the task."
  type        = number
}

variable "task_memory" {
  description = "The amount of memory (in MiB) to reserve for the task."
  type        = number
}

variable "desired_task_count" {
  description = "The desired number of tasks to run for the service."
  type        = number
}

variable "task_execution_role_arn" {
  description = "The ARN of the IAM role for ECS task execution."
  type        = string
}

variable "task_role_arn" {
  description = "The ARN of the IAM role for the task itself to interact with other AWS services."
  type        = string
}

variable "alb_target_group_arn" {
  description = "The ARN of the Application Load Balancer target group to attach the service to."
  type        = string
}

variable "secrets" {
  description = "A map of secrets to inject as environment variables. Key is the env var name, value is the Secrets Manager secret ARN."
  type        = map(string)
  default     = {}
}

variable "environment_variables" {
  description = "A map of non-secret environment variables to inject."
  type        = map(string)
  default     = {}
}

variable "scaling_min_capacity" {
  description = "The minimum number of tasks for auto-scaling."
  type        = number
  default     = 1
}

variable "scaling_max_capacity" {
  description = "The maximum number of tasks for auto-scaling."
  type        = number
  default     = 2
}

variable "scaling_cpu_target" {
  description = "The target average CPU utilization percentage for auto-scaling."
  type        = number
  default     = 75
}

variable "scaling_memory_target" {
  description = "The target average Memory utilization percentage for auto-scaling."
  type        = number
  default     = 75
}

variable "tags" {
  description = "A map of tags to apply to the ECS service resources."
  type        = map(string)
  default     = {}
}