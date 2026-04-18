// src/pages/Categories.jsx
import React from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Food", path: "/category/food" },
  { name: "Academics", path: "/category/academics" },
  { name: "Gadgets", path: "/category/gadgets" },
  { name: "Fashion & Clothing", path: "/category/fashion" },
  { name: "Skills", path: "/category/skills" },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Categories
      </Typography>

      <Grid container spacing={3}>
        {categories.map((cat) => (
          <Grid item xs={12} sm={6} md={4} key={cat.name}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { boxShadow: 6 },
              }}
              onClick={() => navigate(cat.path)}
            >
              <Typography variant="h6" fontWeight="medium">
                {cat.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;