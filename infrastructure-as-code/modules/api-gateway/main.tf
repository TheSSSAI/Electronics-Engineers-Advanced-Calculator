# ------------------------------------------------------------------------------
# API GATEWAY V2 (HTTP API)
# Defines the main API, authorizers, integrations, routes, and stage.
# REQ-1-054, REQ-1-036
# ------------------------------------------------------------------------------

resource "aws_apigatewayv2_api" "main" {
  name          = "${var.project_name}-${var.environment}-api"
  protocol_type = "HTTP"
  description   = "API Gateway for the ${var.project_name} application"

  cors_configuration {
    allow_origins = ["*"] # For production, this should be locked down to the frontend domain
    allow_methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    allow_headers = ["Content-Type", "Authorization", "X-Amz-Date", "X-Api-Key", "X-Amz-Security-Token"]
    max_age       = 300
  }

  tags = merge(var.tags, {
    Name = "${var.project_name}-${var.environment}-api"
  })
}

# ------------------------------------------------------------------------------
# COGNITO JWT AUTHORIZER
# Integrates with the Cognito User Pool to protect routes.
# REQ-1-029, REQ-1-040
# ------------------------------------------------------------------------------
resource "aws_apigatewayv2_authorizer" "cognito_jwt_authorizer" {
  api_id           = aws_apigatewayv2_api.main.id
  authorizer_type  = "JWT"
  name             = "${var.project_name}-${var.environment}-cognito-authorizer"
  identity_sources = ["$request.header.Authorization"]

  jwt_configuration {
    audience = [var.cognito_user_pool_client_id]
    issuer   = "https://${var.aws_region}.console.aws.amazon.com/${var.cognito_user_pool_id}"
  }
}

# ------------------------------------------------------------------------------
# INTEGRATIONS
# Connects API Gateway to backend services (ECS via ALB and Lambda).
# ------------------------------------------------------------------------------

# Integration for the ECS "User & Data Service" via Application Load Balancer
resource "aws_apigatewayv2_integration" "ecs_service_integration" {
  api_id             = aws_apigatewayv2_api.main.id
  integration_type   = "HTTP_PROXY"
  integration_method = "ANY"
  integration_uri    = var.ecs_alb_listener_arn
  payload_format_version = "1.0"
}

# Integration for the Lambda "Formula Execution Service"
resource "aws_apigatewayv2_integration" "lambda_executor_integration" {
  api_id                 = aws_apigatewayv2_api.main.id
  integration_type       = "AWS_PROXY"
  integration_subtype    = "Lambda-Proxy"
  payload_format_version = "2.0"
  integration_uri        = var.lambda_executor_invoke_arn
}

# ------------------------------------------------------------------------------
# ROUTES
# Defines API endpoints and connects them to integrations and authorizers.
# ------------------------------------------------------------------------------

# Catch-all route for the ECS service, with authorization required.
resource "aws_apigatewayv2_route" "ecs_service_proxy" {
  api_id    = aws_apigatewayv2_api.main.id
  route_key = "ANY /api/v1/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.ecs_service_integration.id}"

  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.cognito_jwt_authorizer.id
  authorization_scopes = ["openid", "email", "profile"]
}

# Specific route for the formula execution service, also requiring authorization.
resource "aws_apigatewayv2_route" "lambda_executor_route" {
  api_id    = aws_apigatewayv2_api.main.id
  route_key = "POST /api/v1/formulas/execute" # Example route
  target    = "integrations/${aws_apigatewayv2_integration.lambda_executor_integration.id}"

  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.cognito_jwt_authorizer.id
  authorization_scopes = ["openid", "email", "profile"]
}

# ------------------------------------------------------------------------------
# DEPLOYMENT STAGE
# Creates a default stage for the API to make it invokable.
# ------------------------------------------------------------------------------
resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.main.id
  name        = "$default"
  auto_deploy = true

  # Enable access logging for traceability and monitoring (REQ-1-067)
  default_route_settings {
    throttling_burst_limit = 5000
    throttling_rate_limit  = 10000
  }

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gateway_logs.arn
    format = jsonencode({
      "requestId" : "$context.requestId",
      "ip" : "$context.identity.sourceIp",
      "caller" : "$context.identity.caller",
      "user" : "$context.identity.user",
      "requestTime" : "$context.requestTime",
      "httpMethod" : "$context.httpMethod",
      "resourcePath" : "$context.resourcePath",
      "status" : "$context.status",
      "protocol" : "$context.protocol",
      "responseLength" : "$context.responseLength",
      "integrationError" : "$context.integration.error"
      "authorizer.principalId" : "$context.authorizer.principalId"
    })
  }

  tags = merge(var.tags, {
    Name = "${var.project_name}-${var.environment}-api-stage"
  })
}

# ------------------------------------------------------------------------------
# LOGGING & TRACING
# ------------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "api_gateway_logs" {
  name              = "/aws/apigateway/${var.project_name}-${var.environment}-api"
  retention_in_days = 30

  tags = merge(var.tags, {
    Name = "${var.project_name}-${var.environment}-api-logs"
  })
}

# Grant API Gateway permissions to write to the CloudWatch Log Group
resource "aws_iam_role" "api_gateway_logging_role" {
  name = "${var.project_name}-${var.environment}-api-gateway-logging-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "apigateway.amazonaws.com"
      }
    }]
  })
  tags = var.tags
}

resource "aws_iam_role_policy" "api_gateway_logging_policy" {
  name = "${var.project_name}-${var.environment}-api-gateway-logging-policy"
  role = aws_iam_role.api_gateway_logging_role.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams",
        "logs:PutLogEvents",
        "logs:GetLogEvents",
        "logs:FilterLogEvents"
      ],
      Effect   = "Allow",
      Resource = "*"
    }]
  })
}

# Grant Lambda permission to be invoked by API Gateway
resource "aws_lambda_permission" "api_gateway_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_executor_function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.main.execution_arn}/*/*"
}