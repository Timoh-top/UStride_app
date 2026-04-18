import React from "react";
import { Box } from "@mui/material";

const StarSelector = ({ rating, setRating }) => {
  return (
    <Box sx={{ display: "flex", gap: 0.5, cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            fontSize: "22px",
            color: star <= rating ? "#f5a623" : "#ddd",
            transition: "0.2s",
          }}
        >
          ★
        </span>
      ))}
    </Box>
  );
};

export default StarSelector;