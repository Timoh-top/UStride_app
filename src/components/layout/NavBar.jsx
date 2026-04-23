import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [navScrolled, setNavScrolled] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: navScrolled
          ? "rgba(10,10,11,0.92)"
          : "transparent",
        backdropFilter: navScrolled ? "blur(16px)" : "none",
        borderBottom: navScrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "none",
        transition: "all 0.35s",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background:
                "linear-gradient(135deg,#FF9500,#FF3B00)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 800,
              color: "#0A0A0B",
            }}
          >
            S
          </div>

          <span
            style={{
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: "-0.02em",
            }}
          >
            StudyCart
          </span>
        </div>

        {/* RIGHT SIDE (AUTH / PROFILE) */}
        <div style={{ display: "flex", gap: 12 }}>
          {!token ? (
            <>
              <button
                onClick={() => navigate("/login")}
                style={{
                  background: "transparent",
                  color: "#F0EDE8",
                  border:
                    "1px solid rgba(240,237,232,0.2)",
                  borderRadius: 8,
                  padding: "8px 18px",
                  cursor: "pointer",
                }}
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                style={{
                  background:
                    "linear-gradient(135deg,#FF9500,#FF6B00)",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontWeight: 700,
                  cursor: "pointer",
                  color: "#0A0A0B",
                }}
              >
                Join
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/profile")}
              style={{
                background: "#141416",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                borderRadius: 999,
                padding: "8px 16px",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              👤 Profile
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;