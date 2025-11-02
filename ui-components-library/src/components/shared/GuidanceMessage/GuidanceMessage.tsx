import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { GuidanceMessageProps } from './GuidanceMessage.types';

/**
 * A presentational component designed to display informational or guidance messages to the user.
 * It is used in various calculators (e.g., Ohm's Law - US-028) to guide the user on the required inputs.
 * It is designed to be accessible, announcing its message when it appears.
 */
export const GuidanceMessage: React.FC<GuidanceMessageProps> = ({ message, severity = 'info' }) => {
  if (!message) {
    return null;
  }
  
  const getBackgroundColor = () => {
    switch (severity) {
      case 'warning':
        return 'warning.light';
      case 'error':
        return 'error.light';
      case 'info':
      default:
        return 'info.light';
    }
  };

  const getIconColor = () => {
    switch (severity) {
      case 'warning':
        return 'warning.dark';
      case 'error':
        return 'error.dark';
      case 'info':
      default:
        return 'info.dark';
    }
  };


  return (
    <Paper 
        elevation={0}
        sx={{
            display: 'flex',
            alignItems: 'center',
            padding: 1.5,
            backgroundColor: getBackgroundColor(),
            borderRadius: 1,
            mt: 1,
            mb: 1,
        }}
        // The role="status" and aria-live="polite" attributes ensure that the message is
        // announced by screen readers when it appears, crucial for accessibility.
        role="status"
        aria-live="polite"
    >
      <InfoOutlinedIcon sx={{ color: getIconColor(), mr: 1.5, fontSize: '1.25rem' }} />
      <Typography variant="body2" sx={{ color: getIconColor(), flexGrow: 1 }}>
        {message}
      </Typography>
    </Paper>
  );
};