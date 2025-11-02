# 1 Id

REPO-APP-DOCS

# 2 Name

docs-site

# 3 Description

This repository contains all the source files for the project's in-app help and user documentation, as specified in REQ-1-025. It is a standalone Docusaurus project. The content is written in Markdown and organized into categories that align with the application's features (Core Calculator, Electronics Modes, Custom Modes). The CI/CD pipeline for this repository builds the Docusaurus site into a set of static HTML, CSS, and JavaScript assets. These static assets are then deployed to an S3 bucket and served via CloudFront, making them available to be loaded within a component of the main 'frontend-app'. This separation allows the product and technical writing teams to update documentation independently of application code releases.

# 4 Type

🔹 Documentation

# 5 Namespace

Calculator.Docs

# 6 Output Path

apps/docs

# 7 Framework

Docusaurus

# 8 Language

Markdown

# 9 Technology

Docusaurus, React, MDX

# 10 Thirdparty Libraries

*No items available*

# 11 Layer Ids

- documentation-layer

# 12 Dependencies

*No items available*

# 13 Requirements

- {'requirementId': 'REQ-FRC-001'}

# 14 Generate Tests

❌ No

# 15 Generate Documentation

❌ No

# 16 Architecture Style

Static Site Generator

# 17 Architecture Map

- client-help-system-ui-006

# 18 Components Map

- client-help-system-ui-006

# 19 Requirements Map

- REQ-FRC-001

# 20 Decomposition Rationale

## 20.1 Operation Type

PRESERVED_FOCUSED

## 20.2 Source Repository

REPO-APP-DOCS (original concept)

## 20.3 Decomposition Reasoning

Documentation has a different lifecycle, authorship, and release cadence than application code. Placing it in a separate repository empowers non-developer stakeholders (like technical writers and product managers) to contribute and publish updates without needing to navigate the complexity of the application source code.

## 20.4 Extracted Responsibilities

*No items available*

## 20.5 Reusability Scope

- The documentation site is specific to this product.

## 20.6 Development Benefits

- Decouples documentation releases from software releases.
- Provides a simpler, focused environment for content creators.
- The CI pipeline for docs is much faster and simpler than for the main application.

# 21.0 Dependency Contracts

*No data available*

# 22.0 Exposed Contracts

## 22.1 Public Interfaces

- {'interface': 'Static Website', 'methods': [], 'events': [], 'properties': ['Published URL/endpoint for the static assets.'], 'consumers': ['REPO-APP-FRONTEND']}

# 23.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | N/A |
| Event Communication | N/A |
| Data Flow | Markdown files are processed by Docusaurus to gene... |
| Error Handling | Build-time errors for broken links or syntax issue... |
| Async Patterns | N/A |

# 24.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | Leverage Docusaurus features like versioning and i... |
| Performance Considerations | Optimize images and other assets to ensure the doc... |
| Security Considerations | The site is static, which significantly reduces th... |
| Testing Approach | Use link checkers and other static site analysis t... |

# 25.0 Scope Boundaries

## 25.1 Must Implement

- All user-facing help content.
- The navigation and structure of the documentation site.

## 25.2 Must Not Implement

- Any application code or logic.
- The UI component that displays the documentation within the main app (this lives in 'frontend-app').

## 25.3 Extension Points

- New documentation pages can be added by creating new Markdown files.

## 25.4 Validation Rules

- N/A

