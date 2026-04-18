import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb", // modern blue
    },
    secondary: {
      main: "#f59e0b", // warm accent
    },
    background: {
      default: "#f6f7fb",
      paper: "#ffffff",
    },
  },

  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),

    h3: {
      fontSize: "2rem",
      fontWeight: 700,
    },

    h4: {
      fontSize: "1.6rem",
      fontWeight: 700,
    },

    h5: {
      fontSize: "1.3rem",
      fontWeight: 600,
    },

    body1: {
      fontSize: "1rem",
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          fontWeight: 600,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        },
      },
    },
  },
});

export default theme;