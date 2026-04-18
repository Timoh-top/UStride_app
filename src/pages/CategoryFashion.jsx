// CategoryFood.jsx
import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const CategoryFashion = () => {
  return (
    <Box sx={{ px: { xs: 1, sm: 3 }, py: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
        Fashion & Clothing
      </Typography>

      <Grid container spacing={2}>
        {/* Example items for Fashion & Clothing category */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              component="img"
              src="/assets/fashion.jpg" // replace with actual fashion images
              alt="Fashion item"
              sx={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 1 }}
            />
            <Typography mt={1} fontWeight="bold">
              Jacket
            </Typography>
            <Typography color="text.secondary">₦2,500</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              component="img"
              src="/assets/fashion2.jpg"
              alt="Fashion item"
              sx={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 1 }}
            />
            <Typography mt={1} fontWeight="bold">
              Suya
            </Typography>
            <Typography color="text.secondary">₦1,500</Typography>
          </Paper>
        </Grid>

        {/* Add more fashion items here */}
      </Grid>
    </Box>
  );
};

export default CategoryFashion;