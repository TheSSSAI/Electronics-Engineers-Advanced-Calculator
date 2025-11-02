import React from 'react';
import clsx from 'clsx';
import styles from './Keybind.module.css';

/**
 * Props for the Keybind component.
 */
export interface KeybindProps {
  /**
   * An array of strings representing the keys in the shortcut.
   * For example: ['Ctrl', 'Shift', 'P']
   */
  keys: string[];
}

/**
 * A reusable UI component for displaying keyboard shortcuts in a visually distinct and consistent manner.
 * This component renders a series of keys, typically styled to look like keyboard keys,
 * separated by a '+' symbol. It improves the readability and user experience of documentation
 * that references keyboard commands.
 *
 * Conforms to REQ-1-034 for accessibility standards.
 *
 * @param {KeybindProps} props The properties for the component.
 * @returns {JSX.Element | null} The rendered component, or null if no keys are provided.
 */
export default function Keybind({ keys }: KeybindProps): JSX.Element | null {
  if (!keys || keys.length === 0) {
    return null;
  }

  return (
    <span className={styles.keybindContainer}>
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          <kbd className={clsx('padding--xs', styles.key)}>
            {key}
          </kbd>
          {index < keys.length - 1 && <span className={styles.separator}>+</span>}
        </React.Fragment>
      ))}
    </span>
  );
}