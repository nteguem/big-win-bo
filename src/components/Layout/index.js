import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme, Drawer } from '@mui/material';
import Header from '../Header';
import Sidebar from '../Sidebar';

const Layout = ({ children,menuItems }) => {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>      
      {/* Header */}
      <Header onMobileDrawerToggle={handleDrawerToggle} />

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        <Sidebar open={true} onDrawerToggle={handleDrawerToggle} menuItems={menuItems} isMobile={mobileOpen} />
      </Drawer>
 
      {/* Desktop Drawer */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Sidebar open={open} onDrawerToggle={handleDrawerToggle} menuItems={menuItems}  />
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${open ? 300 : 70}px)` },
          mt: '64px', // Height of AppBar
        
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;