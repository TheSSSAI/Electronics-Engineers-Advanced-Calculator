import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * A standard React Error Boundary component.
 * It catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 * This is a critical component for application stability and user experience.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  /**
   * This lifecycle method is used to update the state so the next render will show the fallback UI.
   * @param _ - The error that was thrown.
   * @returns An object to update state.
   */
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  /**
   * This lifecycle method is used to log the error information.
   * In a production environment, this would send the error to a logging service (e.g., Sentry, Datadog).
   * @param error - The error that was thrown.
   * @param errorInfo - An object with a `componentStack` key containing information about which component threw the error.
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In a real application, you would log this to an error reporting service.
    // e.g., logErrorToMyService(error, errorInfo);
    console.error("Uncaught error:", error, errorInfo);
  }

  /**
   * Renders the children if no error has occurred, otherwise renders the fallback UI.
   */
  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback ?? (
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            textAlign: 'center',
            padding: '2rem',
            fontFamily: 'sans-serif'
          }}
          role="alert"
        >
          <h2>Something went wrong.</h2>
          <p>An unexpected error has occurred. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;