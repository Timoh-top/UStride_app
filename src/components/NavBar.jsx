import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API_BASE_URL from "../api";

const Navbar = () => {
  const navigate = useNavigate();
  const cart = useCart() || { cartItems: [] };

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const cartCount = cart.cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE_URL}/api/profile/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) return;

        const data = await res.json();

        const image =
          data.profile_picture?.startsWith("http")
            ? data.profile_picture
            : data.profile_picture
            ? `${API_BASE_URL}${data.profile_picture}`
            : null;

        setAvatar(image);
      } catch {}
    };

    fetchProfile();
  }, [token]);

  const navItems = isLoggedIn
    ? [
        { name: "Home", action: () => navigate("/home") },
        { name: "Dashboard", action: () => navigate("/dashboard") },
        { name: "Profile", action: () => navigate("/profile") },
      ]
    : [
        { name: "Sign In", action: () => navigate("/login") },
        { name: "Register", action: () => navigate("/register") },
      ];

  return (
    <>
      {/* FLOATING NAVBAR */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          pt: 2,
        }}
      >
        <Box
          sx={{
            width: "95%",
            maxWidth: "1200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            px: 2,
            py: 1.2,

            borderRadius: "16px",
            background: "rgba(17, 24, 39, 0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          }}
        >
          {/* BRAND */}
          <Typography
            onClick={() => navigate("/home")}
            sx={{
              fontWeight: 800,
              letterSpacing: "2px",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            USTRIDE
          </Typography>

          {/* SEARCH BAR (CENTER FOCUS) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.8,
              borderRadius: "12px",
              background: "rgba(255,255,255,0.05)",
              width: "40%",
            }}
          >
            <SearchIcon sx={{ color: "rgba(255,255,255,0.6)" }} />
            <InputBase
              placeholder="Search products, skills..."
              sx={{
                color: "white",
                width: "100%",
                fontSize: "14px",
              }}
            />
          </Box>

          {/* ACTIONS */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>

            {/* CREATE */}
            <IconButton
              onClick={() =>
                isLoggedIn ? navigate("/post/create") : navigate("/login")
              }
              sx={{
                color: "white",
                "&:hover": { transform: "scale(1.1)" },
                transition: "0.2s",
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>

            {/* CART */}
            <Box
              onClick={() => navigate("/cart")}
              sx={{ position: "relative", cursor: "pointer", color: "white" }}
            >
              <ShoppingCartOutlinedIcon />
              {cartCount > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    background: "#ef4444",
                    color: "white",
                    width: 16,
                    height: 16,
                    fontSize: 10,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {cartCount}
                </Box>
              )}
            </Box>

            {/* DASHBOARD */}
            {isLoggedIn && (
              <IconButton
                onClick={() => navigate("/dashboard")}
                sx={{ color: "white" }}
              >
                <DashboardOutlinedIcon />
              </IconButton>
            )}

            {/* AVATAR */}
            {isLoggedIn ? (
              <Avatar
                src={avatar || ""}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
            ) : (
              <Typography
                onClick={() => navigate("/login")}
                sx={{
                  color: "white",
                  cursor: "pointer",
                  fontSize: "14px",
                  opacity: 0.8,
                  "&:hover": { opacity: 1 },
                }}
              >
                Sign In
              </Typography>
            )}

            {/* MOBILE MENU */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* PROFILE MENU */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem>
      </Menu>

      {/* DRAWER */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, bgcolor: "#0b0f17", height: "100%", color: "white" }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  onClick={() => {
                    item.action();
                    setOpen(false);
                  }}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;