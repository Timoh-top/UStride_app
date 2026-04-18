// CategoryFood.jsx
import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const CategoryFood = () => {
  return (
    <Box sx={{ px: { xs: 1, sm: 3 }, py: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
        Food
      </Typography>

      <Grid container spacing={2}>
        {/* Example items for Food category */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              component="img"
              src="/assets/food.jpg" // replace with actual food images
              alt="Food item"
              sx={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 1 }}
            />
            <Typography mt={1} fontWeight="bold">
              Jollof Rice
            </Typography>
            <Typography color="text.secondary">₦2,500</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              component="img"
              src="/assets/food2.jpg"
              alt="Food item"
              sx={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 1 }}
            />
            <Typography mt={1} fontWeight="bold">
              Suya
            </Typography>
            <Typography color="text.secondary">₦1,500</Typography>
          </Paper>
        </Grid>

        {/* Add more food items here */}
      </Grid>
    </Box>
  );
};

export default CategoryFood;