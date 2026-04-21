import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

const ProductCard = ({ name, price, image, seller, onBuyNow }) => {
  const imageUrl =
    image?.startsWith("http")
      ? image
      : image
      ? image
      : "/placeholder.png";

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
      <Box sx={{ position: "relative", width: "100%", pt: "100%" }}>
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
      </Box>

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

      <Box p={1.5}>
        <Button fullWidth variant="contained" onClick={onBuyNow}>
          Buy Now
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;