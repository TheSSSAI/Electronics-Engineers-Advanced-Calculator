import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from '../shared/config/routes';
import { Helmet } from 'react-helmet-async';

const NotFoundPage: React.FC = () => {
  return (
    <Container component="main" maxWidth="md">
       <Helmet>
        <title>404 Not Found | Advanced Calculator</title>
      </Helmet>
      <Box
        sx={{
          py: 8,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 128px)', // Adjust based on header/footer height
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '6rem', sm: '8rem' },
            color: 'primary.main',
          }}
        >
          404
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL?
        </Typography>
        <Button
          component={RouterLink}
          to={ROUTES.HOME}
          variant="contained"
          size="large"
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;