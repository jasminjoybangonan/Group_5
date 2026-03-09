import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import {
    Typography,
    Box,
    Button,
    Card,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    Chip,
    Grid,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemIcon as MuiListItemIcon,
    Badge,
    Container
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
    RateReview,
    Publish,
    Visibility,
    Person,
    Logout,
    ArrowBack,
    Assignment,
    Edit,
    Menu as MenuIcon,
    TrendingUp,
    Send,
    Create,
    Article,
    Refresh,
    Assessment
} from '@mui/icons-material';

const EditorDashboard = ({ pending, needsRevision, published }) => {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [revisionDialog, setRevisionDialog] = useState(false);
    const [revisionComments, setRevisionComments] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('dashboard');

    // Debug: Check if article data is being passed
    console.log('Editor Dashboard props:', { pending, needsRevision, published });
    console.log('Pending articles:', pending?.length);
    console.log('Needs revision articles:', needsRevision?.length);
    console.log('Published articles:', published?.length);

    const { flash } = usePage().props;

    // Professional Theme with enhanced styling
    const theme = createTheme({
        palette: {
            mode: "dark",
            background: { 
                default: "#0f0f23",
                paper: "#1a1a2e"
            },
            primary: { 
                main: "#ef4444",
                light: "#f87171",
                dark: "#dc2626"
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
            info: { 
                main: "#4299e1",
                light: "#63b3ed",
                dark: "#3182ce"
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
            },
            subtitle1: {
                fontSize: '1rem',
                lineHeight: 1.5,
                fontWeight: 500
            },
            subtitle2: {
                fontSize: '0.875rem',
                lineHeight: 1.5,
                fontWeight: 500
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
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(239, 68, 68, 0.1)',
                            borderColor: 'rgba(239, 68, 68, 0.3)'
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
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
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
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#1a1a2e',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                            transform: 'translateY(-6px)',
                            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(239, 68, 68, 0.15)',
                            borderColor: 'rgba(239, 68, 68, 0.4)'
                        }
                    }
                }
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        borderRadius: 10,
                        '&:hover': {
                            transform: 'scale(1.05)',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
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
                                    borderColor: '#ef4444',
                                    borderWidth: 2
                                }
                            },
                            '&.Mui-focused': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                '& fieldset': {
                                    borderColor: '#ef4444',
                                    borderWidth: 2,
                                    boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)'
                                }
                            }
                        }
                    }
                }
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        borderRadius: 6,
                        height: 28
                    }
                }
            },
            MuiListItem: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(239, 68, 68, 0.1)'
                        }
                    }
                }
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        backgroundColor: '#1a1a2e',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 16,
                        backdropFilter: 'blur(20px)'
                    }
                }
            }
        }
    });

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        router.post('/logout', {}, {
            onFinish: () => {
                handleMenuClose();
            }
        });
    };

    const handleReview = (article) => {
        if (!article || !article.id) {
            console.error('Invalid article data:', article);
            alert('Invalid article data. Please try again.');
            return;
        }
        router.get(`/editor/articles/${article.id}/review`);
    };

    const openRevisionDialog = (article) => {
        setSelectedArticle(article);
        setRevisionDialog(true);
    };

    const handleRequestRevision = () => {
        if (selectedArticle && revisionComments.trim()) {
            router.post(`/editor/articles/${selectedArticle.id}/revision`, {
                comments: revisionComments
            }, {
                onSuccess: () => {
                    setRevisionDialog(false);
                    setRevisionComments('');
                    setSelectedArticle(null);
                },
                onError: (errors) => {
                    console.error('Revision request failed:', errors);
                    alert('Failed to send revision request. Please try again.');
                }
            });
        } else {
            alert('Please provide revision comments before submitting.');
        }
    };

    const handlePublish = (article) => {
        if (window.confirm(`Are you sure you want to publish "${article.title}"?`)) {
            router.post(`/editor/articles/${article.id}/publish`, {}, {
                onSuccess: (page) => {
                    // Redirect to the published article view
                    router.get(`/student/articles/${article.id}`);
                },
                onError: (errors) => {
                    console.error('Publish failed:', errors);
                    alert('Failed to publish article. Please try again.');
                }
            });
        }
    };

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
    };

    const getFilteredArticles = () => {
        switch(selectedFilter) {
            case 'dashboard':
                return []; // Dashboard overview doesn't show articles
            case 'pending':
                return pending || [];
            case 'revision':
                return needsRevision || [];
            case 'published':
                return published || [];
            default:
                return pending || [];
        }
    };

    const getFilterTitle = () => {
        switch(selectedFilter) {
            case 'dashboard':
                return 'Dashboard Overview';
            case 'pending':
                return 'Pending Review';
            case 'revision':
                return 'Needs Revision';
            case 'published':
                return 'Published';
            default:
                return 'Dashboard Overview';
        }
    };

    const getFilterColor = () => {
        switch(selectedFilter) {
            case 'dashboard':
                return '#ef4444';
            case 'pending':
                return '#f59e0b';
            case 'revision':
                return '#ef4444';
            case 'published':
                return '#10b981';
            default:
                return '#ef4444';
        }
    };

    const getFilterIcon = () => {
        switch(selectedFilter) {
            case 'dashboard':
                return <TrendingUp />;
            case 'pending':
                return <RateReview />;
            case 'revision':
                return <Edit />;
            case 'published':
                return <Publish />;
            default:
                return <TrendingUp />;
        }
    };

    const getFilteredContent = () => {
        switch(selectedFilter) {
            case 'dashboard':
                return (
                    <Box>
                        <Typography variant="h5" sx={{ color: '#ef4444', mb: 3, fontWeight: 'bold' }}>
                            Editor Dashboard Overview
                        </Typography>
                        
                        {/* Action Cards */}
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ 
                                    p: 4, 
                                    backgroundColor: '#1e293b', 
                                    border: '1px solid #334155',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    '&:hover': { border: '2px solid #f59e0b' }
                                }}
                                    onClick={() => setSelectedFilter('pending')}
                                >
                                    <RateReview sx={{ fontSize: 48, color: '#f59e0b', mb: 2 }} />
                                    <Typography variant="h5" sx={{ color: '#f59e0b', fontWeight: 'bold', mb: 1 }}>
                                        Pending Review
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                        Review and manage articles awaiting approval ({pending?.length || 0})
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        sx={{ 
                                            color: '#f59e0b',
                                            borderColor: '#f59e0b',
                                            '&:hover': { borderColor: '#d97706', color: '#d97706' }
                                        }}
                                    >
                                        Review Articles
                                    </Button>
                                </Paper>
                            </Grid>
                            
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ 
                                    p: 4, 
                                    backgroundColor: '#1e293b', 
                                    border: '1px solid #334155',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    '&:hover': { border: '2px solid #ef4444' }
                                }}
                                    onClick={() => router.get('/editor/needs-revision')}
                                >
                                    <Refresh sx={{ fontSize: 48, color: '#ef4444', mb: 2 }} />
                                    <Typography variant="h5" sx={{ color: '#ef4444', fontWeight: 'bold', mb: 1 }}>
                                        Needs Revision
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                        Manage articles requiring revisions ({needsRevision?.length || 0})
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        sx={{ 
                                            color: '#ef4444',
                                            borderColor: '#ef4444',
                                            '&:hover': { borderColor: '#dc2626', color: '#dc2626' }
                                        }}
                                    >
                                        Manage Revisions
                                    </Button>
                                </Paper>
                            </Grid>
                            
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ 
                                    p: 4, 
                                    backgroundColor: '#1e293b', 
                                    border: '1px solid #334155',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    '&:hover': { border: '2px solid #10b981' }
                                }}
                                    onClick={() => setSelectedFilter('published')}
                                >
                                    <Publish sx={{ fontSize: 48, color: '#10b981', mb: 2 }} />
                                    <Typography variant="h5" sx={{ color: '#10b981', fontWeight: 'bold', mb: 1 }}>
                                        Published Articles
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                        View all published articles ({published?.length || 0})
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        sx={{ 
                                            color: '#10b981',
                                            borderColor: '#10b981',
                                            '&:hover': { borderColor: '#059669', color: '#059669' }
                                        }}
                                    >
                                        View Published
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>

                        {/* Statistics Cards */}
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={12} md={3}>
                                <Paper sx={{ 
                                    p: 3, 
                                    backgroundColor: '#1a1a2e', 
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    textAlign: 'center',
                                    backdropFilter: 'blur(10px)',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(239, 68, 68, 0.1)',
                                        borderColor: 'rgba(239, 68, 68, 0.3)'
                                    }
                                }}>
                                    <Typography variant="h3" sx={{ color: '#f59e0b', fontWeight: 'bold' }}>
                                        {pending?.length || 0}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#cbd5e0' }}>
                                        Pending Review
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Paper sx={{ 
                                    p: 3, 
                                    backgroundColor: '#1a1a2e', 
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    textAlign: 'center',
                                    backdropFilter: 'blur(10px)',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(239, 68, 68, 0.1)',
                                        borderColor: 'rgba(239, 68, 68, 0.3)'
                                    }
                                }}>
                                    <Typography variant="h3" sx={{ color: '#ef4444', fontWeight: 'bold' }}>
                                        {needsRevision?.length || 0}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#cbd5e0' }}>
                                        Needs Revision
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Paper sx={{ 
                                    p: 3, 
                                    backgroundColor: '#1a1a2e', 
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    textAlign: 'center',
                                    backdropFilter: 'blur(10px)',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(239, 68, 68, 0.1)',
                                        borderColor: 'rgba(239, 68, 68, 0.3)'
                                    }
                                }}>
                                    <Typography variant="h3" sx={{ color: '#10b981', fontWeight: 'bold' }}>
                                        {published?.length || 0}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#cbd5e0' }}>
                                        Published
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Paper sx={{ 
                                    p: 3, 
                                    backgroundColor: '#1a1a2e', 
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    textAlign: 'center',
                                    backdropFilter: 'blur(10px)',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(239, 68, 68, 0.1)',
                                        borderColor: 'rgba(239, 68, 68, 0.3)'
                                    }
                                }}>
                                    <Typography variant="h3" sx={{ color: '#8b5cf6', fontWeight: 'bold' }}>
                                        {(pending?.length || 0) + (needsRevision?.length || 0) + (published?.length || 0)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#cbd5e0' }}>
                                        Total Articles
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                        
                        {/* Recent Activity */}
                        <Paper sx={{ p: 4, backgroundColor: '#1e293b', border: '1px solid #334155', mt: 4 }}>
                            <Typography variant="h5" sx={{ color: '#ef4444', mb: 3, fontWeight: 'bold' }}>
                                Recent Activity
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" sx={{ color: '#f59e0b', mb: 2 }}>
                                        Latest Submissions
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                        {pending?.length > 0 ? `${pending.length} articles awaiting your review` : 'No articles pending review'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" sx={{ color: '#ef4444', mb: 2 }}>
                                        Revision Requests
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                        {needsRevision?.length > 0 ? `${needsRevision.length} articles need revision` : 'No revision requests'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                );
            case 'pending':
                return (
                    <Box>
                        <Typography variant="h5" sx={{ color: '#f59e0b', mb: 3, fontWeight: 'bold' }}>
                            Pending Review ({pending?.length || 0})
                        </Typography>
                        {getFilteredArticles().map(article => (
                            <ArticleCard 
                                key={article.id}
                                article={article}
                                statusColor="#f59e0b"
                                onReview={handleReview}
                                onRequestRevision={openRevisionDialog}
                                onPublish={handlePublish}
                                canPublish={false}
                            />
                        ))}
                    </Box>
                );
            case 'revision':
                return (
                    <Box>
                        <Typography variant="h5" sx={{ color: '#ef4444', mb: 3, fontWeight: 'bold' }}>
                            Needs Revision ({needsRevision?.length || 0})
                        </Typography>
                        {getFilteredArticles().map(article => (
                            <ArticleCard 
                                key={article.id}
                                article={article}
                                statusColor="#ef4444"
                                onReview={handleReview}
                                onRequestRevision={openRevisionDialog}
                                onPublish={handlePublish}
                                canRequestRevision={false}
                            />
                        ))}
                    </Box>
                );
            case 'published':
                return (
                    <Box>
                        <Typography variant="h5" sx={{ color: '#10b981', mb: 3, fontWeight: 'bold' }}>
                            Published Articles ({published?.length || 0})
                        </Typography>
                        {getFilteredArticles().map(article => (
                            <ArticleCard 
                                key={article.id}
                                article={article}
                                statusColor="#10b981"
                                onReview={handleReview}
                                onRequestRevision={openRevisionDialog}
                                onPublish={handlePublish}
                                canPublish={false}
                                canRequestRevision={false}
                            />
                        ))}
                    </Box>
                );
            default:
                return null;
        }
    };

    const ArticleCard = ({ article, statusColor, onReview, onRequestRevision, onPublish, canPublish = true, canRequestRevision = true }) => (
        <Card sx={{ mb: 3, backgroundColor: '#1e293b', border: '1px solid #334155' }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: statusColor, mr: 2 }}>
                        <Assignment />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>
                            {article.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                            <Chip 
                                label={article.status?.label || 'Unknown'}
                                size="small"
                                sx={{ bgcolor: statusColor, color: '#fff' }}
                            />
                            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                By {article.writer?.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                Category: {article.category?.name}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                    size="small" 
                    onClick={() => onReview(article)}
                    sx={{ color: '#60a5fa' }}
                >
                    Review
                </Button>
                {canRequestRevision && (
                    <Button 
                        size="small" 
                        onClick={() => onRequestRevision(article)}
                        sx={{ color: '#f59e0b' }}
                    >
                        Request Revision
                    </Button>
                )}
                {canPublish && (
                    <Button 
                        size="small" 
                        onClick={() => onPublish(article)}
                        sx={{ color: '#10b981' }}
                    >
                        Publish
                    </Button>
                )}
            </CardActions>
        </Card>
    );

    return (
        <ThemeProvider theme={theme}>
            <Head title="Editor Dashboard" />
            
            <Box sx={{ 
                minHeight: "100vh", 
                backgroundColor: "#0f0f23",
                display: 'flex',
                flexDirection: 'column',
                background: 'radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(239, 68, 68, 0.05) 0%, transparent 50%), #0f0f23'
            }}>
                {/* Header - Same as Student Dashboard */}
                <Box sx={{ 
                    backgroundColor: 'rgba(26, 26, 46, 0.8)', 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backdropFilter: 'blur(20px)'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h4" sx={{ color: '#f7fafc', fontWeight: 800, letterSpacing: '-0.01em' }}>
                            Editor Dashboard
                        </Typography>
                    </Box>
                    
                    <IconButton color="inherit" onClick={handleMenuOpen} sx={{ color: '#ffffff' }}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                {/* Menu - Same as Student Dashboard */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                        sx: {
                            backgroundColor: 'rgba(26, 26, 46, 0.95)',
                            color: '#f7fafc',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 3,
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                        }
                    }}
                >
                    <MenuItem onClick={() => { router.get('/profile'); handleMenuClose(); }}>
                        <ListItemIcon>
                            <Person sx={{ color: '#60a5fa' }} />
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                    
                    <Divider sx={{ backgroundColor: '#334155' }} />
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout sx={{ color: '#f59e0b' }} />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>

                {/* Hero Section */}
                <Box sx={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                    py: 8,
                    px: 3,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.08"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        opacity: 0.4
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
                        opacity: 0.6
                    }
                }}>
                    <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '1200px', mx: 'auto', textAlign: 'center' }}>
                        <Typography 
                            variant="h2" 
                            sx={{ 
                                color: '#ffffff', 
                                fontWeight: 700,
                                mb: 2,
                                fontSize: { xs: '2rem', md: '3rem' },
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            Editor Control Center
                        </Typography>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                color: 'rgba(255,255,255,0.9)', 
                                mb: 4,
                                maxWidth: '600px',
                                mx: 'auto',
                                lineHeight: 1.6
                            }}
                        >
                            Review submissions, provide feedback, and publish quality content. Shape the narrative with your editorial expertise.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        </Box>
                    </Box>
                </Box>

                {/* Main Content */}
                <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
                    {getFilteredContent()}
                </Container>
            </Box>

            {/* Revision Dialog */}
            <Dialog open={revisionDialog} onClose={() => setRevisionDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ color: '#f7fafc' }}>Request Revision</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ color: '#cbd5e0', mb: 2 }}>
                        Article: {selectedArticle?.title}
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Revision Comments"
                        value={revisionComments}
                        onChange={(e) => setRevisionComments(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRevisionDialog(false)} sx={{ color: '#cbd5e0' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleRequestRevision} variant="contained">
                        Send Revision Request
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
};

export default EditorDashboard;
