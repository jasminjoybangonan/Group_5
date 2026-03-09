import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import {
    Typography,
    Box,
    Paper,
    Button,
    Card,
    CardContent,
    Avatar,
    Chip,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    TextField,
    CircularProgress,
    Menu,
    MenuItem,
    IconButton
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
    Comment,
    Send,
    Star,
    StarBorder,
    Delete
} from '@mui/icons-material';

const StudentShowArticle = ({ article, isFavorite: initialFavorite = false }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFavorite, setIsFavorite] = useState(initialFavorite);

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

    const handleToggleFavorite = () => {
        router.post(`/student/articles/${article.id}/favorite`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                setIsFavorite(!isFavorite);
            }
        });
    };

    const handleSubmitComment = () => {
        if (!commentText.trim()) return;
        
        setIsSubmitting(true);
        router.post(`/student/articles/${article.id}/comment`, {
            content: commentText.trim()
        }, {
            preserveScroll: true,
            onFinish: () => {
                setIsSubmitting(false);
                setCommentText('');
            },
            onSuccess: () => {
                // Comments will be reloaded with the next page refresh
                // or we could use Inertia's reload functionality
            }
        });
    };

    const handleDeleteComment = (commentId) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            router.delete(`/student/comments/${commentId}`, {
                preserveScroll: true,
                onSuccess: () => {
                    // Comment will be removed after page reload
                }
            });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Head title={`Read: ${article.title}`} />
            
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
                            onClick={() => router.get('/student/dashboard')}
                            sx={{ color: '#ffffff' }}
                        >
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                            Read Article
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

                {/* Main Content */}
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    <Paper sx={{ p: 4, backgroundColor: '#1e293b', border: '1px solid #334155', mb: 4 }}>
                        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#10b981' }}>
                                    {article.title}
                                </Typography>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Avatar sx={{ mr: 2, bgcolor: '#10b981' }}>
                                        {article.writer?.name?.charAt(0) || 'W'}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#ffffff' }}>
                                            By {article.writer?.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                            Published on {new Date(article.created_at).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            
                            <IconButton 
                                onClick={handleToggleFavorite}
                                sx={{ 
                                    color: isFavorite ? '#f59e0b' : '#94a3b8',
                                    '&:hover': { color: '#f59e0b' }
                                }}
                            >
                                {isFavorite ? <Star /> : <StarBorder />}
                            </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                            <Chip
                                icon={<Visibility />}
                                label={article.category?.name}
                                size="small"
                                sx={{ bgcolor: '#0f172a', color: '#10b981', border: '1px solid #10b981' }}
                            />
                            <Chip
                                label={article.status?.label}
                                size="small"
                                sx={{ bgcolor: '#10b981', color: '#fff' }}
                            />
                        </Box>

                        <Divider sx={{ backgroundColor: '#334155', mb: 3 }} />

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                                Article Content
                            </Typography>
                            <Paper sx={{ 
                                p: 3, 
                                backgroundColor: '#ffffff', 
                                border: '1px solid #334155'
                            }}>
                                <div 
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                    style={{ 
                                        color: '#000000', 
                                        lineHeight: 1.6,
                                        fontSize: '16px'
                                    }}
                                />
                            </Paper>
                        </Box>

                        <Divider sx={{ backgroundColor: '#334155', mb: 3 }} />

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<Comment />}
                                onClick={() => document.getElementById('comments-section').scrollIntoView({ behavior: 'smooth' })}
                                sx={{ 
                                    px: 4,
                                    color: '#60a5fa',
                                    borderColor: '#60a5fa',
                                    '&:hover': { borderColor: '#3b82f6', color: '#3b82f6' }
                                }}
                            >
                                View Comments ({article.comments?.length || 0})
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<ArrowBack />}
                                onClick={() => router.get('/student/dashboard')}
                                sx={{ 
                                    px: 4,
                                    bgcolor: '#10b981',
                                    '&:hover': { bgcolor: '#059669' }
                                }}
                            >
                                Back to Dashboard
                            </Button>
                        </Box>
                    </Paper>

                    {/* Statistics Section */}
                    <Paper sx={{ p: 4, backgroundColor: '#1e293b', border: '1px solid #334155' }}>
                        <Typography variant="h5" sx={{ color: '#10b981', mb: 3, fontWeight: 'bold' }}>
                            Article Statistics
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ color: '#60a5fa', fontWeight: 'bold' }}>
                                    {article.comments?.length || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                    Comments
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ color: '#10b981', fontWeight: 'bold' }}>
                                    {article.views || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                    Views
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ color: '#f59e0b', fontWeight: 'bold' }}>
                                    {new Date(article.created_at).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                    Published Date
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    {/* Comments Section */}
                    <Paper id="comments-section" sx={{ p: 4, backgroundColor: '#1e293b', border: '1px solid #334155' }}>
                        <Typography variant="h5" sx={{ color: '#10b981', mb: 3, fontWeight: 'bold' }}>
                            Comments & Discussion
                        </Typography>
                        
                        {/* Comments List */}
                        <Box sx={{ mb: 4 }}>
                            {article.comments && article.comments.length > 0 ? (
                                <List>
                                    {article.comments.map((comment) => (
                                        <ListItem key={comment.id} alignItems="flex-start" disableGutters sx={{ mb: 2 }}>
                                            <ListItemIcon>
                                                <Avatar sx={{ width: 40, height: 40, bgcolor: '#60a5fa' }}>
                                                    {comment.student?.name?.charAt(0) || 'S'}
                                                </Avatar>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                                                            {comment.student?.name || 'Student'}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                                                                {new Date(comment.created_at).toLocaleDateString()}
                                                            </Typography>
                                                            {comment.student_id === auth?.user?.id && (
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleDeleteComment(comment.id)}
                                                                    sx={{ 
                                                                        color: '#ef4444',
                                                                        '&:hover': { color: '#dc2626', bgcolor: 'rgba(239, 68, 68, 0.1)' }
                                                                    }}
                                                                    title="Delete your comment"
                                                                >
                                                                    <Delete fontSize="small" />
                                                                </IconButton>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                }
                                                secondary={
                                                    <Typography variant="body2" sx={{ color: '#ffffff', mt: 1 }}>
                                                        {comment.content}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body2" sx={{ color: '#94a3b8', textAlign: 'center', py: 4 }}>
                                    No comments yet. Be the first to share your thoughts!
                                </Typography>
                            )}
                        </Box>

                        {/* Add Comment Form */}
                        <Divider sx={{ backgroundColor: '#334155', mb: 3 }} />
                        
                        <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                            Add Your Comment
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                            <TextField
                                fullWidth
                                multiline
                                minRows={3}
                                label="Share your thoughts on this article..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                disabled={isSubmitting}
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
                            <Button
                                variant="contained"
                                onClick={handleSubmitComment}
                                disabled={isSubmitting || !commentText.trim()}
                                sx={{ 
                                    bgcolor: '#60a5fa',
                                    '&:hover': { bgcolor: '#3b82f6' },
                                    '&:disabled': { bgcolor: '#374151' },
                                    px: 3,
                                    py: 2
                                }}
                            >
                                {isSubmitting ? 'Posting...' : 'Post Comment'}
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default StudentShowArticle;
