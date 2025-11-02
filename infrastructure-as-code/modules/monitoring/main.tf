# ------------------------------------------------------------------------------
# SNS TOPIC FOR ALARMS
# This topic will receive all notifications from CloudWatch Alarms and distribute
# them to subscribed endpoints.
# ------------------------------------------------------------------------------
resource "aws_sns_topic" "alarms_topic" {
  name         = "${var.project_name}-${var.environment}-alarms"
  display_name = "${var.project_name} Alarms (${var.environment})"

  tags = merge(var.tags, {
    Name = "${var.project_name}-${var.environment}-alarms-topic"
  })
}

resource "aws_sns_topic_subscription" "email_subscription" {
  topic_arn = aws_sns_topic.alarms_topic.arn
  protocol  = "email"
  endpoint  = var.notification_email
}

# ------------------------------------------------------------------------------
# API GATEWAY ALARMS
# Alarms based on REQ-1-068 for the API Gateway.
# ------------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "api_gateway_5xx_errors" {
  count = var.api_gateway_id != "" ? 1 : 0

  alarm_name          = "${var.project_name}-${var.environment}-api-gateway-5xx-errors"
  alarm_description   = "Alarm for API Gateway 5xx error rate exceeding 1% over 5 minutes. REQ-1-068."
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "1"
  threshold           = "1"
  alarm_actions       = [aws_sns_topic.alarms_topic.arn]
  ok_actions          = [aws_sns_topic.alarms_topic.arn]
  treat_missing_data  = "notBreaching"

  metric_query {
    id          = "e1"
    expression  = "100 * (m1 / m2)"
    label       = "ErrorRate"
    return_data = "true"
  }

  metric_query {
    id = "m1"
    metric {
      metric_name = "5xx"
      namespace   = "AWS/ApiGateway"
      period      = "300"
      stat        = "Sum"
      unit        = "Count"
      dimensions = {
        ApiId = var.api_gateway_id
      }
    }
    return_data = "false"
  }

  metric_query {
    id = "m2"
    metric {
      metric_name = "Count"
      namespace   = "AWS/ApiGateway"
      period      = "300"
      stat        = "Sum"
      unit        = "Count"
      dimensions = {
        ApiId = var.api_gateway_id
      }
    }
    return_data = "false"
  }

  tags = var.tags
}

resource "aws_cloudwatch_metric_alarm" "api_gateway_p99_latency" {
  count = var.api_gateway_id != "" ? 1 : 0

  alarm_name          = "${var.project_name}-${var.environment}-api-gateway-p99-latency"
  alarm_description   = "Alarm for API Gateway P99 latency exceeding 1 second. REQ-1-068."
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  threshold           = "1000" # milliseconds
  alarm_actions       = [aws_sns_topic.alarms_topic.arn]
  ok_actions          = [aws_sns_topic.alarms_topic.arn]
  treat_missing_data  = "notBreaching"

  metric_name = "Latency"
  namespace   = "AWS/ApiGateway"
  period      = "300"
  statistic   = "p99"
  unit        = "Milliseconds"

  dimensions = {
    ApiId = var.api_gateway_id
  }

  tags = var.tags
}

# ------------------------------------------------------------------------------
# ECS SERVICE ALARMS
# Alarms based on REQ-1-068 for the core User & Data Service.
# ------------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "ecs_cpu_utilization_high" {
  count = var.ecs_cluster_name != "" && var.ecs_service_name != "" ? 1 : 0

  alarm_name          = "${var.project_name}-${var.environment}-ecs-cpu-utilization-high"
  alarm_description   = "Alarm for ECS service CPU utilization exceeding 80%. REQ-1-068."
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  threshold           = "80"
  alarm_actions       = [aws_sns_topic.alarms_topic.arn]
  ok_actions          = [aws_sns_topic.alarms_topic.arn]
  treat_missing_data  = "notBreaching"

  metric_name = "CPUUtilization"
  namespace   = "AWS/ECS"
  period      = "300"
  statistic   = "Average"

  dimensions = {
    ClusterName = var.ecs_cluster_name
    ServiceName = var.ecs_service_name
  }

  tags = var.tags
}

resource "aws_cloudwatch_metric_alarm" "ecs_memory_utilization_high" {
  count = var.ecs_cluster_name != "" && var.ecs_service_name != "" ? 1 : 0

  alarm_name          = "${var.project_name}-${var.environment}-ecs-memory-utilization-high"
  alarm_description   = "Alarm for ECS service Memory utilization exceeding 80%. REQ-1-068."
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  threshold           = "80"
  alarm_actions       = [aws_sns_topic.alarms_topic.arn]
  ok_actions          = [aws_sns_topic.alarms_topic.arn]
  treat_missing_data  = "notBreaching"

  metric_name = "MemoryUtilization"
  namespace   = "AWS/ECS"
  period      = "300"
  statistic   = "Average"

  dimensions = {
    ClusterName = var.ecs_cluster_name
    ServiceName = var.ecs_service_name
  }

  tags = var.tags
}

