import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
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
    (acc, item) => acc + item.price * item.quantity,
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
    <Box
      sx={{
        px: { xs: 1, sm: 2, md: 4 },
        py: 2,
        maxWidth: "1100px",
        mx: "auto",
      }}
    >
      {/* ================= HEADER ================= */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 2,
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
        }}
      >
        Your Cart
      </Typography>

      {/* ================= EMPTY STATE ================= */}
      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography sx={{ fontSize: 18, mb: 1 }}>
            🛒 Your cart is empty
          </Typography>

          <Typography sx={{ color: "gray", mb: 3 }}>
            Start shopping to see items here
          </Typography>

          <Button variant="contained" onClick={() => navigate("/home")}>
            Go Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {/* ================= CART ITEMS ================= */}
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Card
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  mb: 2,
                  p: 1,
                  borderRadius: 2,
                }}
              >
                {/* IMAGE */}
                <Box
                  component="img"
                  src={item.image || "https://via.placeholder.com/100"}
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
                    {item.product_name}
                  </Typography>

                  <Typography sx={{ color: "green", fontWeight: "bold" }}>
                    ₦{item.price}
                  </Typography>

                  {/* QUANTITY CONTROLS */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 1,
                      gap: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleDecrease(item)}
                    >
                      <RemoveIcon />
                    </IconButton>

                    <Typography>{item.quantity}</Typography>

                    <IconButton
                      size="small"
                      onClick={() => handleIncrease(item)}
                    >
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
            ))}
          </Grid>

          {/* ================= ORDER SUMMARY ================= */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                position: { md: "sticky" },
                top: 80,
              }}
              elevation={3}
            >
              <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                Order Summary
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Subtotal</Typography>
                <Typography>₦{total.toLocaleString()}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <Typography>Delivery</Typography>
                <Typography>Free</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <Typography>Total</Typography>
                <Typography sx={{ color: "green" }}>
                  ₦{total.toLocaleString()}
                </Typography>
              </Box>

              {/* CHECKOUT BUTTON */}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#111",
                  textTransform: "none",
                }}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Cart;