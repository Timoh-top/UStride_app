import { useState, useEffect, useRef } from "react";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const categories = [
  { icon: "📚", label: "Textbooks", count: "2,400+" },
  { icon: "💻", label: "Electronics", count: "890+" },
  { icon: "🎒", label: "Supplies", count: "1,200+" },
  { icon: "🏠", label: "Dorm Essentials", count: "3,100+" },
  { icon: "👕", label: "Campus Merch", count: "670+" },
  { icon: "🎵", label: "Instruments", count: "340+" },
  { icon: "🛠️", label: "Services", count: "150+" },
];

const features = [
  {
    icon: "⚡",
    title: "Same-Day Campus Delivery",
    desc: "Order before noon, get it by 5 PM. We know deadlines don't wait.",
    accent: "#FF9500",
  },
  {
    icon: "🔒",
    title: "Student-Verified Sellers",
    desc: "Every seller is verified with a .edu email. Shop with confidence.",
    accent: "#0AF",
  },
  {
    icon: "💸",
    title: "Best Price Guarantee",
    desc: "Find it cheaper anywhere else? We'll match it — no questions asked.",
    accent: "#0D0",
  },
  {
    icon: "🎓",
    title: "Built for Campus Life",
    desc: "Curated by students, for students. Everything you need, nothing you don't.",
    accent: "#B07",
  },
  {
    icon: "🛠️",
    title: "Post your skills",
    desc: "Offer your services to fellow students. From tutoring to tech support, the campus needs you.",
    accent: "#00D"
  }
];

