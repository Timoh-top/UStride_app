// CategoryFood.jsx
import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const CategoryGadgets = () => {
  return (
    <Box sx={{ px: { xs: 1, sm: 3 }, py: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
        Gadgets
      </Typography>

      <Grid container spacing={2}>
        {/* Example items for Gadgets category */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              component="img"
              src="/assets/gadgets.jpg" // replace with actual gadgets images
              alt="Gadgets item"
              sx={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 1 }}
            />
            <Typography mt={1} fontWeight="bold">
              Smartphone
            </Typography>
            <Typography color="text.secondary">₦50,000</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              component="img"
              src="/assets/gadgets2.jpg"
              alt="Gadgets item"
              sx={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 1 }}
            />
            <Typography mt={1} fontWeight="bold">
              Laptop
            </Typography>
            <Typography color="text.secondary">₦1,500</Typography>
          </Paper>
        </Grid>

        {/* Add more gadgets items here */}
      </Grid>
    </Box>
  );
};

export default CategoryGadgets;