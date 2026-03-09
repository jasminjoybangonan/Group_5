import React, { useState, useCallback } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Grid,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Divider,
    Alert,
    CircularProgress
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
    ArrowBack, 
    Save, 
    Send, 
    Category
} from '@mui/icons-material';
import JoditEditorComponent from '@/Components/JoditEditor';

const WriterCreate = ({ categories }) => {
    const { flash } = usePage().props;

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category_id: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Professional Theme with enhanced styling
    const theme = createTheme({
        palette: {
            mode: "dark",
            background: { 
                default: "#0f0f23",
                paper: "#1a1a2e"
            },
            primary: { 
                main: "#667eea",
                light: "#818cf8",
                dark: "#5a67d8"
            },
            secondary: { 
                main: "#f59e0b",
                light: "#fbbf24",
                dark: "#d97706"
            },
            success: { 
                main: "#48bb78",
                light: "#68d391",
                dark: "#38a169"
            },
            text: { 
                primary: "#f7fafc",
                secondary: "#cbd5e0"
            },
            divider: "#2d3748"
        },
        typography: { 
            fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            h1: {
                fontWeight: 800,
                fontSize: '2.5rem',
                lineHeight: 1.2,
                letterSpacing: '-0.02em'
            },
            h2: {
                fontWeight: 700,
                fontSize: '2rem',
                lineHeight: 1.3,
                letterSpacing: '-0.01em'
            },
            h3: {
                fontWeight: 600,
                fontSize: '1.75rem',
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
                        backdropFilter: 'blur(10px)',
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
                        fontSize: '0.875rem',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        borderRadius: 10,
                        padding: '10px 24px',
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
                            borderRadius: 10,
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
            MuiSelect: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 10,
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.08)'
                        },
                        '&.Mui-focused': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        }
    });

    const handleInputChange = (field) => (event) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleContentChange = useCallback((newContent) => {
        setFormData(prev => ({
            ...prev,
            content: newContent
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title.trim() || !formData.content.trim() || !formData.category_id) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Create article and submit for review in one step
            await router.post('/writer/articles', {
                ...formData,
                submit_for_review: true
            }, {
                onSuccess: () => {
                    router.get('/writer/dashboard');
                },
                onError: (errors) => {
                    console.error('Submission errors:', errors);
                },
                onFinish: () => {
                    setIsSubmitting(false);
                }
            });
        } catch (error) {
            console.error('Submission error:', error);
            setIsSubmitting(false);
        }
    };

    const handleSaveDraft = async () => {
        if (!formData.title.trim() || !formData.content.trim()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await router.post('/writer/articles', {
                ...formData,
                status: 'draft'
            }, {
                onSuccess: () => {
                    router.get('/writer/dashboard');
                },
                onError: (errors) => {
                    console.error('Save draft errors:', errors);
                },
                onFinish: () => {
                    setIsSubmitting(false);
                }
            });
        } catch (error) {
            console.error('Save draft error:', error);
            setIsSubmitting(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Head title="Create Article" />
            
            <Box sx={{ 
                minHeight: "100vh", 
                backgroundColor: "#0f0f23",
                background: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%), #0f0f23'
            }}>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    {/* Header */}
                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBack />}
                            onClick={() => router.get('/writer/dashboard')}
                            sx={{ 
                                borderColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'black',
                                '&:hover': {
                                    borderColor: 'rgba(0, 0, 0, 0.7)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.05)'
                                }
                            }}
                        >
                            Back to Dashboard
                        </Button>
                        <Typography variant="h4" sx={{ 
                            color: 'black', 
                            fontWeight: 700,
                            flexGrow: 1
                        }}>
                            Create New Article
                        </Typography>
                    </Box>

                    {/* Flash Messages */}
                    {flash?.success && (
                        <Alert severity="success" sx={{ mb: 3 }}>
                            {flash.success}
                        </Alert>
                    )}
                    
                    {flash?.error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {flash.error}
                        </Alert>
                    )}

                    {/* Form */}
                    <Paper sx={{ 
                        p: 4, 
                        backgroundColor: 'rgba(26, 26, 46, 0.8)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 3,
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
                    }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                {/* Title */}
                                <Grid item xs={12}>
                                    <Typography variant="h6" sx={{ 
                                        color: '#f7fafc', 
                                        mb: 2, 
                                        fontWeight: 600
                                    }}>
                                        Article Title
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter a compelling title for your article"
                                        value={formData.title}
                                        onChange={handleInputChange('title')}
                                        required
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                                borderRadius: 2,
                                                '& fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#667eea',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#667eea',
                                                    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#cbd5e0',
                                            },
                                            '& .MuiInputBase-input': {
                                                color: '#f7fafc',
                                                fontSize: '1.1rem',
                                                fontWeight: 500
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Category */}
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" sx={{ 
                                        color: '#f7fafc', 
                                        mb: 2, 
                                        fontWeight: 600
                                    }}>
                                        Category
                                    </Typography>
                                    <FormControl fullWidth required>
                                        <InputLabel sx={{ color: '#cbd5e0' }}>Select a category</InputLabel>
                                        <Select
                                            value={formData.category_id}
                                            onChange={handleInputChange('category_id')}
                                            label="Select a category"
                                            sx={{ 
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#667eea',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#667eea',
                                                    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: '#cbd5e0',
                                                },
                                                '& .MuiSelect-select': {
                                                    color: '#f7fafc'
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    color: '#cbd5e0',
                                                }
                                            }}
                                        >
                                            {categories?.map((category) => (
                                                <MenuItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Content */}
                                <Grid item xs={12}>
                                    <Typography variant="h6" sx={{ 
                                        color: '#f7fafc', 
                                        mb: 2, 
                                        fontWeight: 600
                                    }}>
                                        Article Content
                                    </Typography>
                                    <Box sx={{ 
                                        border: '2px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: 'rgba(102, 126, 234, 0.3)',
                                            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.1)'
                                        },
                                        '& .jodit-container': {
                                            backgroundColor: 'rgba(15, 23, 42, 0.8) !important',
                                            backdropFilter: 'blur(10px)'
                                        }
                                    }}>
                                        <JoditEditorComponent
                                            value={formData.content}
                                            onChange={handleContentChange}
                                            placeholder="Start writing your article..."
                                        />
                                    </Box>
                                </Grid>

                                {/* Action Buttons */}
                                <Grid item xs={12}>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        gap: 2, 
                                        justifyContent: 'flex-end',
                                        mt: 4
                                    }}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<Save />}
                                            onClick={handleSaveDraft}
                                            disabled={isSubmitting}
                                            sx={{ 
                                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                                color: '#cbd5e0',
                                                '&:hover': {
                                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                                                }
                                            }}
                                        >
                                            Save to Draft
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            startIcon={<Send />}
                                            disabled={isSubmitting}
                                            sx={{ 
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                '&:hover': { 
                                                    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
                                                }
                                            }}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <CircularProgress size={20} sx={{ mr: 1, color: '#fff' }} />
                                                    Submitting...
                                                </>
                                            ) : (
                                                'Submit for Review'
                                            )}
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default WriterCreate;
