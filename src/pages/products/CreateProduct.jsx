import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const CreateProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // FETCH CATEGORIES
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/categories/`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.log("Category fetch error:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in");
      navigate("/login");
      return;
    }

    if (!form.name || !form.price || !form.category) {
      alert("Name, price and category are required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);

      if (image) formData.append("image", image);

      const res = await fetch(`${API_BASE_URL}/api/products/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.detail || "Failed");

      alert("Product created 🎉");
      navigate("/dashboard/vendor");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-xl bg-gray-900 text-white rounded-2xl shadow-xl p-6">

        {/* HEADER */}
        <h1 className="text-2xl font-bold">Create Product</h1>
        <p className="text-gray-400 text-sm mb-6">
          Add a new product to your marketplace
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <input
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />

          {/* PRICE */}
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* CATEGORY */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* IMAGE */}
          <label className="block w-full cursor-pointer">
            <div className="p-3 bg-gray-800 rounded-xl text-center hover:bg-gray-700">
              Upload Product Image
            </div>
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImage}
            />
          </label>

          {/* PREVIEW */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-48 object-cover rounded-xl"
            />
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;