import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import  Logo  from '../assets/logo.png';
import HomePage from '../homepage/HomePage';
import { NavLink } from 'react-router-dom';


const midLinks = [
  {title:"ANASAYFA" ,path:"/"},
  {title:"TESİSLERİMİZ" ,path:"/Facilities"},
  {title:"KURSLARIMIZ" ,path:"/Courses"},
  {title:"ÜCRETLER" ,path:"/Prices"},];

const rightLinks=[
  {title:"Giriş Yap" ,path:"/login"},
  {title:"Üye Ol" ,path:"/register"},

]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  

  const handleButtonClick = () => {
    handleCloseNavMenu(); 
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
        <Box alignContent="flex-start"sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
  <img src={Logo} alt="Logo" />
</Box>


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#1B1B1B"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {midLinks.map(({title,path}) => (
                <MenuItem key={path} component={NavLink} to={path} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{   mr: 2,
              display: { xs: 'flex', md: 'none' },flexGrow:1
              }} >
  <img src={Logo} alt="Logo" />
</Box>
    
          
          <Box sx={{ justifyContent: "center",flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {midLinks.map(({title,path}) => (
              <Button
             
                key={path}
                onClick={() => handleButtonClick()}
                component={NavLink} to={path}
                sx={{ my: 2, color: 'white', display: 'block', "&.active":{color: '#14ADC6'  },
              }}
              >
                {title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip >
            {rightLinks.map(({title,path}) => (
                    <Button
             
                    key={path}
                    onClick={() => handleButtonClick()}
                    component={NavLink} to={path}
                    sx={{ color: 'white', "&.active":{color: '#14ADC6'  },
                  }}
                  >
                    {title}
                  </Button>))}
            
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {rightLinks.map(({title,path}) => (
                <MenuItem key={path} component={NavLink} to={path} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;