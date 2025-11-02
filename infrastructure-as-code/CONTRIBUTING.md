# Contributing to Calculator Infrastructure

Thank you for your interest in contributing to the Calculator application's infrastructure! Your contributions help ensure our application is stable, secure, and scalable.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How to Contribute

We welcome contributions in the form of bug reports, feature requests, and pull requests.

### Reporting Bugs

If you find a bug in the infrastructure code, please open an issue on our GitHub repository. Be sure to include:

-   A clear and descriptive title.
-   A detailed description of the problem, including the steps to reproduce it.
-   The expected behavior and what actually happened.
-   The environment (`dev`, `staging`, `prod`) where the issue occurred.
-   Relevant logs or `terraform plan` output.

### Suggesting Enhancements

If you have an idea for an enhancement, please open an issue to discuss it. This allows us to coordinate efforts and ensure your proposed change aligns with the project's architectural goals.

### Pull Request Process

1.  **Fork the repository** and create your branch from `main`.
2.  **Make your changes.** Ensure your code adheres to the style and quality standards.
3.  **Install pre-commit hooks** (`pre-commit install`) and ensure they pass on every commit. This will automatically format your code and run linters.
4.  **Update the README.md** with details of changes to the interface, if applicable (e.g., new module variables).
5.  **Submit a Pull Request** against the `main` branch.
6.  **Fill out the Pull Request Template** completely. Include a link to the relevant issue(s).
7.  **Ensure all status checks are passing.** Your PR will be reviewed by at least one maintainer.

## Development Standards

### Terraform Style

-   **Formatting**: All HCL code must be formatted using `terraform fmt`. The pre-commit hook will enforce this.
-   **Naming**: Use `snake_case` for all resources, variables, and outputs.
-   **Linting**: All code must pass `tflint` and `tfsec` checks.
-   **Documentation**: All new modules, variables, and outputs must have a clear `description`.

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This helps us automate changelog generation and versioning. Each commit message should be in the format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

**Example:**

```
feat(rds): add point-in-time recovery to postgres module

Implements REQ-1-044 by enabling the Point-In-Time Recovery (PITR) feature.
This is achieved by ensuring the backup_retention_period is greater than 0.

The retention period is now configurable via a new module variable.

Fixes: #42
```