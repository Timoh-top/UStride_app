import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero.jpg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: 4,
          borderRadius: 3,
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Buy, Sell & Offer Your Skills – Start Today
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/home")}
          sx={{ mt: 3 }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default Landing;