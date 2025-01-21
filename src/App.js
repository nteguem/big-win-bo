import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { menuItems } from './config/menuConfig';
import AppRoutes from './routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router> 
        <AppRoutes menuItems={menuItems} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
