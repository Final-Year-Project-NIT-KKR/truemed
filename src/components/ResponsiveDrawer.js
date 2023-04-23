import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SortIcon from '@mui/icons-material/Sort';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import logo from '../images/logo_without_background.png'
import { Stack } from '@mui/system';
import { useNavigate } from "react-router-dom";

const drawerWidth = 350;

function ResponsiveDrawer(props) {

  const componentToPass = props.componentToPass;

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigate = useNavigate();


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerClick = (index)=>{
    if( index === 0 )
      navigate('/admin')
    else if( index === 1)
    {
      navigate('/admin/users')
    }
    else
      navigate('/admin/newMed')
  }
  const drawer = (
    <div sx={{fontFamily: 'raleway'}}>
      {/* <Toolbar /> */}
      <Stack sx={{textAlign:'center', align:'center', justifyContent:"center",
  alignItems:"center"
}}  >
      <img src={logo} height={'200vh'} width={'200vh'} sx={{position:'absolute', textAlign: 'center'}} alt='nothing'/>
      <Typography variant="h4" noWrap component="div" sx={{fontFamily: 'raleway', paddingBottom:3}}>
            TRUEMED
          </Typography>
      </Stack>
      <Divider />
      <List>
          <ListItem >
            <ListItemButton  onClick={()=>handleDrawerClick(0)} sx={{paddingLeft: 4}}>
              <ListItemIcon>
                 <SortIcon /> 
              </ListItemIcon>
              <ListItemText primary={'List of Medicines'} />
            </ListItemButton>
           </ListItem> 
           <ListItem>
            <ListItemButton  onClick={(index)=>handleDrawerClick(1)} sx={{paddingLeft: 4}}>
              <ListItemIcon>
                 <PersonIcon/>
              </ListItemIcon>
              <ListItemText primary={'Users'} />
            </ListItemButton>
            </ListItem>
            <ListItem>
            <ListItemButton  onClick={(index)=>handleDrawerClick(2)} sx={{paddingLeft: 4}}>
              <ListItemIcon>
                 <MedicalServicesIcon/>
              </ListItemIcon>
              <ListItemText primary={'Add new Medicine'} />
            </ListItemButton>

          </ListItem>
      </List>
      <Divider />
      {/* <IconButton aria-label="logout" size="small">
        <LogoutSharpIcon fontSize="inherit" /> Logout
      </IconButton> */}
      <ListItemButton sx={{position: 'absolute', bottom: 20, width:'100%', paddingLeft: 4
}}>
              <ListItemIcon>
                <LogoutSharpIcon/>
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
      </ListItemButton>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{fontFamily: 'raleway', color: 'white'}}>
            TRUEMED
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

        {componentToPass}  
      </Box>
    </Box>
  );
  
 
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;