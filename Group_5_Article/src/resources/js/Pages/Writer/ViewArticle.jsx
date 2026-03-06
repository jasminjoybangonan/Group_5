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
    Send
} from '@mui/icons-material';

const WriterViewArticle = ({ article }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatLoading, setChatLoading] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatText, setChatText] = useState('');

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

    const csrfToken = useMemo(() => {
        const el = document.querySelector('meta[name="csrf-token"]');
        return el?.getAttribute('content') || '';
    }, []);

    const loadChat = useCallback(async () => {
        setChatLoading(true);
        try {
            const res = await fetch(`/articles/${article.id}/messages`, {
                headers: {
                    'Accept': 'application/json'
                },
                credentials: 'same-origin'
            });
            const data = await res.json();
            setChatMessages(Array.isArray(data?.messages) ? data.messages : []);
        } finally {
            setChatLoading(false);
        }
    }, [article.id]);

    const sendChat = useCallback(async () => {
        const trimmed = chatText.trim();
        if (!trimmed) return;

        setChatLoading(true);
        try {
            await fetch(`/articles/${article.id}/messages`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                credentials: 'same-origin',
                body: JSON.stringify({ message: trimmed })
            });
            setChatText('');
            await loadChat();
        } finally {
            setChatLoading(false);
        }
    }, [article.id, chatText, csrfToken, loadChat]);

    useEffect(() => {
        if (chatOpen) {
            loadChat();
        }
    }, [chatOpen, loadChat]);

    return (
        <ThemeProvider theme={theme}>
            <Head title={`View: ${article.title}`} />
            
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
                            onClick={() => router.get('/writer/dashboard')}
                            sx={{ color: '#ffffff' }}
                        >
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                            View Published Article
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
                    <MenuItem onClick={handleMenuClose}>
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
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    <Paper sx={{ p: 4, backgroundColor: '#1e293b', border: '1px solid #334155', mb: 4 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#10b981' }}>
                                {article.title}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ mr: 2, bgcolor: '#f59e0b' }}>
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
                                onClick={() => setChatOpen(true)}
                                sx={{ 
                                    px: 4,
                                    color: '#60a5fa',
                                    borderColor: '#60a5fa',
                                    '&:hover': { borderColor: '#3b82f6', color: '#3b82f6' }
                                }}
                            >
                                View Comments ({chatMessages.length})
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<ArrowBack />}
                                onClick={() => router.get('/writer/dashboard')}
                                sx={{ 
                                    px: 4,
                                    bgcolor: '#f59e0b',
                                    '&:hover': { bgcolor: '#d97706' }
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
                                    {chatMessages.length}
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
                </Box>

                {/* Comments Dialog */}
                <Dialog open={chatOpen} onClose={() => setChatOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                        Article Comments & Discussion
                    </DialogTitle>
                    <DialogContent sx={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                        <Box sx={{ minHeight: 260, maxHeight: 360, overflowY: 'auto', mb: 2 }}>
                            {chatLoading && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                                    <CircularProgress size={24} sx={{ color: '#60a5fa' }} />
                                </Box>
                            )}
                            {!chatLoading && chatMessages.length === 0 && (
                                <Typography variant="body2" sx={{ color: '#94a3b8', py: 2 }}>
                                    No comments yet. Be the first to comment!
                                </Typography>
                            )}
                            {!chatLoading && chatMessages.length > 0 && (
                                <List dense>
                                    {chatMessages.map((m) => (
                                        <ListItem key={m.id} alignItems="flex-start" disableGutters>
                                            <ListItemIcon>
                                                <Avatar sx={{ width: 32, height: 32, bgcolor: '#60a5fa' }}>
                                                    {m.sender?.name?.charAt(0) || 'U'}
                                                </Avatar>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={m.sender?.name || 'User'}
                                                primaryTypographyProps={{ color: '#ffffff', fontWeight: 'bold' }}
                                                secondary={
                                                    <Box>
                                                        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                                                            {new Date(m.created_at).toLocaleDateString()}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: '#ffffff' }}>
                                                            {m.message}
                                                        </Typography>
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Box>

                        <TextField
                            fullWidth
                            multiline
                            minRows={2}
                            label="Add a comment"
                            value={chatText}
                            onChange={(e) => setChatText(e.target.value)}
                            placeholder="Share your thoughts on this article..."
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
                        <Button onClick={() => setChatOpen(false)} sx={{ color: '#94a3b8' }}>
                            Close
                        </Button>
                        <Button 
                            onClick={sendChat} 
                            variant="contained"
                            disabled={chatLoading || !chatText.trim()}
                            sx={{ 
                                bgcolor: '#60a5fa',
                                '&:hover': { bgcolor: '#3b82f6' },
                                '&:disabled': { bgcolor: '#374151' }
                            }}
                        >
                            <Send sx={{ mr: 1 }} />
                            Send Comment
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
};

export default WriterViewArticle;
