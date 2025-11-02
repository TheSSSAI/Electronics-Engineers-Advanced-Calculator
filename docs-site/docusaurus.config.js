// @ts-check
// `@type` JSDoc annotation provides editor autocompletion and type checking
/** @type {import('@docusaurus/types').Config} */

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/**
 * Enterprise-grade configuration for the Docusaurus documentation site.
 * This file serves as the central orchestration point for the entire help system,
 * integrating content, navigation, styling, and external services like search.
 *
 * It directly addresses the following requirements:
 * - REQ-1-025: Implements a Docusaurus framework-based, searchable help system.
 * - REQ-1-035: Establishes the Internationalization (i18n) framework for future localization.
 * - REQ-1-005, REQ-1-034: Ensures a responsive and accessible site through Docusaurus's core features.
 * - US-026: Configures the search functionality.
 * - US-070: Provides footer links to legal documents.
 */
const config = {
  title: 'Calculator Pro Help Center',
  tagline: 'Your complete guide to mastering Calculator Pro',
  favicon: 'img/logo.svg',

  // Set the production url of your site here
  // IMPORTANT: This is sourced from an environment variable for deployment flexibility.
  url: process.env.DOCS_SITE_URL || 'https://docs.calculator-pro.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'CalculatorPro', // Your GitHub org/user name.
  projectName: 'docs-site', // Your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Internationalization configuration as per REQ-1-035.
  // The framework is in place, ready for future language additions.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // The sidebar configuration is defined in a separate, dedicated file
          // This follows the principle of separation of concerns.
          sidebarPath: require.resolve('./sidebars.js'),
          // Pointing to the source of truth for content.
          routeBasePath: '/',
        },
        blog: false, // Disable the blog plugin as it's not required.
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/logo.svg',
      navbar: {
        title: 'Calculator Pro Help',
        logo: {
          alt: 'Calculator Pro Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'documentationSidebar',
            position: 'left',
            label: 'Documentation',
          },
          // This provides a link back to the main application, enhancing user navigation.
          {
            href: process.env.MAIN_APP_URL || 'https://app.calculator-pro.com',
            label: 'Back to App',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Core Calculator',
                to: '/core-calculator/introduction',
              },
              {
                label: 'Electronics Modes',
                to: '/electronics-modes/ohms-law',
              },
              {
                label: 'Custom Modes',
                to: '/custom-modes/introduction',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Feature Requests',
                href: '#', // Placeholder for a future community/feedback link
              },
              {
                label: 'Report an Issue',
                href: '#', // Placeholder for a future issue tracker link
              },
            ],
          },
          {
            title: 'Legal', // As per US-070
            items: [
              {
                label: 'Terms of Service',
                href: '#', // Placeholder URL for the Terms of Service document
              },
              {
                label: 'Privacy Policy',
                href: '#', // Placeholder URL for the Privacy Policy document
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Calculator Pro. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      // Algolia search configuration to fulfill REQ-1-025 (searchable help system)
      // and US-026.
      // IMPORTANT: API keys and App ID must be provided via environment variables in the CI/CD pipeline.
      // This prevents committing sensitive credentials to source control.
      algolia: {
        // The application ID provided by Algolia
        appId: process.env.ALGOLIA_APP_ID,

        // Public API key: it is safe to commit it
        apiKey: process.env.ALGOLIA_API_KEY,

        indexName: process.env.ALGOLIA_INDEX_NAME,

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: "/latest"
        replaceSearchResultPathname: {
          from: '/docs/', // or as needed
          to: '/',
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable)
        searchPagePath: 'search',

        //... other Algolia params
      },
    }),
};

module.exports = config;