import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;
const publicKey = import.meta.env.VITE_PAYSTACK_KEY;

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const userEmail = localStorage.getItem("email") || "customer@email.com";

  const payWithPaystack = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!window.PaystackPop) {
      toast.error("Payment system not loaded");
      return;
    }

    setLoading(true);

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: userEmail,
      amount: total * 100,

      callback: function (response) {
        fetch(`${API}/api/verify-payment/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            reference: response.reference,
            cartItems,
            total,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("Payment Successful 🎉");
            clearCart();
            navigate("/home");
          })
          .catch(() => {
            toast.error("Payment verification failed");
          })
          .finally(() => setLoading(false));
      },

      onClose: function () {
        setLoading(false);
        toast.error("Payment cancelled");
      },
    });

    handler.openIframe();
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white px-4 py-8">
      
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {cartItems.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-400">Your cart is empty</p>

          <button
            onClick={() => navigate("/home")}
            className="mt-4 px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
          >
            Go Shopping
          </button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-4">

          {/* Order Summary */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
            <h2 className="text-lg font-semibold mb-3">Order Summary</h2>

            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-300">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Card */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total</span>
              <span className="text-2xl font-bold text-green-400">
                ₦{total.toLocaleString()}
              </span>
            </div>

            <button
              onClick={payWithPaystack}
              disabled={loading}
              className="mt-5 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold disabled:opacity-50"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Checkout;