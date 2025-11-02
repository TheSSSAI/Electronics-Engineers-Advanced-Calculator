import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './store';
import '../shared/services/i18n'; // Initializes the i18n service

/**
 * Enterprise-grade entry point for the React Single Page Application.
 *
 * This file serves as the Composition Root of the application, responsible for:
 * 1.  Identifying the root DOM element where the application will be mounted.
 * 2.  Creating the React root using React 18's concurrent mode API.
 * 3.  Wrapping the entire application in React's StrictMode for development-time checks
 *     to identify potential problems.
 * 4.  Providing the global Redux store to the entire component tree via the <Provider>
 *     component from react-redux. This enables centralized state management.
 * 5.  Rendering the root <App /> component, which contains the application's routing,
 *     layout, and global context providers.
 * 6.  Importing the i18n configuration to ensure it's initialized before any components
 *     that rely on it are rendered.
 *
 * This setup ensures a clean separation of concerns, where this file is solely
 * responsible for bootstrapping the application, while the App component handles
 * the application's structure and orchestration.
 */

// Find the root element in the public/index.html file.
const rootElement = document.getElementById('root');

// A critical runtime check to ensure the application has a DOM element to mount to.
// Throwing a hard error here is appropriate as the application cannot recover from this.
if (!rootElement) {
  throw new Error('FATAL: Root element with id "root" not found in the DOM.');
}

// Create the React root using the modern React 18 API.
const root = ReactDOM.createRoot(rootElement);

// Render the application.
// <React.StrictMode> is a wrapper that helps with highlighting potential problems in an application.
// It activates additional checks and warnings for its descendants and is only active in development mode.
// <Provider> makes the Redux store available to any nested components that need to access the Redux store.
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);