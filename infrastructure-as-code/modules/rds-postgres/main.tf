# /modules/rds-postgres/main.tf

data "aws_secretsmanager_secret_version" "db_password" {
  secret_id = var.db_password_secret_arn
}

resource "aws_security_group" "rds" {
  name        = "${var.project_name}-${var.environment}-rds-sg"
  description = "Security group for the RDS PostgreSQL instance"
  vpc_id      = var.vpc_id

  ingress {
    description     = "Allow PostgreSQL traffic from the application"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [var.app_security_group_id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    var.tags,
    {
      "Name" = "${var.project_name}-${var.environment}-rds-sg"
    }
  )
}

resource "aws_db_subnet_group" "main" {
  name       = "${var.project_name}-${var.environment}-rds-subnet-group"
  subnet_ids = var.private_subnet_ids

  tags = merge(
    var.tags,
    {
      "Name" = "${var.project_name}-${var.environment}-rds-subnet-group"
    }
  )
}

resource "aws_db_instance" "main" {
  identifier             = "${var.project_name}-${var.environment}-db"
  engine                 = "postgres"
  engine_version         = var.db_engine_version
  instance_class         = var.db_instance_class
  allocated_storage      = var.db_allocated_storage
  storage_type           = "gp2"
  max_allocated_storage  = var.db_max_allocated_storage

  db_name                = var.db_name
  username               = var.db_username
  password               = data.aws_secretsmanager_secret_version.db_password.secret_string
  port                   = 5432

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]

  # High Availability (REQ-1-046)
  multi_az               = var.multi_az_deployment

  # Encryption (REQ-1-047)
  storage_encrypted      = true
  # Note: A specific kms_key_id can be provided via variables if needed.
  # If null, the default AWS RDS KMS key is used.

  # Backup & Recovery (REQ-1-044)
  backup_retention_period = var.db_backup_retention_period # 14 days for prod
  
  # Point-In-Time-Recovery is enabled when backup_retention_period > 0

  # Maintenance & Updates
  apply_immediately      = false
  auto_minor_version_upgrade = true
  maintenance_window     = "sun:04:00-sun:06:00"
  backup_window          = "02:00-04:00"

  # Deletion Protection
  deletion_protection   = var.environment == "prod"
  skip_final_snapshot   = var.environment != "prod"
  final_snapshot_identifier = var.environment == "prod" ? "${var.project_name}-${var.environment}-db-final-snapshot" : null

  tags = merge(
    var.tags,
    {
      "Name" = "${var.project_name}-${var.environment}-db"
    }
  )
}