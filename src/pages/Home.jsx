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

  // ================= FETCH PRODUCTS =================
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

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || "Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ================= SKELETON =================
  const SkeletonCard = () => (
    <Card sx={{ borderRadius: 3 }}>
      <Skeleton variant="rectangular" height={180} />
      <CardContent>
        <Skeleton width="70%" />
        <Skeleton width="40%" />
      </CardContent>
    </Card>
  );

  // ================= CATEGORY DATA (UI ONLY) =================
  const categories = [
    "All",
    "Food",
    "Fashion",
    "Gadgets",
    "Academics",
    "Skills",
  ];

  return (
    <Box sx={{ width: "100%", bgcolor: "#f4f6f8" }}>

      {/* ================= HERO SECTION ================= */}
      <Box
        sx={{
          px: { xs: 2, md: 8 },
          py: { xs: 4, md: 6 },
          background: "linear-gradient(135deg, #111827, #1f2937)",
          color: "white",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="800"
          sx={{ fontSize: { xs: "1.5rem", md: "2.2rem" } }}
        >
          Discover, Buy & Sell Anything
        </Typography>

        <Typography sx={{ mt: 1, opacity: 0.8, maxWidth: 500 }}>
          Your campus marketplace for food, fashion, gadgets and skills — all in one place.
        </Typography>

        <Stack direction="row" spacing={2} mt={3} flexWrap="wrap">
          <Button
            variant="contained"
            onClick={() => navigate("/dashboard")}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              background: "#f97316",
              fontWeight: 600,
            }}
          >
            Start Selling
          </Button>

          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              color: "white",
              borderColor: "rgba(255,255,255,0.4)",
            }}
          >
            Explore Marketplace
          </Button>
        </Stack>
      </Box>

      {/* ================= BODY ================= */}
      <Box
        sx={{
          px: { xs: 1.5, sm: 2, md: 6 },
          py: 4,
          maxWidth: "1400px",
          mx: "auto",
        }}
      >

        {/* ================= CATEGORY BAR ================= */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            mb: 3,
            overflowX: "auto",
            pb: 1,
          }}
        >
          {categories.map((cat, i) => (
            <Chip
              key={i}
              label={cat}
              clickable
              sx={{
                fontWeight: 600,
                bgcolor: i === 0 ? "#111827" : "white",
                color: i === 0 ? "white" : "#111827",
                border: "1px solid #e5e7eb",
              }}
            />
          ))}
        </Stack>

        {/* ================= SECTION TITLE ================= */}
        <Typography variant="h6" fontWeight="800" mb={2}>
          🔥 Trending Products
        </Typography>

        {/* ================= ERROR ================= */}
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}

        {/* ================= PRODUCT GRID ================= */}
        <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>

          {/* LOADING */}
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <Grid item xs={6} sm={4} md={3} lg={2.4} key={i}>
                <SkeletonCard />
              </Grid>
            ))}

          {/* PRODUCTS */}
          {!loading &&
            !error &&
            products.map((product) => (
              <Grid item xs={6} sm={4} md={3} lg={2.4} key={product.id}>
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