import React from 'react';
import { Tooltip, IconButton, Zoom } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { WarningTooltipProps } from './WarningTooltip.types';

/**
 * A component that displays a warning icon. On hover or focus, it shows a tooltip
 * with a detailed warning message. This is used to indicate impractical component values
 * in electronics calculators without being as intrusive as an error message (e.g., US-040).
 */
export const WarningTooltip: React.FC<WarningTooltipProps> = ({ title }) => {
  return (
    <Tooltip 
      title={title} 
      arrow 
      TransitionComponent={Zoom}
      enterDelay={300}
    >
      {/* The IconButton wrapper is critical for accessibility. It ensures the icon
          can be focused using a keyboard (Tab key), which is necessary to trigger
          the tooltip for keyboard-only users. */}
      <IconButton 
        aria-label="Warning"
        size="small"
        sx={{
          p: 0,
          ml: 0.5,
          color: 'warning.main',
          '&:hover': {
            backgroundColor: 'transparent',
          }
        }}
        // Prevent default button behavior and focus stealing
        onMouseDown={(e) => e.preventDefault()}
      >
        <WarningAmberIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};