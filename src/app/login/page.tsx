"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import AuthLoadingScreen from "@/components/AuthLoadingScreen";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isAuthReady, login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthReady && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthReady, isAuthenticated, router]);

  if (!isAuthReady) {
    return <AuthLoadingScreen variant="login" />;
  }

  if (isAuthenticated) {
    return <AuthLoadingScreen variant="login" />;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setError("Please enter your name, email, and password.");
      return;
    }
    setError("");
    login({ name: name.trim(), email: email.trim() });
    router.push("/");
  }

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F6F8FF 0%, #EEEAFD 100%)",
        p: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 430 }}>
        <CardContent sx={{ p: 3 }}>
          <Stack sx={{ mb: 2, alignItems: "center" }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 99,
                backgroundColor: "#EFE8FF",
                color: "primary.main",
                display: "grid",
                placeItems: "center",
              }}
            >
              <LockRoundedIcon />
            </Box>
            <Typography variant="h5" sx={{ mt: 1 }}>
              Insightly Login
            </Typography>
            <Typography variant="body2">Sign in to continue to your wellbeing dashboard.</Typography>
          </Stack>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={1.5}>
              <TextField
                label="Name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                fullWidth
              />
              {error ? <Alert severity="error">{error}</Alert> : null}
              <Button type="submit" variant="contained" size="large">
                Login
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
