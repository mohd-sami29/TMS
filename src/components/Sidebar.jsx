import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const Sidebar = ({ collapsed }) => {
  const drawerWidth = collapsed ? 70 : 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease-in-out',
          overflowX: 'hidden',
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItem
          button
          component={Link}
          to="/"
          sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
        >
          <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
            <HomeIcon />
          </ListItemIcon>
          {!collapsed && (
            <ListItemText
              primary="Home"
              sx={{ textAlign: 'center' }}
            />
          )}
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/employee"
          sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
        >
          <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
            <BadgeIcon />
          </ListItemIcon>
          {!collapsed && (
            <ListItemText
              primary="Employee"
              sx={{ textAlign: 'center' }}
            />
          )}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;