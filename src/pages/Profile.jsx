import React, { useEffect, useState } from "react";
import { Box, Avatar, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${API}/api/profile/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate("/login");
          }
          return;
        }

        const data = await response.json();
        setProfile(data);

      } catch (error) {
        console.log("Profile fetch error:", error);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (!profile) {
    return <p style={{ textAlign: "center" }}>No profile found</p>;
  }

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
          textAlign: "center",
        }}
      >
        {/* Avatar */}
        <Avatar
          src={profile.profile_picture}
          sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
        />

        {/* Username */}
        <Typography variant="h6" fontWeight="bold">
          {profile.username}
        </Typography>

        {/* Email */}
        <Typography sx={{ color: "gray", mb: 1 }}>
          {profile.email}
        </Typography>

        {/* Role */}
        <Typography sx={{ mb: 2 }}>
          Role: {profile.role}
        </Typography>

        {/* Home button */}
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate("/home")}
        >
          Go to Home
        </Button>
      </Paper>
    </Box>
  );
};

export default Profile;