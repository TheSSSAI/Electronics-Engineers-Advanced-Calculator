package test

import (
	"fmt"
	"testing"

	"github.com/gruntwork-io/terratest/modules/aws"
	"github.com/gruntwork-io/terratest/modules/terraform"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// An example of how to test the VPC Terraform module in examples/vpc using Terratest.
func TestVpcModule(t *testing.T) {
	t.Parallel()

	// Pick a random AWS region to test in. This helps ensure your code is region-agnostic.
	awsRegion := aws.GetRandomStableRegion(t, nil, nil)

	// Construct the terraform options with default retryable errors to handle the most common
	// retryable errors in terraform testing.
	terraformOptions := terraform.WithDefaultRetryableErrors(t, &terraform.Options{
		// The path to where our Terraform code is located
		TerraformDir: "../modules/vpc",

		// Variables to pass to our Terraform code using -var options
		Vars: map[string]interface{}{
			"aws_region":    awsRegion,
			"project_name":  "calculator-test",
			"environment":   "test",
			"vpc_cidr":      "10.0.0.0/16",
			"public_subnets_cidr":  []string{"10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"},
			"private_subnets_cidr": []string{"10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"},
			"availability_zones":   []string{fmt.Sprintf("%sa", awsRegion), fmt.Sprintf("%sb", awsRegion), fmt.Sprintf("%sc", awsRegion)},
		},

		// Environment variables to set when running Terraform
		EnvVars: map[string]string{
			"AWS_DEFAULT_REGION": awsRegion,
		},
	})

	// At the end of the test, run `terraform destroy` to clean up any resources that were created.
	defer terraform.Destroy(t, terraformOptions)

	// Run `terraform init` and `terraform apply`. Fail the test if there are any errors.
	terraform.InitAndApply(t, terraformOptions)

	// Run `terraform output` to get the values of output variables
	vpcId := terraform.Output(t, terraformOptions, "vpc_id")
	publicSubnetIds := terraform.OutputList(t, terraformOptions, "public_subnet_ids")
	privateSubnetIds := terraform.OutputList(t, terraformOptions, "private_subnet_ids")

	// 1. VPC Verification
	// We're going to use the AWS SDK to make calls to the AWS API to verify the resources created by our Terraform code.
	vpc := aws.GetVpcById(t, vpcId, awsRegion)

	// Assert that the VPC has the expected CIDR block
	assert.Equal(t, "10.0.0.0/16", vpc.CidrBlock, "VPC should have the correct CIDR block")

	// 2. Subnet Verification
	// Assert we got the expected number of public and private subnets
	require.Equal(t, 3, len(publicSubnetIds), "Should create 3 public subnets")
	require.Equal(t, 3, len(privateSubnetIds), "Should create 3 private subnets")

	// Assert that the subnets are in different availability zones for high availability (REQ-1-046)
	publicSubnetAzs := make(map[string]bool)
	for _, subnetId := range publicSubnetIds {
		subnet := aws.GetSubnetById(t, subnetId, awsRegion)
		publicSubnetAzs[*subnet.AvailabilityZone] = true
	}
	assert.Equal(t, 3, len(publicSubnetAzs), "Public subnets should be in 3 different AZs")

	privateSubnetAzs := make(map[string]bool)
	for _, subnetId := range privateSubnetIds {
		subnet := aws.GetSubnetById(t, subnetId, awsRegion)
		privateSubnetAzs[*subnet.AvailabilityZone] = true
	}
	assert.Equal(t, 3, len(privateSubnetAzs), "Private subnets should be in 3 different AZs")

	// 3. Tag Verification
	// Assert that the VPC has the expected tags
	expectedVpcTags := map[string]string{
		"Name":        "calculator-test-vpc",
		"Project":     "calculator-test",
		"Environment": "test",
		"ManagedBy":   "Terraform",
	}

	vpcTags := aws.GetTagsForVpc(t, vpcId, awsRegion)
	for key, value := range expectedVpcTags {
		actualValue, ok := vpcTags[key]
		assert.True(t, ok, fmt.Sprintf("Expected VPC tag %s not found", key))
		assert.Equal(t, value, actualValue, fmt.Sprintf("Tag %s has incorrect value", key))
	}
}