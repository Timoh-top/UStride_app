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

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`${API_BASE_URL}/api/products/${id}/`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 2 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={product.image}
        />

        <Box p={2}>
          <Typography variant="h5">{product.name}</Typography>
          <Typography color="green">
            ₦{product.price}
          </Typography>
          <Typography mt={2}>{product.description}</Typography>
        </Box>
      </Card>

      <Paper sx={{ mt: 2, p: 2 }}>
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

      <ReviewForm productId={product.id} />
    </Box>
  );
};

export default ProductDetail;