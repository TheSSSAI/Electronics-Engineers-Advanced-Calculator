# Defines the input contract for the RDS PostgreSQL module.
# This file is critical for implementing multiple NFRs.

variable "project_name" {
  description = "The name of the project."
  type        = string
}

variable "environment" {
  description = "The name of the environment (e.g., dev, staging, prod)."
  type        = string
}

variable "vpc_id" {
  description = "The ID of the VPC to create the database in."
  type        = string
}

variable "private_subnet_ids" {
  description = "A list of private subnet IDs for the database instance. Must span at least two AZs for HA (REQ-1-046)."
  type        = list(string)
}

variable "application_security_group_id" {
  description = "The security group ID of the application that needs access to the database."
  type        = string
}

variable "db_instance_class" {
  description = "The instance class for the RDS database."
  type        = string
}

variable "allocated_storage" {
  description = "The allocated storage in gigabytes."
  type        = number
}

variable "db_name" {
  description = "The name of the initial database to create."
  type        = string
}

variable "db_username" {
  description = "The master username for the database."
  type        = string
}

variable "db_password_secret_arn" {
  description = "The ARN of the AWS Secrets Manager secret containing the master password. REQ-1-066."
  type        = string
}

variable "multi_az_deployment" {
  description = "Specifies if the RDS instance is a Multi-AZ deployment. REQ-1-046."
  type        = bool
}

variable "storage_encrypted" {
  description = "Specifies whether the DB instance is encrypted. REQ-1-047."
  type        = bool
  default     = true
}

variable "backup_retention_period" {
  description = "The number of days to retain automated backups. REQ-1-044."
  type        = number
}

variable "tags" {
  description = "A map of tags to apply to the RDS resources."
  type        = map(string)
  default     = {}
}