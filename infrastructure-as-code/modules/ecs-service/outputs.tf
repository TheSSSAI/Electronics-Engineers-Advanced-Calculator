# outputs.tf for ecs-service module

# The name of the created ECS service.
output "service_name" {
  description = "The name of the ECS service."
  value       = aws_ecs_service.main.name
}

# The ARN of the current ECS task definition.
output "task_definition_arn" {
  description = "The ARN of the ECS task definition."
  value       = aws_ecs_task_definition.main.arn
}

# The ARN of the ALB target group associated with the service.
# This is needed by the API Gateway or LB Listener Rule module to route traffic.
output "target_group_arn" {
  description = "The ARN of the ALB target group."
  value       = aws_lb_target_group.main.arn
}

# The name of the primary container defined in the task definition.
output "container_name" {
  description = "The name of the main container in the task definition."
  value       = var.container_name
}

# The ID of the security group attached to the ECS tasks.
output "task_security_group_id" {
  description = "The ID of the security group for the ECS service tasks."
  value       = aws_security_group.ecs_service_tasks.id
}