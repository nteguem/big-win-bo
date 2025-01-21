import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import { Menu as MenuIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Header = ({ onMobileDrawerToggle }) => {
  const [pseudo, setPseudo] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      setPseudo(userData?.user?.pseudo || '');
    } catch (error) {
      console.error('Erreur lors de la récupération du pseudo:', error);
    }
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Ouvre le menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Ferme le menu
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  // Obtenir les initiales du pseudo
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar sx={{ minHeight: 64, display: 'flex', justifyContent: 'space-between' }}>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            alignItems: 'center',
          }}
        >
          <IconButton
            onClick={onMobileDrawerToggle}
            sx={{
              color: '#00796b',
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Conteneur cliquable */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f9f9f9',
              borderRadius: 2,
              px: 1,
              py: 0.5,
              gap: 1,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer', // Curseur pour indiquer que c'est cliquable
            }}
            onClick={handleMenuClick} // Ouvrir le menu
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor: '#e0f7fa',
                color: '#00796b',
                fontSize: 16,
              }}
            >
              {getInitials(pseudo)}
            </Avatar>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                color: '#333',
              }}
            >
              {pseudo}
            </Typography>
          </Box>

          {/* Menu contextuel */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
              Se déconnecter
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
