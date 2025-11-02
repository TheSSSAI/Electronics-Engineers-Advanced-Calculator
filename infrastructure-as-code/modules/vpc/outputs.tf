# outputs.tf in modules/vpc

output "vpc_id" {
  description = "The ID of the VPC."
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "List of IDs of public subnets."
  value       = [for s in aws_subnet.public : s.id]
}

output "private_subnet_ids" {
  description = "List of IDs of private subnets."
  value       = [for s in aws_subnet.private : s.id]
}

output "availability_zones" {
  description = "The availability zones used by the VPC subnets."
  value       = var.availability_zones
}

output "default_security_group_id" {
  description = "The ID of the default security group."
  value       = aws_security_group.default.id
}