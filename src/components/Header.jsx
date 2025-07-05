import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch, Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Header = ({ darkMode, setDarkMode, toggleSidebar, sidebarCollapsed }) => {
  
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleSidebar}>
          {sidebarCollapsed?<MenuIcon />:<MenuOpenIcon />}
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Switch id='switch' name='switch' checked={darkMode} onChange={handleThemeToggle} color="default" />
          <Avatar alt="User" src="https://i.pravatar.cc/300" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;