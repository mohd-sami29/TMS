import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BadgeIcon from "@mui/icons-material/Badge";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import { Link } from "react-router-dom";

const Sidebar = ({ collapsed }) => {
  const drawerWidth = collapsed ? 70 : 240;

  const items = [
    { icon: <HomeIcon />, text: "Home", path: "/" },
    { icon: <BadgeIcon />, text: "Employee", path: "/employee" },
    { icon: <FormatListBulletedIcon />, text: "Master", path: "/master" },
    { icon: <GroupAddIcon />, text: "Team", path: "/team" },
    { icon: <AddAlertIcon />, text: "Alert", path: "/alert" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
        },
      }}
    >
      <Toolbar />
      <List>
        {items &&
          items.map((item, index) => (
            <ListItem
              key={index}
              // button
              component={Link}
              to={item.path}
              sx={{ justifyContent: collapsed ? "center" : "flex-start" }}
            >
              <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                {item.icon}
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  secondary={item.text}
                  sx={{ textAlign: "start", ml:3}}
                />
              )}
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
