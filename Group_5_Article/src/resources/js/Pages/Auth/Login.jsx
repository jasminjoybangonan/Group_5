import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    Fade,
    Slide,
    Card,
    CardContent,
    Avatar,
    Checkbox,
    FormControlLabel,
    Grid,
    Divider
} from '@mui/material';
import {
    LockOutlined,
    Email,
    Article,
    Person,
    Edit,
    Visibility
} from '@mui/icons-material';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const demoAccounts = [
        { role: 'Writer', email: 'writer@example.com', icon: <Edit /> },
        { role: 'Editor', email: 'editor@example.com', icon: <Visibility /> },
        { role: 'Student', email: 'student@example.com', icon: <Person /> },
        { role: 'Admin', email: 'admin@example.com', icon: <LockOutlined /> }
    ];

    return (
        <>
            <Head title="Login" />
            <Box sx={{ 
                minHeight: '100vh', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Fade in={true} timeout={1000}>
                                <Box sx={{ textAlign: 'center', color: 'white' }}>
                                    <Avatar sx={{ 
                                        width: 80, 
                                        height: 80, 
                                        bgcolor: 'white', 
                                        mx: 'auto', 
                                        mb: 3 
                                    }}>
                                        <Article sx={{ fontSize: 40, color: '#667eea' }} />
                                    </Avatar>
                                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        Student Article Publication Platform
                                    </Typography>
                                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                                        Connect writers, editors, and students in a collaborative publishing environment
                                    </Typography>
                                    
                                    <Box sx={{ mt: 4 }}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Demo Accounts (Password: password)
                                        </Typography>
                                        {demoAccounts.map((account, index) => (
                                            <Card key={account.role} sx={{ 
                                                mb: 2, 
                                                bgcolor: 'rgba(255, 255, 255, 0.1)', 
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)'
                                            }}>
                                                <CardContent sx={{ py: 2 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                                                        <Avatar sx={{ mr: 2, bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                                                            {account.icon}
                                                        </Avatar>
                                                        <Box>
                                                            <Typography variant="subtitle2" fontWeight="bold">
                                                                {account.role}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                                                {account.email}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </Box>
                                </Box>
                            </Fade>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Slide direction="left" in={true} timeout={1000}>
                                <Paper sx={{ 
                                    p: 4, 
                                    borderRadius: 3,
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                                }}>
                                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                                        <Avatar sx={{ 
                                            width: 60, 
                                            height: 60, 
                                            bgcolor: '#667eea', 
                                            mx: 'auto', 
                                            mb: 2 
                                        }}>
                                            <LockOutlined />
                                        </Avatar>
                                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                                            Welcome Back
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Sign in to access your dashboard
                                        </Typography>
                                    </Box>

                                    {status && (
                                        <Alert severity="success" sx={{ mb: 3 }}>
                                            {status}
                                        </Alert>
                                    )}

                                    <form onSubmit={submit}>
                                        <TextField
                                            fullWidth
                                            label="Email Address"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            error={!!errors.email}
                                            helperText={errors.email}
                                            sx={{ mb: 3 }}
                                            InputProps={{
                                                startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            error={!!errors.password}
                                            helperText={errors.password}
                                            sx={{ mb: 3 }}
                                            InputProps={{
                                                startAdornment: <LockOutlined sx={{ mr: 1, color: 'text.secondary' }} />
                                            }}
                                        />

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={data.remember}
                                                        onChange={(e) => setData('remember', e.target.checked)}
                                                        color="primary"
                                                    />
                                                }
                                                label="Remember me"
                                            />
                                            {canResetPassword && (
                                                <Link
                                                    href={route('password.request')}
                                                    style={{ color: '#667eea', textDecoration: 'none' }}
                                                >
                                                    Forgot password?
                                                </Link>
                                            )}
                                        </Box>

                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            size="large"
                                            disabled={processing}
                                            sx={{ 
                                                mb: 3,
                                                py: 1.5,
                                                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                                                '&:hover': {
                                                    background: 'linear-gradient(45deg, #5a67d8 30%, #6b46c1 90%)',
                                                }
                                            }}
                                        >
                                            Sign In
                                        </Button>

                                        <Divider sx={{ my: 3 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                OR
                                            </Typography>
                                        </Divider>

                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Don't have an account?{' '}
                                                <Link
                                                    href={route('register')}
                                                    style={{ color: '#667eea', textDecoration: 'none', fontWeight: 'bold' }}
                                                >
                                                    Sign up
                                                </Link>
                                            </Typography>
                                        </Box>
                                    </form>
                                </Paper>
                            </Slide>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
