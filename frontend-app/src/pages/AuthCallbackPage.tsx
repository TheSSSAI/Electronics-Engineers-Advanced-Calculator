import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';
import { ROUTES } from '../shared/config/routes';
import LoadingSpinner from '../shared/ui/LoadingSpinner';
import { Container, Typography, Alert, Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const AuthCallbackPage: React.FC = () => {
  const { handleRedirectCallback } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (errorParam) {
      setError(errorDescription || 'An error occurred during authentication.');
      return;
    }

    if (code) {
      handleRedirectCallback(code)
        .then(() => {
          const from = sessionStorage.getItem('preAuthPath') || ROUTES.HOME;
          sessionStorage.removeItem('preAuthPath');
          navigate(from, { replace: true });
        })
        .catch((err) => {
          console.error('Authentication callback error:', err);
          setError(
            'Failed to process authentication. Please try logging in again.'
          );
        });
    } else {
      setError('Invalid authentication response. No authorization code found.');
    }
  }, [handleRedirectCallback, navigate, searchParams]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Helmet>
        <title>Authenticating... | Advanced Calculator</title>
      </Helmet>
      {error ? (
        <Box textAlign="center">
          <Typography variant="h5" component="h1" gutterBottom>
            Authentication Failed
          </Typography>
          <Alert severity="error">{error}</Alert>
        </Box>
      ) : (
        <Box textAlign="center">
          <Typography variant="h5" component="h1" gutterBottom>
            Authenticating...
          </Typography>
          <LoadingSpinner />
        </Box>
      )}
    </Container>
  );
};

export default AuthCallbackPage;