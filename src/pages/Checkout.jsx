import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;
const publicKey = import.meta.env.VITE_PAYSTACK_KEY;

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const userEmail = localStorage.getItem("email") || "customer@email.com";

  useEffect(() => {
    console.log("PAYSTACK KEY LOADED:", publicKey);
  }, []);

  const payWithPaystack = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!window.PaystackPop) {
      toast.error("Paystack script not loaded");
      return;
    }

    if (!publicKey) {
      toast.error("Paystack key missing");
      return;
    }

    setLoading(true);

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: userEmail,
      amount: total * 100,

      callback: function (response) {
        setLoading(false);

        fetch(`${API}/api/verify-payment/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            reference: response.reference,
            cartItems: cartItems,
            total: total,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("Payment Successful 🎉");
            clearCart();
            navigate("/");
          })
          .catch(() => {
            toast.error("Payment verification failed");
          });
      },

      onClose: function () {
        setLoading(false);
        toast.error("Payment cancelled");
      },
    });

    handler.openIframe();
  };

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2, md: 4 },
        py: 3,
        maxWidth: "900px",
        mx: "auto",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Checkout
      </Typography>

      {cartItems.length === 0 ? (
        <Box>
          <Typography>Your cart is empty</Typography>
          <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate("/home")}>
            Go Shopping
          </Button>
        </Box>
      ) : (
        <>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">Order Summary</Typography>
              <Divider sx={{ my: 2 }} />

              {cartItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>
                    {item.name} × {item.quantity}
                  </Typography>
                  <Typography>₦{item.price * item.quantity}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>

          <Card sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
            <Typography variant="h6">Total</Typography>

            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                color: "green",
                mt: 1,
              }}
            >
              ₦{total.toLocaleString()}
            </Typography>

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: "#00c3ff" }}
              onClick={payWithPaystack}
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </Card>
        </>
      )}
    </Box>
  );
};

export default Checkout;