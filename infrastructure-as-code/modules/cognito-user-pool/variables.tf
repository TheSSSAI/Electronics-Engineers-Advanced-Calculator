# Defines the input contract for the Cognito User Pool module.
# REQ-1-029: Specifies inputs for creating and configuring the user pool.
# REQ-1-071: Includes variables for the password policy.

variable "project_name" {
  description = "The name of the project."
  type        = string
}

variable "environment" {
  description = "The name of the environment (e.g., dev, staging, prod)."
  type        = string
}

variable "user_pool_name" {
  description = "The name for the Cognito User Pool."
  type        = string
}

variable "password_policy" {
  description = "A map defining the password policy for the user pool."
  type = object({
    minimum_length    = number
    require_lowercase = bool
    require_numbers   = bool
    require_symbols   = bool
    require_uppercase = bool
  })
  # REQ-1-071: Default password policy.
  default = {
    minimum_length    = 12
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }
}

variable "user_pool_client_name" {
  description = "The name for the Cognito User Pool Client."
  type        = string
}

variable "supported_identity_providers" {
  description = "List of supported identity providers, e.g., ['COGNITO']"
  type        = list(string)
  default     = ["COGNITO"]
}

variable "callback_urls" {
  description = "List of allowed callback URLs for the user pool client."
  type        = list(string)
  default     = []
}

variable "logout_urls" {
  description = "List of allowed logout URLs for the user pool client."
  type        = list(string)
  default     = []
}

variable "tags" {
  description = "A map of tags to apply to the Cognito resources."
  type        = map(string)
  default     = {}
}