import { createTheme } from '@mui/material/styles';
// import { components } from './components';

const theme = createTheme({
  // components,
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
  ],
});

export default theme;