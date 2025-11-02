# .tflint.hcl
# Configuration file for the TFLint linter.
# https://github.com/terraform-linters/tflint

config {
  # This module is running in "deep" check mode, which checks all directories
  # and modules from the current directory.
  deep_check = true

  # TFLint will be disabled by default and can be enabled by including a `plugin` block.
  # This setting is useful for gradually introducing TFLint.
  disabled_by_default = false

  # Only issue files that have been changed in the pull request.
  # This is useful for preventing a flood of issues when introducing TFLint to a large codebase.
  # only_changed = true
}

# Enable the AWS ruleset
plugin "aws" {
  enabled = true
  version = "0.22.0" # Use a pinned version for consistency
  source  = "github.com/terraform-aws-modules/terraform-tflint-rules"
}

# Example of disabling a specific rule if it's not applicable to the project.
# rule "aws_instance_invalid_iam_profile" {
#  enabled = false
# }

# Example of configuring a rule with specific variables.
rule "terraform_naming_convention" {
  enabled = true
  format  = "snake_case"
}

rule "terraform_standard_module_structure" {
  enabled = true
}