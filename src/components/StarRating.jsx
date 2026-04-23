import React from "react";

const StarRating = ({ rating = 0 }) => {
  return (
    <div className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm transition ${
            star <= rating ? "text-yellow-400" : "text-gray-400"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;