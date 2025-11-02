# Defines the input contract for the API Gateway module.

variable "project_name" {
  description = "The name of the project."
  type        = string
}

variable "environment" {
  description = "The name of the environment (e.g., dev, staging, prod)."
  type        = string
}

variable "cognito_user_pool_arn" {
  description = "The ARN of the Cognito User Pool to use as the authorizer."
  type        = string
}

variable "lambda_formula_execution_invoke_arn" {
  description = "The invocation ARN for the formula execution Lambda function."
  type        = string
}

variable "ecs_service_alb_listener_arn" {
  description = "The ARN of the Application Load Balancer listener for the ECS service."
  type        = string
}

variable "tags" {
  description = "A map of tags to apply to the API Gateway resources."
  type        = map(string)
  default     = {}
}