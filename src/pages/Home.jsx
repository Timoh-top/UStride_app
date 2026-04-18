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

// ✅ Get API from environment
const API = import.meta.env.VITE_API_URL;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        // 🔍 Debug: check API value in production
        console.log("API URL:", API);

        if (!API) {
          throw new Error("API URL is not defined. Check VITE_API_URL.");
        }

        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE_URL}/api/products/`, {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        });

        // 🔐 Handle expired/invalid token
        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || "Failed request");
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

  // =========================
  // SKELETON CARD
  // =========================
  const SkeletonCard = () => (
    <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Skeleton variant="rectangular" height={160} />
      <CardContent>
        <Skeleton width="80%" height={20} />
        <Skeleton width="40%" height={20} sx={{ mt: 1 }} />
        <Skeleton width="60%" height={25} sx={{ mt: 1 }} />
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2, md: 4 },
        py: 3,
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      {/* HEADER */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 2,
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
        }}
      >
        Discover Products
      </Typography>

      {/* ERROR */}
      {error && !loading && (
        <Typography color="error" sx={{ textAlign: "center", mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && products.length === 0 && (
        <Typography sx={{ textAlign: "center", mt: 5 }}>
          No products yet. Be the first to post 🚀
        </Typography>
      )}

      {/* GRID */}
      <Grid container spacing={2}>
        {/* LOADING */}
        {loading &&
          Array.from(new Array(8)).map((_, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <SkeletonCard />
            </Grid>
          ))}

        {/* PRODUCTS */}
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
                      : `${API}${product.image}`
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