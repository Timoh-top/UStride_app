import React from "react";
import { Box, Typography, Grid, Card } from "@mui/material";

const BuyerDashboard = () => {
  return (
    <Box sx={{ p: 3, backgroundColor: "#f7f8fa", minHeight: "100vh" }}>
      
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Welcome Back 👋
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography fontWeight="bold">My Orders</Typography>
            <Typography sx={{ mt: 1, color: "gray" }}>Track your purchases</Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography fontWeight="bold">Wishlist</Typography>
            <Typography sx={{ mt: 1, color: "gray" }}>Saved products</Typography>
          </Card>
        </Grid>
      </Grid>

    </Box>
  );
};

export default BuyerDashboard;