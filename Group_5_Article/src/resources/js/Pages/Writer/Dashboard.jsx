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
    Container,
    Toolbar
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
    RateReview,
    Publish,
    Visibility,
    Person,
    Logout,
    Assignment,
    Edit,
    Menu as MenuIcon,
    TrendingUp,
    Send,
    Create,
    Article,
    Refresh,
    Add,
    Assessment
} from '@mui/icons-material';

const WriterDashboard = ({ drafts, submitted, needsRevision, published }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [revisionDialog, setRevisionDialog] = useState(false);
    const [revisionComments, setRevisionComments] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('dashboard');

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
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#1a1a2e',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                            transform: 'translateY(-6px)',
                            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(102, 126, 234, 0.15)',
                            borderColor: 'rgba(102, 126, 234, 0.4)'
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
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)'
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
                            backgroundColor: 'rgba(102, 126, 234, 0.1)'
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

    const handleProfileOpen = () => {
        router.get('/profile');
        handleMenuClose();
    };

    const handleEdit = (articleId) => {
        router.get(`/articles/${articleId}/edit`);
    };

    const handleSubmit = (articleId) => {
        if (window.confirm('Are you sure you want to submit this article for review?')) {
            router.post(`/writer/articles/${articleId}/submit`);
        }
    };

    const handleView = (articleId) => {
        router.get(`/writer/articles/${articleId}/view`);
    };

    const handleDelete = (articleId) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            router.delete(`/writer/articles/${articleId}`);
        }
    };

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
    };

    const getFilteredArticles = () => {
        switch(selectedFilter) {
            case 'dashboard':
                return []; // Dashboard overview doesn't show articles
            case 'drafts':
                return drafts || [];
            case 'submitted':
                return submitted || [];
            case 'revision':
                return needsRevision || [];
            case 'published':
                return published || [];
            default:
                return drafts || [];
        }
    };

    const getFilterTitle = () => {
        switch(selectedFilter) {
            case 'dashboard':
                return 'Dashboard Overview';
            case 'drafts':
                return 'Draft Articles';
            case 'submitted':
                return 'Submitted Articles';
            case 'revision':
                return 'Needs Revision';
            case 'published':
                return 'Published Articles';
            default:
                return 'Dashboard Overview';
        }
    };

    const getFilterColor = () => {
        switch(selectedFilter) {
            case 'dashboard':
                return '#667eea';
            case 'drafts':
                return '#8b5cf6';
            case 'submitted':
                return '#f59e0b';
            case 'revision':
                return '#ef4444';
            case 'published':
                return '#10b981';
            default:
                return '#667eea';
        }
    };

    const getFilterIcon = () => {
        switch(selectedFilter) {
            case 'dashboard':
                return <TrendingUp />;
            case 'drafts':
                return <Edit />;
            case 'submitted':
                return <Send />;
            case 'revision':
                return <Refresh />;
            case 'published':
                return <Publish />;
            default:
                return <TrendingUp />;
        }
    };

    const getStatusIcon = (status) => {
        switch(status?.value) {
            case 'draft':
                return <Edit />;
            case 'submitted':
                return <Send />;
            case 'revision':
                return <Refresh />;
            case 'published':
                return <Publish />;
            default:
                return <Edit />;
        }
    };

    const getFilteredContent = () => {
        switch(selectedFilter) {
            case 'dashboard':
                return (
                    <Box>
                        <Typography variant="h5" sx={{ color: '#667eea', mb: 3, fontWeight: 'bold' }}>
                            Writer Dashboard Overview
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
                                    '&:hover': { border: '2px solid #8b5cf6' }
                                }}
                                    onClick={() => router.get('/writer/articles/create')}
                                >
                                    <Add sx={{ fontSize: 48, color: '#8b5cf6', mb: 2 }} />
                                    <Typography variant="h5" sx={{ color: '#8b5cf6', fontWeight: 'bold', mb: 1 }}>
                                        Create Article
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                        Start writing a new article
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        sx={{ 
                                            color: '#8b5cf6',
                                            borderColor: '#8b5cf6',
                                            '&:hover': { borderColor: '#7c3aed', color: '#7c3aed' }
                                        }}
                                    >
                                        Create New
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
                                    '&:hover': { border: '2px solid #f59e0b' }
                                }}
                                    onClick={() => setSelectedFilter('submitted')}
                                >
                                    <Send sx={{ fontSize: 48, color: '#f59e0b', mb: 2 }} />
                                    <Typography variant="h5" sx={{ color: '#f59e0b', fontWeight: 'bold', mb: 1 }}>
                                        Submitted Articles
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                        Track articles under review ({submitted?.length || 0})
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        sx={{ 
                                            color: '#f59e0b',
                                            borderColor: '#f59e0b',
                                            '&:hover': { borderColor: '#d97706', color: '#d97706' }
                                        }}
                                    >
                                        View Submitted
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
                                    '&:hover': { border: '2px solid #8b5cf6' }
                                }}
                                    onClick={() => setSelectedFilter('drafts')}
                                >
                                    <Edit sx={{ fontSize: 48, color: '#8b5cf6', mb: 2 }} />
                                    <Typography variant="h5" sx={{ color: '#8b5cf6', fontWeight: 'bold', mb: 1 }}>
                                        Draft Articles
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                        Manage your draft articles ({drafts?.length || 0})
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        sx={{ 
                                            color: '#8b5cf6',
                                            borderColor: '#8b5cf6',
                                            '&:hover': { borderColor: '#7c3aed', color: '#7c3aed' }
                                        }}
                                    >
                                        View Drafts
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
                                    onClick={() => router.get('/writer/revision')}
                                >
                                    <Refresh sx={{ fontSize: 48, color: '#ef4444', mb: 2 }} />
                                    <Typography variant="h5" sx={{ color: '#ef4444', fontWeight: 'bold', mb: 1 }}>
                                        Articles Needing Revision
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                        Revise articles based on editor feedback ({needsRevision?.length || 0})
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        sx={{ 
                                            color: '#ef4444',
                                            borderColor: '#ef4444',
                                            '&:hover': { borderColor: '#dc2626', color: '#dc2626' }
                                        }}
                                    >
                                        View Revisions
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
                                        View your published work ({published?.length || 0})
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
                                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(102, 126, 234, 0.1)',
                                        borderColor: 'rgba(102, 126, 234, 0.3)'
                                    }
                                }}>
                                    <Typography variant="h3" sx={{ color: '#8b5cf6', fontWeight: 'bold' }}>
                                        {drafts?.length || 0}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#cbd5e0' }}>
                                        Drafts
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
                                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(102, 126, 234, 0.1)',
                                        borderColor: 'rgba(102, 126, 234, 0.3)'
                                    }
                                }}>
                                    <Typography variant="h3" sx={{ color: '#f59e0b', fontWeight: 'bold' }}>
                                        {submitted?.length || 0}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#cbd5e0' }}>
                                        Submitted
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
                                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(102, 126, 234, 0.1)',
                                        borderColor: 'rgba(102, 126, 234, 0.3)'
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
                                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(102, 126, 234, 0.1)',
                                        borderColor: 'rgba(102, 126, 234, 0.3)'
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
                        </Grid>
                        
                        {/* Recent Activity */}
                        <Paper sx={{ p: 4, backgroundColor: '#1e293b', border: '1px solid #334155', mt: 4 }}>
                            <Typography variant="h5" sx={{ color: '#667eea', mb: 3, fontWeight: 'bold' }}>
                                Recent Activity
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" sx={{ color: '#8b5cf6', mb: 2 }}>
                                        Draft Articles
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                        {drafts?.length > 0 ? `${drafts.length} articles in progress` : 'No draft articles'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" sx={{ color: '#f59e0b', mb: 2 }}>
                                        Under Review
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                        {submitted?.length > 0 ? `${submitted.length} articles under review` : 'No articles under review'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                );
            case 'drafts':
                return (
                    <Box>
                        <Typography variant="h5" sx={{ color: '#8b5cf6', mb: 3, fontWeight: 'bold' }}>
                            Draft Articles ({drafts?.length || 0})
                        </Typography>
                        {getFilteredArticles().map(article => (
                            <ArticleCard 
                                key={article.id}
                                article={article}
                                statusColor="#8b5cf6"
                                onSubmit={handleSubmit}
                                onEdit={handleEdit}
                                onView={handleView}
                                onDelete={handleDelete}
                                canSubmit={true}
                                canEdit={true}
                                canDelete={true}
                            />
                        ))}
                    </Box>
                );
            case 'submitted':
                return (
                    <Box>
                        <Typography variant="h5" sx={{ color: '#f59e0b', mb: 3, fontWeight: 'bold' }}>
                            Submitted Articles ({submitted?.length || 0})
                        </Typography>
                        {getFilteredArticles().map(article => (
                            <ArticleCard 
                                key={article.id}
                                article={article}
                                statusColor="#f59e0b"
                                onSubmit={handleSubmit}
                                onEdit={handleEdit}
                                onView={handleView}
                                onDelete={handleDelete}
                                canSubmit={false}
                                canEdit={false}
                                canDelete={false}
                            />
                        ))}
                    </Box>
                );
            case 'revision':
                return (
                    <Box>
                        <Typography variant="h5" sx={{ color: '#ef4444', mb: 3, fontWeight: 'bold' }}>
                            Articles Needing Revision ({needsRevision?.length || 0})
                        </Typography>
                        {getFilteredArticles().map(article => (
                            <ArticleCard 
                                key={article.id}
                                article={article}
                                statusColor="#ef4444"
                                onSubmit={handleSubmit}
                                onEdit={handleEdit}
                                onView={handleView}
                                onDelete={handleDelete}
                                canSubmit={true}
                                canEdit={true}
                                canDelete={false}
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
                                onSubmit={handleSubmit}
                                onEdit={handleEdit}
                                onView={handleView}
                                onDelete={handleDelete}
                                canSubmit={false}
                                canEdit={false}
                                canDelete={false}
                            />
                        ))}
                    </Box>
                );
            default:
                return null;
        }
    };

    const ArticleCard = ({ article, statusColor, onSubmit, onEdit, onView, onDelete, canSubmit = true, canEdit = true, canDelete = true }) => (
        <Card sx={{ 
            mb: 3, 
            backgroundColor: 'rgba(26, 26, 46, 0.8)', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
                transform: 'translateY(-6px)',
                borderColor: 'rgba(102, 126, 234, 0.3)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(102, 126, 234, 0.15)'
            }
        }}>
            <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                    <Avatar sx={{ 
                        bgcolor: statusColor, 
                        mr: 3,
                        width: 56,
                        height: 56,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                    }}>
                        {getStatusIcon(article.status)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ 
                            color: '#f7fafc', 
                            mb: 2,
                            fontWeight: 700,
                            fontSize: '1.125rem',
                            lineHeight: 1.4
                        }}>
                            {article.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                            <Chip 
                                label={article.status?.label || 'Unknown'}
                                size="small"
                                sx={{ 
                                    bgcolor: statusColor, 
                                    color: '#fff',
                                    fontWeight: 600,
                                    fontSize: '0.75rem',
                                    height: 28,
                                    borderRadius: 6
                                }}
                            />
                            <Typography variant="body2" sx={{ 
                                color: '#cbd5e0',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                Category: {article.category?.name}
                            </Typography>
                        </Box>
                        {article.revisions?.length > 0 && (
                            <Box sx={{ 
                                mt: 2,
                                p: 2,
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: 2,
                                borderLeft: '3px solid #f6ad55'
                            }}>
                                <Typography variant="body2" sx={{ 
                                    color: '#cbd5e0',
                                    fontStyle: 'italic',
                                    lineHeight: 1.5
                                }}>
                                    Latest feedback: "{article.revisions[0].comments}"
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </CardContent>
            <CardActions sx={{ p: 3, pt: 0, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {canSubmit && (
                    <Button 
                        size="small" 
                        onClick={() => onSubmit(article.id)}
                        variant="outlined"
                        sx={{ 
                            borderColor: '#f6ad55',
                            color: '#f6ad55',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            px: 3,
                            py: 1,
                            borderWidth: 2,
                            borderRadius: 8,
                            '&:hover': {
                                borderColor: '#ed8936',
                                backgroundColor: 'rgba(246, 173, 85, 0.1)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        Submit
                    </Button>
                )}
                {canEdit && (
                    <Button 
                        size="small" 
                        onClick={() => onEdit(article.id)}
                        variant="outlined"
                        sx={{ 
                            borderColor: '#667eea',
                            color: '#667eea',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            px: 3,
                            py: 1,
                            borderWidth: 2,
                            borderRadius: 8,
                            '&:hover': {
                                borderColor: '#5a67d8',
                                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        Edit
                    </Button>
                )}
                <Button 
                    size="small" 
                    onClick={() => onView(article.id)}
                    variant="outlined"
                    sx={{ 
                        borderColor: '#10b981',
                        color: '#10b981',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        px: 3,
                        py: 1,
                        borderWidth: 2,
                        borderRadius: 8,
                        '&:hover': {
                            borderColor: '#059669',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            transform: 'translateY(-2px)'
                        }
                    }}
                >
                    View
                </Button>
                {canDelete && (
                    <Button 
                        size="small" 
                        onClick={() => onDelete(article.id)}
                        variant="outlined"
                        sx={{ 
                            borderColor: '#ef4444',
                            color: '#ef4444',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            px: 3,
                            py: 1,
                            borderWidth: 2,
                            borderRadius: 8,
                            '&:hover': {
                                borderColor: '#dc2626',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );

    return (
        <ThemeProvider theme={theme}>
            <Head title="Writer Dashboard" />
            
            <Box sx={{ 
                minHeight: "100vh", 
                backgroundColor: "#0f0f23",
                display: 'flex',
                flexDirection: 'column',
                background: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%), #0f0f23'
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
                    <Toolbar>
                        <Typography variant="h4" sx={{ color: '#f7fafc', fontWeight: 800, letterSpacing: '-0.01em' }}>
                            Writer Dashboard
                        </Typography>
                    </Toolbar>
                    
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
                    <MenuItem onClick={handleProfileOpen}>
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
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
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
                            Creative Writing Hub
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
                            Craft compelling stories, share your ideas, and connect with readers. Your writing journey starts here.
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
        </ThemeProvider>
    );
};

export default WriterDashboard;
