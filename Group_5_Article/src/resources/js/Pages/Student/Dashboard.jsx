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
    ListItemText
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
    ArrowBack,
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

    // Theme from Login.jsx - same as Dashboard
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
                backgroundColor: "#0b1220",
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Header - Same as Dashboard */}
                <Box sx={{ 
                    backgroundColor: '#0f172a', 
                    borderBottom: '1px solid #334155',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton 
                            component="a" 
                            href="/" 
                            sx={{ color: '#ffffff' }}
                        >
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                            Student Dashboard
                        </Typography>
                    </Box>
                    
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
                    <MenuItem onClick={() => { router.get('/editor/dashboard'); handleMenuClose(); }}>
                        <ListItemIcon>
                            <RateReview sx={{ color: '#ef4444' }} />
                        </ListItemIcon>
                        Switch to Editor
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
