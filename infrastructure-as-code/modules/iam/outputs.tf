# outputs.tf in modules/iam

output "ecs_task_execution_role_arn" {
  description = "The ARN of the IAM role for ECS task execution."
  value       = aws_iam_role.ecs_task_execution_role.arn
}

output "ecs_task_role_arn" {
  description = "The ARN of the IAM role for the application running in ECS tasks."
  value       = aws_iam_role.ecs_task_role.arn
}

output "lambda_execution_role_arn" {
  description = "The ARN of the IAM role for the Lambda function execution."
  value       = aws_iam_role.lambda_execution_role.arn
}