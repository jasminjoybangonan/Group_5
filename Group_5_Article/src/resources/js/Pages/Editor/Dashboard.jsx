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
    Badge
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
    Create
} from '@mui/icons-material';

const EditorDashboard = ({ pending, needsRevision, published }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [revisionDialog, setRevisionDialog] = useState(false);
    const [revisionComments, setRevisionComments] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('dashboard');

    const { flash } = usePage().props;

    // Theme from Login.jsx
    const theme = createTheme({
        palette: {
            mode: "dark",
            background: { default: "#0b1220", paper: "#0f172a" },
            primary: { main: "#60a5fa" },
            secondary: { main: "#22d3ee" },
            text: { primary: "#ffffff" }
        },
        typography: { fontFamily: '"Times New Roman", Times, serif' }
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
                onSuccess: () => {
                    // Success will be handled by flash message
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
                backgroundColor: "#0b1220",
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Header */}
                <Box sx={{ 
                    backgroundColor: '#0f172a', 
                    borderBottom: '1px solid #334155',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton component="a" href="/" sx={{ color: '#ffffff' }}>
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                            Editor Dashboard
                        </Typography>
                    </Box>
                    
                    <IconButton color="inherit" onClick={handleMenuOpen} sx={{ color: '#ffffff' }}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                {/* Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                        sx: {
                            backgroundColor: '#1e293b',
                            color: '#ffffff',
                            border: '1px solid #334155'
                        }
                    }}
                >
                    <MenuItem onClick={() => { router.get('/profile.edit'); handleMenuClose(); }}>
                        <ListItemIcon>
                            <Person sx={{ color: '#60a5fa' }} />
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                    
                    <Divider sx={{ backgroundColor: '#334155' }} />
                    <MenuItem onClick={() => { router.get('/writer/dashboard'); handleMenuClose(); }}>
                        <ListItemIcon>
                            <Edit sx={{ color: '#f59e0b' }} />
                        </ListItemIcon>
                        Switch to Writer
                    </MenuItem>
                    <MenuItem onClick={() => { router.get('/student/dashboard'); handleMenuClose(); }}>
                        <ListItemIcon>
                            <Visibility sx={{ color: '#10b981' }} />
                        </ListItemIcon>
                        Switch to Student
                    </MenuItem>
                    
                    <Divider sx={{ backgroundColor: '#334155' }} />
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout sx={{ color: '#f59e0b' }} />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>

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
                                    backgroundColor: selectedFilter === 'dashboard' ? '#ef4444' : '#0f172a',
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: '#334155' }
                                }}
                            >
                                <ListItemIcon>
                                    <TrendingUp sx={{ color: selectedFilter === 'dashboard' ? '#fff' : '#ef4444' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Dashboard" 
                                    primaryTypographyProps={{ color: selectedFilter === 'dashboard' ? '#fff' : '#ef4444', fontWeight: 'bold' }}
                                />
                            </ListItem>

                            <ListItem 
                                button 
                                onClick={() => handleFilterClick('pending')}
                                sx={{ 
                                    mb: 1,
                                    backgroundColor: selectedFilter === 'pending' ? '#f59e0b' : '#0f172a',
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: '#334155' }
                                }}
                            >
                                <ListItemIcon>
                                    <RateReview sx={{ color: selectedFilter === 'pending' ? '#fff' : '#f59e0b' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Pending Review" 
                                    primaryTypographyProps={{ color: selectedFilter === 'pending' ? '#fff' : '#f59e0b', fontWeight: 'bold' }}
                                />
                            </ListItem>

                            <ListItem 
                                button 
                                onClick={() => handleFilterClick('revision')}
                                sx={{ 
                                    mb: 1,
                                    backgroundColor: selectedFilter === 'revision' ? '#ef4444' : '#0f172a',
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: '#334155' }
                                }}
                            >
                                <ListItemIcon>
                                    <Edit sx={{ color: selectedFilter === 'revision' ? '#fff' : '#ef4444' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Needs Revision" 
                                    primaryTypographyProps={{ color: selectedFilter === 'revision' ? '#fff' : '#ef4444', fontWeight: 'bold' }}
                                />
                            </ListItem>

                            <ListItem 
                                button 
                                onClick={() => handleFilterClick('published')}
                                sx={{ 
                                    mb: 1,
                                    backgroundColor: selectedFilter === 'published' ? '#10b981' : '#0f172a',
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: '#334155' }
                                }}
                            >
                                <ListItemIcon>
                                    <Publish sx={{ color: selectedFilter === 'published' ? '#fff' : '#10b981' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Published" 
                                    primaryTypographyProps={{ color: selectedFilter === 'published' ? '#fff' : '#10b981', fontWeight: 'bold' }}
                                />
                            </ListItem>
                        </List>
                    </Box>

                    {/* Main Content Area */}
                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Top Center - Numbers Display */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            mb: 3,
                            gap: 3
                        }}>
                            <Paper sx={{ 
                                p: 2, 
                                backgroundColor: '#1e293b', 
                                border: '1px solid #334155',
                                textAlign: 'center',
                                minWidth: 120
                            }}>
                                <Typography variant="h3" sx={{ color: '#f59e0b', fontWeight: 'bold' }}>
                                    {pending?.length || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                    Pending
                                </Typography>
                            </Paper>
                            <Paper sx={{ 
                                p: 2, 
                                backgroundColor: '#1e293b', 
                                border: '1px solid #334155',
                                textAlign: 'center',
                                minWidth: 120
                            }}>
                                <Typography variant="h3" sx={{ color: '#ef4444', fontWeight: 'bold' }}>
                                    {needsRevision?.length || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                    Revision
                                </Typography>
                            </Paper>
                            <Paper sx={{ 
                                p: 2, 
                                backgroundColor: '#1e293b', 
                                border: '1px solid #334155',
                                textAlign: 'center',
                                minWidth: 120
                            }}>
                                <Typography variant="h3" sx={{ color: '#10b981', fontWeight: 'bold' }}>
                                    {published?.length || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                    Published
                                </Typography>
                            </Paper>
                        </Box>

                        {/* Flash Messages */}
                        {flash?.success && (
                            <Box sx={{ mb: 3 }}>
                                <Paper sx={{ p: 2, backgroundColor: '#10b981', color: '#fff' }}>
                                    <Typography>{flash.success}</Typography>
                                </Paper>
                            </Box>
                        )}

                        {/* Right Side - Articles Display */}
                        <Box sx={{ flexGrow: 1 }}>
                            {selectedFilter === 'dashboard' ? (
                                // Dashboard Overview
                                <Box>
                                    {/* Statistics Cards */}
                                    <Grid container spacing={3} sx={{ mb: 4 }}>
                                        <Grid item xs={12} md={4}>
                                            <Paper sx={{ 
                                                p: 3, 
                                                backgroundColor: '#1e293b', 
                                                border: '1px solid #334155',
                                                textAlign: 'center'
                                            }}>
                                                <Typography variant="h3" sx={{ color: '#f59e0b', fontWeight: 'bold' }}>
                                                    {pending?.length || 0}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                    Pending Review
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Paper sx={{ 
                                                p: 3, 
                                                backgroundColor: '#1e293b', 
                                                border: '1px solid #334155',
                                                textAlign: 'center'
                                            }}>
                                                <Typography variant="h3" sx={{ color: '#ef4444', fontWeight: 'bold' }}>
                                                    {needsRevision?.length || 0}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                    Needs Revision
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Paper sx={{ 
                                                p: 3, 
                                                backgroundColor: '#1e293b', 
                                                border: '1px solid #334155',
                                                textAlign: 'center'
                                            }}>
                                                <Typography variant="h3" sx={{ color: '#10b981', fontWeight: 'bold' }}>
                                                    {published?.length || 0}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                    Published
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
                                                '&:hover': { border: '2px solid #f59e0b' }
                                            }}
                                                onClick={() => handleFilterClick('pending')}
                                            >
                                                <RateReview sx={{ fontSize: 48, color: '#f59e0b', mb: 2 }} />
                                                <Typography variant="h5" sx={{ color: '#f59e0b', fontWeight: 'bold', mb: 1 }}>
                                                    Pending Review
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                                    Review submitted articles
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
                                                onClick={() => handleFilterClick('revision')}
                                            >
                                                <Edit sx={{ fontSize: 48, color: '#ef4444', mb: 2 }} />
                                                <Typography variant="h5" sx={{ color: '#ef4444', fontWeight: 'bold', mb: 1 }}>
                                                    Needs Revision
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                                    Manage revision requests
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
                                                onClick={() => handleFilterClick('published')}
                                            >
                                                <Publish sx={{ fontSize: 48, color: '#10b981', mb: 2 }} />
                                                <Typography variant="h5" sx={{ color: '#10b981', fontWeight: 'bold', mb: 1 }}>
                                                    Published Articles
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                                    View published content
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

                                    {/* Recent Activity */}
                                    <Paper sx={{ p: 4, backgroundColor: '#1e293b', border: '1px solid #334155', mt: 4 }}>
                                        <Typography variant="h5" sx={{ color: '#ef4444', mb: 3, fontWeight: 'bold' }}>
                                            Recent Activity
                                        </Typography>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="h6" sx={{ color: '#f59e0b', mb: 2 }}>
                                                    Pending Review
                                                </Typography>
                                                {pending?.length === 0 ? (
                                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                        No articles pending review
                                                    </Typography>
                                                ) : (
                                                    <Box>
                                                        {pending.slice(0, 2).map((article, index) => (
                                                            <Box key={article.id} sx={{ mb: 2 }}>
                                                                <Typography variant="body2" sx={{ color: '#ffffff', mb: 1 }}>
                                                                    {index + 1}. {article.title}
                                                                </Typography>
                                                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                                    By {article.writer?.name}
                                                                </Typography>
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                )}
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="h6" sx={{ color: '#10b981', mb: 2 }}>
                                                    Published Articles
                                                </Typography>
                                                {published?.length === 0 ? (
                                                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                        No published articles yet
                                                    </Typography>
                                                ) : (
                                                    <Box>
                                                        {published.slice(0, 2).map((article, index) => (
                                                            <Box key={article.id} sx={{ mb: 2 }}>
                                                                <Typography variant="body2" sx={{ color: '#ffffff', mb: 1 }}>
                                                                    {index + 1}. {article.title}
                                                                </Typography>
                                                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                                    By {article.writer?.name}
                                                                </Typography>
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Box>
                            ) : (
                                // Regular Article Lists
                                <>
                                    <Typography variant="h5" sx={{ color: getFilterColor(), mb: 2, fontWeight: 'bold' }}>
                                        {getFilterTitle()} Articles
                                    </Typography>
                                    
                                    {getFilteredArticles().length === 0 ? (
                                        <Paper sx={{ p: 4, backgroundColor: '#1e293b', border: '1px solid #334155', textAlign: 'center' }}>
                                            <Typography sx={{ color: '#94a3b8' }}>
                                                No {getFilterTitle().toLowerCase()} articles
                                            </Typography>
                                        </Paper>
                                    ) : (
                                        <Box>
                                            {getFilteredArticles().map((article, index) => (
                                                <Box key={article.id} sx={{ mb: 2 }}>
                                                    <Typography variant="h6" sx={{ color: getFilterColor(), mb: 1 }}>
                                                        Article {index + 1}
                                                    </Typography>
                                                    <ArticleCard
                                                        article={article}
                                                        statusColor={getFilterColor()}
                                                        onReview={handleReview}
                                                        onRequestRevision={openRevisionDialog}
                                                        onPublish={handlePublish}
                                                        canPublish={selectedFilter === 'pending'}
                                                        canRequestRevision={selectedFilter === 'pending'}
                                                    />
                                                </Box>
                                            ))}
                                        </Box>
                                    )}
                                </>
                            )}
                        </Box>
                    </Box>
                </Box>

                {/* Revision Dialog */}
                <Dialog open={revisionDialog} onClose={() => setRevisionDialog(false)} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                        Request Revision for "{selectedArticle?.title}"
                    </DialogTitle>
                    <DialogContent sx={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Revision Comments"
                            value={revisionComments}
                            onChange={(e) => setRevisionComments(e.target.value)}
                            sx={{ 
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#334155',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#60a5fa',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#60a5fa',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#94a3b8',
                                },
                                '& .MuiInputLabel-focused': {
                                    color: '#60a5fa',
                                }
                            }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ backgroundColor: '#1e293b' }}>
                        <Button onClick={() => setRevisionDialog(false)} sx={{ color: '#94a3b8' }}>
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleRequestRevision} 
                            variant="contained"
                            sx={{ 
                                bgcolor: '#60a5fa', 
                                color: '#fff',
                                '&:hover': { bgcolor: '#3b82f6' }
                            }}
                        >
                            Send Revision Request
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
};

export default EditorDashboard;
