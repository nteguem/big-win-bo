import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme, Drawer, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Header from '../Header';
import Sidebar from '../Sidebar';

const Layout = ({ children, menuItems }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(!isMobile);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  
  const drawerWidth = {
    open: 240,
    closed: 80
  };

  const handleDrawerToggle = () => {
    if (isMobile) {
      setIsMobileDrawerOpen(!isMobileDrawerOpen);
    } else {
      setIsDrawerOpen(!isDrawerOpen);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        minHeight: '100vh',
        maxWidth: '100vw',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Header 
        onMobileDrawerToggle={handleDrawerToggle}
        drawerWidth={isDrawerOpen ? drawerWidth.open : drawerWidth.closed}
        isMobile={isMobile}
      />

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={isMobileDrawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ 
            keepMounted: true,
            sx: { zIndex: theme.zIndex.drawer + 2 }
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth.open,
              boxSizing: 'border-box',
            },
          }}
        >
          <Sidebar 
            menuItems={menuItems}
            isMobile={true}
            open={true}
          />
        </Drawer>
      )}

      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          open={isDrawerOpen}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: isDrawerOpen ? drawerWidth.open : drawerWidth.closed,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden',
              boxSizing: 'border-box',
              zIndex: theme.zIndex.drawer,
            },
          }}
        >
          <Sidebar 
            menuItems={menuItems}
            isMobile={false}
            open={isDrawerOpen}
          />
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          height: '100vh',
          overflow: 'auto',
          backgroundColor: theme.palette.background.default,
          padding: {
            xs: 2,
            sm: 3
          },
          width: {
            xs: '100%',
            md: `calc(100% - ${isDrawerOpen ? drawerWidth.open : drawerWidth.closed}px)`
          },
          marginTop: '64px',
          marginLeft: {
            xs: 0,
            md: isDrawerOpen ? `${drawerWidth.open}px` : `${drawerWidth.closed}px`
          },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          '& > *': {
            maxWidth: '100%'
          }
        }}
      >
        <Box sx={{ 
          maxWidth: '100%',
          overflow: 'hidden',
          '& > *': {
            maxWidth: '100%'
          }
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;