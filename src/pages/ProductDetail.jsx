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
import API_BASE_URL from "../api";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE_URL}/api/products/${id}/`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log(err);
        setError("Failed to load product");
      }
    };

    fetchProduct();
  }, [id, refresh]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!product) return <Typography>Loading...</Typography>;

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${API_BASE_URL}${product.image}`;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 2 }}>
      <Card>
        <CardMedia component="img" height="300" image={imageUrl} />
        <Box p={2}>
          <Typography variant="h5">{product.name}</Typography>
          <Typography color="green">₦{product.price}</Typography>
          <Typography mt={2}>{product.description}</Typography>
        </Box>
      </Card>

      <Paper sx={{ mt: 2, p: 2, display: "flex", gap: 1 }}>
        <Button fullWidth onClick={() => addToCart(product)}>
          Add to Cart
        </Button>

        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            addToCart(product);
            navigate("/cart");
          }}
        >
          Buy Now
        </Button>
      </Paper>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">Reviews</Typography>

      <ReviewForm
        productId={product.id}
        onReviewSubmitted={() => setRefresh(!refresh)}
      />
    </Box>
  );
};

export default ProductDetail;