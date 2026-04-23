import React, { useState } from "react";

const StarSelector = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className={`text-2xl transition duration-150 ${
            (hover || rating) >= star
              ? "text-yellow-400"
              : "text-gray-400"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarSelector;