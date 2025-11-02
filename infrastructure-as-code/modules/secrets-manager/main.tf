# main.tf in modules/secrets-manager

# -----------------------------------------------------------------------------
# Random Password Generation
# Used for the RDS master user password to avoid hardcoding credentials.
# This fulfills a key part of REQ-1-066.
# -----------------------------------------------------------------------------
resource "random_password" "db_password" {
  length           = 16
  special          = true
  override_special = "!#$&*()-_=+[]{}<>?"
}

# -----------------------------------------------------------------------------
# AWS Secrets Manager Secret for RDS Database Password
# -----------------------------------------------------------------------------
resource "aws_secretsmanager_secret" "db_password" {
  name        = "${var.project_name}/${var.environment}/rds_password"
  description = "Master password for the RDS PostgreSQL database."

  tags = var.tags
}

resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id = aws_secretsmanager_secret.db_password.id
  secret_string = jsonencode({
    username = var.db_master_username,
    password = random_password.db_password.result
  })
}

# -----------------------------------------------------------------------------
# Placeholder for other application secrets
# This structure can be repeated for other secrets like API keys.
# -----------------------------------------------------------------------------
resource "aws_secretsmanager_secret" "app_secrets" {
  name        = "${var.project_name}/${var.environment}/app_secrets"
  description = "General application secrets (e.g., API keys for external services)."

  tags = var.tags
}

resource "aws_secretsmanager_secret_version" "app_secrets" {
  secret_id = aws_secretsmanager_secret.app_secrets.id

  # The actual values would be passed in via secure CI/CD variables,
  # not hardcoded here. Using placeholders for demonstration.
  secret_string = jsonencode({
    EXAMPLE_API_KEY = "placeholder-value-to-be-overridden"
  })

  lifecycle {
    ignore_changes = [secret_string] # Allows manual updates in the console without Terraform overwriting them
  }
}