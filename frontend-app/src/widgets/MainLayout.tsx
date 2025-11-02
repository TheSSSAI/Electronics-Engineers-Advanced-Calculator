import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import Sidebar from './Sidebar';

const DRAWER_WIDTH = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  [theme.breakpoints.up('md')]: {
    marginLeft: `-${DRAWER_WIDTH}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  },
}));

const SkipToContentLink = styled('a')(({ theme }) => ({
  position: 'absolute',
  top: '-40px',
  left: '0',
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1),
  zIndex: 1301, // one above app bar
  transition: 'top 0.3s',
  '&:focus': {
    top: '0',
  },
}));

/**
 * MainLayout component provides the primary responsive layout structure for the application.
 * It includes a persistent header, a responsive sidebar (drawer), and the main content area.
 *
 * Implements REQ-1-005: Responsive Single Page Application layout.
 * Implements RE-1-034: WCAG 2.1 AA by providing landmark regions and a "Skip to Content" link.
 */
const MainLayout: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // State for the mobile drawer (temporary variant)
  const [mobileOpen, setMobileOpen] = useState(false);
  // State for the desktop drawer (permanent variant), always open on desktop
  const [desktopOpen] = useState(true);

  const handleDrawerToggle = () => {
    if (!isDesktop) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <SkipToContentLink href="#main-content">
        Skip to main content
      </SkipToContentLink>

      <Header
        drawerWidth={DRAWER_WIDTH}
        onDrawerToggle={handleDrawerToggle}
        isDesktop={isDesktop}
      />

      <Sidebar
        drawerWidth={DRAWER_WIDTH}
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
        isDesktop={isDesktop}
      />

      <Main
        component="main"
        id="main-content"
        open={desktopOpen && isDesktop}
        sx={{
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
          },
        }}
      >
        <Toolbar />
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainLayout;