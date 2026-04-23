import { Box, CircularProgress } from "@mui/material";

type AuthLoadingScreenProps = {
  /** Match login page background when waiting on /login */
  variant?: "app" | "login";
};

export default function AuthLoadingScreen({ variant = "app" }: AuthLoadingScreenProps) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        ...(variant === "login"
          ? {
              background: "linear-gradient(135deg, #F6F8FF 0%, #EEEAFD 100%)",
            }
          : {
              backgroundColor: "#F7F8FD",
            }),
      }}
    >
      <CircularProgress />
    </Box>
  );
}
