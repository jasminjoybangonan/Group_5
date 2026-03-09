import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Container,
    Typography,
    Box,
    Button,
    Grid,
    Card,
    Avatar,
    Fade,
    Chip,
    Stack,
    CssBaseline,
    IconButton,
    Tooltip,
    Paper,
    Divider,
    useTheme,
    alpha
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
    Edit,
    Visibility,
    School,
    Brightness4,
    Brightness7,
    Login,
    PersonAdd,
    ArrowForward,
    Star,
    TrendingUp,
    Groups,
    Lightbulb,
    AutoAwesome,
    RocketLaunch
} from '@mui/icons-material';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [themeMode, setThemeMode] = useState(() => {
        // Get saved theme from localStorage or default to 'light'
        const savedTheme = localStorage.getItem('themeMode');
        return savedTheme || 'light';
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(newTheme);
        localStorage.setItem('themeMode', newTheme);
    };

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#6366f1',
                light: '#818cf8',
                dark: '#4f46e5',
            },
            secondary: {
                main: '#ec4899',
                light: '#f472b6',
                dark: '#db2777',
            },
            background: {
                default: themeMode === 'dark' ? '#0f172a' : '#fafafa',
                paper: themeMode === 'dark' ? '#1e293b' : '#ffffff',
            },
            text: {
                primary: themeMode === 'dark' ? '#f1f5f9' : '#1e293b',
                secondary: themeMode === 'dark' ? '#94a3b8' : '#64748b',
            },
        },
        typography: {
            fontFamily: '"Inter", "Poppins", -apple-system, BlinkMacSystemFont, sans-serif',
            h1: {
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '4rem' },
                lineHeight: 1.1,
                background: `linear-gradient(135deg, #6366f1 0%, #ec4899 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            },
            h2: {
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem' },
                lineHeight: 1.2,
            },
            h3: {
                fontWeight: 600,
                fontSize: { xs: '1.5rem', md: '1.875rem' },
            },
            body1: {
                fontSize: '1.125rem',
                lineHeight: 1.7,
            },
        },
        shape: {
            borderRadius: 16,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        borderRadius: 12,
                        padding: '12px 24px',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                    contained: {
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px 0 rgba(99, 102, 241, 0.5)',
                        },
                    },
                    outlined: {
                        borderWidth: 2,
                        '&:hover': {
                            borderWidth: 2,
                            transform: 'translateY(-2px)',
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        background: themeMode === 'dark' 
                            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.8) 100%)'
                            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${themeMode === 'dark' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            transform: 'translateY(-8px) scale(1.02)',
                            boxShadow: themeMode === 'dark'
                                ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.1)'
                                : '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 20px rgba(99, 102, 241, 0.05)',
                        },
                    },
                },
            },
        },
    });

    const features = [
        {
            icon: <Edit />,
            title: 'Creative Writing',
            description: 'Express your ideas with our rich text editor',
            details: 'Write, edit, and save your articles with ease',
            color: '#6366f1',
            stats: '500+ Articles'
        },
        {
            icon: <Visibility />,
            title: 'Expert Review',
            description: 'Get professional feedback from editors',
            details: 'Collaborative review process with real-time feedback',
            color: '#ec4899',
            stats: '95% Satisfaction'
        },
        {
            icon: <School />,
            title: 'Student Engagement',
            description: 'Connect with campus readers',
            details: 'Join discussions and share your perspective',
            color: '#10b981',
            stats: '1000+ Readers'
        }
    ];

    const stats = [
        { icon: <TrendingUp />, value: '500+', label: 'Articles Published' },
        { icon: <Groups />, value: '1000+', label: 'Active Readers' },
        { icon: <Star />, value: '4.8', label: 'Average Rating' },
    ];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Head title="Campus Article Platform - Share Your Voice" />

            {/* Theme Toggle */}
            <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
                <IconButton
                    onClick={toggleTheme}
                    sx={{
                        bgcolor: alpha(theme.palette.background.paper, 0.8),
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        '&:hover': {
                            bgcolor: alpha(theme.palette.background.paper, 0.9),
                        },
                    }}
                >
                    {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
            </Box>

            {/* Hero Section */}
            <Box
                sx={{
                    minHeight: '100vh',
                    background: themeMode === 'dark'
                        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
                        : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Animated Background Elements */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '10%',
                        left: '10%',
                        width: 300,
                        height: 300,
                        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                        borderRadius: '50%',
                        animation: 'float 6s ease-in-out infinite',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '10%',
                        right: '10%',
                        width: 200,
                        height: 200,
                        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
                        borderRadius: '50%',
                        animation: 'float 8s ease-in-out infinite reverse',
                    }}
                />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Fade in={mounted} timeout={1000}>
                        <Stack spacing={4} alignItems="center" textAlign="center">
                            {/* Badge */}
                            <Chip
                                icon={<AutoAwesome />}
                                label="Campus Publication Platform"
                                sx={{
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.main,
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    px: 2,
                                    py: 1,
                                }}
                            />

                            {/* Main Title */}
                            <Typography variant="h1" component="h1">
                                Where Campus Voices
                                <br />
                                Go Viral (Locally)
                            </Typography>

                            {/* Subtitle */}
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={{ maxWidth: 600, lineHeight: 1.6 }}
                            >
                                Join our vibrant campus community where writers create, editors refine, 
                                and readers engage with compelling stories that matter.
                            </Typography>

                            {/* CTA Buttons */}
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={3}
                                sx={{ mt: 2 }}
                            >
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<Login />}
                                    component={Link}
                                    href={route('login')}
                                    sx={{
                                        px: 4,
                                        py: 2,
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    Sign In to Continue
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<PersonAdd />}
                                    component={Link}
                                    href={route('register')}
                                    sx={{
                                        px: 4,
                                        py: 2,
                                        fontSize: '1.1rem',
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary.main,
                                    }}
                                >
                                    Create Account
                                </Button>
                            </Stack>

                            {/* Quick Stats */}
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={4}
                                sx={{ mt: 6 }}
                            >
                                {stats.map((stat, index) => (
                                    <Stack key={index} alignItems="center" spacing={1}>
                                        <Avatar
                                            sx={{
                                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                color: theme.palette.primary.main,
                                                width: 48,
                                                height: 48,
                                            }}
                                        >
                                            {stat.icon}
                                        </Avatar>
                                        <Typography variant="h4" fontWeight="700">
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {stat.label}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    </Fade>
                </Container>
            </Box>

            {/* Features Preview */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: theme.palette.background.default }}>
                <Container maxWidth="lg">
                    <Fade in={mounted} timeout={1500}>
                        <Stack spacing={4} textAlign="center">
                            <Chip
                                icon={<Lightbulb />}
                                label="What Makes Us Special"
                                sx={{
                                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                    color: theme.palette.secondary.main,
                                    fontWeight: 600,
                                    mx: 'auto',
                                    width: 'fit-content',
                                }}
                            />
                            
                            <Typography variant="h2" component="h2">
                                Platform Sneak Preview
                            </Typography>
                            
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ maxWidth: 600, mx: 'auto' }}
                            >
                                Discover how our platform brings together the entire campus publication ecosystem
                                in one seamless experience.
                            </Typography>

                            <Grid container spacing={4} sx={{ mt: 4 }}>
                                {features.map((feature, index) => (
                                    <Grid item xs={12} md={4} key={index}>
                                        <Card
                                            sx={{
                                                p: 4,
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    bgcolor: feature.color,
                                                    width: 64,
                                                    height: 64,
                                                    mb: 3,
                                                }}
                                            >
                                                {feature.icon}
                                            </Avatar>
                                            
                                            <Typography variant="h5" gutterBottom fontWeight="700">
                                                {feature.title}
                                            </Typography>
                                            
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{ mb: 2 }}
                                            >
                                                {feature.description}
                                            </Typography>
                                            
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ mb: 3, flexGrow: 1 }}
                                            >
                                                {feature.details}
                                            </Typography>
                                            
                                            <Chip
                                                label={feature.stats}
                                                size="small"
                                                sx={{
                                                    bgcolor: alpha(feature.color, 0.1),
                                                    color: feature.color,
                                                    fontWeight: 600,
                                                }}
                                            />
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Stack>
                    </Fade>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box
                sx={{
                    py: { xs: 8, md: 12 },
                    background: themeMode === 'dark'
                        ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                        : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <Container maxWidth="md">
                    <Fade in={mounted} timeout={2000}>
                        <Stack spacing={4} alignItems="center">
                            <RocketLaunch sx={{ fontSize: 48, opacity: 0.9 }} />
                            
                            <Typography variant="h3" component="h2" fontWeight="700">
                                Ready to Start Your Journey?
                            </Typography>
                            
                            <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 500 }}>
                                Join hundreds of students already sharing their stories and shaping campus discourse.
                            </Typography>
                            
                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForward />}
                                component={Link}
                                href={route('register')}
                                sx={{
                                    px: 6,
                                    py: 3,
                                    fontSize: '1.1rem',
                                    bgcolor: 'white',
                                    color: theme.palette.primary.main,
                                    '&:hover': {
                                        bgcolor: alpha('#ffffff', 0.9),
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                Get Started Now
                            </Button>
                        </Stack>
                    </Fade>
                </Container>
            </Box>

            {/* Footer */}
            <Box
                sx={{
                    py: 4,
                    bgcolor: themeMode === 'dark' ? '#0f172a' : '#1e293b',
                    color: 'white',
                }}
            >
                <Container maxWidth="lg" textAlign="center">
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Built with ❤️ for campus communities everywhere
                    </Typography>
                    <Typography variant="caption" sx={{ mt: 1, display: 'block', opacity: 0.6 }}>
                        Powered by Laravel v{laravelVersion} & PHP v{phpVersion}
                    </Typography>
                </Container>
            </Box>

            {/* Global Styles for Animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
        </ThemeProvider>
    );
}