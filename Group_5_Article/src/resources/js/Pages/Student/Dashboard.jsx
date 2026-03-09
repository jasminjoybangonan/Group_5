import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import {
    Typography,
    Box,
    Paper,
    Button,
    Card,
    CardContent,
    CardActions,
    Avatar,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Toolbar
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
    Person,
    Logout,
    Menu as MenuIcon,
    Edit,
    Visibility,
    RateReview,
    Article,
    Comment,
    TrendingUp,
    Favorite,
    FavoriteBorder
} from '@mui/icons-material';

const StudentDashboard = ({ publishedArticles, myComments, stats, favorites }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('dashboard');

    const { auth } = usePage().props;

    // Professional Theme with enhanced styling
    const theme = createTheme({
        palette: {
            mode: "dark",
            background: { 
                default: "#0f0f23",
                paper: "#1a1a2e"
            },
            primary: { 
                main: "#10b981",
                light: "#34d399",
                dark: "#059669"
            },
            secondary: { 
                main: "#06b6d4",
                light: "#22d3ee",
                dark: "#0891b2"
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
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(16, 185, 129, 0.1)',
                            borderColor: 'rgba(16, 185, 129, 0.3)'
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
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)'
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
                            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(16, 185, 129, 0.15)',
                            borderColor: 'rgba(16, 185, 129, 0.4)'
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
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
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
                            backgroundColor: 'rgba(16, 185, 129, 0.1)'
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

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
    };

    const handleToggleFavorite = (articleId) => {
        router.post(`/student/articles/${articleId}/favorite`, {}, {
            preserveScroll: true
        });
    };

    const isFavorite = (articleId) => {
        return favorites?.some(fav => fav.article_id === articleId) || false;
    };

    const getFilteredContent = () => {
        switch(selectedFilter) {
            case 'favorites':
                return (
                    <Box>
                        <Typography variant="h5" sx={{ color: '#ef4444', mb: 3, fontWeight: 'bold' }}>
                            My Favorites Overview
                        </Typography>
                        
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ 
                                    p: 4, 
                                    backgroundColor: '#1e293b', 
                                    border: '1px solid #334155',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    '&:hover': { border: '2px solid #ef4444' }
                                }}
                                    onClick={() => router.get('/student/favorites')}
                                >
                                    <Favorite sx={{ fontSize: 48, color: '#ef4444', mb: 2 }} />
                                    <Typography variant="h4" sx={{ color: '#ef4444', fontWeight: 'bold', mb: 1 }}>
                                        {favorites?.length || 0}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#ffffff', mb: 2 }}>
                                        Favorite Articles
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                        Click to view all your favorite articles
                                    </Typography>
                                </Paper>
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ 
                                    p: 4, 
                                    backgroundColor: '#1e293b', 
                                    border: '1px solid #334155',
                                    textAlign: 'center'
                                }}>
                                    <Typography variant="h6" sx={{ color: '#ef4444', mb: 2 }}>
                                        Recent Favorites
                                    </Typography>
                                    {favorites?.length === 0 ? (
                                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                            No favorites yet. Click the heart icon on articles to add them to your favorites.
                                        </Typography>
                                    ) : (
                                        <Box>
                                            {favorites.slice(0, 3).map((favorite, index) => (
                                                <Box key={favorite.id} sx={{ mb: 2, textAlign: 'left' }}>
                                                    <Typography variant="body2" sx={{ color: '#ffffff', mb: 1 }}>
                                                        {index + 1}. {favorite.article?.title}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                        By {favorite.article?.writer?.name}
                                                    </Typography>
                                                </Box>
                                            ))}
                                            {favorites.length > 3 && (
                                                <Button
                                                    onClick={() => router.get('/student/favorites')}
                                                    sx={{ 
                                                        color: '#ef4444',
                                                        borderColor: '#ef4444',
                                                        '&:hover': { borderColor: '#dc2626', color: '#dc2626' }
                                                    }}
                                                >
                                                    View All Favorites
                                                </Button>
                                            )}
                                        </Box>
                                    )}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 'articles':
                return (
                    <Box>
                        <Typography variant="h5" sx={{ color: '#10b981', mb: 3, fontWeight: 'bold' }}>
                            Published Articles Overview
                        </Typography>
                        
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ 
                                    p: 4, 
                                    backgroundColor: '#1e293b', 
                                    border: '1px solid #334155',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    '&:hover': { border: '2px solid #10b981' }
                                }}
                                    onClick={() => router.get('/student/published-articles')}
                                >
                                    <Article sx={{ fontSize: 48, color: '#10b981', mb: 2 }} />
                                    <Typography variant="h4" sx={{ color: '#10b981', fontWeight: 'bold', mb: 1 }}>
                                        {publishedArticles?.length || 0}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#ffffff', mb: 2 }}>
                                        Published Articles
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                        Click to browse all published articles
                                    </Typography>
                                </Paper>
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ 
                                    p: 4, 
                                    backgroundColor: '#1e293b', 
                                    border: '1px solid #334155',
                                    textAlign: 'center'
                                }}>
                                    <Typography variant="h6" sx={{ color: '#10b981', mb: 2 }}>
                                        Recent Articles
                                    </Typography>
                                    {publishedArticles?.length === 0 ? (
                                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                            No published articles available yet.
                                        </Typography>
                                    ) : (
                                        <Box>
                                            {publishedArticles.slice(0, 3).map((article, index) => (
                                                <Box key={article.id} sx={{ mb: 2, textAlign: 'left' }}>
                                                    <Typography variant="body2" sx={{ color: '#ffffff', mb: 1 }}>
                                                        {index + 1}. {article.title}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                        By {article.writer?.name}
                                                    </Typography>
                                                </Box>
                                            ))}
                                            {publishedArticles.length > 3 && (
                                                <Button
                                                    onClick={() => router.get('/student/published-articles')}
                                                    sx={{ 
                                                        color: '#10b981',
                                                        borderColor: '#10b981',
                                                        '&:hover': { borderColor: '#059669', color: '#059669' }
                                                    }}
                                                >
                                                    View All Articles
                                                </Button>
                                            )}
                                        </Box>
                                    )}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 'comments':
                return (
                    <Box>
                        <Typography variant="h5" sx={{ color: '#60a5fa', mb: 3, fontWeight: 'bold' }}>
                            My Comments Overview
                        </Typography>
                        
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ 
                                    p: 4, 
                                    backgroundColor: '#1e293b', 
                                    border: '1px solid #334155',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    '&:hover': { border: '2px solid #60a5fa' }
                                }}
                                    onClick={() => router.get('/student/my-comments')}
                                >
                                    <Comment sx={{ fontSize: 48, color: '#60a5fa', mb: 2 }} />
                                    <Typography variant="h4" sx={{ color: '#60a5fa', fontWeight: 'bold', mb: 1 }}>
                                        {myComments?.length || 0}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#ffffff', mb: 2 }}>
                                        My Comments
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                        Click to view all your comments
                                    </Typography>
                                </Paper>
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                                <Paper sx={{ 
                                    p: 4, 
                                    backgroundColor: '#1e293b', 
                                    border: '1px solid #334155',
                                    textAlign: 'center'
                                }}>
                                    <Typography variant="h6" sx={{ color: '#60a5fa', mb: 2 }}>
                                        Recent Comments
                                    </Typography>
                                    {myComments?.length === 0 ? (
                                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                            No comments yet. Start engaging with articles!
                                        </Typography>
                                    ) : (
                                        <Box>
                                            {myComments.slice(0, 3).map((comment, index) => (
                                                <Box key={comment.id} sx={{ mb: 2, textAlign: 'left' }}>
                                                    <Typography variant="body2" sx={{ color: '#ffffff', mb: 1 }}>
                                                        {index + 1}. {comment.article?.title}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                        {comment.message ? comment.message.substring(0, 50) + '...' : 'No message'}
                                                    </Typography>
                                                </Box>
                                            ))}
                                            {myComments.length > 3 && (
                                                <Button
                                                    onClick={() => router.get('/student/my-comments')}
                                                    sx={{ 
                                                        color: '#60a5fa',
                                                        borderColor: '#60a5fa',
                                                        '&:hover': { borderColor: '#3b82f6', color: '#3b82f6' }
                                                    }}
                                                >
                                                    View All Comments
                                                </Button>
                                            )}
                                        </Box>
                                    )}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                );
            default:
                return (
                    <Box>
                        <Typography variant="h5" sx={{ color: '#10b981', mb: 3, fontWeight: 'bold' }}>
                            Student Dashboard Overview
                        </Typography>
                        
                        {/* Statistics Cards */}
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={12} md={3}>
                                <Paper sx={{ 
                                    p: 3, 
                                    backgroundColor: '#1e293b', 
                                    border: '1px solid #334155',
                                    textAlign: 'center'
                                }}>
                                    <Typography variant="h3" sx={{ color: '#10b981', fontWeight: 'bold' }}>
                                        {stats?.totalArticles || 0}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                        Published Articles
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Paper sx={{ 
                                    p: 3, 
                                    backgroundColor: '#1e293b', 
                                    border: '1px solid #334155',
                                    textAlign: 'center'
                                }}>
                                    <Typography variant="h3" sx={{ color: '#60a5fa', fontWeight: 'bold' }}>
                                        {stats?.totalComments || 0}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                        My Comments
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Paper sx={{ 
                                    p: 3, 
                                    backgroundColor: '#1e293b', 
                                    border: '1px solid #334155',
                                    textAlign: 'center'
                                }}>
                                    <Typography variant="h3" sx={{ color: '#ef4444', fontWeight: 'bold' }}>
                                        {favorites?.length || 0}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                        My Favorites
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Paper sx={{ 
                                    p: 3, 
                                    backgroundColor: '#1e293b', 
                                    border: '1px solid #334155',
                                    textAlign: 'center'
                                }}>
                                    <Typography variant="h3" sx={{ color: '#f59e0b', fontWeight: 'bold' }}>
                                        {stats?.activeThisWeek || 0}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                        Active This Week
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>

                        {/* Quick Access Cards */}
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ 
                                    p: 4, 
                                    backgroundColor: '#1e293b', 
                                    border: '1px solid #334155',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    '&:hover': { border: '2px solid #10b981' }
                                }}
                                    onClick={() => router.get('/student/published-articles')}
                                >
                                    <Article sx={{ fontSize: 48, color: '#10b981', mb: 2 }} />
                                    <Typography variant="h5" sx={{ color: '#10b981', fontWeight: 'bold', mb: 1 }}>
                                        Browse Articles
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                        Explore all published articles from various writers
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        sx={{ 
                                            color: '#10b981',
                                            borderColor: '#10b981',
                                            '&:hover': { borderColor: '#059669', color: '#059669' }
                                        }}
                                    >
                                        View Articles
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
                                    onClick={() => router.get('/student/favorites')}
                                >
                                    <Favorite sx={{ fontSize: 48, color: '#ef4444', mb: 2 }} />
                                    <Typography variant="h5" sx={{ color: '#ef4444', fontWeight: 'bold', mb: 1 }}>
                                        My Favorites
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                        View and manage your favorite articles
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        sx={{ 
                                            color: '#ef4444',
                                            borderColor: '#ef4444',
                                            '&:hover': { borderColor: '#dc2626', color: '#dc2626' }
                                        }}
                                    >
                                        View Favorites
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
                                    '&:hover': { border: '2px solid #60a5fa' }
                                }}
                                    onClick={() => router.get('/student/my-comments')}
                                >
                                    <Comment sx={{ fontSize: 48, color: '#60a5fa', mb: 2 }} />
                                    <Typography variant="h5" sx={{ color: '#60a5fa', fontWeight: 'bold', mb: 1 }}>
                                        My Comments
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                        View and manage all your comments
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        sx={{ 
                                            color: '#60a5fa',
                                            borderColor: '#60a5fa',
                                            '&:hover': { borderColor: '#3b82f6', color: '#3b82f6' }
                                        }}
                                    >
                                        View Comments
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>

                        {/* Recent Activity */}
                        <Paper sx={{ p: 4, backgroundColor: '#1e293b', border: '1px solid #334155', mt: 4 }}>
                            <Typography variant="h5" sx={{ color: '#10b981', mb: 3, fontWeight: 'bold' }}>
                                Recent Activity
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" sx={{ color: '#10b981', mb: 2 }}>
                                        Latest Articles
                                    </Typography>
                                    {publishedArticles?.length === 0 ? (
                                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                            No articles available yet
                                        </Typography>
                                    ) : (
                                        <Box>
                                            {publishedArticles.slice(0, 2).map((article, index) => (
                                                <Box key={article.id} sx={{ mb: 2 }}>
                                                    <Typography variant="body2" sx={{ color: '#ffffff', mb: 1 }}>
                                                        {index + 1}. {article.title}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                        By {article.writer?.name} • {article.category?.name}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" sx={{ color: '#60a5fa', mb: 2 }}>
                                        Latest Comments
                                    </Typography>
                                    {myComments?.length === 0 ? (
                                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                            No comments yet
                                        </Typography>
                                    ) : (
                                        <Box>
                                            {myComments.slice(0, 2).map((comment, index) => (
                                                <Box key={comment.id} sx={{ mb: 2 }}>
                                                    <Typography variant="body2" sx={{ color: '#ffffff', mb: 1 }}>
                                                        {index + 1}. {comment.article?.title}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                        {comment.message ? comment.message.substring(0, 50) + '...' : 'No message'}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                );
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Head title="Student Dashboard" />
            
            <Box sx={{ 
                minHeight: "100vh", 
                backgroundColor: "#0f0f23",
                display: 'flex',
                flexDirection: 'column',
                background: 'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%), #0f0f23'
            }}>
                {/* Header - Same as Dashboard */}
                <Box sx={{ 
                    backgroundColor: 'rgba(26, 26, 46, 0.8)', 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backdropFilter: 'blur(20px)'
                }}>
                    <Toolbar>
                        <Typography variant="h4" sx={{ color: '#f7fafc', fontWeight: 800, letterSpacing: '-0.01em' }}>
                            Student Dashboard
                        </Typography>
                    </Toolbar>
                    
                    <IconButton color="inherit" onClick={handleMenuOpen} sx={{ color: '#ffffff' }}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                {/* Menu - Same as Dashboard */}
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
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #059669 100%)',
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
                            Student Reading Hub
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
                            Discover engaging content, share your thoughts, and stay connected with campus publications. Your gateway to quality articles.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                onClick={() => setSelectedFilter('articles')}
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                                    color: '#10b981',
                                    px: 6,
                                    py: 3,
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    borderRadius: 12,
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                                    '&:hover': {
                                        bgcolor: '#ffffff',
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)'
                                    }
                                }}
                            >
                                Browse Articles ({publishedArticles?.length || 0})
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => setSelectedFilter('comments')}
                                sx={{
                                    borderColor: 'rgba(255, 255, 255, 0.8)',
                                    color: '#ffffff',
                                    px: 6,
                                    py: 3,
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    borderRadius: 12,
                                    borderWidth: 2,
                                    '&:hover': {
                                        borderColor: '#ffffff',
                                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
                                    }
                                }}
                            >
                                My Comments ({myComments?.length || 0})
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Main Content */}
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                    {/* Left Sidebar - Filter Buttons */}
                    <Box sx={{ 
                        width: 280,
                        p: 2,
                        backgroundColor: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: 2,
                        mr: 2
                    }}>
                        <Typography variant="h6" sx={{ color: '#ffffff', mb: 3, fontWeight: 'bold' }}>
                            Dashboard
                        </Typography>
                        
                        <List sx={{ p: 0 }}>
                            <ListItem 
                                button 
                                onClick={() => handleFilterClick('dashboard')}
                                sx={{ 
                                    mb: 1,
                                    backgroundColor: selectedFilter === 'dashboard' ? '#10b981' : '#0f172a',
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: '#334155' }
                                }}
                            >
                                <ListItemIcon>
                                    <TrendingUp sx={{ color: selectedFilter === 'dashboard' ? '#fff' : '#10b981' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Dashboard" 
                                    primaryTypographyProps={{ color: selectedFilter === 'dashboard' ? '#fff' : '#10b981', fontWeight: 'bold' }}
                                />
                            </ListItem>

                            <ListItem 
                                button 
                                onClick={() => handleFilterClick('favorites')}
                                sx={{ 
                                    mb: 1,
                                    backgroundColor: selectedFilter === 'favorites' ? '#ef4444' : '#0f172a',
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: '#334155' }
                                }}
                            >
                                <ListItemIcon>
                                    <Favorite sx={{ color: selectedFilter === 'favorites' ? '#fff' : '#ef4444' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="My Favorites" 
                                    primaryTypographyProps={{ color: selectedFilter === 'favorites' ? '#fff' : '#ef4444', fontWeight: 'bold' }}
                                />
                            </ListItem>

                            <ListItem 
                                button 
                                onClick={() => handleFilterClick('articles')}
                                sx={{ 
                                    mb: 1,
                                    backgroundColor: selectedFilter === 'articles' ? '#10b981' : '#0f172a',
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: '#334155' }
                                }}
                            >
                                <ListItemIcon>
                                    <Article sx={{ color: selectedFilter === 'articles' ? '#fff' : '#10b981' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Published Articles" 
                                    primaryTypographyProps={{ color: selectedFilter === 'articles' ? '#fff' : '#10b981', fontWeight: 'bold' }}
                                />
                            </ListItem>

                            <ListItem 
                                button 
                                onClick={() => handleFilterClick('comments')}
                                sx={{ 
                                    mb: 1,
                                    backgroundColor: selectedFilter === 'comments' ? '#60a5fa' : '#0f172a',
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: '#334155' }
                                }}
                            >
                                <ListItemIcon>
                                    <Comment sx={{ color: selectedFilter === 'comments' ? '#fff' : '#60a5fa' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="My Comments" 
                                    primaryTypographyProps={{ color: selectedFilter === 'comments' ? '#fff' : '#60a5fa', fontWeight: 'bold' }}
                                />
                            </ListItem>
                        </List>
                    </Box>

                    {/* Right Side - Content Display */}
                    <Box sx={{ flexGrow: 1 }}>
                        {getFilteredContent()}
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default StudentDashboard;
