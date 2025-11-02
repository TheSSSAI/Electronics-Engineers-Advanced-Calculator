import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material/styles';
import { blue, green, orange, red } from '@mui/material/colors';

/**
 * This theme file establishes the consistent design system for the entire UI component library.
 * It centralizes colors, typography, spacing, and component styles to ensure a cohesive and
 * professional look and feel, while also enforcing accessibility standards (WCAG 2.1 AA).
 *
 * REQ-1-005: Responsiveness is handled via breakpoints and responsive font sizes.
 * REQ-1-034: Accessibility is a primary concern, with a focus on color contrast and visible focus states.
 */

// Define the core theme options object
const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: blue[800], // A strong, accessible blue for primary actions
      light: blue[600],
      dark: blue[900],
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF9800', // An amber color for secondary actions and highlights
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    error: {
      main: red.A700,
      light: red[400],
      dark: red[800],
      contrastText: '#ffffff',
    },
    warning: {
      main: orange[700],
      light: orange[500],
      dark: orange[900],
      contrastText: '#ffffff',
    },
    info: {
      main: blue[700],
      light: blue[500],
      dark: blue[900],
      contrastText: '#ffffff',
    },
    success: {
      main: green[800],
      light: green[600],
      dark: green[900],
      contrastText: '#ffffff',
    },
    background: {
      default: '#F4F6F8', // A light grey background for the app body
      paper: '#ffffff',   // White background for cards, modals, etc.
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none', // For better readability of button text
      fontWeight: 600,
    },
  },
  spacing: 8, // The default spacing unit is 8px
  shape: {
    borderRadius: 8, // A slightly larger border radius for a modern look
  },
  // Overriding default styles for specific MUI components
  components: {
    // Global styles for accessibility and consistency
    MuiCssBaseline: {
      styleOverrides: {
        // Enforce visible focus rings for all focusable elements to meet WCAG 2.1 AA
        // US-062: This ensures keyboard navigation is always visually clear.
        '*': {
          '&:focus-visible': {
            outline: `2px solid ${blue[800]}`,
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true, // A flatter, more modern button style
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          padding: '8px 22px',
        },
        containedSecondary: {
            color: 'rgba(0, 0, 0, 0.87)', // Ensure secondary button text has good contrast
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // Ensure labels have a good default style
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 2,
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.87)',
          fontSize: '0.875rem',
        },
        arrow: {
          color: 'rgba(0, 0, 0, 0.87)',
        },
      },
    },
  },
};

// Create the initial theme instance
let theme = createTheme(themeOptions);

// Make the font sizes responsive across different breakpoints
theme = responsiveFontSizes(theme);

export default theme;