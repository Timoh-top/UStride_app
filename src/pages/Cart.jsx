import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  IconButton,
  Divider,
  Paper,
} from "@mui/material";

import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <Box sx={{ px: { xs: 1, md: 4 }, py: 2, maxWidth: "1100px", mx: "auto" }}>

      {/* HEADER */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Your Cart
      </Typography>

      {/* EMPTY STATE */}
      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography>🛒 Your cart is empty</Typography>

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate("/")}
          >
            Go Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>

          {/* LEFT - ITEMS */}
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => {
              const imageUrl =
                item.image?.startsWith("http")
                  ? item.image
                  : item.image || "/placeholder.png";

              return (
                <Card
                  key={item.id}
                  sx={{
                    display: "flex",
                    mb: 2,
                    p: 1,
                    borderRadius: 2,
                    alignItems: "center",
                  }}
                >
                  {/* IMAGE */}
                  <Box
                    component="img"
                    src={imageUrl}
                    sx={{
                      width: 90,
                      height: 90,
                      objectFit: "cover",
                      borderRadius: 2,
                    }}
                  />

                  {/* DETAILS */}
                  <Box sx={{ flex: 1, px: 2 }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {item.name}
                    </Typography>

                    <Typography sx={{ color: "green", fontWeight: "bold" }}>
                      ₦{Number(item.price).toLocaleString()}
                    </Typography>

                    {/* QUANTITY */}
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <IconButton onClick={() => handleDecrease(item)}>
                        <RemoveIcon />
                      </IconButton>

                      <Typography>{item.quantity}</Typography>

                      <IconButton onClick={() => handleIncrease(item)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* REMOVE */}
                  <Button
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </Card>
              );
            })}
          </Grid>

          {/* RIGHT - SUMMARY */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>

              <Typography fontWeight="bold">Order Summary</Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Subtotal</Typography>
                <Typography>₦{total.toLocaleString()}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Typography>Delivery</Typography>
                <Typography>Free</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography fontWeight="bold">Total</Typography>
                <Typography fontWeight="bold" color="green">
                  ₦{total.toLocaleString()}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2, bgcolor: "#111" }}
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </Button>

            </Paper>
          </Grid>

        </Grid>
      )}
    </Box>
  );
};

export default Cart;