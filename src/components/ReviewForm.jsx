import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import StarSelector from "./StarSelector";
import API_BASE_URL from "../api";

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (!rating) {
      alert("Please select rating");
      return;
    }

    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE_URL}/api/add_review/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          rating: rating,
          review: review,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Backend error:", data);
        throw new Error(data.error || "Failed to submit review");
      }

      setRating(5);
      setReview("");

      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (err) {
      console.log(err);
      alert("Failed to submit review");
    }

    setLoading(false);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">Write a Review</Typography>

      <Box sx={{ mt: 1 }}>
        <StarSelector rating={rating} setRating={setRating} />
      </Box>

      <TextField
        fullWidth
        multiline
        rows={3}
        sx={{ mt: 2 }}
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={submitReview}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </Box>
  );
};

export default ReviewForm;