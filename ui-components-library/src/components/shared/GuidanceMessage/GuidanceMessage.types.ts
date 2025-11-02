import React from 'react';

/**
 * Props for the GuidanceMessage component.
 */
export interface GuidanceMessageProps {
  /**
   * The content to be displayed within the guidance message container.
   * Can be a string or any valid React node.
   */
  children: React.ReactNode;

  /**
   * The severity of the message, which determines its color and icon.
   * @default 'info'
   */
  severity?: 'info' | 'warning' | 'error' | 'success';
}