/**
 * @file LoadingSpinner.tsx
 * @description A shared, reusable loading spinner component.
 * This component provides consistent visual feedback for asynchronous operations
 * across the application, such as page loads, API requests, or calculations.
 * It is designed to be versatile, supporting both inline and fullscreen modes.
 * It directly supports accessibility and user experience NFRs by providing
 * clear state indicators.
 */

import React from 'react';
import { CircularProgress, Box, Backdrop } from '@mui/material';
import styled from 'styled-components';

/**
 * The props for the LoadingSpinner component.
 */
interface LoadingSpinnerProps {
  /**
   * If true, the spinner will be displayed in a fullscreen backdrop,
   * covering the entire viewport and centering the spinner.
   * Useful for initial page loads or blocking UI during critical operations.
   * @default false
   */
  fullscreen?: boolean;

  /**
   * The size of the spinner in pixels.
   * @default 40
   */
  size?: number;

  /**
   * The color of the spinner.
   * @default 'primary'
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'inherit';

  /**
   * An accessible label for screen readers.
   * @default 'loading'
   */
  'aria-label'?: string;
}

const FullscreenWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
`;

/**
 * A versatile loading spinner component that can be displayed either inline
 * or as a fullscreen overlay with a backdrop.
 *
 * It leverages Material-UI's CircularProgress for the visual element and provides
 * accessibility props.
 *
 * @param {LoadingSpinnerProps} props - The component props.
 * @returns {React.ReactElement} The rendered loading spinner.
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullscreen = false,
  size = 40,
  color = 'primary',
  'aria-label': ariaLabel = 'loading',
}) => {
  const spinner = (
    <CircularProgress
      size={size}
      color={color}
      aria-label={ariaLabel}
      role="status"
    />
  );

  if (fullscreen) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <FullscreenWrapper>{spinner}</FullscreenWrapper>
      </Backdrop>
    );
  }

  return spinner;
};

export default LoadingSpinner;