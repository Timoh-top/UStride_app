import React from "react";
import { Box, Typography, Card, Grid } from "@mui/material";

const DashboardHome = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2 }}>
            <h3>Total Products</h3>
            <h2>12</h2>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2 }}>
            <h3>Orders</h3>
            <h2>5</h2>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2 }}>
            <h3>Revenue</h3>
            <h2>₦0</h2>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;