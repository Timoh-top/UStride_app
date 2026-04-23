import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/products/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log("Vendor dashboard error:", err);
      }
    };

    fetchProducts();
  }, [token, navigate]);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Vendor Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Manage your products and track performance
          </p>
        </div>

        <button
          onClick={() => navigate("/product/create")}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-white font-semibold transition"
        >
          + Add Product
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800">
          <p className="text-gray-400 text-sm">Total Products</p>
          <h2 className="text-3xl font-bold mt-2">{products.length}</h2>
        </div>

        <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800">
          <p className="text-gray-400 text-sm">Active Listings</p>
          <h2 className="text-3xl font-bold mt-2">{products.length}</h2>
        </div>

        <div className="bg-gray-900 p-5 rounded-2xl border border-gray-800">
          <p className="text-gray-400 text-sm">Revenue</p>
          <h2 className="text-3xl font-bold mt-2 text-green-400">₦0</h2>
        </div>

      </div>

      {/* PRODUCTS */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-white">
          Your Products
        </h2>

        {products.length === 0 ? (
          <div className="bg-gray-900 p-6 rounded-2xl text-center text-gray-400">
            No products yet
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

            {products.map((p) => {
              const imageUrl =
                p.image?.startsWith("http")
                  ? p.image
                  : p.image
                  ? `${API_BASE_URL}${p.image}`
                  : "/placeholder.png";

              return (
                <div
                  key={p.id}
                  className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition"
                >
                  {/* IMAGE */}
                  <img
                    src={imageUrl}
                    alt={p.name}
                    className="w-full h-32 object-cover"
                  />

                  {/* CONTENT */}
                  <div className="p-3">
                    <h3 className="text-sm font-semibold truncate">
                      {p.name}
                    </h3>

                    <p className="text-green-400 text-sm mt-1">
                      ₦{Number(p.price).toLocaleString()}
                    </p>

                    <button
                      onClick={() =>
                        navigate(`/product/edit/${p.id}`)
                      }
                      className="mt-2 w-full text-xs bg-gray-800 hover:bg-gray-700 py-1.5 rounded-lg transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>

    </div>
  );
};

export default VendorDashboard;