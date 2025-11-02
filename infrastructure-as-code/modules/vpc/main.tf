# main.tf in modules/vpc

# -----------------------------------------------------------------------------
# VPC (Virtual Private Cloud)
# REQ-1-046: Foundational networking to support multi-AZ deployments.
# -----------------------------------------------------------------------------
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = merge(
    var.tags,
    {
      "Name" = "${var.project_name}-${var.environment}-vpc"
    }
  )
}

# -----------------------------------------------------------------------------
# Internet Gateway for Public Subnets
# -----------------------------------------------------------------------------
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = merge(
    var.tags,
    {
      "Name" = "${var.project_name}-${var.environment}-igw"
    }
  )
}

# -----------------------------------------------------------------------------
# Public Subnets
# Deployed across multiple Availability Zones for High Availability (REQ-1-046)
# -----------------------------------------------------------------------------
resource "aws_subnet" "public" {
  for_each = { for i, cidr in var.public_subnet_cidrs : i => cidr }

  vpc_id                  = aws_vpc.main.id
  cidr_block              = each.value
  availability_zone       = var.availability_zones[each.key]
  map_public_ip_on_launch = true

  tags = merge(
    var.tags,
    {
      "Name" = "${var.project_name}-${var.environment}-public-subnet-${each.key + 1}"
    }
  )
}

# -----------------------------------------------------------------------------
# Private Subnets
# Deployed across multiple Availability Zones for High Availability (REQ-1-046)
# For backend services like ECS and RDS.
# -----------------------------------------------------------------------------
resource "aws_subnet" "private" {
  for_each = { for i, cidr in var.private_subnet_cidrs : i => cidr }

  vpc_id            = aws_vpc.main.id
  cidr_block        = each.value
  availability_zone = var.availability_zones[each.key]

  tags = merge(
    var.tags,
    {
      "Name" = "${var.project_name}-${var.environment}-private-subnet-${each.key + 1}"
    }
  )
}

# -----------------------------------------------------------------------------
# NAT Gateways & Elastic IPs for Private Subnet Outbound Traffic
# Placed in each public subnet for redundancy, avoiding single points of failure.
# -----------------------------------------------------------------------------
resource "aws_eip" "nat" {
  count = var.enable_nat_gateway ? length(var.public_subnet_cidrs) : 0
  vpc   = true

  tags = merge(
    var.tags,
    {
      "Name" = "${var.project_name}-${var.environment}-nat-eip-${count.index + 1}"
    }
  )
}

resource "aws_nat_gateway" "main" {
  count = var.enable_nat_gateway ? length(var.public_subnet_cidrs) : 0

  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id

  tags = merge(
    var.tags,
    {
      "Name" = "${var.project_name}-${var.environment}-nat-gw-${count.index + 1}"
    }
  )

  depends_on = [aws_internet_gateway.main]
}

# -----------------------------------------------------------------------------
# Routing for Public Subnets (to Internet Gateway)
# -----------------------------------------------------------------------------
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = merge(
    var.tags,
    {
      "Name" = "${var.project_name}-${var.environment}-public-rt"
    }
  )
}

resource "aws_route_table_association" "public" {
  for_each = aws_subnet.public

  subnet_id      = each.value.id
  route_table_id = aws_route_table.public.id
}

# -----------------------------------------------------------------------------
# Routing for Private Subnets (to NAT Gateways)
# One route table per private subnet, pointing to the NAT GW in the same AZ.
# -----------------------------------------------------------------------------
resource "aws_route_table" "private" {
  count = var.enable_nat_gateway ? length(var.private_subnet_cidrs) : 0
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main[count.index].id
  }

  tags = merge(
    var.tags,
    {
      "Name" = "${var.project_name}-${var.environment}-private-rt-${count.index + 1}"
    }
  )
}

resource "aws_route_table_association" "private" {
  count = var.enable_nat_gateway ? length(var.private_subnet_cidrs) : 0

  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}

# -----------------------------------------------------------------------------
# Default VPC Security Group (for basic egress)
# More specific security groups should be defined in their respective modules (RDS, ECS)
# -----------------------------------------------------------------------------
resource "aws_security_group" "default" {
  name        = "${var.project_name}-${var.environment}-default-sg"
  description = "Default security group to allow all outbound traffic"
  vpc_id      = aws_vpc.main.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    var.tags,
    {
      "Name" = "${var.project_name}-${var.environment}-default-sg"
    }
  )
}