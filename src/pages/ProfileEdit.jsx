import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const ProfileEdit = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("username", name);
      formData.append("bio", bio);

      if (imageFile) {
        formData.append("profile_picture", imageFile);
      }

      const res = await fetch(`${API}/api/profile/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update profile");

      await res.json();

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.log(err);
      alert("Error updating profile");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">

        {/* TITLE */}
        <h1 className="text-xl font-bold text-center mb-6">
          Edit Profile
        </h1>

        {/* AVATAR PREVIEW */}
        <div className="flex justify-center mb-4">
          <img
            src={preview || "https://via.placeholder.com/100"}
            alt="preview"
            className="w-24 h-24 rounded-full object-cover border border-gray-700"
          />
        </div>

        {/* UPLOAD */}
        <label className="block text-center mb-4">
          <span className="inline-block px-4 py-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition">
            Upload Picture
          </span>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {/* NAME */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Enter your name"
          />
        </div>

        {/* BIO */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Tell us about yourself"
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition font-semibold"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>

      </div>
    </div>
  );
};

export default ProfileEdit;