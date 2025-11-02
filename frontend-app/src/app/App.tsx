import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  StyledEngineProvider,
} from '@mui/material';

import { store } from './store';
import { router } from './router';
import { useAuth } from '../features/auth/useAuth';
import { useOfflineManager } from '../features/offline/useOfflineManager';
import { useOnboardingTour } from '../features/onboarding/onboardingHooks';
import ErrorBoundary from '../shared/ui/ErrorBoundary';

// A basic theme definition to satisfy Material-UI's ThemeProvider.
// This can be expanded and moved to a separate file as the application grows.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

/**
 * The root component of the application.
 * It serves as the composition root, setting up all global providers for state,
 * routing, theming, and error handling. It also initializes application-wide
 * custom hooks for authentication, offline management, and user onboarding.
 */
const App: React.FC = () => {
  const { checkAuthStatus } = useAuth();

  // Initialize global, application-wide hooks.
  // These hooks manage their own lifecycles and side effects.
  useOfflineManager();
  useOnboardingTour();

  useEffect(() => {
    // On application startup, check if there's an existing session.
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <React.StrictMode>
      {/* 
        StyledEngineProvider with injectFirst is important when using styled-components
        alongside Material-UI to ensure custom styles can override MUI styles.
      */}
      <StyledEngineProvider injectFirst>
        {/* Provides the Material-UI theme to all components in the tree. */}
        <ThemeProvider theme={theme}>
          {/* Applies a baseline CSS reset for consistent styling. */}
          <CssBaseline />
          {/* Provides the Redux store to the entire application. */}
          <Provider store={store}>
            {/* 
              Catches JavaScript errors anywhere in its child component tree,
              logs those errors, and displays a fallback UI instead of the component
              tree that crashed. This prevents the entire application from crashing.
            */}
            <ErrorBoundary>
              {/* 
                RouterProvider provides the routing context and renders the
                appropriate page component based on the current URL.
              */}
              <RouterProvider router={router} />
            </ErrorBoundary>
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  );
};

export default App;