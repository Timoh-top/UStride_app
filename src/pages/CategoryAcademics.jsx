// CategoryFood.jsx
import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const CategoryAcademics = () => {
  return (
    <Box sx={{ px: { xs: 1, sm: 3 }, py: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
        Academics
      </Typography>

      <Grid container spacing={2}>
        {/* Example items for Academics category */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              component="img"
              src="/assets/academics.jpg" // replace with actual academics images
              alt="Academics item"
              sx={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 1 }}
            />
            <Typography mt={1} fontWeight="bold">
                Mathematics Course
            </Typography>
            <Typography color="text.secondary">₦2,500</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              component="img"
              src="/assets/academics2.jpg"
              alt="Academics item"
              sx={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 1 }}
            />
            <Typography mt={1} fontWeight="bold">
              Physics Course
            </Typography>
            <Typography color="text.secondary">₦2,000</Typography>
          </Paper>
        </Grid>

        {/* Add more academics items here */}
      </Grid>
    </Box>
  );
};

export default CategoryAcademics;