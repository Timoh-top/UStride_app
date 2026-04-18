import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API_BASE_URL from "../api";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const cart = useCart() || { cartItems: [] };

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const cartCount = cart.cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // ================= PROFILE FETCH =================
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE_URL}/api/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, [token]);

  // ================= UPLOAD PROFILE =================
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      const res = await fetch(`${API_BASE_URL}/api/profile/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      const image =
        data.profile_picture?.startsWith("http")
          ? data.profile_picture
          : `${API_BASE_URL}${data.profile_picture}`;

      setAvatar(image);
    } catch (err) {
      console.log(err);
    }
  };

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
      {/* NAVBAR */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          color: "#111",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          {/* BRAND */}
          <Typography
            onClick={() => navigate("/home")}
            sx={{ fontWeight: "bold", cursor: "pointer" }}
          >
            SkillStride
          </Typography>

          {/* SEARCH */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flex: 1,
              mx: 2,
              backgroundColor: "rgba(0,0,0,0.05)",
              borderRadius: 2,
              px: 2,
              maxWidth: 500,
              alignItems: "center",
            }}
          >
            <SearchIcon />
            <InputBase placeholder="Search..." sx={{ ml: 1 }} />
          </Box>

          {/* RIGHT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

            {/* CREATE */}
            <IconButton
              onClick={() =>
                isLoggedIn ? navigate("/post/create") : navigate("/login")
              }
            >
              <AddCircleIcon />
            </IconButton>

            {/* CART */}
            <Box
              onClick={() => navigate("/cart")}
              sx={{ position: "relative", cursor: "pointer" }}
            >
              <ShoppingCartIcon />
              {cartCount > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    backgroundColor: "red",
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
              <IconButton onClick={() => navigate("/dashboard")}>
                <DashboardIcon />
              </IconButton>
            )}

            {/* AVATAR */}
            {isLoggedIn ? (
              <Avatar
                src={avatar || ""}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ width: 32, height: 32, cursor: "pointer" }}
              />
            ) : (
              <Button onClick={() => navigate("/login")}>
                Sign In
              </Button>
            )}

            {/* MOBILE MENU */}
            <IconButton
              sx={{ display: { xs: "flex", sm: "none" } }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* MENU */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>

        <MenuItem
          onClick={() =>
            document.getElementById("avatar-upload").click()
          }
        >
          Upload Photo
        </MenuItem>

        <MenuItem onClick={() => navigate("/dashboard")}>
          Dashboard
        </MenuItem>
      </Menu>

      <input
        id="avatar-upload"
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) handleUpload(file);
        }}
      />

      {/* DRAWER */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }}>
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