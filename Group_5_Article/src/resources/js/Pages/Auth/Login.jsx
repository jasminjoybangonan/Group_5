import React, { useState, useMemo } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import {
  Typography,
  TextField,
  Button,
  Avatar,
  CssBaseline,
  Box,
  InputAdornment,
  IconButton,
  Tooltip
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LockOutlined, Email, ArrowBack, WbSunny } from "@mui/icons-material";

export default function Login() {
  const [themeMode, setThemeMode] = useState("paper");

  const cycleTheme = () => {
    setThemeMode((prev) => {
      if (prev === "paper") return "ocean";
      if (prev === "ocean") return "dark";
      return "paper";
    });
  };

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: "dark",
        background: { default: "#0b1220", paper: "#0f172a" },
        primary: { main: "#60a5fa" },
        secondary: { main: "#22d3ee" },
        text: { primary: "#ffffff" }
      },
      typography: { fontFamily: '"Times New Roman", Times, serif' }
    });
  }, [themeMode]);

  const { data, setData, post, processing } = useForm({
    email: "",
    password: ""
  });

  const submit = (e) => {
    e.preventDefault();
    post("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head title="Login" />

      {/* Theme Switcher */}
      <Box sx={{ position: "fixed", top: 12, left: 12, zIndex: 1300 }}>
        <Tooltip title="Change theme">
          <IconButton
            onClick={cycleTheme}
            sx={{
              bgcolor: "background.paper",
              border: "1px solid rgba(127,127,127,0.22)",
              "&:hover": { bgcolor: "background.paper" }
            }}
          >
            <WbSunny sx={{ color: theme.palette.secondary.main }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          background: "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Floating Balls (static, no animation) */}
        {[...Array(10)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#60a5fa,#22d3ee)",
              opacity: 0.3,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
          />
        ))}

        {/* Floating Content (steady, no animation) */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {/* Back Button */}
          <IconButton component={Link} href="/" sx={{ color: "white", mb: 2 }}>
            <ArrowBack />
          </IconButton>

          <Avatar
            sx={{
              width: 70,
              height: 70,
              bgcolor: "#1e40af",
              mb: 2
            }}
          >
            <LockOutlined />
          </Avatar>

          <Typography variant="h4" fontWeight="bold" color="white">
            Welcome Back
          </Typography>
          <Typography color="#cbd5f5" mb={3}>
            Sign in to your account
          </Typography>

          <form onSubmit={submit} style={{ width: 400 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              sx={{ mb: 2, bgcolor: "transparent" }}
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: "white" }} />
                  </InputAdornment>
                ),
                style: { color: "white" }
              }}
              InputLabelProps={{ style: { color: "white" } }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              sx={{ mb: 3, bgcolor: "transparent" }}
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={{ color: "white" }} />
                  </InputAdornment>
                ),
                style: { color: "white" }
              }}
              InputLabelProps={{ style: { color: "white" } }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={processing}
              sx={{ py: 1.5, fontWeight: "bold" }}
            >
              Sign In
            </Button>

            <Box textAlign="center" mt={3}>
              <Typography variant="body2" color="white">
                Don't have an account?{" "}
                <Link href="/register" style={{ color: "#60a5fa" }}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}