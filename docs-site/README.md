# Calculator Pro - Documentation Site

This repository contains the source code for the in-app help and user documentation for the **Calculator Pro** application. It is a standalone [Docusaurus](https://docusaurus.io/) project, designed to be built into a static website and deployed independently of the main application.

This approach allows the documentation to be updated, versioned, and maintained by technical writers and product teams without requiring a full application release cycle, aligning with the "Decoupled Static Content" architectural pattern.

## ✨ Purpose

The primary purpose of this repository is to fulfill requirement **REQ-1-025**:

> The application must include a comprehensive, searchable in-app help system...authored and presented using the Docusaurus framework.

The generated static site is consumed by the main `frontend-app`, which renders it within a modal to create a seamless in-app help experience for the user.

## 🚀 Technology Stack

- **[Docusaurus v3](https://docusaurus.io/)**: A modern static website generator based on React.
- **[React 18+](https://react.dev/)**: For creating custom, interactive components within the documentation.
- **[MDX](https://mdxjs.com/)**: Allows embedding JSX components directly into Markdown files.
- **[TypeScript](https://www.typescriptlang.org/)**: For type-safe configuration and custom components.
- **[Node.js (LTS)](https://nodejs.org/)**: As the runtime environment for the build process.

## 🏁 Getting Started

To run the documentation site locally for development or content authoring, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (version specified in `package.json`)
- [npm](https://www.npmjs.com/) (usually included with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-org/docs-site.git
    cd docs-site
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running Locally

To start the local development server with hot-reloading:

```bash
npm start
```

This will open a browser window at `http://localhost:3000` where you can view the documentation site. Any changes to Markdown or React files will be reflected instantly.

## 📜 Available Scripts

This project includes the following scripts defined in `package.json`:

-   `npm start`: Starts the local development server.
-   `npm run build`: Builds the static site for production into the `build/` directory.
-   `npm run serve`: Serves the production build locally to preview it before deployment.
-   `npm run deploy`: A Docusaurus-provided script for deployment (not used directly; see Deployment section).
-   `npm run clear`: Clears the Docusaurus cache.

## 📂 Content Structure

All user-facing documentation is located within the `docs/` directory. The content is organized into categories that align with the application's main features:

-   `docs/core-calculator/`: Documentation for basic arithmetic, scientific functions, variables, etc.
-   `docs/electronics-modes/`: Guides for Ohm's Law, Resistor Combinations, 555 Timers, etc.
-   `docs/custom-modes/`: A comprehensive guide on how to create, manage, and share custom calculation modes.

The navigation and sidebar structure are defined in `sidebars.js`. Custom React components used in MDX files are located in `src/components/`.

## 📦 Deployment

Deployment is fully automated via the GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

-   **Trigger**: A `git push` to the `main` branch.
-   **Process**:
    1.  The workflow checks out the code.
    2.  It securely authenticates with AWS using OpenID Connect (OIDC).
    3.  It installs dependencies and builds the Docusaurus site (`npm run build`). During this step, search indexes (e.g., Algolia) are populated.
    4.  The static assets from the `build/` directory are synchronized with the production AWS S3 bucket.
    5.  The AWS CloudFront distribution cache is invalidated to ensure the latest version of the documentation is served globally.

**Manual deployment is not required.** All changes to the documentation should be submitted via Pull Requests to the `main` branch.