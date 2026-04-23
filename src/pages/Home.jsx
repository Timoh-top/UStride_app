import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import API_BASE_URL from "../api";

// ==========================
// SCROLL HOOK
// ==========================
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
};

// ==========================
// DATA
// ==========================
const categories = [
  { icon: "📚", label: "Textbooks" },
  { icon: "💻", label: "Electronics" },
  { icon: "🎒", label: "Supplies" },
  { icon: "🏠", label: "Dorm Essentials" },
  { icon: "👕", label: "Campus Merch" },
  { icon: "🎵", label: "Instruments" },
  { icon: "🛠️", label: "Services" },
];

// ==========================
// HOME COMPONENT
// ==========================
const Home = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const [discoverRef, discoverInView] = useInView();

  // ==========================
  // FETCH PRODUCTS (FIXED)
  // ==========================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE_URL}/api/products/`, {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        });

        const data = await res.json();

        // 🔥 SAFETY CHECK (PREVENT CRASH)
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("API did not return array:", data);
          setProducts([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ==========================
  // FILTER
  // ==========================
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div
      style={{
        background: "#0A0A0B",
        color: "#F0EDE8",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        paddingBottom: 80,
      }}
    >
      {/* ==========================
          HERO
      ========================== */}
      <section style={{ padding: "40px 24px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>
          Everything students need on campus
        </h1>
        <p style={{ color: "rgba(240,237,232,0.6)", marginTop: 8 }}>
          Buy, sell, and discover what’s happening around you.
        </p>
      </section>

      {/* ==========================
          CATEGORY ICONS
      ========================== */}
      <section style={{ padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 12, overflowX: "auto" }}>
          <button
            onClick={() => setActiveCategory("All")}
            style={{
              minWidth: 70,
              height: 70,
              borderRadius: 12,
              border: "1px solid #333",
              background:
                activeCategory === "All" ? "#FF9500" : "#141416",
              color: activeCategory === "All" ? "#000" : "#fff",
              cursor: "pointer",
            }}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              style={{
                minWidth: 70,
                height: 70,
                borderRadius: 12,
                border: "1px solid #333",
                background:
                  activeCategory === cat.label
                    ? "#FF9500"
                    : "#141416",
                color:
                  activeCategory === cat.label ? "#000" : "#fff",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: 20 }}>{cat.icon}</div>
              <div style={{ fontSize: 10 }}>{cat.label}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ==========================
          DISCOVER SECTION
      ========================== */}
      <section
        ref={discoverRef}
        style={{
          padding: "50px 24px",
          opacity: discoverInView ? 1 : 0,
          transform: discoverInView
            ? "translateY(0)"
            : "translateY(30px)",
          transition: "all 0.6s ease",
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700 }}>
            🔥 Discover new on campus
          </h2>
          <p style={{ color: "rgba(240,237,232,0.5)" }}>
            Fresh listings from students around you
          </p>
        </div>

        {/* GRID */}
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 16,
            }}
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                style={{
                  height: 200,
                  background: "#141416",
                  borderRadius: 12,
                  border: "1px solid #222",
                  animation: "pulse 1.5s infinite",
                }}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 16,
            }}
          >
            {Array.isArray(filteredProducts) &&
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={
                    product.image?.startsWith("http")
                      ? product.image
                      : `https://res.cloudinary.com/dg2qpdukk/upload/${product.image}`
                  }
                  seller={
                    typeof product.vendor === "object"
                      ? product.vendor.username
                      : product.vendor
                  }
                />
              ))}
          </div>
        )}
      </section>

      {/* ==========================
          FLOATING SELL BUTTON
      ========================== */}
      <button
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "linear-gradient(#FF9500,#FF6B00)",
          border: "none",
          borderRadius: 16,
          padding: "14px 20px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        + Sell Item
      </button>
    </div>
  );
};

export default Home;