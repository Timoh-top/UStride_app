import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Skeleton,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import API_BASE_URL from "../api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        if (!API_BASE_URL) {
          throw new Error("API base URL is not defined");
        }

        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE_URL}/api/products/`, {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || "Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Home error:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const SkeletonCard = () => (
    <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Skeleton variant="rectangular" height={160} />
      <CardContent>
        <Skeleton width="80%" />
        <Skeleton width="40%" />
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ px: 2, py: 3, maxWidth: "1200px", mx: "auto" }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Discover Products
      </Typography>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <Grid container spacing={2}>
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <Grid item xs={6} sm={4} md={3} key={i}>
              <SkeletonCard />
            </Grid>
          ))}

        {!loading &&
          !error &&
          products.map((product) => (
            <Grid item xs={6} sm={4} md={3} key={product.id}>
              <ProductCard
                name={product.name}
                price={product.price}
                image={
                  product.image
                    ? product.image.startsWith("http")
                      ? product.image
                      : `${API_BASE_URL}${product.image}`
                    : "/placeholder.png"
                }
                seller={
                  typeof product.vendor === "object"
                    ? product.vendor.username
                    : product.vendor
                }
                onBuyNow={() => navigate(`/product/${product.id}`)}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Home;