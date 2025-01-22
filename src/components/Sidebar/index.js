import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  IconButton,
} from "@mui/material";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isMobile, menuItems }) => {
  const location = useLocation();
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [open, setOpen] = useState(true);

  const handleToggleSubMenu = (label) => {
    setOpenSubMenu((prev) => (prev === label ? null : label));
  };

  const handleDrawerToggle = () => setOpen((prev) => !prev);

  const isActive = (path) => location.pathname === path; // Vérifie si un chemin correspond à l'URL actuelle

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 80,
        "& .MuiDrawer-paper": {
          width: open ? 240 : 80,
          boxSizing: "border-box",
          backgroundColor: "#fff",
          color: "#000",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.standard,
            }),
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {open && (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src="app/logo.png" alt="Logo" style={{ height: 100 }} />
          </Box>
        )}

        {!isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      <List>
        {menuItems?.map((item) => (
          <React.Fragment key={item.label}>
            <ListItem
              button
              onClick={() => item.subMenu.length > 0 && handleToggleSubMenu(item.label)}
              component={!item.subMenu.length ? Link : "div"}
              to={!item.subMenu.length ? item.path : null}
              sx={{
                px: 3,
                py: 1,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: isActive(item.path) ? "#008000" : "transparent", // Couleur de fond active
                color: isActive(item.path) ? "#fff" : "#000", // Couleur du texte active
                fontWeight: isActive(item.path) ? "bold" : "normal", // Texte en gras si actif
                borderRadius: 2,
                "&:hover": { backgroundColor: "#f1f1f1" },
              }}
            >
              <ListItemIcon
                sx={{ color: isActive(item.path) ? "#fff" : "#008000" }}
              >
                {item.icon}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive(item.path) ? "bold" : "normal",
                  }}
                />
              )}
              {item.subMenu.length > 0 && (
                <Box sx={{ ml: "auto" }}>
                  {openSubMenu === item.label ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Box>
              )}
            </ListItem>

            {item.subMenu.length > 0 && (
              <Collapse in={openSubMenu === item.label} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subMenu.map((subItem) => (
                    <ListItem
                      button
                      key={subItem.label}
                      component={Link}
                      to={subItem.path}
                      sx={{
                        pl: 6,
                        py: 1,
                        cursor: "pointer",
                        backgroundColor: isActive(subItem.path)
                          ? "#E3F2FD"
                          : "transparent", // Couleur de fond active
                        color: isActive(subItem.path) ? "#008000" : "#000",
                        "&:hover": { backgroundColor: "#f9f9f9" },
                      }}
                    >
                      <ListItemIcon
                        sx={{ color: isActive(subItem.path) ? "#008000" : "#000" }}
                      >
                        {subItem.icon}
                      </ListItemIcon>
                      {open && <ListItemText primary={subItem.label} />}
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
