import { TooltipProps } from '@mui/material/Tooltip';
import React from 'react';

/**
 * Props for the WarningTooltip component.
 */
export interface WarningTooltipProps extends Omit<TooltipProps, 'children'> {
  /**
   * The content of the tooltip.
   */
  title: React.ReactNode;
  
  /**
   * The child element that the tooltip will be attached to.
   * This should be a single React element that can accept a ref.
   * The component will wrap this child with the warning icon.
   */
  children: React.ReactElement;
}