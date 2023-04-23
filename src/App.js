import HomeAdmRegMed from './components/HomeAdmRegMed';
import './App.css';
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    {/* <ResponsiveDrawer /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeAdmRegMed />}>
          {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>;
}


// function App() {
//   return (
      
//   );
// }

export {App};
