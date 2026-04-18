import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const API_BASE_URL = import.meta.env.VITE_API_URL;

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  // ================= FETCH VENDOR PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(
          `${API_BASE_URL}/api/products/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log("Vendor dashboard error:", err);
      }
    };

    fetchProducts();
  }, [token, navigate]);

  const menuItems = [
    { text: "Overview", icon: <DashboardIcon />, path: "/dashboard/vendor" },
    { text: "Products", icon: <InventoryIcon />, path: "/dashboard/vendor" },
    { text: "Create Product", icon: <AddCircleIcon />, path: "/post/create" },
    { text: "Settings", icon: <SettingsIcon />, path: "/profile" },
  ];

  const drawer = (
    <Box>
      <Typography
        sx={{
          fontWeight: "bold",
          p: 2,
          fontSize: 18,
        }}
      >
        Vendor Panel
      </Typography>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              {item.icon}
              <ListItemText sx={{ ml: 2 }} primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f6f7fb", minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* MOBILE SIDEBAR */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ display: { sm: "none" } }}
      >
        {drawer}
      </Drawer>

      {/* MAIN AREA */}
      <Box sx={{ flex: 1 }}>
        
        {/* TOP BAR */}
        <AppBar
          position="static"
          sx={{ background: "white", color: "black", boxShadow: 1 }}
        >
          <Toolbar>
            <IconButton
              sx={{ display: { sm: "none" } }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Typography sx={{ flexGrow: 1, fontWeight: "bold" }}>
              Dashboard
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/post/create")}
              startIcon={<AddCircleIcon />}
            >
              Add Product
            </Button>
          </Toolbar>
        </AppBar>

        {/* CONTENT */}
        <Box sx={{ p: 3 }}>
          
          {/* STATS */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography>Total Products</Typography>
                  <Typography variant="h4">{products.length}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography>Active Listings</Typography>
                  <Typography variant="h4">{products.length}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography>Revenue</Typography>
                  <Typography variant="h4">₦0</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* PRODUCTS */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your Products
            </Typography>

            <Grid container spacing={2}>
              {products.map((p) => (
                <Grid item xs={12} sm={6} md={4} key={p.id}>
                  <Card sx={{ borderRadius: 3 }}>

                    {/* IMAGE FIX */}
                    <img
                      src={
                        p.image
                          ? p.image.startsWith("http")
                            ? p.image
                            : `${API_BASE_URL}${p.image}`
                          : "/placeholder.png"
                      }
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                      }}
                    />

                    <CardContent>
                      <Typography fontWeight="bold">
                        {p.name}
                      </Typography>

                      <Typography>₦{p.price}</Typography>

                      <Button
                        size="small"
                        onClick={() =>
                          navigate(`/product/edit/${p.id}`)
                        }
                      >
                        Edit
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default VendorDashboard;