import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  CssBaseline,
  IconButton,
  InputAdornment
} from "@mui/material";
import { ThemeProvider, createTheme, keyframes } from "@mui/material/styles";
import { PersonAdd, Email, LockOutlined, Person, ArrowBack } from "@mui/icons-material";

export default function Register() {
  // Only vertical floating animation, no rotation
  const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  `;

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#1e40af" },
      background: { default: "#0f172a" },
      text: { primary: "#ffffff" } // Set default text color to white
    },
    typography: {
      fontFamily: "Times New Roman"
    }
  });

  const { data, setData, post, processing } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const submit = (e) => {
    e.preventDefault();
    post("/register");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head title="Register" />

      {/* Background */}
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          background: "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* Floating Balls */}
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

        {/* Floating Bubbles */}
        {[...Array(8)].map((_, i) => (
          <Box
            key={`bubble-${i}`}
            sx={{
              position: "absolute",
              width: 20 + Math.random() * 30,
              height: 20 + Math.random() * 30,
              borderRadius: "50%",
              background: `rgba(29,78,216,${0.1 + Math.random() * 0.2})`,
              border: `1px solid rgba(29,78,216,${0.2 + Math.random() * 0.3})`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `${float} ${3 + Math.random() * 4}s ease-in-out infinite`
            }}
          />
        ))}

        {/* Floating Form Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            animation: `${float} 4s ease-in-out infinite`
          }}
        >
          <IconButton component={Link} href="/" sx={{ color: "white", mb: 2 }}>
            <ArrowBack />
          </IconButton>

          <Avatar sx={{ width: 70, height: 70, bgcolor: "#1e40af", mb: 2 }}>
            <PersonAdd />
          </Avatar>

          <Typography variant="h4" fontWeight="bold" color="white">
            Create Account
          </Typography>
          <Typography color="white" mb={3}>
            Join our publishing community
          </Typography>

          <form onSubmit={submit} style={{ width: 400 }}>
            <TextField
              fullWidth
              label="Full Name"
              sx={{ mb: 2, borderRadius: 1, bgcolor: "transparent" }}
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: "white" }} />
                  </InputAdornment>
                ),
                style: { color: "white" }
              }}
              InputLabelProps={{ style: { color: "white" } }}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              sx={{ mb: 2, borderRadius: 1, bgcolor: "transparent" }}
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
              sx={{ mb: 2, borderRadius: 1, bgcolor: "transparent" }}
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

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              sx={{ mb: 3, borderRadius: 1, bgcolor: "transparent" }}
              value={data.password_confirmation}
              onChange={(e) => setData("password_confirmation", e.target.value)}
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
              Create Account
            </Button>

            <Box textAlign="center" mt={3}>
              <Typography variant="body2" color="white">
                Already have an account?{" "}
                <Link href="/login" style={{ color: "#60a5fa" }}>
                  Sign in
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}