# /modules/rds-postgres/outputs.tf

output "db_instance_address" {
  description = "The address of the RDS instance."
  value       = aws_db_instance.main.address
}

output "db_instance_port" {
  description = "The port of the RDS instance."
  value       = aws_db_instance.main.port
}

output "db_instance_arn" {
  description = "The ARN of the RDS instance."
  value       = aws_db_instance.main.arn
}

output "db_instance_name" {
  description = "The name of the database."
  value       = aws_db_instance.main.db_name
}

output "db_instance_username" {
  description = "The master username for the database."
  value       = aws_db_instance.main.username
  sensitive   = true
}

output "db_security_group_id" {
  description = "The ID of the security group attached to the RDS instance."
  value       = aws_security_group.rds.id
}