const testimonials = [
  { name: "Amara O.", school: "EKSU", text: "Saved ₦40,000 on textbooks alone. This is the only app I use now.", avatar: "AO" },
  { name: "Tunde K.", school: "EKSU", text: "Got my laptop delivered to my hostel in 3 hours. Insane.", avatar: "TK" },
  { name: "Chisom N.", school: "EKSU", text: "Finally a marketplace built for us. Not Amazon, not Jumia — us.", avatar: "CN" },
];

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default function LandingPage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [query, setQuery] = useState("");
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(timer); };
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Sora', system-ui, sans-serif", background: "#0A0A0B", color: "#F0EDE8", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #FF9500; color: #0A0A0B; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }

        .glow-btn {
          background: linear-gradient(135deg, #FF9500, #FF6B00);
          color: #0A0A0B;
          border: none;
          border-radius: 8px;
          padding: 14px 32px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.3s;
          box-shadow: 0 0 0 rgba(255,149,0,0);
          letter-spacing: 0.01em;
        }
        .glow-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(255,149,0,0.45);
        }
        .glow-btn:active { transform: scale(0.97); }

        .ghost-btn {
          background: transparent;
          color: #F0EDE8;
          border: 1px solid rgba(240,237,232,0.2);
          border-radius: 8px;
          padding: 13px 28px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .ghost-btn:hover { border-color: rgba(255,149,0,0.5); color: #FF9500; background: rgba(255,149,0,0.05); }

        .cat-card {
          background: #141416;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 24px 20px;
          cursor: pointer;
          transition: all 0.25s;
          text-align: center;
        }
        .cat-card:hover {
          border-color: rgba(255,149,0,0.35);
          background: #1A1A1C;
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(255,149,0,0.08);
        }

        .feat-card {
          background: #111113;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 32px 28px;
          transition: all 0.3s;
        }
        .feat-card:hover {
          border-color: rgba(255,255,255,0.12);
          background: #161618;
          transform: translateY(-3px);
        }

        .testi-card {
          background: #111113;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 28px;
          transition: all 0.25s;
        }
        .testi-card:hover { border-color: rgba(255,149,0,0.2); }

        .search-bar {
          background: #1A1A1C;
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-bar.focused {
          border-color: rgba(255,149,0,0.5);
          box-shadow: 0 0 0 3px rgba(255,149,0,0.1);
        }
        .search-input {
          background: transparent;
          border: none;
          outline: none;
          color: #F0EDE8;
          font-size: 16px;
          flex: 1;
          padding: 14px 16px;
          font-family: inherit;
        }
        .search-input::placeholder { color: rgba(240,237,232,0.35); }

        .stat-line {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 16px;
        }

        .badge {
          display: inline-block;
          background: rgba(255,149,0,0.12);
          color: #FF9500;
          border: 1px solid rgba(255,149,0,0.25);
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          padding: 5px 14px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .grid-bg {
          background-image: 
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
        }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse-ring { 0%{transform:scale(0.95);opacity:0.6} 100%{transform:scale(1.3);opacity:0} }
        @keyframes slide-in-left { from{opacity:0;transform:translateX(-48px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slide-in-right { from{opacity:0;transform:translateX(48px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fade-up { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }

        .hero-title { animation: fade-up 0.9s ease forwards; animation-delay: 0.1s; opacity: 0; }
        .hero-sub { animation: fade-up 0.9s ease forwards; animation-delay: 0.3s; opacity: 0; }
        .hero-cta { animation: fade-up 0.9s ease forwards; animation-delay: 0.5s; opacity: 0; }
        .hero-search { animation: fade-up 0.9s ease forwards; animation-delay: 0.65s; opacity: 0; }
        .hero-stats { animation: fade-up 0.9s ease forwards; animation-delay: 0.8s; opacity: 0; }
        .hero-img { animation: slide-in-right 1s ease forwards; animation-delay: 0.3s; opacity: 0; }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .orb1 { width: 500px; height: 500px; background: rgba(255,100,0,0.12); top: -100px; right: -100px; }
        .orb2 { width: 400px; height: 400px; background: rgba(0,120,255,0.08); bottom: 0; left: -80px; }

        .ticker-wrap { overflow: hidden; white-space: nowrap; }
        .ticker { display: inline-block; animation: ticker 20s linear infinite; }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: navScrolled ? "rgba(10,10,11,0.92)" : "transparent",
        backdropFilter: navScrolled ? "blur(16px)" : "none",
        borderBottom: navScrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.35s",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#FF9500,#FF3B00)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#0A0A0B", fontFamily: "'Sora',sans-serif" }}>S</div>
            <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>StudyCart</span>
          </div>
          <div style={{ display: "flex", gap: 28, fontSize: 14, fontWeight: 500, color: "rgba(240,237,232,0.65)" }}>
            {["Browse", "Sell", "Deals", "Community"].map(l => (
              <a key={l} href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#FF9500"}
                onMouseLeave={e => e.target.style.color = "rgba(240,237,232,0.65)"}>{l}</a>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="ghost-btn" style={{ padding: "9px 20px", fontSize: 14 }}>Sign in</button>
            <button className="glow-btn" style={{ padding: "9px 20px", fontSize: 14 }}>Join Free</button>
          </div>
        </div>
      </nav>

      {/* TICKER */}
      <div style={{ position: "relative", top: 0, background: "linear-gradient(90deg,#FF6B00,#FF9500,#FFCC00,#FF9500,#FF6B00)", padding: "6px 0", marginTop: 64 }}>
        <div className="ticker-wrap">
          <span className="ticker" style={{ fontSize: 11, fontWeight: 700, color: "#0A0A0B", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {Array(6).fill("⚡ FREE delivery on orders above ₦5,000  ·  🎓 New semester deals live now  ·  📚 Up to 60% off textbooks  ·  🔥 Flash Sale: Electronics  ·  ").join("")}
          </span>
        </div>
      </div>

      {/* HERO */}
      <section className="grid-bg" style={{ position: "relative", minHeight: "88vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", width: "100%", position: "relative", zIndex: 1 }}>
          <div>
            <div className="hero-title" style={{ marginBottom: 8 }}>
              <span className="badge">🎓 Built for Nigerian Students</span>
            </div>
            <h1 className="hero-title" style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(40px,5vw,64px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", marginTop: 20, marginBottom: 20 }}>
              Everything you<br />need on campus.<br />
              <span style={{ background: "linear-gradient(90deg,#FF9500,#FFD060)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Delivered fast.</span>
            </h1>
            <p className="hero-sub" style={{ fontSize: 17, color: "rgba(240,237,232,0.6)", lineHeight: 1.65, maxWidth: 420, marginBottom: 32 }}>
              The student marketplace that actually gets campus life. Shop textbooks, electronics, dorm essentials & more — from verified student sellers near you.
            </p>
            <div className="hero-cta" style={{ display: "flex", gap: 12, marginBottom: 36, flexWrap: "wrap" }}>
              <button className="glow-btn" style={{ fontSize: 16, padding: "15px 36px" }}>Start Shopping →</button>
              <button className="ghost-btn" style={{ fontSize: 15 }}>Sell Your Items</button>
            </div>
            <div className="hero-search" style={{ maxWidth: 480, marginBottom: 40 }}>
              <div className={`search-bar ${searchFocus ? "focused" : ""}`}>
                <span style={{ padding: "0 12px 0 16px", fontSize: 18 }}>🔍</span>
                <input
                  className="search-input"
                  placeholder="Search textbooks, gadgets, dorm supplies..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onFocus={() => setSearchFocus(true)}
                  onBlur={() => setSearchFocus(false)}
                />
                <button className="glow-btn" style={{ margin: 5, padding: "10px 20px", borderRadius: 7, fontSize: 14 }}>Search</button>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                {["Biochemistry 300L", "MacBook charger", "Mattress topper"].map(t => (
                  <button key={t} onClick={() => setQuery(t)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "4px 10px", fontSize: 12, color: "rgba(240,237,232,0.5)", cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}
                    onMouseEnter={e => { e.target.style.background = "rgba(255,149,0,0.1)"; e.target.style.color = "#FF9500"; }}
                    onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.05)"; e.target.style.color = "rgba(240,237,232,0.5)"; }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="hero-stats stat-line" style={{ display: "flex", gap: 40 }}>
              {[["50K+", "Students"], ["8,400+", "Products"], ["98%", "Satisfaction"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 26, fontWeight: 800, color: "#FF9500", letterSpacing: "-0.02em" }}>{n}</div>
                  <div style={{ fontSize: 13, color: "rgba(240,237,232,0.45)", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="hero-img" style={{ position: "relative" }}>
            <div style={{ position: "relative", animation: "float 4s ease-in-out infinite" }}>
              <div style={{ background: "linear-gradient(145deg,#1A1A1C,#111113)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 24, boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF3B30" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFCC00" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#34C759" }} />
                  <span style={{ marginLeft: 8, fontSize: 13, color: "rgba(240,237,232,0.3)" }}>StudyCart App</span>
                </div>
                {[
                  { emoji: "📖", name: "Organic Chemistry 5th Ed.", price: "₦6,500", badge: "60% OFF", orig: "₦16,200" },
                  { emoji: "💻", name: "Laptop Stand Adjustable", price: "₦4,200", badge: "TOP SELLER", orig: null },
                  { emoji: "🎒", name: "Jansport Campus Backpack", price: "₦8,900", badge: "FREE DELIVERY", orig: null },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <div style={{ width: 44, height: 44, background: "rgba(255,255,255,0.05)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.emoji}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#F0EDE8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: "#FF9500" }}>{item.price}</span>
                        {item.orig && <span style={{ fontSize: 12, color: "rgba(240,237,232,0.3)", textDecoration: "line-through" }}>{item.orig}</span>}
                        <span style={{ fontSize: 10, background: item.badge === "60% OFF" ? "rgba(255,149,0,0.15)" : "rgba(52,199,89,0.12)", color: item.badge === "60% OFF" ? "#FF9500" : "#34C759", border: `1px solid ${item.badge === "60% OFF" ? "rgba(255,149,0,0.3)" : "rgba(52,199,89,0.25)"}`, borderRadius: 4, padding: "2px 6px", fontWeight: 700, letterSpacing: "0.05em" }}>{item.badge}</span>
                      </div>
                    </div>
                    <button style={{ background: "linear-gradient(135deg,#FF9500,#FF6B00)", border: "none", borderRadius: 7, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#0A0A0B", transition: "transform 0.15s" }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.12)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"}>+</button>
                  </div>
                ))}
                <div style={{ marginTop: 16, background: "linear-gradient(135deg,#FF9500,#FF6B00)", borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0A0A0B" }}>Cart Total</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#0A0A0B" }}>₦19,600</span>
                </div>
              </div>
              {/* Floating badges */}
              <div style={{ position: "absolute", top: -16, right: -20, background: "#111113", border: "1px solid rgba(255,149,0,0.3)", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
                <span style={{ fontSize: 18 }}>⚡</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#FF9500" }}>Express</div>
                  <div style={{ fontSize: 10, color: "rgba(240,237,232,0.45)" }}>3hr delivery</div>
                </div>
              </div>
              <div style={{ position: "absolute", bottom: -16, left: -20, background: "#111113", border: "1px solid rgba(52,199,89,0.25)", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
                <span style={{ fontSize: 18 }}>✅</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#34C759" }}>Verified</div>
                  <div style={{ fontSize: 10, color: "rgba(240,237,232,0.45)" }}>Student seller</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ background: "#0D0D0F", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="badge" style={{ marginBottom: 16 }}>Browse by Category</div>
              <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, letterSpacing: "-0.025em" }}>Everything campus needs</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16 }}>
            {categories.map((c, i) => (
              <FadeIn key={c.label} delay={i * 0.08}>
                <div className="cat-card">
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{c.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{c.label}</div>
                  <div style={{ fontSize: 12, color: "rgba(240,237,232,0.4)" }}>{c.count} items</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section style={{ background: "linear-gradient(135deg,#1A0E00,#0A0A0B,#000D1A)", borderTop: "1px solid rgba(255,149,0,0.1)", borderBottom: "1px solid rgba(255,149,0,0.1)", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 32, textAlign: "center" }}>
          {[
            { val: 1000, suffix: "+", label: "Active Students" },
            { val: 3000, suffix: "+", label: "Products Listed" },
            { val: 97, suffix: "%", label: "Delivery Success" },
          ].map(s => (
            <FadeIn key={s.label}>
              <div>
                <div style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(32px,4vw,48px)", fontWeight: 800, color: "#FF9500", letterSpacing: "-0.03em" }}>
                  <AnimatedCounter target={s.val} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 14, color: "rgba(240,237,232,0.45)", marginTop: 6 }}>{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: "#0A0A0B", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: 56 }}>
              <div className="badge" style={{ marginBottom: 16 }}>Why StudyCart</div>
              <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, letterSpacing: "-0.025em", maxWidth: 480 }}>Designed around your campus reality</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.1}>
                <div className="feat-card">
                  <div style={{ width: 48, height: 48, background: `${f.accent}18`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 20, border: `1px solid ${f.accent}28` }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, letterSpacing: "-0.01em" }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(240,237,232,0.5)", lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SELL CTA SECTION */}
      <section style={{ background: "#0D0D0F", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ background: "linear-gradient(135deg,#1A1A1C,#141416)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: "56px 48px", display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}>
              <div>
                <div className="badge" style={{ marginBottom: 16 }}>💰 Earn on Campus</div>
                <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 14 }}>Turn your extra stuff<br />into cash money.</h2>
                <p style={{ fontSize: 15, color: "rgba(240,237,232,0.5)", lineHeight: 1.65, maxWidth: 440 }}>Old textbooks, unused gadgets, dorm furniture — list in 2 minutes and sell to students on your campus. Zero commission on your first 10 sales.</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
                <button className="glow-btn" style={{ whiteSpace: "nowrap", fontSize: 15, padding: "15px 32px" }}>Start Selling Free →</button>
                <div style={{ fontSize: 12, color: "rgba(240,237,232,0.35)", textAlign: "center" }}>No upfront cost · List in 2 mins</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: "#0A0A0B", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="badge" style={{ marginBottom: 16 }}>🌟 Student Love</div>
              <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, letterSpacing: "-0.025em" }}>Real students. Real results.</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.12}>
                <div className="testi-card">
                  <div style={{ fontSize: 22, color: "#FF9500", marginBottom: 16, letterSpacing: -2 }}>★★★★★</div>
                  <p style={{ fontSize: 15, color: "rgba(240,237,232,0.7)", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 38, height: 38, background: "linear-gradient(135deg,#FF9500,#FF3B00)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#0A0A0B" }}>{t.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "rgba(240,237,232,0.4)" }}>{t.school}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: "#0D0D0F", padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="orb" style={{ width: 600, height: 400, background: "rgba(255,100,0,0.08)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(100px)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div className="badge" style={{ marginBottom: 24 }}>🚀 Get Started</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(32px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20, lineHeight: 1.1 }}>
              Your campus marketplace<br />
              <span style={{ background: "linear-gradient(90deg,#FF9500,#FFD060)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>is waiting for you.</span>
            </h2>
            <p style={{ fontSize: 17, color: "rgba(240,237,232,0.5)", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.65 }}>
              Join 50,000+ students already saving money and making money on StudyCart.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="glow-btn" style={{ fontSize: 17, padding: "17px 44px" }}>Create Free Account →</button>
              <button className="ghost-btn" style={{ fontSize: 16 }}>Explore the Marketplace</button>
            </div>
            <p style={{ marginTop: 20, fontSize: 13, color: "rgba(240,237,232,0.25)" }}>No credit card required · Free forever for students</p>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#060607", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "48px 24px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, background: "linear-gradient(135deg,#FF9500,#FF3B00)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#0A0A0B", fontFamily: "'Sora',sans-serif" }}>S</div>
                <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 16 }}>StudyCart</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(240,237,232,0.4)", lineHeight: 1.7, maxWidth: 260 }}>The student marketplace built for campus life in Africa. Fast, trusted, and made just for you.</p>
            </div>
            {[
              { title: "Shop", links: ["Browse All", "New Arrivals", "Flash Deals", "Campus Picks"] },
              { title: "Sell", links: ["Start Selling", "Seller Hub", "Pricing", "Success Stories"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 16, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(240,237,232,0.5)" }}>{col.title}</div>
                {col.links.map(l => (
                  <div key={l} style={{ marginBottom: 10 }}>
                    <a href="#" style={{ fontSize: 14, color: "rgba(240,237,232,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => e.target.style.color = "#F0EDE8"}
                      onMouseLeave={e => e.target.style.color = "rgba(240,237,232,0.5)"}>{l}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontSize: 13, color: "rgba(240,237,232,0.25)" }}>© 2025 StudyCart. Made with ❤️ for Nigerian students.</p>
            <div style={{ display: "flex", gap: 20, fontSize: 13, color: "rgba(240,237,232,0.25)" }}>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
