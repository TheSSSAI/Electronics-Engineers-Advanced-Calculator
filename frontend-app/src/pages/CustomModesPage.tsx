import React, { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { useGetCustomModesQuery, useDeleteCustomModeMutation } from '../features/user/userApi';
import { CustomModeList, CustomModeBuilder } from '@calculator/ui-components-library';
import { CustomModeDto } from '@calculator/api-contracts';
import LoadingSpinner from '../shared/ui/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

type PageState = 'list' | 'create' | 'edit';

const CustomModesPage: React.FC = () => {
  const { data: customModes, isLoading, isError, error } = useGetCustomModesQuery();
  const [pageState, setPageState] = useState<PageState>('list');
  const [modeToEdit, setModeToEdit] = useState<CustomModeDto | null>(null);

  const [deleteCustomMode, { isLoading: isDeleting }] = useDeleteCustomModeMutation();

  const handleCreateNew = () => {
    setModeToEdit(null);
    setPageState('create');
  };

  const handleEdit = (mode: CustomModeDto) => {
    setModeToEdit(mode);
    setPageState('edit');
  };

  const handleDelete = async (modeId: string) => {
    try {
      await deleteCustomMode(modeId).unwrap();
      // The list will automatically update due to cache invalidation from RTK Query
    } catch (err) {
      console.error('Failed to delete custom mode:', err);
      // Error will be displayed via a global notification middleware
    }
  };

  const handleSaveOrCancel = () => {
    setPageState('list');
    setModeToEdit(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (isError) {
      const errorMessage = (error as any)?.data?.message || 'Failed to load custom modes.';
      return <Alert severity="error">{errorMessage}</Alert>;
    }

    if (pageState === 'create' || pageState === 'edit') {
      return (
        <CustomModeBuilder
          mode={modeToEdit}
          onSave={handleSaveOrCancel}
          onCancel={handleSaveOrCancel}
        />
      );
    }
    
    return (
      <>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" onClick={handleCreateNew}>
            Create New Mode
          </Button>
        </Box>
        {customModes && customModes.length > 0 ? (
          <CustomModeList
            modes={customModes}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onLaunch={(mode) => console.log('Launching mode', mode)} // Launch logic would be here
            isDeleting={isDeleting}
          />
        ) : (
          <Typography variant="body1" align="center" sx={{ mt: 4 }}>
            You haven't created any custom modes yet. Get started by clicking "Create New Mode"!
          </Typography>
        )}
      </>
    );
  };
  
  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Helmet>
        <title>Custom Modes | Advanced Calculator</title>
        <meta name="description" content="Manage your custom calculation modes. Create new modes, edit existing ones, and access your personalized tools." />
      </Helmet>
      <Typography variant="h4" component="h1" gutterBottom>
        My Custom Modes
      </Typography>
      {renderContent()}
    </Box>
  );
};

export default CustomModesPage;