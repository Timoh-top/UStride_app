export const theme = {
  colors: {
    primary: "#00c3ff",
    secondary: "#111827",
    success: "#16a34a",
    danger: "#ef4444",
    text: "#111",
    muted: "#6b7280",
    background: "#f9fafb",
    white: "#ffffff",
  },

  spacing: (factor) => `${8 * factor}px`, // 8px system

  radius: {
    sm: "6px",
    md: "12px",
    lg: "18px",
  },

  shadow: {
    sm: "0 1px 3px rgba(0,0,0,0.1)",
    md: "0 4px 10px rgba(0,0,0,0.12)",
    lg: "0 10px 25px rgba(0,0,0,0.15)",
  },
};