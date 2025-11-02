# Defines the input contract for the VPC module.
# REQ-1-046: Must support creating subnets across multiple availability zones.

variable "project_name" {
  description = "The name of the project."
  type        = string
}

variable "environment" {
  description = "The name of the environment (e.g., dev, staging, prod)."
  type        = string
}

variable "vpc_cidr_block" {
  description = "The CIDR block for the VPC."
  type        = string
}

variable "availability_zones" {
  description = "A list of availability zones to create subnets in."
  type        = list(string)
}

variable "public_subnet_cidrs" {
  description = "A list of CIDR blocks for the public subnets."
  type        = list(string)
}

variable "private_subnet_cidrs" {
  description = "A list of CIDR blocks for the private subnets."
  type        = list(string)
}

variable "enable_nat_gateway" {
  description = "Set to true to create a NAT Gateway for private subnets."
  type        = bool
  default     = true
}

variable "tags" {
  description = "A map of tags to apply to the VPC resources."
  type        = map(string)
  default     = {}
}