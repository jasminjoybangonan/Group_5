import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Container,
    Typography,
    Box,
    Button,
    Paper,
    Grid,
    Card,
    CardContent,
    Avatar,
    Fade,
    Slide,
    AppBar,
    Toolbar,
    IconButton,
    Chip,
    Stepper,
    Step,
    StepLabel,
    useTheme
} from '@mui/material';
import {
    Article,
    Edit,
    Visibility,
    School,
    Person,
    Menu,
    ArrowForward,
    CheckCircle,
    Timeline,
    Group,
    TrendingUp
} from '@mui/icons-material';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);

    const features = [
        {
            icon: <Edit />,
            title: 'Writer Dashboard',
            description: 'Create, edit, and submit articles with our intuitive rich text editor.',
            color: '#1976d2'
        },
        {
            icon: <Visibility />,
            title: 'Editor Review',
            description: 'Editors can review, request revisions, and publish articles seamlessly.',
            color: '#ed6c02'
        },
        {
            icon: <School />,
            title: 'Student Engagement',
            description: 'Students can read published articles and engage through comments.',
            color: '#2e7d32'
        }
    ];

    const workflow = [
        'Draft Article',
        'Submit for Review',
        'Editor Review',
        'Publish'
    ];

    const stats = [
        { label: 'Articles Published', value: '1000+' },
        { label: 'Active Writers', value: '50+' },
        { label: 'Student Readers', value: '500+' },
        { label: 'Editor Reviews', value: '200+' }
    ];

    return (
        <>
            <Head title="Student Article Publication Platform" />
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                {/* Hero Section */}
                <Box sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <Fade in={true} timeout={1000}>
                                    <Box sx={{ color: 'white' }}>
                                        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                                            Student Article Publication Platform
                                        </Typography>
                                        <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                                            Connect writers, editors, and students in a collaborative publishing environment
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                            {auth.user ? (
                                                <Button
                                                    variant="contained"
                                                    size="large"
                                                    component={Link}
                                                    href={auth.user.roles?.includes('student') ? '/student/dashboard' : 
                                                         auth.user.roles?.includes('editor') ? '/editor/dashboard' : 
                                                         auth.user.roles?.includes('admin') ? '/writer/dashboard' : 
                                                         '/writer/dashboard'}
                                                    sx={{
                                                        bgcolor: 'white',
                                                        color: '#667eea',
                                                        '&:hover': { bgcolor: 'grey.100' }
                                                    }}
                                                >
                                                    {auth.user.roles?.includes('student') ? 'Go to Student Dashboard' : 
                                                     auth.user.roles?.includes('editor') ? 'Go to Editor Dashboard' : 
                                                     auth.user.roles?.includes('admin') ? 'Go to Admin Dashboard' : 
                                                     'Go to Writer Dashboard'}
                                                </Button>
                                            ) : (
                                                <>
                                                    <Button
                                                        variant="contained"
                                                        size="large"
                                                        component={Link}
                                                        href={route('login')}
                                                        sx={{
                                                            bgcolor: 'white',
                                                            color: '#667eea',
                                                            '&:hover': { bgcolor: 'grey.100' }
                                                        }}
                                                    >
                                                        Sign In
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        size="large"
                                                        component={Link}
                                                        href={route('register')}
                                                        sx={{
                                                            borderColor: 'white',
                                                            color: 'white',
                                                            '&:hover': { 
                                                                borderColor: 'white',
                                                                bgcolor: 'rgba(255,255,255,0.1)'
                                                            }
                                                        }}
                                                    >
                                                        Register
                                                    </Button>
                                                </>
                                            )}
                                        </Box>
                                    </Box>
                                </Fade>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Slide direction="left" in={true} timeout={1000}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Avatar sx={{ 
                                            width: 200, 
                                            height: 200, 
                                            bgcolor: 'white', 
                                            mx: 'auto',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                                        }}>
                                            <Article sx={{ fontSize: 100, color: '#667eea' }} />
                                        </Avatar>
                                    </Box>
                                </Slide>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                {/* Features Section */}
                <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
                    <Container maxWidth="lg">
                        <Typography variant="h3" textAlign="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
                            Platform Features
                        </Typography>
                        <Grid container spacing={4}>
                            {features.map((feature, index) => (
                                <Grid item xs={12} md={4} key={index}>
                                    <Fade in={true} timeout={1000 + index * 200}>
                                        <Card sx={{ 
                                            height: '100%', 
                                            textAlign: 'center',
                                            p: 3,
                                            transition: 'transform 0.3s',
                                            '&:hover': { transform: 'translateY(-10px)' }
                                        }}>
                                            <Avatar sx={{ 
                                                width: 80, 
                                                height: 80, 
                                                bgcolor: feature.color, 
                                                mx: 'auto', 
                                                mb: 2 
                                            }}>
                                                {feature.icon}
                                            </Avatar>
                                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                                {feature.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {feature.description}
                                            </Typography>
                                        </Card>
                                    </Fade>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* Workflow Section */}
                <Box sx={{ py: 8, bgcolor: 'white' }}>
                    <Container maxWidth="lg">
                        <Typography variant="h3" textAlign="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
                            Article Lifecycle
                        </Typography>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {workflow.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Button
                                variant="contained"
                                onClick={() => setActiveStep((prev) => (prev + 1) % workflow.length)}
                                sx={{ mt: 2 }}
                            >
                                Next Step
                            </Button>
                        </Box>
                    </Container>
                </Box>

                {/* Stats Section */}
                <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
                    <Container maxWidth="lg">
                        <Typography variant="h3" textAlign="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
                            Platform Statistics
                        </Typography>
                        <Grid container spacing={4}>
                            {stats.map((stat, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                                        <Typography variant="h3" color="primary" fontWeight="bold">
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {stat.label}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* Demo Accounts Section */}
                <Box sx={{ py: 8, bgcolor: 'white' }}>
                    <Container maxWidth="md">
                        <Typography variant="h3" textAlign="center" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                            Try Demo Accounts
                        </Typography>
                        <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
                            Use these accounts to explore different roles in the platform
                        </Typography>
                        <Grid container spacing={3}>
                            {[
                                { role: 'Writer', email: 'writer@example.com', icon: <Edit /> },
                                { role: 'Editor', email: 'editor@example.com', icon: <Visibility /> },
                                { role: 'Student', email: 'student@example.com', icon: <School /> },
                                { role: 'Admin', email: 'admin@example.com', icon: <Person /> }
                            ].map((account, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Card sx={{ textAlign: 'center', p: 2 }}>
                                        <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 1 }}>
                                            {account.icon}
                                        </Avatar>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {account.role}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {account.email}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                            Password: password
                                        </Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* Footer */}
                <Box sx={{ py: 4, bgcolor: 'grey.900', color: 'white' }}>
                    <Container maxWidth="lg">
                        <Typography variant="body2" textAlign="center">
                            Student Article Publication Platform - Built with Laravel, React, and Material-UI
                        </Typography>
                        <Typography variant="caption" display="block" textAlign="center" sx={{ mt: 1, opacity: 0.7 }}>
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </>
    );
}
