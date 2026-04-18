import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import { useNavigate } from "react-router-dom";

const VendorSidebar = () => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100vh",
        width: 260,
        borderRight: "1px solid #eee",
        background: "linear-gradient(180deg, #ffffff 0%, #f9fafc 100%)",
        display: "flex",
        flexDirection: "column",
        py: 2,
      }}
    >
      {/* BRAND */}
      <Box sx={{ px: 2, mb: 2 }}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: 18,
            background: "linear-gradient(90deg,#2563eb,#7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Vendor Studio
        </Typography>

        <Typography sx={{ fontSize: 12, color: "gray" }}>
          Manage your products & sales
        </Typography>
      </Box>

      <Divider />

      {/* MAIN NAV */}
      <List sx={{ mt: 1 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/dashboard/vendor")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/dashboard/vendor/products")}>
            <ListItemIcon>
              <Inventory2Icon />
            </ListItemIcon>
            <ListItemText primary="My Products" />
          </ListItemButton>
        </ListItem>

        {/* CREATE PRODUCT (HIGHLIGHTED) */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate("/post/create")}
            sx={{
              backgroundColor: "#2563eb",
              color: "white",
              borderRadius: 2,
              mx: 1,
              my: 1,
              "&:hover": {
                backgroundColor: "#1d4ed8",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Create Product" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/dashboard/vendor/sales")}>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary="Sales" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ mt: "auto" }} />

      {/* SETTINGS */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/profile")}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
};

export default VendorSidebar;