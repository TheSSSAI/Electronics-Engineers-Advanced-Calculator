# Root outputs to expose key infrastructure details after an environment deployment.
# These values are passed through from the currently deployed environment module.
# The CI/CD pipeline consumes these outputs to configure subsequent application deployment steps.

output "aws_region" {
  description = "The AWS region where the infrastructure is deployed."
  value       = module.environment.aws_region
}

output "vpc_id" {
  description = "The ID of the deployed VPC."
  value       = module.environment.vpc_id
}

output "api_gateway_invoke_url" {
  description = "The base URL for invoking the API Gateway."
  value       = module.environment.api_gateway_invoke_url
  sensitive   = true
}

output "cognito_user_pool_id" {
  description = "The ID of the Cognito User Pool."
  value       = module.environment.cognito_user_pool_id
}

output "cognito_user_pool_client_id" {
  description = "The ID of the Cognito User Pool Client."
  value       = module.environment.cognito_user_pool_client_id
}

output "rds_database_endpoint" {
  description = "The connection endpoint for the RDS database instance."
  value       = module.environment.rds_database_endpoint
  sensitive   = true
}

output "rds_database_name" {
  description = "The name of the RDS database."
  value       = module.environment.rds_database_name
}

output "ecs_cluster_name" {
  description = "The name of the ECS cluster."
  value       = module.environment.ecs_cluster_name
}

output "ecs_user_data_service_name" {
  description = "The name of the User & Data ECS service."
  value       = module.environment.ecs_user_data_service_name
}

output "lambda_formula_executor_function_name" {
  description = "The name of the Formula Execution Lambda function."
  value       = module.environment.lambda_formula_executor_function_name
}

output "application_load_balancer_dns_name" {
  description = "The DNS name of the Application Load Balancer."
  value       = module.environment.application_load_balancer_dns_name
  sensitive   = true
}