import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#166534",
      dark: "#14532d",
      light: "#22c55e",
    },
    secondary: {
      main: "#0d9488",
    },
    background: {
      default: "#F6F7F4",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748B",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    h4: {
      fontWeight: 700,
      fontSize: "1.75rem",
    },
    h5: {
      fontWeight: 700,
      fontSize: "1.35rem",
    },
    h6: {
      fontWeight: 700,
      fontSize: "1.1rem",
    },
    body2: {
      color: "#64748B",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 8px rgba(15, 23, 42, 0.06)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
