import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Button,
    Card,
    CardContent,
    CardActions,
    TextField,
    Alert,
    Fade,
    Avatar,
    Chip,
    IconButton,
    AppBar,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Menu as MuiMenu,
    MenuItem as MuiMenuItem,
    CardMedia,
    Stack,
    FormControl,
    InputLabel,
    Select
} from '@mui/material';
import {
    ArrowBack,
    Article,
    Comment,
    Menu,
    Dashboard,
    Visibility,
    Chat,
    Person,
    Logout,
    Delete
} from '@mui/icons-material';

const drawerWidth = 240;

const PublishedArticles = ({ publishedArticles, categories, selectedCategory }) => {
    console.log('PublishedArticles props:', { publishedArticles, categories, selectedCategory });
    
    const [comments, setComments] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [error, setError] = useState(null);

    // If there's an error, show error message
    if (error) {
        return (
            <Container maxWidth="lg">
                <Alert severity="error">
                    <Typography>Something went wrong: {error}</Typography>
                </Alert>
            </Container>
        );
    }

    const handleComment = (articleId) => {
        const content = comments[articleId];
        
        if (content && content.trim()) {
            router.post(`/student/articles/${articleId}/comment`, {
                content: content
            }, {
                onSuccess: () => {
                    setComments(prev => ({ ...prev, [articleId]: '' }));
                    // Show success message instead of reloading
                    alert('Comment posted successfully!');
                },
                onError: (errors) => {
                    alert('Error posting comment: ' + JSON.stringify(errors));
                }
            });
        }
    };

    const handleCommentChange = (articleId, value) => {
        setComments(prev => ({ ...prev, [articleId]: value }));
    };

    const handleDeleteComment = (commentId) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            router.delete(`/student/comments/${commentId}`, {
                onSuccess: () => {
                    window.location.reload();
                },
                onError: (errors) => {
                    alert('Error deleting comment: ' + JSON.stringify(errors));
                }
            });
        }
    };

    const handleViewArticle = (article) => {
        router.visit(`/student/articles/${article.id}`);
    };

    const handleLogout = () => {
        router.post('/logout', {}, {
            onFinish: () => {
                handleMenuClose();
            }
        });
    };

    const switchRole = (role) => {
        router.post(`/switch-role/${role}`, {}, {
            onFinish: () => {
                handleMenuClose();
            }
        });
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleCategoryFilter = (categoryId) => {
        router.visit('/student/published-articles', {
            method: 'get',
            data: { category_id: categoryId }
        });
    };

    const handleBackToDashboard = () => {
        router.visit('/student/dashboard');
    };

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Student Panel
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                <ListItem button onClick={() => router.visit('/student/dashboard')}>
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button onClick={() => router.visit('/student/published-articles')}>
                    <ListItemIcon>
                        <Article />
                    </ListItemIcon>
                    <ListItemText primary="Published Articles" />
                </ListItem>
                <ListItem button onClick={() => router.visit('/student/my-comments')}>
                    <ListItemIcon>
                        <Comment />
                    </ListItemIcon>
                    <ListItemText primary="My Comments" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <>
            <Head title="Published Articles" />
            <Box sx={{ display: 'flex' }}>
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            Published Articles
                        </Typography>
                        <IconButton
                            color="inherit"
                            onClick={handleMenuClick}
                            sx={{ ml: 2 }}
                        >
                            <Person />
                        </IconButton>
                        <MuiMenu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MuiMenuItem onClick={() => { switchRole('writer'); }}>
                                Switch to Writer
                            </MuiMenuItem>
                            <MuiMenuItem onClick={() => { switchRole('editor'); }}>
                                Switch to Editor
                            </MuiMenuItem>
                            <Divider />
                            <MuiMenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MuiMenuItem>
                        </MuiMenu>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                    <Drawer
                        variant="temporary"
                        open={false}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    <Container maxWidth="lg">
                        <Fade in={true} timeout={1000}>
                            <Box>
                                <Button
                                    startIcon={<ArrowBack />}
                                    onClick={handleBackToDashboard}
                                    sx={{ mb: 3 }}
                                >
                                    Back to Dashboard
                                </Button>

                                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                    Published Articles ({publishedArticles?.length || 0})
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                    <FormControl size="small" sx={{ minWidth: 150 }}>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            value={selectedCategory || ''}
                                            label="Category"
                                            onChange={(e) => handleCategoryFilter(e.target.value)}
                                        >
                                            <MuiMenuItem value="">
                                                All Categories
                                            </MuiMenuItem>
                                            {categories?.map((category) => (
                                                <MuiMenuItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </MuiMenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>

                                {!publishedArticles || publishedArticles.length === 0 ? (
                                    <Alert severity="info" sx={{ mt: 2 }}>
                                        <Typography color="text.secondary">
                                            No published articles available yet. Check back later for new content!
                                        </Typography>
                                    </Alert>
                                ) : (
                                    <Stack spacing={4}>
                                        {publishedArticles.map((article) => (
                                            <Card 
                                                key={article.id} 
                                                sx={{ 
                                                    borderRadius: 3,
                                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                                                    }
                                                }}
                                            >
                                                <CardContent sx={{ p: 4 }}>
                                                    <Stack spacing={3}>
                                                        {/* Header Section */}
                                                        <Stack direction="row" alignItems="center" spacing={3}>
                                                            <Avatar 
                                                                sx={{ 
                                                                    width: 56, 
                                                                    height: 56, 
                                                                    bgcolor: 'primary.main',
                                                                    fontSize: '1.5rem'
                                                                }}
                                                            >
                                                                {article.writer?.name?.charAt(0) || 'A'}
                                                            </Avatar>
                                                            <Box sx={{ flex: 1 }}>
                                                                <Typography 
                                                                    variant="h5" 
                                                                    fontWeight="bold" 
                                                                    color="primary.main"
                                                                    sx={{ mb: 1 }}
                                                                >
                                                                    {article.title}
                                                                </Typography>
                                                                <Typography variant="body1" color="text.secondary">
                                                                    By {article.writer?.name}
                                                                </Typography>
                                                            </Box>
                                                        </Stack>

                                                        {/* Category and Status */}
                                                        <Stack direction="row" spacing={2} alignItems="center">
                                                            <Chip
                                                                label={article.category?.name}
                                                                size="medium"
                                                                sx={{ 
                                                                    bgcolor: 'primary.light',
                                                                    color: 'primary.contrastText',
                                                                    fontWeight: 'bold'
                                                                }}
                                                            />
                                                            <Chip
                                                                label="Published"
                                                                color="success"
                                                                size="medium"
                                                                sx={{ fontWeight: 'bold' }}
                                                            />
                                                        </Stack>

                                                        {/* Content Preview */}
                                                        <Box sx={{ 
                                                            p: 3, 
                                                            bgcolor: 'grey.50', 
                                                            borderRadius: 2,
                                                            borderLeft: '4px solid',
                                                            borderColor: 'primary.main'
                                                        }}>
                                                            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                                                {article.content?.substring(0, 300)}...
                                                            </Typography>
                                                        </Box>

                                                        {/* Comments Section */}
                                                        {article.comments?.length > 0 && (
                                                            <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                                                                <Typography variant="h6" gutterBottom color="primary.main">
                                                                    💬 Comments ({article.comments.length})
                                                                </Typography>
                                                                <Stack spacing={2}>
                                                                    {article.comments.slice(0, 3).map((comment) => (
                                                                        <Box 
                                                                            key={comment.id} 
                                                                            sx={{ 
                                                                                p: 2, 
                                                                                bgcolor: 'grey.50', 
                                                                                borderRadius: 2,
                                                                                border: '1px solid',
                                                                                borderColor: 'divider'
                                                                            }}
                                                                        >
                                                                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                                                                                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                                                                                    {comment.student?.name?.charAt(0) || 'S'}
                                                                                </Avatar>
                                                                                <Box sx={{ flex: 1 }}>
                                                                                    <Typography variant="subtitle2" fontWeight="bold">
                                                                                        {comment.student?.name}
                                                                                    </Typography>
                                                                                    <Typography variant="caption" color="text.secondary">
                                                                                        Posted on {new Date(comment.created_at).toLocaleDateString()}
                                                                                    </Typography>
                                                                                </Box>
                                                                                {comment.student_id === auth.user?.id && (
                                                                                    <IconButton
                                                                                        size="small"
                                                                                        color="error"
                                                                                        onClick={() => handleDeleteComment(comment.id)}
                                                                                        sx={{ ml: 1 }}
                                                                                    >
                                                                                        <Delete fontSize="small" />
                                                                                    </IconButton>
                                                                                )}
                                                                            </Stack>
                                                                            <Typography variant="body2" sx={{ pl: 4 }}>
                                                                                {comment.content}
                                                                            </Typography>
                                                                        </Box>
                                                                    ))}
                                                                    {article.comments.length > 3 && (
                                                                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                                                                            +{article.comments.length - 3} more comments
                                                                        </Typography>
                                                                    )}
                                                                </Stack>
                                                            </Box>
                                                        )}

                                                        {/* Action Buttons */}
                                                        <Stack direction="row" spacing={2} alignItems="center">
                                                            <Button
                                                                size="large"
                                                                startIcon={<Visibility />}
                                                                onClick={() => handleViewArticle(article)}
                                                                variant="contained"
                                                                sx={{ 
                                                                    borderRadius: 2,
                                                                    px: 4,
                                                                    py: 1.5
                                                                }}
                                                            >
                                                                Read Full Article
                                                            </Button>
                                                        </Stack>

                                                        {/* Comment Input */}
                                                        <Box sx={{ p: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
                                                            <Typography variant="subtitle2" gutterBottom color="primary.main">
                                                                Add Your Comment
                                                            </Typography>
                                                            <TextField
                                                                fullWidth
                                                                multiline
                                                                rows={3}
                                                                label="Share your thoughts..."
                                                                value={comments[article.id] || ''}
                                                                onChange={(e) => handleCommentChange(article.id, e.target.value)}
                                                                placeholder="What do you think about this article?"
                                                                size="medium"
                                                                sx={{ mb: 2 }}
                                                            />
                                                            <Button
                                                                variant="contained"
                                                                size="medium"
                                                                onClick={() => handleComment(article.id)}
                                                                disabled={!comments[article.id]?.trim()}
                                                                startIcon={<Chat />}
                                                                sx={{ borderRadius: 2 }}
                                                            >
                                                                Post Comment
                                                            </Button>
                                                        </Box>
                                                    </Stack>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </Stack>
                                )}
                            </Box>
                        </Fade>
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default PublishedArticles;
