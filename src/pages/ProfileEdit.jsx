import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const ProfileEdit = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // =========================
  // IMAGE HANDLER
  // =========================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // =========================
  // SAVE PROFILE
  // =========================
  const handleSave = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("username", name);
      formData.append("bio", bio);

      if (imageFile) {
        formData.append("profile_picture", imageFile);
      }

      const response = await fetch(`${API}/api/profile/`, {
        method: "PUT", // or PATCH depending on backend
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      console.log("Updated profile:", data);

      alert("Profile updated successfully!");
      navigate("/profile");

    } catch (error) {
      console.log(error);
      alert("Error updating profile");
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        px: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 450,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        {/* Avatar Preview */}
        <Avatar
          src={preview}
          sx={{
            width: 90,
            height: 90,
            margin: "0 auto",
            mb: 2,
          }}
        />

        {/* Upload Button */}
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          Upload Picture
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>

        {/* Name */}
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Bio */}
        <TextField
          fullWidth
          label="Short Bio"
          multiline
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Save Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Save Profile"
          )}
        </Button>
      </Paper>
    </Box>
  );
};

export default ProfileEdit;