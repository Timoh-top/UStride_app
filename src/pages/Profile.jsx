import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(`${API}/api/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) navigate("/login");
          return;
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        No profile found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center shadow-lg">

        {/* AVATAR */}
        <div className="flex justify-center">
          <img
            src={profile.profile_picture}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
          />
        </div>

        {/* USERNAME */}
        <h2 className="text-xl font-bold mt-4">
          {profile.username}
        </h2>

        {/* EMAIL */}
        <p className="text-gray-400 text-sm mt-1">
          {profile.email}
        </p>

        {/* ROLE BADGE */}
        <div className="mt-4 inline-block px-3 py-1 text-sm bg-gray-800 rounded-full text-gray-300">
          Role: {profile.role}
        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/home")}
          className="w-full mt-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition font-semibold"
        >
          Go to Home
        </button>

      </div>
    </div>
  );
};

export default Profile;