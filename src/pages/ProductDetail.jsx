import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ReviewForm from "../components/ReviewForm";
import API_BASE_URL from "../api";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/${id}/`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">

      {/* PRODUCT CARD */}
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">

        {/* IMAGE */}
        <img
          src={
            product.image?.startsWith("http")
              ? product.image
              : `${API_BASE_URL}${product.image}`
          }
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        {/* DETAILS */}
        <div className="p-5">

          <h1 className="text-2xl font-bold">{product.name}</h1>

          <p className="text-green-400 font-semibold mt-2 text-lg">
            ₦{product.price}
          </p>

          <p className="text-gray-400 mt-4 leading-relaxed">
            {product.description}
          </p>

          {/* BUTTONS */}
          <div className="mt-6 space-y-3">

            <button
              onClick={() => addToCart(product)}
              className="w-full py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product);
                navigate("/cart");
              }}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition font-semibold"
            >
              Buy Now
            </button>

          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="max-w-3xl mx-auto mt-8">
        <ReviewForm productId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetail;