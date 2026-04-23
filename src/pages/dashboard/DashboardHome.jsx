import React from "react";

const DashboardHome = () => {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-400 text-sm">
          Track your store performance in real time
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* CARD 1 */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800 hover:border-gray-700 transition">
          <p className="text-gray-400 text-sm">Total Products</p>
          <h2 className="text-3xl font-bold mt-2 text-white">12</h2>
        </div>

        {/* CARD 2 */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800 hover:border-gray-700 transition">
          <p className="text-gray-400 text-sm">Orders</p>
          <h2 className="text-3xl font-bold mt-2 text-white">5</h2>
        </div>

        {/* CARD 3 */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800 hover:border-gray-700 transition">
          <p className="text-gray-400 text-sm">Revenue</p>
          <h2 className="text-3xl font-bold mt-2 text-green-400">
            ₦0
          </h2>
        </div>

      </div>

    </div>
  );
};

export default DashboardHome;