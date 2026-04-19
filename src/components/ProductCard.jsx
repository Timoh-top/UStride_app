import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";

const ProductCard = ({ name, price, image, seller, onBuyNow }) => {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: 2,
        transition: "0.3s",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >

      {/* IMAGE FIX */}
      <Box sx={{ position: "relative", width: "100%", pt: "100%" }}>
        <CardMedia
          component="img"
          image={image}
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            objectFit: "cover",
          }}
        />
      </Box>

      {/* CONTENT */}
      <CardContent>
        <Typography noWrap fontWeight="700">
          {name}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {seller}
        </Typography>

        <Typography fontWeight="800" color="green" mt={1}>
          ₦{Number(price).toLocaleString()}
        </Typography>
      </CardContent>

      {/* BUTTON */}
      <Box p={1.5}>
        <Button
          fullWidth
          variant="contained"
          onClick={onBuyNow}
          sx={{ borderRadius: 2 }}
        >
          Buy Now
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;