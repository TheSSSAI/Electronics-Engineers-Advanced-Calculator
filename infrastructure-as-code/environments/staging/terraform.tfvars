# REQ-1-065: Environment-specific variables for the 'staging' environment.
# This configuration mirrors production more closely for realistic testing.

# VPC Module Variables
vpc_cidr_block = "10.1.0.0/16"
availability_zones = ["us-east-1a", "us-east-1b"]
public_subnet_cidrs = ["10.1.1.0/24", "10.1.2.0/24"]
private_subnet_cidrs = ["10.1.101.0/24", "10.1.102.0/24"]

# RDS Module Variables
db_instance_class       = "db.t3.small"
allocated_storage       = 100
multi_az_deployment     = true # Staging should mirror prod HA setup (REQ-1-046)
backup_retention_period = 14   # Match prod retention (REQ-1-044)

# ECS Service Variables
ecs_service_desired_count = 2
ecs_task_cpu              = 512
ecs_task_memory           = 1024
scaling_min_capacity      = 2
scaling_max_capacity      = 4

# Cognito Module Variables
staging_callback_urls = ["https://staging.calculator.app"]
staging_logout_urls   = ["https://staging.calculator.app"]