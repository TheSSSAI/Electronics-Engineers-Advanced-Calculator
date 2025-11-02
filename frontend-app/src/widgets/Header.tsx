import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Tooltip,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import SyncIcon from '@mui/icons-material/Sync';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleSidebar, openHelpModal } from '../features/ui/uiSlice';
import { useAuth } from '../features/auth/useAuth';
import { selectIsOffline, selectSyncState } from '../features/offline/offlineSlice';
import { AppRoutes } from '../shared/config/routes';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { isAuthenticated, user, logout } = useAuth();
  const isOffline = useAppSelector(selectIsOffline);
  const syncState = useAppSelector(selectSyncState);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isUserMenuOpen = Boolean(anchorEl);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    logout();
    navigate(AppRoutes.HOME);
  };

  const renderSyncStatusIcon = () => {
    if (isOffline) {
      return (
        <Tooltip title="Offline Mode: Changes are saved locally.">
          <CloudOffIcon />
        </Tooltip>
      );
    }

    switch (syncState) {
      case 'syncing':
        return (
          <Tooltip title="Syncing offline changes...">
            <SyncIcon sx={{ animation: 'spin 2s linear infinite' }} />
          </Tooltip>
        );
      case 'success':
        return (
          <Tooltip title="All changes saved.">
            <CloudDoneIcon color="success" />
          </Tooltip>
        );
      case 'idle':
      default:
        return null; // Don't show an icon when online and idle
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        '@keyframes spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }}
      color="default"
      elevation={1}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => dispatch(toggleSidebar())}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Sci-Calc Pro
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
            {renderSyncStatusIcon()}
          </Box>
          <Tooltip title="Open Help">
            <IconButton
              color="inherit"
              aria-label="open help"
              onClick={() => dispatch(openHelpModal())}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
          
          {isAuthenticated ? (
            <>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleUserMenuOpen}
                  color="inherit"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                >
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={isUserMenuOpen}
                onClose={handleUserMenuClose}
                sx={{ mt: '45px' }}
              >
                <MenuItem disabled>
                  <Typography variant="body2" color="text.secondary">
                    {user?.email}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              onClick={() => navigate(AppRoutes.LOGIN)}
              aria-label="login"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};