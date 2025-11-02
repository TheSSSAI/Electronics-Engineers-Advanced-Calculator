## Description

Please include a summary of the changes and the related issue. Please also include relevant motivation and context.

Fixes # (issue)

## Related Requirements / User Stories

-   **REQ-XXX-XXX**: [Description of how this PR addresses the requirement]
-   **US-XXX**: [Description of how this PR addresses the user story]

## Type of change

-   [ ] Bug fix (non-breaking change which fixes an issue)
-   [ ] New feature (non-breaking change which adds functionality)
-   [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
-   [ ] This change requires a documentation update
-   [ ] Refactoring or performance improvement
-   [ ] CI/CD or build process update

## Changes

-   [ ] `modules/vpc`: Updated subnet tagging scheme.
-   [ ] `environments/prod/main.tf`: Increased RDS instance size.
-   [ ] `README.md`: Documented the new RDS variable.

## How Has This Been Tested?

Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce.

-   [ ] `terraform plan` for `dev` environment shows the expected changes.
-   [ ] `terraform apply` for `dev` environment completed successfully.
-   [ ] Ran `terratest` for the modified module: `go test -v ./test/...`
-   [ ] Manually verified resource state in the AWS Console for the `dev` environment.

**Terraform Plan Output:**

```hcl
# Paste the relevant parts of your `terraform plan` output here.
# This is crucial for reviewers to understand the infrastructure impact.
```

## Checklist:

-   [ ] My code follows the style guidelines of this project.
-   [ ] I have performed a self-review of my own code.
-   [ ] I have commented my code, particularly in hard-to-understand areas.
-   [ ] I have made corresponding changes to the documentation.
-   [ ] My changes generate no new warnings from `tflint` or `tfsec`.
-   [ ] I have added tests that prove my fix is effective or that my feature works.
-   [ ] New and existing unit tests pass locally with my changes.
-   [ ] I have run `pre-commit run --all-files` and all checks pass.