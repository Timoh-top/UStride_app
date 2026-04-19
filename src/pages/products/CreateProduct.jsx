import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const CreateProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/categories/`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.log("Category fetch error:", err);
      }
    };

    fetchCategories();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= IMAGE PREVIEW =================
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You are not logged in");
      navigate("/login");
      return;
    }

    if (!form.name || !form.price || !form.category) {
      alert("Name, price and category are required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(`${API_BASE_URL}/api/products/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      alert("Product created successfully 🎉");
      navigate("/dashboard/vendor");
    } catch (err) {
      console.log("Create product error:", err);
      alert("Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f6f7fb",
        p: 2,
      }}
    >
      <Paper sx={{ p: 4, width: "100%", maxWidth: 500, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Create Product
        </Typography>

        <Typography sx={{ color: "gray", mb: 3 }}>
          Add a new product to your store
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <TextField
            label="Product Name"
            name="name"
            fullWidth
            required
            margin="normal"
            value={form.name}
            onChange={handleChange}
          />

          {/* DESCRIPTION */}
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={form.description}
            onChange={handleChange}
          />

          {/* PRICE */}
          <TextField
            label="Price"
            name="price"
            type="number"
            fullWidth
            required
            margin="normal"
            value={form.price}
            onChange={handleChange}
          />

          {/* CATEGORY (DYNAMIC FIX) */}
          <TextField
            select
            label="Category"
            name="category"
            fullWidth
            required
            margin="normal"
            value={form.category}
            onChange={handleChange}
          >
            {categories.length === 0 ? (
              <MenuItem disabled>Loading categories...</MenuItem>
            ) : (
              categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))
            )}
          </TextField>

          {/* IMAGE UPLOAD */}
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            Upload Product Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImage}
            />
          </Button>

          {/* PREVIEW */}
          {preview && (
            <Box
              component="img"
              src={preview}
              sx={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 2,
                mb: 2,
              }}
            />
          )}

          {/* SUBMIT */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
          >
            {loading ? (
              <CircularProgress size={22} />
            ) : (
              "Create Product"
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateProduct;