# REQ-1-012: Configures the AWS provider, which is the sole cloud platform for this project.
# The region is passed in as a variable to allow for flexibility, but all resources will be
# deployed within the AWS ecosystem.

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Project     = var.project_name
      Environment = terraform.workspace
      ManagedBy   = "Terraform"
    }
  }
}