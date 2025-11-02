import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { 
  ScientificCalculator, 
  OhmsLawCalculator, 
  ResistorColorCode,
  ResistorCombination,
  Timer555,
} from '@calculator/ui-components-library';
import { useGetVariablesQuery } from '../features/user/userApi';
import { RootState } from '../app/store';
import { Helmet } from 'react-helmet-async';
import { useOnboarding } from '../features/onboarding/onboardingHooks';

// This component can be expanded to include a tabbed interface for different modes
// For now, it will focus on rendering the main scientific calculator.

const HomePage: React.FC = () => {
  const { data: variables, isLoading: isLoadingVariables } = useGetVariablesQuery(undefined, {
    // We only fetch variables if the user is authenticated.
    // The query hook will handle this based on the presence of a token.
  });
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const angleMode = useSelector((state: RootState) => state.ui.angleMode);

  // Trigger the first-time user tour
  useOnboarding();

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, height: '100%' }}>
      <Helmet>
        <title>Scientific Calculator | Advanced Calculator</title>
        <meta name="description" content="A powerful and responsive scientific and electronics calculator with user accounts, custom modes, and offline capabilities." />
      </Helmet>
      
      {/* 
        A more advanced implementation would use a Tab component here to switch between
        ScientificCalculator, OhmsLawCalculator, etc.
        For this generation, we focus on the primary ScientificCalculator.
      */}
      <ScientificCalculator
        initialAngleMode={angleMode}
        userVariables={variables || []}
        isLoadingUserVariables={isLoadingVariables}
        isAuthenticated={isAuthenticated}
      />

      {/* Example of how other modes could be included, perhaps in a different layout or tab */}
      {/* 
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>Electronics Tools</Typography>
        <OhmsLawCalculator />
        <ResistorCombination />
        <ResistorColorCode />
        <Timer555 />
      </Box> 
      */}
    </Box>
  );
};

export default HomePage;