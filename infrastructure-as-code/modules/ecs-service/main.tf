# main.tf for ecs-service module

# This module provisions a generic, reusable AWS ECS Fargate service with an
# Application Load Balancer, auto-scaling, and secure secret injection.
# It is designed to meet REQ-1-054, REQ-1-046 (Multi-AZ), REQ-1-066 (Secrets),
# REQ-1-042 (Performance/Scaling), and REQ-1-072 (Blue/Green Deployment).

# Security group for the ECS tasks to control network traffic.
resource "aws_security_group" "ecs_service_tasks" {
  name        = "${var.service_name}-tasks-sg"
  description = "Controls traffic for the ${var.service_name} ECS tasks"
  vpc_id      = var.vpc_id

  # Ingress from the Application Load Balancer
  ingress {
    description     = "Allow traffic from the ALB"
    from_port       = var.container_port
    to_port         = var.container_port
    protocol        = "tcp"
    security_groups = [var.alb_security_group_id]
  }

  # Egress to the RDS database on the PostgreSQL port
  egress {
    description     = "Allow traffic to the RDS database"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [var.rds_security_group_id]
  }

  # Egress to the internet for pulling container images and calling AWS APIs
  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    var.tags,
    {
      Name = "${var.service_name}-tasks-sg"
    }
  )
}

# CloudWatch Log Group for the container logs
resource "aws_cloudwatch_log_group" "ecs_service" {
  name              = "/ecs/${var.service_name}"
  retention_in_days = var.log_retention_days

  tags = merge(
    var.tags,
    {
      Name = "${var.service_name}-log-group"
    }
  )
}

# ECS Task Definition defining the container(s) to run.
resource "aws_ecs_task_definition" "main" {
  family                   = var.service_name
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.task_cpu
  memory                   = var.task_memory
  execution_role_arn       = var.task_execution_role_arn
  task_role_arn            = var.task_role_arn

  # Dynamic container definition using jsonencode to handle secrets and environment variables.
  container_definitions = jsonencode([
    {
      name      = var.container_name
      image     = var.image_uri
      essential = true
      portMappings = [
        {
          containerPort = var.container_port
          hostPort      = var.container_port
        }
      ]
      # REQ-1-066: Inject secrets from AWS Secrets Manager
      secrets = [for key, arn in var.secrets : {
        name      = key
        valueFrom = arn
      }]
      # Inject non-sensitive environment variables
      environment = [for key, value in var.environment_variables : {
        name  = key
        value = value
      }]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs_service.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])

  tags = merge(
    var.tags,
    {
      Name = "${var.service_name}-task-def"
    }
  )
}

# Application Load Balancer Target Group
resource "aws_lb_target_group" "main" {
  name        = "${var.service_name}-tg"
  port        = var.container_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    enabled             = true
    path                = var.health_check_path
    protocol            = "HTTP"
    matcher             = "200-299"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 3
    unhealthy_threshold = 3
  }

  tags = merge(
    var.tags,
    {
      Name = "${var.service_name}-tg"
    }
  )
}

# The ECS Service itself
resource "aws_ecs_service" "main" {
  name            = var.service_name
  cluster         = var.ecs_cluster_id
  task_definition = aws_ecs_task_definition.main.arn
  desired_count   = var.desired_count
  launch_type     = "FARGATE"

  # REQ-1-046: Ensure deployment across multiple Availability Zones
  network_configuration {
    subnets         = var.subnet_ids
    security_groups = [aws_security_group.ecs_service_tasks.id]
  }

  # Link service to the ALB Target Group
  load_balancer {
    target_group_arn = aws_lb_target_group.main.arn
    container_name   = var.container_name
    container_port   = var.container_port
  }

  # REQ-1-072: Conditionally configure for Blue/Green deployments
  deployment_controller {
    type = var.use_blue_green_deployment ? "CODE_DEPLOY" : "ECS"
  }

  # Prevents flapping issues during deployment
  health_check_grace_period_seconds = 60

  # Ensure task definition is updated before service tries to use it
  depends_on = [aws_ecs_task_definition.main]

  tags = merge(
    var.tags,
    {
      Name = var.service_name
    }
  )

  lifecycle {
    ignore_changes = [task_definition]
  }
}

# Auto Scaling Target (REQ-1-042)
resource "aws_appautoscaling_target" "ecs_service" {
  max_capacity       = var.scaling_max_capacity
  min_capacity       = var.scaling_min_capacity
  resource_id        = "service/${var.ecs_cluster_name}/${aws_ecs_service.main.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

# Auto Scaling Policy for CPU Utilization
resource "aws_appautoscaling_policy" "cpu_scaling" {
  name               = "${var.service_name}-cpu-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs_service.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_service.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs_service.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value       = var.scaling_cpu_target_percent
    scale_in_cooldown  = 300
    scale_out_cooldown = 60
  }
}

# Auto Scaling Policy for Memory Utilization
resource "aws_appautoscaling_policy" "memory_scaling" {
  name               = "${var.service_name}-memory-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs_service.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_service.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs_service.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }
    target_value       = var.scaling_memory_target_percent
    scale_in_cooldown  = 300
    scale_out_cooldown = 60
  }
}