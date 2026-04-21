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

const handleSubmit = async () => {
  if (!title || !price) {
    toast.error("Fill required fields");
    return;
  }

  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", description);
    formData.append("price", price);

    if (category) formData.append("category", category);
    if (imageFile) formData.append("image", imageFile);

    const response = await fetch(`${API}/api/products/create/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.log("NON-JSON RESPONSE:", text);
      throw new Error("Server error (not JSON)");
    }

    if (!response.ok) {
      throw new Error(data?.detail || "Failed to create product");
    }

    toast.success("Product created 🎉");
    navigate("/home");

  } catch (err) {
    toast.error(err.message);
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