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
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import API_BASE_URL from "../api";

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);

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
    <Card sx={{ borderRadius: 3, bgcolor: "#111827" }}>
      <Skeleton variant="rectangular" height={160} />
      <CardContent>
        <Skeleton width="70%" />
        <Skeleton width="40%" />
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0b0f17",
        color: "white",
      }}
    >
      {/* HERO */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          px: { xs: 2, md: 10 },
          py: { xs: 6, md: 8 },
          background: "radial-gradient(circle at top, #1f2937, #0b0f17)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Typography
          fontWeight="800"
          sx={{
            fontSize: { xs: "1.8rem", md: "3rem" },
            letterSpacing: "-1px",
          }}
        >
          Your Campus Marketplace
        </Typography>

        <Typography sx={{ mt: 1, opacity: 0.6, maxWidth: 500 }}>
          Buy. Sell. Offer skills. Everything you need — in one place.
        </Typography>

        <Stack direction="row" spacing={2} mt={4}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="contained"
              onClick={() => navigate("/dashboard")}
              sx={{
                bgcolor: "#2563eb",
                borderRadius: "12px",
                textTransform: "none",
              }}
            >
              Start Selling
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="outlined"
              onClick={() => navigate("/home")}
              sx={{
                borderColor: "rgba(255,255,255,0.2)",
                color: "white",
                borderRadius: "12px",
                textTransform: "none",
              }}
            >
              Explore
            </Button>
          </motion.div>
        </Stack>
      </MotionBox>

      {/* BODY */}
      <Box sx={{ px: { xs: 2, md: 10 }, py: 5 }}>

        {/* CATEGORIES */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            mb: 4,
            overflowX: "auto",
            pb: 1,
          }}
        >
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Chip
                label={cat}
                sx={{
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "white",
                  borderRadius: "10px",
                  px: 1,
                }}
                clickable
              />
            </motion.div>
          ))}
        </Stack>

        <Typography fontWeight="700" mb={3} sx={{ opacity: 0.8 }}>
          🔥 Trending Products
        </Typography>

        {/* GRID */}
        <Grid container spacing={2}>
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <Grid item xs={6} sm={4} md={3} key={i}>
                <SkeletonCard />
              </Grid>
            ))}

          {!loading &&
            !error &&
            products.map((product, index) => (
              <MotionGrid
                item
                xs={6}
                sm={4}
                md={3}
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.div whileHover={{ y: -6 }}>
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
                </motion.div>
              </MotionGrid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;