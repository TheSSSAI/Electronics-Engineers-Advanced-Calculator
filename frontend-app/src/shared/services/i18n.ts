/**
 * @file i18n.ts
 * @description Configures and initializes the i18next internationalization framework.
 * This setup implements REQ-1-035, ensuring the application architecture is prepared
 * for internationalization by externalizing all user-facing text strings.
 * It uses a backend to fetch translation files on demand and a language detector
 * to automatically set the user's preferred language.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  // Use i18next-http-backend to load translations from a server/public folder.
  // This allows for lazy loading of language files, improving initial app performance.
  .use(HttpApi)

  // Use i18next-browser-languagedetector to automatically detect the user's language.
  // It checks (in order): localStorage, navigator, and htmlTag.
  .use(LanguageDetector)

  // Pass the i18n instance to react-i18next.
  // This makes the i18n instance available to all components via hooks or HOCs.
  .use(initReactI18next)

  // Initialize i18next with configuration options.
  .init({
    // Set the default language to use if the detected language is not available.
    // This fulfills the constraint in REQ-1-035.
    fallbackLng: 'en',

    // Enable debug logging in development for easier troubleshooting.
    // This will be automatically disabled in production builds.
    debug: import.meta.env.DEV,

    // React-i18next specific options.
    react: {
      // Use React's Suspense for lazy loading translations.
      useSuspense: true,
    },

    // Configure the backend plugin.
    backend: {
      // Path to the translation files. `{{lng}}` is a placeholder for the language code.
      // e.g., loads '/locales/en/translation.json' for English.
      loadPath: '/locales/{{lng}}/translation.json',
    },

    // Configure the language detector.
    detection: {
      // Order of detection methods.
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      // Key to use for storing the selected language in localStorage.
      caches: ['localStorage'],
    },

    // Configure interpolation.
    interpolation: {
      // React already protects from XSS, so we can disable this.
      escapeValue: false,
    },
  });

export default i18n;