# ------------------------------------------------------------------------------
# LAMBDA FUNCTION ALARMS
# Alarms based on REQ-1-068 for the Formula Execution Service.
# ------------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "lambda_errors" {
  count = var.lambda_function_name != "" ? 1 : 0

  alarm_name          = "${var.project_name}-${var.environment}-lambda-errors"
  alarm_description   = "Alarm for Lambda function errors. REQ-1-068."
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "1"
  threshold           = "0"
  alarm_actions       = [aws_sns_topic.alarms_topic.arn]
  ok_actions          = [aws_sns_topic.alarms_topic.arn]
  treat_missing_data  = "notBreaching"

  metric_name = "Errors"
  namespace   = "AWS/Lambda"
  period      = "300"
  statistic   = "Sum"

  dimensions = {
    FunctionName = var.lambda_function_name
  }

  tags = var.tags
}

resource "aws_cloudwatch_metric_alarm" "lambda_throttles" {
  count = var.lambda_function_name != "" ? 1 : 0

  alarm_name          = "${var.project_name}-${var.environment}-lambda-throttles"
  alarm_description   = "Alarm for Lambda function throttles. REQ-1-068."
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "1"
  threshold           = "0"
  alarm_actions       = [aws_sns_topic.alarms_topic.arn]
  ok_actions          = [aws_sns_topic.alarms_topic.arn]
  treat_missing_data  = "notBreaching"

  metric_name = "Throttles"
  namespace   = "AWS/Lambda"
  period      = "300"
  statistic   = "Sum"

  dimensions = {
    FunctionName = var.lambda_function_name
  }

  tags = var.tags
}

# ------------------------------------------------------------------------------
# RDS DATABASE ALARMS
# Alarms for critical database health metrics.
# ------------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "rds_cpu_utilization_high" {
  count = var.rds_db_instance_identifier != "" ? 1 : 0

  alarm_name          = "${var.project_name}-${var.environment}-rds-cpu-utilization-high"
  alarm_description   = "Alarm for RDS instance CPU utilization exceeding 80%."
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "3"
  threshold           = "80"
  alarm_actions       = [aws_sns_topic.alarms_topic.arn]
  ok_actions          = [aws_sns_topic.alarms_topic.arn]
  treat_missing_data  = "notBreaching"

  metric_name = "CPUUtilization"
  namespace   = "AWS/RDS"
  period      = "300"
  statistic   = "Average"

  dimensions = {
    DBInstanceIdentifier = var.rds_db_instance_identifier
  }

  tags = var.tags
}

resource "aws_cloudwatch_metric_alarm" "rds_freeable_memory_low" {
  count = var.rds_db_instance_identifier != "" ? 1 : 0

  alarm_name          = "${var.project_name}-${var.environment}-rds-freeable-memory-low"
  alarm_description   = "Alarm for RDS instance freeable memory being low (less than 256MB)."
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = "3"
  threshold           = "268435456" # 256 MB in bytes
  alarm_actions       = [aws_sns_topic.alarms_topic.arn]
  ok_actions          = [aws_sns_topic.alarms_topic.arn]
  treat_missing_data  = "breaching"

  metric_name = "FreeableMemory"
  namespace   = "AWS/RDS"
  period      = "300"
  statistic   = "Average"

  dimensions = {
    DBInstanceIdentifier = var.rds_db_instance_identifier
  }

  tags = var.tags
}

resource "aws_cloudwatch_metric_alarm" "rds_free_storage_space_low" {
  count = var.rds_db_instance_identifier != "" ? 1 : 0

  alarm_name          = "${var.project_name}-${var.environment}-rds-free-storage-low"
  alarm_description   = "Alarm for RDS instance free storage space being low (less than 10GB)."
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = "2"
  threshold           = "10737418240" # 10 GB in bytes
  alarm_actions       = [aws_sns_topic.alarms_topic.arn]
  ok_actions          = [aws_sns_topic.alarms_topic.arn]
  treat_missing_data  = "breaching"

  metric_name = "FreeStorageSpace"
  namespace   = "AWS/RDS"
  period      = "300"
  statistic   = "Average"

  dimensions = {
    DBInstanceIdentifier = var.rds_db_instance_identifier
  }

  tags = var.tags
}