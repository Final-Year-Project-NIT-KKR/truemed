import './App.css';
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNewMed from './components/AddNewMed';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import MedicineTable from './components/MedicineTable';
import HomeAdmUsers from './components/HomeAdmUsers';
import StartingPage from './components/StartingPage';
import BusinessDrawer from './components/BusinessDrawer';
import CreateShipment from './components/CreateShipment';
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <StartingPage/> } />
        <Route path="/admin" element={<ResponsiveDrawer componentToPass={<MedicineTable/>}  />} />
        <Route path="/admin/users" element={<ResponsiveDrawer componentToPass={<HomeAdmUsers/>}  />} />
        <Route path="/admin/newMed" element={<ResponsiveDrawer componentToPass={<AddNewMed/>}  />} />
        <Route path="/business" element={ <BusinessDrawer componentToPass={<CreateShipment/>} /> } />
          {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
       
      </Routes>
    </BrowserRouter>
  </ThemeProvider>;
}


// function App() {
//   return (
      
//   );
// }

export {App};
