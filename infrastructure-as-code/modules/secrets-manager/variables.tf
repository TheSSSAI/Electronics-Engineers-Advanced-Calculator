# Defines the input contract for the Secrets Manager module.
# REQ-1-066: Supports the creation and management of secrets.

variable "secret_name" {
  description = "The name of the secret to create in AWS Secrets Manager."
  type        = string
}

variable "secret_description" {
  description = "A description for the secret."
  type        = string
  default     = "Managed by Terraform"
}

variable "generate_random_password" {
  description = "If true, a random password will be generated for this secret."
  type        = bool
  default     = false
}

variable "random_password_length" {
  description = "The length of the random password to generate."
  type        = number
  default     = 32
}

variable "tags" {
  description = "A map of tags to apply to the secret."
  type        = map(string)
  default     = {}
}