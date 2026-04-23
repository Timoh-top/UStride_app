import React, { useState } from "react";
import StarSelector from "./StarSelector";
import API_BASE_URL from "../api";

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitReview = async () => {
    if (!rating) {
      setError("Please select a rating");
      return;
    }

    setError("");
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
          rating,
          review,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      setRating(5);
      setReview("");

      if (onReviewSubmitted) onReviewSubmitted();
    } catch (err) {
      setError("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4 text-white">

      {/* TITLE */}
      <h2 className="text-lg font-semibold mb-3">
        Write a Review
      </h2>

      {/* STARS */}
      <div className="mb-3">
        <StarSelector rating={rating} setRating={setRating} />
      </div>

      {/* TEXTAREA */}
      <textarea
        className="w-full p-3 rounded-lg bg-gray-900 border border-white/10 text-white outline-none focus:border-blue-500"
        rows="3"
        placeholder="Share your experience..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      {/* ERROR */}
      {error && (
        <p className="text-red-400 text-sm mt-2">{error}</p>
      )}

      {/* BUTTON */}
      <button
        onClick={submitReview}
        disabled={loading}
        className="w-full mt-3 bg-blue-600 hover:bg-blue-500 transition py-2 rounded-lg font-medium disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};

export default ReviewForm;