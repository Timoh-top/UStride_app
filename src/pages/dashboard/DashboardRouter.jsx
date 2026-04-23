import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const DashboardRouter = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading | redirecting | error

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        setStatus("loading");

        const res = await fetch(`${API_BASE_URL}/api/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();

        setStatus("redirecting");

        // ROLE ROUTING
        setTimeout(() => {
          if (data.role === "vendor") {
            navigate("/dashboard/vendor");
          } else {
            navigate("/dashboard/buyer");
          }
        }, 800);
      } catch (err) {
        console.log("Dashboard router error:", err);
        setStatus("error");

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">

      <div className="text-center space-y-4">

        {status === "loading" && (
          <>
            <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-300 text-sm">
              Checking your dashboard...
            </p>
          </>
        )}

        {status === "redirecting" && (
          <>
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-green-400 text-sm">
              Redirecting you to your dashboard...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <p className="text-red-400 text-sm">
              Something went wrong. Redirecting to login...
            </p>
          </>
        )}

      </div>
    </div>
  );
};

export default DashboardRouter;