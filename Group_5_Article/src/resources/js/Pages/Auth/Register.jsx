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
    Avatar,
    FormControlLabel,
    Checkbox,
    Grid,
    Divider,
    Stepper,
    Step,
    StepLabel,
    Card,
    CardContent
} from '@mui/material';
import {
    PersonAdd,
    Email,
    LockOutlined,
    Person,
    Article,
    Edit,
    Visibility,
    School
} from '@mui/icons-material';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const roles = [
        { 
            name: 'Writer', 
            description: 'Create and submit articles for publication',
            icon: <Edit />,
            color: '#1976d2'
        },
        { 
            name: 'Editor', 
            description: 'Review articles and manage publication workflow',
            icon: <Visibility />,
            color: '#ed6c02'
        },
        { 
            name: 'Student', 
            description: 'Read published articles and engage with content',
            icon: <School />,
            color: '#2e7d32'
        }
    ];

    return (
        <>
            <Head title="Register" />
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
                                        Join Our Community
                                    </Typography>
                                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                                        Become part of a collaborative platform for writers, editors, and students
                                    </Typography>
                                    
                                    <Box sx={{ mt: 4 }}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Choose Your Role
                                        </Typography>
                                        {roles.map((role, index) => (
                                            <Card key={role.name} sx={{ 
                                                mb: 2, 
                                                bgcolor: 'rgba(255, 255, 255, 0.1)', 
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                transition: 'transform 0.2s',
                                                '&:hover': {
                                                    transform: 'translateX(10px)'
                                                }
                                            }}>
                                                <CardContent sx={{ py: 2 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                                                        <Avatar sx={{ mr: 2, bgcolor: role.color }}>
                                                            {role.icon}
                                                        </Avatar>
                                                        <Box sx={{ textAlign: 'left' }}>
                                                            <Typography variant="subtitle2" fontWeight="bold">
                                                                {role.name}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                                                {role.description}
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
                                            <PersonAdd />
                                        </Avatar>
                                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                                            Create Account
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Join our publishing community today
                                        </Typography>
                                    </Box>

                                    <form onSubmit={submit}>
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            sx={{ mb: 3 }}
                                            InputProps={{
                                                startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
                                            }}
                                        />

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

                                        <TextField
                                            fullWidth
                                            label="Confirm Password"
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            error={!!errors.password_confirmation}
                                            helperText={errors.password_confirmation}
                                            sx={{ mb: 3 }}
                                            InputProps={{
                                                startAdornment: <LockOutlined sx={{ mr: 1, color: 'text.secondary' }} />
                                            }}
                                        />

                                        <Box sx={{ mb: 3 }}>
                                            <Alert severity="info" sx={{ mb: 2 }}>
                                                <Typography variant="body2">
                                                    After registration, an administrator will assign your role (Writer, Editor, or Student).
                                                </Typography>
                                            </Alert>
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
                                            Create Account
                                        </Button>

                                        <Divider sx={{ my: 3 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                OR
                                            </Typography>
                                        </Divider>

                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Already have an account?{' '}
                                                <Link
                                                    href={route('login')}
                                                    style={{ color: '#667eea', textDecoration: 'none', fontWeight: 'bold' }}
                                                >
                                                    Sign in
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
