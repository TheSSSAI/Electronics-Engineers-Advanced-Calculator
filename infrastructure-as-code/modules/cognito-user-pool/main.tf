# main.tf in modules/cognito-user-pool

# -----------------------------------------------------------------------------
# AWS Cognito User Pool
# REQ-1-029: Handles user authentication and identity management.
# REQ-1-071: Implements a strict password policy.
# -----------------------------------------------------------------------------
resource "aws_cognito_user_pool" "main" {
  name = "${var.project_name}-${var.environment}-user-pool"

  # Standard attributes
  schema {
    name                = "email"
    attribute_data_type = "String"
    required            = true
    mutable             = true
  }

  # Password Policy as per REQ-1-071
  password_policy {
    minimum_length    = 12
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  # Prevent Cognito from disclosing whether a user exists during sign-in attempts
  user_pool_add_ons {
    advanced_security_mode = "ENFORCED"
  }
  
  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  # Auto-verify emails
  auto_verified_attributes = ["email"]

  tags = var.tags
}

# -----------------------------------------------------------------------------
# AWS Cognito User Pool Client
# REQ-1-039: Configured for OAuth 2.0 Authorization Code flow with PKCE.
# This configuration is for a public client (SPA) and does not generate a client secret.
# -----------------------------------------------------------------------------
resource "aws_cognito_user_pool_client" "app_client" {
  name         = "${var.project_name}-${var.environment}-app-client"
  user_pool_id = aws_cognito_user_pool.main.id

  # For SPA (public client), a client secret must not be generated.
  generate_secret = false

  # Required for PKCE flow.
  explicit_auth_flows = [
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH"
  ]

  # REQ-1-039: Configure for Authorization Code Grant flow.
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes                 = ["email", "openid", "profile"]
  
  # Callback URLs where Cognito will redirect after authentication.
  # These must be passed in as variables per environment.
  callback_urls = var.app_callback_urls
  logout_urls   = var.app_logout_urls

  supported_identity_providers = ["COGNITO"]

  prevent_user_existence_errors = "ENABLED"
}

# -----------------------------------------------------------------------------
# AWS Cognito User Pool Domain
# Provides the hosted UI endpoint for authentication flows.
# -----------------------------------------------------------------------------
resource "aws_cognito_user_pool_domain" "main" {
  domain       = "${var.project_name}-${var.environment}-${random_string.domain_suffix.result}"
  user_pool_id = aws_cognito_user_pool.main.id
}

resource "random_string" "domain_suffix" {
  length  = 8
  special = false
  upper   = false
}