import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ===============================
  // FETCH CATEGORIES
  // ===============================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API}/api/categories/`);
        if (!res.ok) throw new Error();

        const data = await res.json();
        setCategories(data);
      } catch (err) {
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  // ===============================
  // IMAGE VALIDATION
  // ===============================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 1024 * 1024) {
      toast.error("Image must be less than 1MB ❌");
      return;
    }

    setImageFile(file);
  };

  // ===============================
  // SUBMIT PRODUCT
  // ===============================
  const handleSubmit = async () => {
    if (!title || !price) {
      toast.error("Product name and price are required");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", title);
      formData.append("description", description);
      formData.append("price", price);

      if (category) {
        formData.append("category", category);
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch(`${API}/api/products/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.category?.[0] ||
          data?.name?.[0] ||
          data?.price?.[0] ||
          data?.error ||
          "Failed to create product"
        );
      }

      toast.success("Product created successfully 🎉");
      navigate("/home");

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 3,
        px: 2,
      }}
    >
      <Paper
        sx={{
          p: 3,
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" mb={2}>
          Create Product
        </Typography>

        {/* NAME */}
        <TextField
          fullWidth
          label="Product Name"
          sx={{ mb: 2 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* PRICE */}
        <TextField
          fullWidth
          label="Price (₦)"
          type="number"
          sx={{ mb: 2 }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* DESCRIPTION */}
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={3}
          sx={{ mb: 2 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* CATEGORY */}
        <TextField
          select
          label="Category"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ mb: 2 }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.slug}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        {/* IMAGE */}
        <input
          type="file"
          onChange={handleImageChange}
          style={{ marginTop: "10px" }}
        />

        {/* SUBMIT */}
        <Button
          fullWidth
          sx={{ mt: 2 }}
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Posting..." : "Create Product"}
        </Button>
      </Paper>
    </Box>
  );
};

export default CreatePost;