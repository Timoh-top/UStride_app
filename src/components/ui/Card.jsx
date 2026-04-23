import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg">
      {children}
    </div>
  );
};

export default Card;