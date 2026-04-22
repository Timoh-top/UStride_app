import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Buy", "Sell", "Offer", "Connect", "Earn"];

const Landing = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(180deg, #0b0f17 0%, #111827 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        padding: 2,
      }}
    >
      <Box sx={{ maxWidth: "800px" }}>
        
        {/* Brand */}
        <Typography
          variant="h2"
          fontWeight="700"
          sx={{
            letterSpacing: "2px",
            mb: 3,
          }}
        >
          USTRIDE
        </Typography>

        {/* Animated Words */}
        <Box sx={{ height: "80px", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={words[index]}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h3"
                fontWeight="300"
                sx={{ color: "#9ca3af" }}
              >
                {words[index]}
              </Typography>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Tagline */}
        <Typography
          variant="h6"
          sx={{
            mt: 3,
            color: "#6b7280",
            maxWidth: "500px",
            mx: "auto",
          }}
        >
          A campus marketplace where students buy, sell and grow together.
        </Typography>

        {/* Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/home")}
            sx={{
              mt: 5,
              backgroundColor: "#1f2937",
              paddingX: 4,
              paddingY: 1.5,
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#374151",
              },
            }}
          >
            Enter Ustride
          </Button>
        </motion.div>

      </Box>
    </Box>
  );
};

export default Landing;