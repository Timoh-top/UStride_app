import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Images
import foodImg from "../assets/cookies.jpg";
import academicsImg from "../assets/laptop.jpg";
import gadgetsImg from "../assets/headset.jpg";
import fashionImg from "../assets/cloth.jpg";
import skillsImg from "../assets/laptop.jpg";

const categories = [
  { name: "Food", image: foodImg, path: "/category/food" },
  { name: "Academics", image: academicsImg, path: "/category/academics" },
  { name: "Gadgets", image: gadgetsImg, path: "/category/gadgets" },
  { name: "Fashion & Clothing", image: fashionImg, path: "/category/fashion" },
  { name: "Skills", image: skillsImg, path: "/category/skills" },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ px: { xs: 1, sm: 3 }, py: 4 }}>

      {/* 🔥 BEAUTIFUL HEADER */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            letterSpacing: "2px",
            fontFamily: "'Poppins', sans-serif",
            color: "#111",
            textTransform: "uppercase",
          }}
        >
          Categories
        </Typography>

        {/* underline accent */}
        <Box
          sx={{
            width: "80px",
            height: "4px",
            background: "#1976d2",
            margin: "10px auto",
            borderRadius: "10px",
          }}
        />

        <Typography
          variant="body2"
          sx={{
            color: "gray",
            fontSize: "15px",
            mt: 1,
          }}
        >
          Explore products by category
        </Typography>
      </Box>

      {/* CATEGORY GRID */}
      <Grid container spacing={3}>
        {categories.map((cat) => (
          <Grid
            item
            key={cat.name}
            xs={12}   // mobile: 1 per row
            sm={6}    // tablet: 2 per row
            md={4}    // desktop: 3 per row
          >
            <Paper
              elevation={4}
              onClick={() => navigate(cat.path)}
              sx={{
                cursor: "pointer",
                height: { xs: 180, sm: 220, md: 260 },
                position: "relative",
                overflow: "hidden",
                borderRadius: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.04)",
                  boxShadow: 6,
                },
              }}
            >
              {/* IMAGE */}
              <Box
                component="img"
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* DARK OVERLAY */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.4)",
                }}
              />

              {/* TEXT */}
              <Typography
                variant="h5"
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: { xs: 18, sm: 20, md: 22 },
                }}
              >
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