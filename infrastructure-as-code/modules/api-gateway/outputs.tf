output "api_id" {
  description = "The ID of the API Gateway."
  value       = aws_apigatewayv2_api.main.id
}

output "api_endpoint" {
  description = "The invocation URL for the API Gateway."
  value       = aws_apigatewayv2_api.main.api_endpoint
}

output "execution_arn" {
  description = "The execution ARN of the API Gateway."
  value       = aws_apigatewayv2_api.main.execution_arn
}