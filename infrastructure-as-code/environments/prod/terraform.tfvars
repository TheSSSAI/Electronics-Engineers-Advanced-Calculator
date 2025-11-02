# REQ-1-065: Environment-specific variables for the 'prod' environment.
# This configuration uses production-grade instance sizes and enables all high-availability features.

# VPC Module Variables
vpc_cidr_block = "10.2.0.0/16"
availability_zones = ["us-east-1a", "us-east-1b", "us-east-1c"] # Using three AZs for higher availability
public_subnet_cidrs = ["10.2.1.0/24", "10.2.2.0/24", "10.2.3.0/24"]
private_subnet_cidrs = ["10.2.101.0/24", "10.2.102.0/24", "10.2.103.0/24"]

# RDS Module Variables
db_instance_class       = "db.m5.large"
allocated_storage       = 200
multi_az_deployment     = true # Mandatory for prod (REQ-1-046)
backup_retention_period = 14   # Mandatory for prod (REQ-1-044)

# ECS Service Variables
ecs_service_desired_count = 2
ecs_task_cpu              = 1024
ecs_task_memory           = 2048
scaling_min_capacity      = 2
scaling_max_capacity      = 8

# Cognito Module Variables
prod_callback_urls = ["https://calculator.app"]
prod_logout_urls   = ["https://calculator.app"]