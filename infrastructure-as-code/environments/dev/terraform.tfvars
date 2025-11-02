# REQ-1-065: Environment-specific variables for the 'dev' environment.
# This configuration uses smaller instance sizes and lower counts to minimize cost.

# VPC Module Variables
vpc_cidr_block = "10.0.0.0/16"
availability_zones = ["us-east-1a", "us-east-1b"]
public_subnet_cidrs = ["10.0.1.0/24", "10.0.2.0/24"]
private_subnet_cidrs = ["10.0.101.0/24", "10.0.102.0/24"]

# RDS Module Variables
db_instance_class       = "db.t3.micro"
allocated_storage       = 20
multi_az_deployment     = false # Cost saving for dev
backup_retention_period = 7     # Reduced retention for dev

# ECS Service Variables
ecs_service_desired_count = 1
ecs_task_cpu              = 256
ecs_task_memory           = 512
scaling_min_capacity      = 1
scaling_max_capacity      = 2

# Cognito Module Variables
dev_callback_urls = ["http://localhost:3000", "https://dev.calculator.app"]
dev_logout_urls   = ["http://localhost:3000", "https://dev.calculator.app"]