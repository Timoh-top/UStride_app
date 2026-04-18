// CategoryFood.jsx
import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const CategorySkills = () => {
  return (
    <Box sx={{ px: { xs: 1, sm: 3 }, py: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
        Skills & Services
      </Typography>

      <Grid container spacing={2}>
        {/* Example items for Skills category */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              component="img"
              src="/assets/skills.jpg" // replace with actual skills images
              alt="Skills item"
              sx={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 1 }}
            />
            <Typography mt={1} fontWeight="bold">
              JavaScript Tutoring
            </Typography>
            <Typography color="text.secondary">₦2,500</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              component="img"
              src="/assets/skills2.jpg"
              alt="Skills item"
              sx={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 1 }}
            />
            <Typography mt={1} fontWeight="bold">
              Social Media Management
            </Typography>
            <Typography color="text.secondary">₦1,500</Typography>
          </Paper>
        </Grid>

        {/* Add more skills items here */}
      </Grid>
    </Box>
  );
};

export default CategorySkills;