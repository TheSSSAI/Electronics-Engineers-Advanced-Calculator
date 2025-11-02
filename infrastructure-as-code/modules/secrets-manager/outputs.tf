# outputs.tf in modules/secrets-manager

output "db_password_secret_arn" {
  description = "The ARN of the Secrets Manager secret for the database password."
  value       = aws_secretsmanager_secret.db_password.arn
  sensitive   = true
}

output "app_secrets_arn" {
  description = "The ARN of the Secrets Manager secret for general application secrets."
  value       = aws_secretsmanager_secret.app_secrets.arn
  sensitive   = true
}