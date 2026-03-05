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
    CircularProgress
} from '@mui/material';
import {
    ArrowBack,
    Person,
    Category,
    Publish,
    Refresh,
    RateReview,
    Schedule
} from '@mui/icons-material';
import JoditEditor from 'jodit-react';

const Review = ({ article }) => {
    const [revisionDialog, setRevisionDialog] = useState(false);
    const [revisionComments, setRevisionComments] = useState('');
    const [content, setContent] = useState(article.content || '');
    const [chatOpen, setChatOpen] = useState(false);
    const [chatLoading, setChatLoading] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatText, setChatText] = useState('');
    const editor = useRef(null);

    const config = useMemo(
        () => ({
            readonly: true,
            placeholder: 'Article content...',
            toolbar: false,
            showCharsCounter: false,
            showWordsCounter: false,
            showXPathInStatusbar: false,
        }),
        []
    );

    const isSubmitted = article?.status?.name === 'submitted';

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

    const handlePublish = () => {
        if (!isSubmitted) {
            alert('Only submitted articles can be published.');
            return;
        }
        router.post(`/editor/articles/${article.id}/publish`, {}, {
            onSuccess: () => router.get('/editor/dashboard')
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
            onSuccess: () => router.get('/editor/dashboard')
        });
    };

    return (
        <>
            <Head title={`Review: ${article.title}`} />
            <AppBar position="sticky" sx={{ backgroundColor: '#1565c0' }}>
                <Toolbar>
                    <Button
                        color="inherit"
                        startIcon={<ArrowBack />}
                        onClick={() => router.get('/editor/dashboard')}
                        sx={{ mr: 2, textTransform: 'none' }}
                    >
                        Back to Editor Dashboard
                    </Button>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Editor - Review Article
                    </Typography>
                    <Chip label="Editor" color="secondary" size="small" />
                </Toolbar>
            </AppBar>
            <Fade in={true} timeout={1000}>
                <Container maxWidth="lg">
                    <Box sx={{ py: 4 }}>
                        <Paper sx={{ p: 4, mb: 4 }}>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                    {article.title}
                                </Typography>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                        {article.writer?.name?.charAt(0) || 'A'}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            By {article.writer?.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Submitted on {new Date(article.created_at).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                                    <Chip
                                        icon={<Category />}
                                        label={article.category?.name}
                                        size="small"
                                        color="primary"
                                    />
                                    <Chip
                                        label={article.status?.label}
                                        size="small"
                                        color="warning"
                                    />
                                </Box>
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" gutterBottom>
                                    Article Content
                                </Typography>
                                <Paper sx={{ p: 1, bgcolor: 'grey.50', border: 1, borderColor: 'grey.300' }}>
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
                                    <Typography variant="h6" gutterBottom color="error.main">
                                        Previous Revision History
                                    </Typography>
                                    {article.revisions.map((revision) => (
                                        <Card key={revision.id} sx={{ mb: 2 }}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <Avatar sx={{ mr: 2, bgcolor: 'error.main', width: 32, height: 32 }}>
                                                        {revision.editor?.name?.charAt(0) || 'E'}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="subtitle2" fontWeight="bold">
                                                            {revision.editor?.name}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {new Date(revision.created_at).toLocaleDateString()}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                                    {revision.comments}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                            )}

                            <Divider sx={{ mb: 3 }} />

                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    startIcon={<RateReview />}
                                    onClick={() => setChatOpen(true)}
                                    sx={{ px: 4 }}
                                >
                                    Open Chat
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="large"
                                    startIcon={<Publish />}
                                    onClick={handlePublish}
                                    disabled={!isSubmitted}
                                    sx={{ px: 4 }}
                                >
                                    Publish Article
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="large"
                                    startIcon={<Refresh />}
                                    onClick={() => setRevisionDialog(true)}
                                    disabled={!isSubmitted}
                                    sx={{ px: 4 }}
                                >
                                    Request Revision
                                </Button>
                            </Box>
                        </Paper>
                    </Box>
                </Container>
            </Fade>

            <Dialog open={revisionDialog} onClose={() => setRevisionDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>Request Revision</DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle1" gutterBottom>
                        Article: {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRevisionDialog(false)}>Cancel</Button>
                    <Button 
                        onClick={handleRequestRevision} 
                        variant="contained" 
                        color="error"
                        disabled={!revisionComments.trim()}
                    >
                        Send Revision Request
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={chatOpen} onClose={() => setChatOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Article Discussion</DialogTitle>
                <DialogContent>
                    <Box sx={{ minHeight: 260, maxHeight: 360, overflowY: 'auto', mb: 2 }}>
                        {chatLoading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                                <CircularProgress size={24} />
                            </Box>
                        )}
                        {!chatLoading && chatMessages.length === 0 && (
                            <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                                No messages yet. Start the conversation.
                            </Typography>
                        )}
                        {!chatLoading && chatMessages.length > 0 && (
                            <List dense>
                                {chatMessages.map((m) => (
                                    <ListItem key={m.id} alignItems="flex-start" disableGutters>
                                        <ListItemText
                                            primary={m.sender?.name || 'User'}
                                            secondary={m.message}
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
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setChatOpen(false)}>Close</Button>
                    <Button onClick={sendChat} variant="contained" disabled={chatLoading || !chatText.trim()}>
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Review;
