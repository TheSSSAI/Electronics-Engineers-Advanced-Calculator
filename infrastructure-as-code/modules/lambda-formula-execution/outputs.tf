# outputs.tf for lambda-formula-execution module

# The ARN of the created Lambda function.
# Useful for granting invocation permissions from other services like API Gateway.
output "function_arn" {
  description = "The ARN of the Lambda function."
  value       = aws_lambda_function.formula_execution.arn
}

# The name of the Lambda function.
output "function_name" {
  description = "The name of the Lambda function."
  value       = aws_lambda_function.formula_execution.function_name
}

# The Invoke ARN of the Lambda function.
# This is specifically used for API Gateway integrations.
output "invoke_arn" {
  description = "The Invoke ARN of the Lambda function, used for API Gateway."
  value       = aws_lambda_function.formula_execution.invoke_arn
}