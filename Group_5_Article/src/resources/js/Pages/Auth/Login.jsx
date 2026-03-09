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
  Tooltip,
  Paper,
  Container,
  Divider
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LockOutlined, Email, ArrowBack, WbSunny, Person } from "@mui/icons-material";

export default function Login() {
  const [themeMode, setThemeMode] = useState("dark");

  const cycleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const theme = useMemo(() => {
    if (themeMode === "dark") {
      return createTheme({
        palette: {
          mode: "dark",
          background: { 
            default: "#0f0f23",
            paper: "#1a1a2e"
          },
          primary: { 
            main: "#667eea",
            light: "#764ba2",
            dark: "#4c51bf"
          },
          secondary: { 
            main: "#f093fb",
            light: "#f5576c",
            dark: "#e53e3e"
          },
          success: { 
            main: "#48bb78",
            light: "#68d391",
            dark: "#38a169"
          },
          warning: { 
            main: "#ed8936",
            light: "#f6ad55",
            dark: "#dd6b20"
          },
          error: { 
            main: "#f56565",
            light: "#fc8181",
            dark: "#e53e3e"
          },
          text: { 
            primary: "#f7fafc",
            secondary: "#cbd5e0",
            disabled: "#718096"
          },
          divider: "#2d3748"
        },
        typography: { 
          fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          h1: {
            fontWeight: 800,
            fontSize: '3rem',
            lineHeight: 1.2,
            letterSpacing: '-0.02em'
          },
          h2: {
            fontWeight: 700,
            fontSize: '2.5rem',
            lineHeight: 1.3,
            letterSpacing: '-0.01em'
          },
          h3: {
            fontWeight: 600,
            fontSize: '2rem',
            lineHeight: 1.4
          },
          h4: { 
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.4
          },
          h5: { 
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.5
          },
          h6: { 
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: 1.5
          },
          body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
            fontWeight: 400
          },
          body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
            fontWeight: 400
          }
        },
        shape: {
          borderRadius: 12
        },
        spacing: 8,
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                backgroundColor: '#1a1a2e',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(20px)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(102, 126, 234, 0.1)',
                  borderColor: 'rgba(102, 126, 234, 0.3)'
                }
              }
            }
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: 12,
                padding: '12px 24px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)'
                },
                '&:active': {
                  transform: 'translateY(0)'
                }
              },
              contained: {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
                }
              },
              outlined: {
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2
                }
              }
            }
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 12,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    '& fieldset': {
                      borderColor: '#667eea',
                      borderWidth: 2
                    }
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '& fieldset': {
                      borderColor: '#667eea',
                      borderWidth: 2,
                      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
                    }
                  }
                }
              }
            }
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: 12,
                '&:hover': {
                  transform: 'scale(1.05)',
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)'
                }
              }
            }
          }
        }
      });
    }

    return createTheme({
      palette: {
        mode: "light",
        background: { 
          default: "#f8fafc",
          paper: "#ffffff"
        },
        primary: { 
          main: "#667eea",
          light: "#764ba2",
          dark: "#4c51bf"
        },
        secondary: { 
          main: "#f093fb",
          light: "#f5576c",
          dark: "#e53e3e"
        },
        success: { 
          main: "#48bb78",
          light: "#68d391",
          dark: "#38a169"
        },
        warning: { 
          main: "#ed8936",
          light: "#f6ad55",
          dark: "#dd6b20"
        },
        error: { 
          main: "#f56565",
          light: "#fc8181",
          dark: "#e53e3e"
        },
        text: { 
          primary: "#1a202c",
          secondary: "#4a5568",
          disabled: "#718096"
        },
        divider: "#e2e8f0"
      },
      typography: { 
        fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        h1: {
          fontWeight: 800,
          fontSize: '3rem',
          lineHeight: 1.2,
          letterSpacing: '-0.02em'
        },
        h2: {
          fontWeight: 700,
          fontSize: '2.5rem',
          lineHeight: 1.3,
          letterSpacing: '-0.01em'
        },
        h3: {
          fontWeight: 600,
          fontSize: '2rem',
          lineHeight: 1.4
        },
        h4: { 
          fontWeight: 600,
          fontSize: '1.5rem',
          lineHeight: 1.4
        },
        h5: { 
          fontWeight: 600,
          fontSize: '1.25rem',
          lineHeight: 1.5
        },
        h6: { 
          fontWeight: 600,
          fontSize: '1.125rem',
          lineHeight: 1.5
        },
        body1: {
          fontSize: '1rem',
          lineHeight: 1.6,
          fontWeight: 400
        },
        body2: {
          fontSize: '0.875rem',
          lineHeight: 1.5,
          fontWeight: 400
        }
      },
      shape: {
        borderRadius: 12
      },
      spacing: 8,
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(20px)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 20px rgba(102, 126, 234, 0.1)',
                borderColor: 'rgba(102, 126, 234, 0.3)'
              }
            }
          }
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: 12,
              padding: '12px 24px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)'
              },
              '&:active': {
                transform: 'translateY(0)'
              }
            },
            contained: {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
              }
            },
            outlined: {
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2
              }
            }
          }
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                borderRadius: 12,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  '& fieldset': {
                    borderColor: '#667eea',
                    borderWidth: 2
                  }
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(0, 0, 0, 0.06)',
                  '& fieldset': {
                    borderColor: '#667eea',
                    borderWidth: 2,
                    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
                  }
                }
              }
            }
          }
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: 12,
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)'
              }
            }
          }
        }
      }
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
      <Box sx={{ position: "fixed", top: 20, left: 20, zIndex: 1300 }}>
        <Tooltip title="Toggle theme">
          <IconButton
            onClick={cycleTheme}
            sx={{
              bgcolor: themeMode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
              border: themeMode === "dark" ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.1)",
              backdropFilter: 'blur(10px)',
              "&:hover": { 
                bgcolor: themeMode === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.08)",
                transform: 'scale(1.05)'
              }
            }}
          >
            <WbSunny sx={{ color: themeMode === "dark" ? "#f6ad55" : "#ed8936" }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          background: themeMode === "dark" 
            ? "radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%), linear-gradient(135deg, #0f0f23, #1a1a2e)"
            : "radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.05) 0%, transparent 50%), linear-gradient(135deg, #f8fafc, #e2e8f0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: themeMode === "dark" 
                ? "linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))"
                : "linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))",
              opacity: 0.6,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
              animation: `float ${10 + i * 2}s ease-in-out infinite`
            }}
          />
        ))}

        {/* Login Form Container */}
        <Container maxWidth="sm">
          <Paper
            elevation={24}
            sx={{
              p: 6,
              position: "relative",
              zIndex: 2,
              backdropFilter: 'blur(20px)',
              border: themeMode === "dark" 
                ? '1px solid rgba(255, 255, 255, 0.1)' 
                : '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: themeMode === "dark"
                ? '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(102, 126, 234, 0.1)'
                : '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 30px rgba(102, 126, 234, 0.05)'
            }}
          >
            {/* Back Button */}
            <IconButton 
              component={Link} 
              href="/" 
              sx={{ 
                color: themeMode === "dark" ? "#cbd5e0" : "#4a5568", 
                mb: 3,
                '&:hover': {
                  backgroundColor: themeMode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
                }
              }}
            >
              <ArrowBack />
            </IconButton>

            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'linear-gradient(135deg, #667eea, #764ba2)',
                  mb: 3,
                  mx: 'auto',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
                }}
              >
                <LockOutlined sx={{ fontSize: 40 }} />
              </Avatar>

              <Typography 
                variant="h3" 
                sx={{ 
                  color: themeMode === "dark" ? "#f7fafc" : "#1a202c",
                  mb: 2,
                  fontWeight: 700,
                  letterSpacing: '-0.01em'
                }}
              >
                Welcome Back
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: themeMode === "dark" ? "#cbd5e0" : "#4a5568",
                  mb: 4
                }}
              >
                Sign in to your account to continue
              </Typography>
            </Box>

            {/* Form */}
            <form onSubmit={submit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                sx={{ mb: 3 }}
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: themeMode === "dark" ? "#cbd5e0" : "#4a5568" }} />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                sx={{ mb: 4 }}
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: themeMode === "dark" ? "#cbd5e0" : "#4a5568" }} />
                    </InputAdornment>
                  )
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={processing}
                sx={{ 
                  py: 3, 
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  mb: 3
                }}
              >
                Sign In
              </Button>

              <Divider sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: themeMode === "dark" ? "#718096" : "#718096" }}>
                  OR
                </Typography>
              </Divider>

              <Box textAlign="center">
                <Typography variant="body2" sx={{ color: themeMode === "dark" ? "#cbd5e0" : "#4a5568" }}>
                  Don't have an account?{" "}
                  <Link 
                    href="/register" 
                    style={{ 
                      color: "#667eea",
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Create an account
                  </Link>
                </Typography>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>

      {/* Add floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
      `}</style>
    </ThemeProvider>
  );
}