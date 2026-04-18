import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductCard = ({
  name,
  price,
  image,
  seller,
  onBuyNow,
  onDelete,
  showDelete,
}) => {
  const safeImage = image || "/placeholder.png";

  const formatPrice = (value) => {
    if (!value) return "0";
    return Number(value).toLocaleString();
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        boxShadow: 2,

        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      {/* DELETE ICON (TOP RIGHT) */}
      {showDelete && (
        <IconButton
          onClick={onDelete}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255,255,255,0.9)",
            zIndex: 10,
            "&:hover": {
              backgroundColor: "rgba(255,0,0,0.1)",
            },
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      )}

      {/* IMAGE */}
      <Box sx={{ position: "relative", width: "100%", pt: "75%" }}>
        <CardMedia
          component="img"
          image={safeImage}
          alt={name || "product"}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* CONTENT */}
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" noWrap>
          {name || "Unnamed Product"}
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: "text.secondary", display: "block", mt: 0.5 }}
          noWrap
        >
          {seller || "Unknown seller"}
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: "green", fontWeight: "bold", mt: 1 }}
        >
          ₦{formatPrice(price)}
        </Typography>
      </CardContent>

      {/* BUTTON */}
      <Box sx={{ p: 1.5, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={onBuyNow}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Buy Now
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;