import ResponsiveDrawer from './components/ResponsiveDrawer';
import './App.css';
import * as React from 'react';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6558',
    },
    secondary: {
      main: '#395B64',
    },
  },
});

function App() {
  return <ThemeProvider theme={theme}>
    <ResponsiveDrawer />
  </ThemeProvider>;
}


// function App() {
//   return (
      
//   );
// }

export default App;
