# /environments/staging/main.tf

# This file is the composition root for the 'staging' environment.
# It instantiates all the necessary infrastructure modules defined in the /modules directory
# and wires them together, passing outputs from one module as inputs to another.
# Environment-specific configurations (like instance sizes, counts, feature flags)
# are provided through the 'terraform.tfvars' file in this same directory.

# ------------------------------------------------------------------------------
# CORE NETWORKING
# ------------------------------------------------------------------------------
module "vpc" {
  source = "../../modules/vpc"

  name_prefix   = var.name_prefix
  tags          = var.tags
  vpc_cidr      = var.vpc_cidr
  az_count      = var.az_count
}

# ------------------------------------------------------------------------------
# SECURITY & IDENTITY
# ------------------------------------------------------------------------------
module "iam" {
  source = "../../modules/iam"

  name_prefix = var.name_prefix
  tags        = var.tags
  aws_region  = var.aws_region
  aws_account_id = var.aws_account_id
}

module "secrets_manager" {
  source = "../../modules/secrets-manager"

  name_prefix           = var.name_prefix
  tags                  = var.tags
  db_username           = var.db_username
}

module "cognito_user_pool" {
  source = "../../modules/cognito-user-pool"

  name_prefix                 = var.name_prefix
  tags                        = var.tags
  user_pool_name              = "${var.name_prefix}-user-pool"
  password_policy             = var.cognito_password_policy
  app_client_name             = "${var.name_prefix}-app-client"
  supported_identity_providers= ["COGNITO"]
  callback_urls               = var.cognito_callback_urls
  logout_urls                 = var.cognito_logout_urls
}

# ------------------------------------------------------------------------------
# PERSISTENCE & COMPUTE CLUSTER
# ------------------------------------------------------------------------------
module "rds_postgres" {
  source = "../../modules/rds-postgres"

  name_prefix               = var.name_prefix
  tags                      = var.tags
  db_name                   = var.db_name
  db_username               = var.db_username
  db_password_secret_arn    = module.secrets_manager.db_password_secret_arn
  instance_class            = var.rds_instance_class
  allocated_storage         = var.rds_allocated_storage
  multi_az                  = var.rds_multi_az
  backup_retention_period   = var.rds_backup_retention_period
  vpc_id                    = module.vpc.vpc_id
  db_subnets                = module.vpc.private_subnets
  ecs_service_security_group_id = module.iam.ecs_tasks_security_group_id
}

module "ecs_cluster" {
  source = "../../modules/ecs-cluster"

  name_prefix = var.name_prefix
  tags        = var.tags
}

# ------------------------------------------------------------------------------
# APPLICATION SERVICES
# ------------------------------------------------------------------------------
module "lambda_formula_execution" {
  source = "../../modules/lambda-formula-execution"

  name_prefix          = var.name_prefix
  tags                 = var.tags
  lambda_name          = "${var.name_prefix}-formula-execution"
  image_uri            = var.lambda_executor_image_uri
  timeout              = var.lambda_executor_timeout
  memory_size          = var.lambda_executor_memory_size
  iam_role_arn         = module.iam.lambda_executor_role_arn
  vpc_id               = module.vpc.vpc_id
  subnet_ids           = module.vpc.private_subnets
  security_group_ids   = [module.iam.lambda_security_group_id]
}

module "ecs_service" {
  source = "../../modules/ecs-service"

  name_prefix                 = var.name_prefix
  tags                        = var.tags
  cluster_id                  = module.ecs_cluster.cluster_id
  service_name                = "${var.name_prefix}-user-data-service"
  image_uri                   = var.ecs_service_image_uri
  desired_count               = var.ecs_service_desired_count
  cpu                         = var.ecs_service_cpu
  memory                      = var.ecs_service_memory
  container_port              = var.ecs_service_container_port
  iam_task_role_arn           = module.iam.ecs_task_role_arn
  iam_task_execution_role_arn = module.iam.ecs_task_execution_role_arn
  vpc_id                      = module.vpc.vpc_id
  subnets                     = module.vpc.private_subnets
  security_group_ids          = [module.iam.ecs_tasks_security_group_id]
  alb_target_group_arn        = module.api_gateway.alb_target_group_arn # Dependent on API Gateway's ALB
  
  # Inject secrets as environment variables
  secrets = {
    DB_HOST      = module.secrets_manager.db_host_secret_arn
    DB_PORT      = module.secrets_manager.db_port_secret_arn
    DB_USERNAME  = module.secrets_manager.db_username_secret_arn
    DB_PASSWORD  = module.secrets_manager.db_password_secret_arn
    DB_DATABASE  = module.secrets_manager.db_name_secret_arn
    JWT_ISSUER   = module.secrets_manager.jwt_issuer_secret_arn
    JWT_SECRET   = module.secrets_manager.jwt_secret_secret_arn
  }

  # Auto Scaling configuration
  scaling_min_capacity = var.ecs_service_scaling_min_capacity
  scaling_max_capacity = var.ecs_service_scaling_max_capacity
  scaling_cpu_target   = var.ecs_service_scaling_cpu_target
}

# ------------------------------------------------------------------------------
# API & MONITORING
# ------------------------------------------------------------------------------
module "api_gateway" {
  source = "../../modules/api-gateway"

  name_prefix                   = var.name_prefix
  tags                          = var.tags
  vpc_id                        = module.vpc.vpc_id
  public_subnets                = module.vpc.public_subnets
  lambda_formula_execution_arn  = module.lambda_formula_execution.lambda_function_arn
  cognito_user_pool_arn         = module.cognito_user_pool.user_pool_arn
  container_port                = var.ecs_service_container_port
}

module "monitoring" {
  source = "../../modules/monitoring"

  name_prefix               = var.name_prefix
  tags                      = var.tags
  api_gateway_id            = module.api_gateway.api_gateway_id
  lambda_function_name      = module.lambda_formula_execution.lambda_function_name
  ecs_cluster_name          = module.ecs_cluster.cluster_name
  ecs_service_name          = module.ecs_service.service_name
  rds_db_instance_identifier= module.rds_postgres.db_instance_identifier
  sns_notification_topic_arn= var.monitoring_sns_topic_arn
}