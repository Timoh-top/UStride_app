import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white px-4 py-6">

      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {/* EMPTY STATE */}
      {cartItems.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-400">🛒 Your cart is empty</p>

          <button
            onClick={() => navigate("/home")}
            className="mt-4 px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
          >
            Go Shopping
          </button>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

          {/* LEFT - ITEMS */}
          <div className="md:col-span-2 space-y-4">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-xl"
              >

                {/* IMAGE */}
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : item.image || "/placeholder.png"
                  }
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />

                {/* DETAILS */}
                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-green-400 font-bold">
                    ₦{Number(item.price).toLocaleString()}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => handleDecrease(item)}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => handleIncrease(item)}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-500 text-sm"
                >
                  Remove
                </button>

              </div>
            ))}

          </div>

          {/* RIGHT - SUMMARY */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl h-fit">

            <h2 className="text-lg font-semibold">Order Summary</h2>

            <div className="mt-4 space-y-2 text-sm text-gray-300">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{total.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>Free</span>
              </div>

            </div>

            <div className="border-t border-white/10 my-4"></div>

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-green-400">
                ₦{total.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
            >
              Checkout
            </button>

          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;