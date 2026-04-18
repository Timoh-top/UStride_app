import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  Divider,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ReviewForm from "../components/ReviewForm";

const API = import.meta.env.VITE_API_URL;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // =========================
  // FETCH PRODUCT
  // =========================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API}/api/products/${id}/`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log("Product detail error:", err);
        setError("Failed to load product");
      }
    };

    fetchProduct();
  }, [id, refresh]);

  // =========================
  // STATES
  // =========================
  if (error) {
    return (
      <Typography sx={{ textAlign: "center", mt: 5 }} color="error">
        {error}
      </Typography>
    );
  }

  if (!product) {
    return (
      <Typography sx={{ textAlign: "center", mt: 5 }}>
        Loading product...
      </Typography>
    );
  }

  // =========================
  // IMAGE FIX (IMPORTANT)
  // =========================
  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : product.image
    ? `${API}${product.image}`
    : "/placeholder.png";

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <Box sx={{ px: 2, py: 2, maxWidth: "1000px", mx: "auto" }}>
      <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={product.name}
          sx={{ height: 300, objectFit: "cover" }}
        />

        <Box sx={{ p: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            {product.name}
          </Typography>

          <Typography sx={{ color: "green", fontWeight: "bold", mt: 1 }}>
            ₦{product.price}
          </Typography>

          <Typography sx={{ mt: 2, color: "text.secondary" }}>
            {product.description}
          </Typography>
        </Box>
      </Card>

      {/* ACTIONS */}
      <Paper sx={{ mt: 2, p: 2, display: "flex", gap: 1 }}>
        <Button fullWidth variant="outlined" onClick={handleAddToCart}>
          Add to Cart
        </Button>

        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            handleAddToCart();
            navigate("/cart");
          }}
        >
          Buy Now
        </Button>
      </Paper>

      {/* REVIEWS */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Reviews</Typography>
        <Divider sx={{ my: 2 }} />

        {product.reviews?.length ? (
          product.reviews.map((r) => (
            <Paper key={r.id} sx={{ p: 2, mb: 2 }}>
              <Typography>{r.review}</Typography>
            </Paper>
          ))
        ) : (
          <Typography>No reviews yet</Typography>
        )}

        <ReviewForm
          productId={product.id}
          onReviewSubmitted={() => setRefresh((p) => !p)}
        />
      </Box>
    </Box>
  );
};

export default ProductDetail;