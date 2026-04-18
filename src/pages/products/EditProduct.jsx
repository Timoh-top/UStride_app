import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const token = localStorage.getItem("token");

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/products/${id}/`,
          {
            headers: token
              ? { Authorization: `Bearer ${token}` }
              : {},
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();

        setForm({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          category: data.category || "",
        });

        const img = data.image
          ? data.image.startsWith("http")
            ? data.image
            : `${API_BASE_URL}${data.image}`
          : null;

        setExistingImage(img);
      } catch (err) {
        console.log("Fetch product error:", err);
        alert("Failed to load product");
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= IMAGE CHANGE =================
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ================= UPDATE PRODUCT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You are not logged in");
      navigate("/login");
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

      const res = await fetch(
        `${API_BASE_URL}/api/products/${id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      alert("Product updated successfully 🎉");
      navigate("/dashboard/vendor");
    } catch (err) {
      console.log("Update error:", err);
      alert("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Box sx={{ p: 5, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

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
      <Paper
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 500,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Edit Product
        </Typography>

        <Typography sx={{ color: "gray", mb: 2 }}>
          Update your product details
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <TextField
            label="Product Name"
            name="name"
            value={form.name}
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          {/* DESCRIPTION */}
          <TextField
            label="Description"
            name="description"
            value={form.description}
            fullWidth
            multiline
            rows={3}
            margin="normal"
            onChange={handleChange}
          />

          {/* PRICE */}
          <TextField
            label="Price"
            name="price"
            value={form.price}
            type="number"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          {/* CATEGORY */}
          <TextField
            select
            label="Category"
            name="category"
            value={form.category}
            fullWidth
            margin="normal"
            onChange={handleChange}
          >
            <MenuItem value="food">Food</MenuItem>
            <MenuItem value="fashion">Fashion</MenuItem>
            <MenuItem value="gadgets">Gadgets</MenuItem>
            <MenuItem value="academics">Academics</MenuItem>
            <MenuItem value="skills">Skills</MenuItem>
          </TextField>

          {/* IMAGE */}
          <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
            Change Image
            <input type="file" hidden accept="image/*" onChange={handleImage} />
          </Button>

          {/* IMAGE PREVIEW */}
          <Box sx={{ mt: 2 }}>
            {preview || existingImage ? (
              <img
                src={preview || existingImage}
                alt="product"
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
            ) : null}
          </Box>

          {/* SUBMIT */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            {loading ? <CircularProgress size={22} /> : "Update Product"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EditProduct;