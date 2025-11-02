# Defines the input contract for the reusable IAM module.

variable "role_name" {
  description = "The name of the IAM role to create."
  type        = string
}

variable "assume_role_policy_json" {
  description = "The JSON policy document that grants an entity permission to assume the role."
  type        = string
}

variable "policy_attachments" {
  description = "A map where keys are policy names and values are the JSON policy documents to attach to the role."
  type        = map(string)
  default     = {}
}

variable "managed_policy_arns" {
  description = "A list of ARNs for AWS managed policies to attach to the role."
  type        = list(string)
  default     = []
}

variable "tags" {
  description = "A map of tags to apply to the IAM role."
  type        = map(string)
  default     = {}
}