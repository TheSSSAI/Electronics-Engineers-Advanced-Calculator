import React, { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Link,
} from '@mui/material';
import { useAuth } from '../features/auth/useAuth';
import { LoginForm, LoginFormData } from '@calculator/ui-components-library';
import { ROUTES } from '../shared/config/routes';
import { Helmet } from 'react-helmet-async';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || ROUTES.HOME;

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      // The login function from useAuth will handle the redirect to Cognito
      await login(data.email, data.password);
      // The user will be redirected to Cognito, so the loading state won't be seen unless there's an immediate error.
      // If the login function throws before redirect, we catch it here.
    } catch (err: unknown) {
      if (err instanceof Error) {
        // More specific error messages can be mapped here based on Cognito error codes
        if (
          err.name === 'UserNotFoundException' ||
          err.name === 'NotAuthorizedException'
        ) {
          setError('Invalid email or password.');
        } else {
          setError(err.message || 'An unexpected error occurred. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return null; // Or a loading spinner while redirecting
  }

  return (
    <Container component="main" maxWidth="xs">
       <Helmet>
        <title>Login | Advanced Calculator</title>
        <meta name="description" content="Log in to your Advanced Calculator account to access your saved history, variables, and custom modes." />
      </Helmet>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1, width: '100%' }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <LoginForm 
            onSubmit={handleLogin} 
            isLoading={isLoading} 
          />

          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
          
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link component={RouterLink} to={ROUTES.REGISTER} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;