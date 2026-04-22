import React from "react";
import { Card, CardMedia, Typography, Box, Button } from "@mui/material";
import { motion } from "framer-motion";

const ProductCard = ({ name, price, image, seller, onBuyNow }) => {
  const imageUrl =
    image?.startsWith("http") ? image : image ? image : "/placeholder.png";

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
      <Card
        sx={{
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          background: "rgba(17, 24, 39, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          transition: "0.3s",
          "&:hover": {
            boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
          },
        }}
      >
        {/* IMAGE SECTION */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            pt: "100%",
            overflow: "hidden",
          }}
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <CardMedia
              component="img"
              image={imageUrl}
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                objectFit: "cover",
              }}
            />
          </motion.div>

          {/* subtle overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
            }}
          />
        </Box>

        {/* CONTENT */}
        <Box sx={{ p: 1.5 }}>
          <Typography
            noWrap
            sx={{
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "white",
            }}
          >
            {name}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.5)",
              display: "block",
              mt: 0.3,
            }}
          >
            {seller}
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontWeight: 800,
              fontSize: "1rem",
              color: "#60a5fa",
            }}
          >
            ₦{Number(price).toLocaleString()}
          </Typography>
        </Box>

        {/* ACTION */}
        <Box sx={{ px: 1.5, pb: 1.5 }}>
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              fullWidth
              onClick={onBuyNow}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                background: "rgba(37, 99, 235, 0.9)",
                color: "white",
                fontWeight: 600,
                fontSize: "0.85rem",
                py: 1,
                "&:hover": {
                  background: "#2563eb",
                },
              }}
            >
              View Product
            </Button>
          </motion.div>
        </Box>
      </Card>
    </motion.div>
  );
};

export default ProductCard;