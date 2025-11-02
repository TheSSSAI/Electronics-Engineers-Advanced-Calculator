# Defines the input contract for the Monitoring module.
# REQ-1-068: Specifies inputs for creating critical CloudWatch alarms.

variable "project_name" {
  description = "The name of the project."
  type        = string
}

variable "environment" {
  description = "The name of the environment (e.g., dev, staging, prod)."
  type        = string
}

variable "sns_topic_arn_for_alarms" {
  description = "The ARN of the SNS topic to which alarm notifications will be sent."
  type        = string
}

variable "api_gateway_id" {
  description = "The ID of the API Gateway to monitor."
  type        = string
}

variable "ecs_cluster_name" {
  description = "The name of the ECS cluster where the service is running."
  type        = string
}

variable "ecs_service_name" {
  description = "The name of the ECS service to monitor."
  type        = string
}

variable "lambda_function_name" {
  description = "The name of the Lambda function to monitor."
  type        = string
}

variable "tags" {
  description = "A map of tags to apply to the CloudWatch alarms."
  type        = map(string)
  default     = {}
}