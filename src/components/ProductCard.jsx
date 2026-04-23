import React from "react";
import Card from "./ui/Card";

const ProductCard = ({ name, price, image, seller, onBuyNow }) => {
  return (
    <Card>
      <img
        src={image}
        className="w-full h-40 object-cover"
      />

      <div className="p-3">
        <h3 className="font-semibold text-sm">{name}</h3>
        <p className="text-xs text-white/50">{seller}</p>
        <p className="text-blue-400 font-bold mt-2">₦{price}</p>

        <button
          onClick={onBuyNow}
          className="w-full mt-3 bg-blue-600 py-2 rounded-xl text-sm"
        >
          View Product
        </button>
      </div>
    </Card>
  );
};

export default ProductCard;