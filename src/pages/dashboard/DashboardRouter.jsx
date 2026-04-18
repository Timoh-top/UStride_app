import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const DashboardRouter = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/profile/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();

        // 🎯 ROLE DECISION ENGINE
        if (data.role === "vendor") {
          navigate("/dashboard/vendor");
        } else {
          navigate("/dashboard/buyer");
        }
      } catch (err) {
        console.log("Dashboard router error:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div style={{ padding: 30, textAlign: "center" }}>
      {loading ? "Loading dashboard..." : "Redirecting..."}
    </div>
  );
};

export default DashboardRouter;