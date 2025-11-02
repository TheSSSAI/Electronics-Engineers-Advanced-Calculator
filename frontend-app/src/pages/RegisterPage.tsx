import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Link,
} from '@mui/material';
import { useAuth } from '../features/auth/useAuth';
import { RegistrationForm, RegistrationFormData } from '@calculator/ui-components-library';
import { ROUTES } from '../shared/config/routes';
import { Helmet } from 'react-helmet-async';


const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (data: RegistrationFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await register(data.email, data.password);
      // On successful registration, Cognito typically auto-verifies and logs in.
      // The auth state will change, triggering a redirect to the home page.
      // The `useAuth` hook should handle this state change and subsequent navigation.
      navigate(ROUTES.HOME);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === 'UsernameExistsException') {
            setError('An account with this email address already exists.');
        } else if (err.name === 'InvalidPasswordException') {
            setError('Password does not meet the requirements. It must be at least 12 characters and include an uppercase letter, a lowercase letter, a number, and a special character.');
        } else {
            setError(err.message || 'An unexpected error occurred during registration.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Register | Advanced Calculator</title>
        <meta name="description" content="Create an account for the Advanced Calculator to unlock powerful features like saving your calculation history, custom variables, and user-defined modes." />
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
          Create Account
        </Typography>
        <Box sx={{ mt: 3, width: '100%' }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <RegistrationForm 
            onSubmit={handleRegister} 
            isLoading={isLoading} 
          />

          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          )}

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link component={RouterLink} to={ROUTES.LOGIN} variant="body2">
              Already have an account? Sign in
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;