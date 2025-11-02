# outputs.tf in modules/cognito-user-pool

output "user_pool_id" {
  description = "The ID of the Cognito User Pool."
  value       = aws_cognito_user_pool.main.id
}

output "user_pool_arn" {
  description = "The ARN of the Cognito User Pool."
  value       = aws_cognito_user_pool.main.arn
}

output "user_pool_client_id" {
  description = "The ID of the Cognito User Pool Client."
  value       = aws_cognito_user_pool_client.app_client.id
}

output "user_pool_endpoint" {
  description = "The endpoint of the Cognito User Pool for the hosted UI."
  value       = aws_cognito_user_pool_domain.main.domain
}

output "user_pool_domain_url" {
    description = "The full URL for the user pool domain."
    value = "https://${aws_cognito_user_pool_domain.main.domain}.auth.${var.aws_region}.amazoncognito.com"
}