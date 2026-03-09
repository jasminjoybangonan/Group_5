import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Button,
    Card,
    CardContent,
    TextField,
    Avatar,
    Chip,
    Fade,
    Slide,
    AppBar,
    Toolbar,
    IconButton,
    Divider,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Menu,
    MenuItem,
    ListItemIcon
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
    Person,
    Category,
    Publish,
    Refresh,
    RateReview,
    Schedule,
    Logout,
    Menu as MenuIcon,
    Edit,
    Visibility,
    ArrowBack
} from '@mui/icons-material';
import JoditEditor from 'jodit-react';

const Review = ({ article }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [revisionDialog, setRevisionDialog] = useState(false);
    const [revisionComments, setRevisionComments] = useState('');
    const [content, setContent] = useState(article?.content || '');
    const [chatOpen, setChatOpen] = useState(false);
    const [chatLoading, setChatLoading] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatText, setChatText] = useState('');
    const [error, setError] = useState(null);
    const editor = useRef(null);

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

    const config = useMemo(
        () => ({
            readonly: true,
            placeholder: 'Article content...',
            toolbar: false,
            showCharsCounter: false,
            showWordsCounter: false,
            showXPathInStatusbar: false,
            style: {
                color: '#000000',
                backgroundColor: '#ffffff'
            }
        }),
        []
    );

    const isSubmitted = article?.status?.name === 'submitted';
    const isPublished = article?.status?.name === 'published';
    const canPublish = isSubmitted || isPublished;

    const csrfToken = useMemo(() => {
        const el = document.querySelector('meta[name="csrf-token"]');
        return el?.getAttribute('content') || '';
    }, []);

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

    const handlePublish = () => {
        if (!canPublish) {
            alert('Only submitted articles can be published.');
            return;
        }
        router.post(`/editor/articles/${article.id}/publish`, {}, {
            onSuccess: () => {
                // Redirect to the published article view
                router.get(`/student/articles/${article.id}`);
            }
        });
    };

    const handleRequestRevision = () => {
        if (!isSubmitted) {
            alert('Only submitted articles can be sent back for revision.');
            return;
        }

        if (!revisionComments.trim()) {
            alert('Please enter revision comments before sending.');
            return;
        }
        router.post(`/editor/articles/${article.id}/revision`, {
            comments: revisionComments
        }, {
            onSuccess: () => {
                setRevisionDialog(false);
                setRevisionComments('');
                router.get('/editor/dashboard');
            }
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Head title="Review Article" />
            
            <Box sx={{ 
                minHeight: '100vh', 
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
                    <Toolbar>
                        <IconButton
                            edge="start"
                            onClick={() => router.get('/editor/dashboard')}
                            sx={{ color: '#ffffff', mr: 2 }}
                        >
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                            Review Article
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
                    <Fade in={true} timeout={1000}>
                        <Box>
                            <Paper sx={{ p: 4, backgroundColor: '#1e293b', border: '1px solid #334155', mb: 4 }}>
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#60a5fa' }}>
                                        {article.title}
                                    </Typography>
                                    
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Avatar sx={{ mr: 2, bgcolor: '#60a5fa' }}>
                                            {article.writer?.name?.charAt(0) || 'A'}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#ffffff' }}>
                                                By {article.writer?.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                Submitted on {new Date(article.created_at).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                                        <Chip
                                            icon={<Category />}
                                            label={article.category?.name}
                                            size="small"
                                            sx={{ bgcolor: '#0f172a', color: '#60a5fa', border: '1px solid #60a5fa' }}
                                        />
                                        <Chip
                                            label={article.status?.label}
                                            size="small"
                                            sx={{ bgcolor: '#f59e0b', color: '#fff' }}
                                        />
                                    </Box>
                                </Box>

                                <Divider sx={{ backgroundColor: '#334155', mb: 3 }} />

                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                                        Article Content
                                    </Typography>
                                    <Paper sx={{ 
                                        p: 1, 
                                        backgroundColor: '#0f172a', 
                                        border: '1px solid #334155'
                                    }}>
                                        <JoditEditor
                                            ref={editor}
                                            value={content}
                                            config={config}
                                            onBlur={useCallback((newContent) => {
                                                setContent(newContent);
                                            }, [])}
                                            onChange={useCallback(() => {}, [])}
                                        />
                                    </Paper>
                                </Box>

                                {article.revisions?.length > 0 && (
                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" gutterBottom sx={{ color: '#ef4444' }}>
                                            Previous Revision History
                                        </Typography>
                                        {article.revisions.map((revision) => (
                                            <Card key={revision.id} sx={{ mb: 2, backgroundColor: '#1e293b', border: '1px solid #334155' }}>
                                                <CardContent>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                        <Avatar sx={{ mr: 2, bgcolor: '#ef4444', width: 32, height: 32 }}>
                                                            {revision.editor?.name?.charAt(0) || 'E'}
                                                        </Avatar>
                                                        <Box>
                                                            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#ffffff' }}>
                                                                {revision.editor?.name}
                                                            </Typography>
                                                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                                                                {new Date(revision.created_at).toLocaleDateString()}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#94a3b8' }}>
                                                        {revision.comments}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </Box>
                                )}

                                <Divider sx={{ backgroundColor: '#334155', mb: 3 }} />

                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        startIcon={<RateReview />}
                                        onClick={() => setChatOpen(true)}
                                        sx={{ 
                                            px: 4,
                                            color: '#60a5fa',
                                            borderColor: '#60a5fa',
                                            '&:hover': { borderColor: '#3b82f6', color: '#3b82f6' }
                                        }}
                                    >
                                        Open Chat
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        startIcon={<Publish />}
                                        onClick={handlePublish}
                                        disabled={!canPublish}
                                        sx={{ 
                                            px: 4,
                                            bgcolor: '#10b981',
                                            '&:hover': { bgcolor: '#059669' },
                                            '&:disabled': { bgcolor: '#374151' }
                                        }}
                                    >
                                        Publish Article
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        startIcon={<Refresh />}
                                        onClick={() => setRevisionDialog(true)}
                                        disabled={!canPublish}
                                        sx={{ 
                                            px: 4,
                                            bgcolor: '#f59e0b',
                                            '&:hover': { bgcolor: '#d97706' },
                                            '&:disabled': { bgcolor: '#374151' }
                                        }}
                                    >
                                        Request Revision
                                    </Button>
                                </Box>
                            </Paper>
                        </Box>
                    </Fade>
                </Box>

                {/* Revision Dialog */}
                <Dialog open={revisionDialog} onClose={() => setRevisionDialog(false)} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                        Request Revision
                    </DialogTitle>
                    <DialogContent sx={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#ffffff' }}>
                            Article: {article.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                            Please provide specific feedback about what needs to be revised in this article.
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            label="Revision Comments"
                            value={revisionComments}
                            onChange={(e) => setRevisionComments(e.target.value)}
                            placeholder="Please specify the revisions needed..."
                            required
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
                                bgcolor: '#ef4444',
                                '&:hover': { bgcolor: '#dc2626' },
                                '&:disabled': { bgcolor: '#374151' }
                            }}
                            disabled={!revisionComments.trim()}
                        >
                            Send Revision Request
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Chat Dialog */}
                <Dialog open={chatOpen} onClose={() => setChatOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                        Article Discussion
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
                                    No messages yet. Start the conversation.
                                </Typography>
                            )}
                            {!chatLoading && chatMessages.length > 0 && (
                                <List dense>
                                    {chatMessages.map((m) => (
                                        <ListItem key={m.id} alignItems="flex-start" disableGutters>
                                            <ListItemText
                                                primary={m.sender?.name || 'User'}
                                                primaryTypographyProps={{ color: '#ffffff' }}
                                                secondary={m.message}
                                                secondaryTypographyProps={{ color: '#94a3b8' }}
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
                            label="Message"
                            value={chatText}
                            onChange={(e) => setChatText(e.target.value)}
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
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
};

export default Review;
