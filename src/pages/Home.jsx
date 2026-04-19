import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Skeleton,
  Card,
  CardContent,
  Stack,
  Chip,
  Button,
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
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE_URL}/api/products/`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        if (!res.ok) throw new Error(await res.text());

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["All", "Food", "Fashion", "Gadgets", "Academics", "Skills"];

  const SkeletonCard = () => (
    <Card sx={{ borderRadius: 3 }}>
      <Skeleton variant="rectangular" height={160} />
      <CardContent>
        <Skeleton width="70%" />
        <Skeleton width="40%" />
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ width: "100%", bgcolor: "#f4f6f8", overflowX: "hidden" }}>

      {/* HERO */}
      <Box
        sx={{
          px: { xs: 2, md: 8 },
          py: { xs: 4, md: 6 },
          background: "linear-gradient(135deg, #111827, #1f2937)",
          color: "white",
        }}
      >
        <Typography
          fontWeight="800"
          sx={{ fontSize: { xs: "1.5rem", md: "2.2rem" } }}
        >
          Discover, Buy & Sell Anything
        </Typography>

        <Typography sx={{ mt: 1, opacity: 0.8, maxWidth: 500 }}>
          Your campus marketplace
        </Typography>

        <Stack direction="row" spacing={2} mt={3} flexWrap="wrap">
          <Button variant="contained" onClick={() => navigate("/dashboard")}>
            Start Selling
          </Button>
        </Stack>
      </Box>

      {/* BODY */}
      <Box sx={{ px: { xs: 1.5, md: 6 }, py: 4 }}>

        {/* CATEGORIES */}
        <Stack direction="row" spacing={1} sx={{ mb: 3, overflowX: "auto" }}>
          {categories.map((cat, i) => (
            <Chip key={i} label={cat} clickable />
          ))}
        </Stack>

        <Typography fontWeight="800" mb={2}>
          🔥 Trending Products
        </Typography>

        {/* GRID FIXED */}
        <Grid
          container
          spacing={2}
          columns={12}
        >
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
    </Box>
  );
};

export default Home;