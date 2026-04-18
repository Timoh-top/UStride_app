import React from "react";
import { Box } from "@mui/material";

const StarRating = ({ rating = 0 }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        style={{
          color: i <= rating ? "#f5a623" : "#ddd",
          fontSize: "18px",
          marginRight: 2,
        }}
      >
        ★
      </span>
    );
  }

  return <Box>{stars}</Box>;
};

export default StarRating;