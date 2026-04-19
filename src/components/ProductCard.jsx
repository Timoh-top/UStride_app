import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Stack,
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
        backgroundColor: "#fff",

        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",

        transition: "all 0.25s ease-in-out",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* DELETE ICON */}
      {showDelete && (
        <IconButton
          onClick={onDelete}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255,255,255,0.95)",
            zIndex: 10,
            "&:hover": {
              backgroundColor: "#ffe5e5",
            },
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      )}

      {/* IMAGE */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          pt: "75%",
          overflow: "hidden",
        }}
      >
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
            transition: "transform 0.4s ease",

            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
      </Box>

      {/* CONTENT */}
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography
          variant="subtitle1"
          fontWeight="700"
          noWrap
          sx={{ fontSize: "0.95rem" }}
        >
          {name || "Unnamed Product"}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            display: "block",
            mt: 0.5,
            fontSize: "0.75rem",
          }}
          noWrap
        >
          {seller || "Unknown seller"}
        </Typography>

        {/* PRICE */}
        <Typography
          sx={{
            color: "#1a7f37",
            fontWeight: "800",
            mt: 1,
            fontSize: "1.05rem",
          }}
        >
          ₦{formatPrice(price)}
        </Typography>
      </CardContent>

      {/* BUTTON AREA */}
      <Box sx={{ p: 1.5, pt: 0 }}>
        <Stack spacing={1}>
          <Button
            fullWidth
            variant="contained"
            onClick={onBuyNow}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              background: "linear-gradient(135deg, #ff7a00, #ff5400)",
              boxShadow: "none",

              "&:hover": {
                boxShadow: "0 6px 15px rgba(255,84,0,0.3)",
              },
            }}
          >
            Buy Now
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.8rem",
            }}
          >
            View Details
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default ProductCard;