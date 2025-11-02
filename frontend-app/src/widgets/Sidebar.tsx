import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  useTheme,
  useMediaQuery,
  Typography,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import CalculateIcon from '@mui/icons-material/Calculate';
import MemoryIcon from '@mui/icons-material/Memory';
import HistoryIcon from '@mui/icons-material/History';
import ConstructionIcon from '@mui/icons-material/Construction';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { closeSidebar, selectIsSidebarOpen } from '../features/ui/uiSlice';
import { AppRoutes } from '../shared/config/routes';
import { useAuth } from '../features/auth/useAuth';

const drawerWidth = 240;

interface NavItem {
  text: string;
  path: string;
  icon: React.ReactElement;
  authRequired: boolean;
}

const navItems: NavItem[] = [
  { text: 'Core Calculator', path: AppRoutes.HOME, icon: <CalculateIcon />, authRequired: false },
  { text: 'Electronics Modes', path: AppRoutes.ELECTRONICS, icon: <MemoryIcon />, authRequired: false },
  { text: 'Custom Modes', path: AppRoutes.CUSTOM_MODES, icon: <ConstructionIcon />, authRequired: true },
  { text: 'Calculation History', path: AppRoutes.HISTORY, icon: <HistoryIcon />, authRequired: true },
];

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen);
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (isMobile) {
      dispatch(closeSidebar());
    }
    navigate(AppRoutes.HOME);
  };
  
  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      dispatch(closeSidebar());
    }
  };

  const drawerContent = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {navItems.map((item) => {
          if (item.authRequired && !isAuthenticated) {
            return null;
          }
          return (
            <ListItemButton
              key={item.text}
              component={NavLink}
              to={item.path}
              onClick={() => isMobile && dispatch(closeSidebar())}
              sx={{
                '&.active': {
                  backgroundColor: theme.palette.action.selected,
                  borderRight: `3px solid ${theme.palette.primary.main}`,
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.main,
                  }
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          );
        })}
      </List>
      <Divider />
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%', padding: 2 }}>
        {isAuthenticated ? (
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
        ) : (
          <Box>
            <ListItemButton onClick={() => handleNavigation(AppRoutes.LOGIN)}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigation(AppRoutes.REGISTER)}>
              <ListItemIcon>
                <AppRegistrationIcon />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItemButton>
          </Box>
        )}
        <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
            Version 1.0.0
        </Typography>
      </Box>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="main navigation"
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={isSidebarOpen}
          onClose={() => dispatch(closeSidebar())}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};