import React, { useMemo, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
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
    Divider
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Edit, Visibility, School, WbSunny, ArrowBack } from '@mui/icons-material';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [themeMode, setThemeMode] = useState('light');

    // Toggle theme
    const cycleTheme = () => {
        setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
    };

    // Navigate to appropriate dashboard
    const goToDashboard = () => {
        if (auth.user) {
            switch(auth.user.role) {
                case 'writer':
                    router.visit('/writer/dashboard');
                    break;
                case 'editor':
                    router.visit('/editor/dashboard');
                    break;
                case 'student':
                    router.visit('/student/dashboard');
                    break;
                default:
                    router.visit('/login');
            }
        } else {
            router.visit('/login');
        }
    };

    // Handle feature card clicks
    const handleFeatureClick = (feature) => {
        if (!auth.user) {
            router.visit('/login');
            return;
        }

        switch(feature) {
            case 'writer':
                if (auth.user.role === 'writer') {
                    router.visit('/writer/dashboard');
                } else {
                    router.visit('/login');
                }
                break;
            case 'editor':
                if (auth.user.role === 'editor') {
                    router.visit('/editor/dashboard');
                } else {
                    router.visit('/login');
                }
                break;
            case 'student':
                if (auth.user.role === 'student') {
                    router.visit('/student/dashboard');
                } else {
                    router.visit('/login');
                }
                break;
            default:
                router.visit('/login');
        }
    };

    // Theme configuration
    const theme = useMemo(() => {
        if (themeMode === 'dark') {
            return createTheme({
                palette: {
                    mode: 'dark',
                    background: { default: '#0d1b2a', paper: '#1b2a41' },
                    primary: { main: '#f87171' },   // light red
                    secondary: { main: '#60a5fa' }, // light blue
                    text: { primary: '#ffffff' }
                },
                typography: { fontFamily: '"Times New Roman", Times, serif' }
            });
        }

        return createTheme({
            palette: {
                mode: 'light',
                background: { default: '#e0f2fe', paper: '#ffffff' }, // light blue background
                primary: { main: '#1e3a8a' },   // dark blue
                secondary: { main: '#f87171' }, // light red
                text: { primary: '#000000' }
            },
            typography: { fontFamily: '"Times New Roman", Times, serif' }
        });
    }, [themeMode]);

    const features = [
        {
            icon: <Edit />,
            title: 'Writer Dashboard',
            description: 'Write with a rich text editor, save drafts, and submit for review.',
            detail: 'Manage drafts, submitted articles, and revisions.',
            tags: ['Drafts', 'Submit', 'Revise']
        },
        {
            icon: <Visibility />,
            title: 'Editor Review',
            description: 'Review submissions, request revisions, and publish articles.',
            detail: 'Provide feedback and communicate directly with writers.',
            tags: ['Review', 'Feedback', 'Publish']
        },
        {
            icon: <School />,
            title: 'Student Engagement',
            description: 'Students read published articles and participate in comments.',
            detail: 'Keep campus readers informed with a clean interface.',
            tags: ['Read', 'Comment', 'Discover']
        }
    ];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Head title="Student Article Publication Platform" />

            {/* Theme Switcher */}
            <Box sx={{ position: 'fixed', top: 12, left: 12, zIndex: 1300 }}>
                <Tooltip title="Toggle dark/light mode">
                    <IconButton
                        onClick={cycleTheme}
                        sx={{
                            bgcolor: 'background.paper',
                            border: '1px solid rgba(127,127,127,0.22)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                            '&:hover': { bgcolor: 'background.paper' }
                        }}
                    >
                        <WbSunny sx={{ color: theme.palette.secondary.main }} />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Dashboard Navigation */}
            {auth.user && (
                <Box sx={{ position: 'fixed', top: 12, right: 12, zIndex: 1300 }}>
                    <Tooltip title="Go to Dashboard">
                        <IconButton
                            onClick={goToDashboard}
                            sx={{
                                bgcolor: 'background.paper',
                                border: '1px solid rgba(127,127,127,0.22)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                                '&:hover': { bgcolor: 'background.paper' }
                            }}
                        >
                            <ArrowBack sx={{ color: theme.palette.primary.main }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}

            {/* Hero Section */}
            <Box sx={{
                minHeight: '100vh',
                background: themeMode === 'dark'
                    ? 'linear-gradient(135deg,#1b2a41,#0d1b2a)'
                    : 'linear-gradient(135deg,#e0f2fe,#ffffff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                    <Stack spacing={2} alignItems="center">
                        <Typography variant="h3" sx={{ fontWeight: 900, color: theme.palette.text.primary }}>
                            Student Article Publication Platform
                        </Typography>
                        <Typography variant="h6" sx={{ maxWidth: 720, color: theme.palette.text.primary }}>
                            A modern campus publication workflow for writers, editors, and students.
                        </Typography>

                        {!auth.user && (
                            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    href={route('login')}
                                    sx={{ fontWeight: 800, px: 4, py: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    variant="outlined"
                                    component={Link}
                                    href={route('register')}
                                    sx={{ fontWeight: 800, px: 4, py: 2, borderColor: theme.palette.primary.main, color: theme.palette.primary.main }}
                                >
                                    Register
                                </Button>
                            </Stack>
                        )}

                        {auth.user && (
                            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                                <Button
                                    variant="contained"
                                    onClick={goToDashboard}
                                    sx={{ fontWeight: 800, px: 4, py: 2 }}
                                >
                                    Go to Dashboard
                                </Button>
                            </Stack>
                        )}
                    </Stack>
                </Container>
            </Box>

            {/* Features Section */}
            <Box sx={{ py: 8, bgcolor: theme.palette.background.default }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" textAlign="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6, color: theme.palette.text.primary }}>
                        Platform Features
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {features.map((feature, idx) => (
                            <Grid item xs={12} sm={4} key={idx}>
                                <Fade in={true} timeout={1000 + idx * 300}>
                                    <Card sx={{
                                        p: 3,
                                        textAlign: 'center',
                                        bgcolor: theme.palette.background.paper,
                                        borderRadius: 3,
                                        boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                                        '&:hover': { 
                                            transform: 'translateY(-8px)', 
                                            transition: '0.3s',
                                            cursor: 'pointer',
                                            boxShadow: '0 16px 32px rgba(0,0,0,0.15)'
                                        }
                                    }}
                                    onClick={() => handleFeatureClick(feature.title.toLowerCase().split(' ')[0])}
                                    >
                                        <Avatar sx={{ width: 50, height: 50, bgcolor: theme.palette.primary.main, mx: 'auto', mb: 2 }}>
                                            {feature.icon}
                                        </Avatar>
                                        <Typography variant="h6" sx={{ fontWeight: 900 }}>{feature.title}</Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                                            {feature.description}
                                        </Typography>
                                        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ mb: 1 }}>
                                            {feature.tags.map(tag => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
                                        </Stack>
                                        <Divider sx={{ my: 1 }} />
                                        <Typography variant="body2" color="text.secondary">{feature.detail}</Typography>
                                        <Typography variant="caption" sx={{ mt: 2, display: 'block', color: theme.palette.primary.main, fontWeight: 'bold' }}>
                                            Click to explore {feature.title.toLowerCase()}
                                        </Typography>
                                    </Card>
                                </Fade>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ py: 4, bgcolor: themeMode === 'dark' ? '#050a14' : 'grey.900', color: 'white' }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" textAlign="center">
                        Student Article Publication Platform - Built with Laravel, React, and Material-UI
                    </Typography>
                    <Typography variant="caption" display="block" textAlign="center" sx={{ mt: 1, opacity: 0.7 }}>
                        Laravel v{laravelVersion} (PHP v{phpVersion})
                    </Typography>
                </Container>
            </Box>
        </ThemeProvider>
    );
}