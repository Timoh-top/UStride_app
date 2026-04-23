import React from "react";

const BuyerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Welcome Back 👋
        </h1>
        <p className="text-gray-400 text-sm">
          Manage your orders and saved items
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* ORDERS */}
        <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800 hover:border-gray-700 transition">
          <h2 className="font-semibold text-lg">My Orders</h2>
          <p className="text-gray-400 text-sm mt-2">
            Track your purchases and delivery status
          </p>

          <button className="mt-4 text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition">
            View Orders
          </button>
        </div>

        {/* WISHLIST */}
        <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800 hover:border-gray-700 transition">
          <h2 className="font-semibold text-lg">Wishlist</h2>
          <p className="text-gray-400 text-sm mt-2">
            Save products you like for later
          </p>

          <button className="mt-4 text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl transition">
            View Wishlist
          </button>
        </div>

      </div>

    </div>
  );
};

export default BuyerDashboard;