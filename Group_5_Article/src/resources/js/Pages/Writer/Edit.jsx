import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Grid,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Divider,
    Alert,
    AppBar,
    Toolbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    CircularProgress
} from '@mui/material';
import { ArrowBack, Save, Send, Category } from '@mui/icons-material';
import JoditEditorComponent from '@/Components/JoditEditor';

const WriterEdit = ({ article, categories }) => {
    const { flash } = usePage().props;

    const [formData, setFormData] = useState({
        title: article?.title || '',
        content: article?.content || '',
        category_id: article?.category_id || article?.category?.id || ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleContentChange = (newContent) => {
        setFormData(prev => ({ ...prev, content: newContent }));
    };

    const handleSaveDraft = () => {
        router.put(`/writer/articles/${article.id}`, formData);
    };

    const handleResubmitRevision = () => {
        router.put(`/writer/articles/${article.id}/revise`, formData);
    };

    const isNeedsRevision = article?.status?.name === 'needs_revision';

    const [chatOpen, setChatOpen] = useState(false);
    const [chatLoading, setChatLoading] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatText, setChatText] = useState('');

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

    const latestRevisionComment = (() => {
        if (!article?.revisions || article.revisions.length === 0) return null;
        return article.revisions[0]?.comments || null;
    })();

    return (
        <>
            <Head title={`Edit: ${article?.title ?? 'Article'}`} />
            <AppBar position="sticky" sx={{ backgroundColor: '#1565c0' }}>
                <Toolbar>
                    <Button
                        color="inherit"
                        startIcon={<ArrowBack />}
                        component={Link}
                        href={route('writer.dashboard')}
                        sx={{ mr: 2, textTransform: 'none' }}
                    >
                        Back to Writer Dashboard
                    </Button>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Writer - Edit Article
                    </Typography>
                    <Chip label="Writer" color="secondary" size="small" />
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Box sx={{ py: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                Edit Article
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                <Chip
                                    size="small"
                                    icon={<Category />}
                                    label={article?.category?.name || 'Uncategorized'}
                                    variant="outlined"
                                />
                                <Chip
                                    size="small"
                                    label={article?.status?.label || article?.status?.name || 'Status'}
                                    color={isNeedsRevision ? 'error' : 'default'}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button variant="outlined" onClick={() => setChatOpen(true)}>
                                Open Chat
                            </Button>
                            <Button
                                component={Link}
                                href={route('writer.dashboard')}
                                startIcon={<ArrowBack />}
                                variant="outlined"
                            >
                                Back to Dashboard
                            </Button>
                        </Box>
                    </Box>

                    {(flash?.success || flash?.error) && (
                        <Alert severity={flash?.success ? 'success' : 'error'} sx={{ mb: 3 }}>
                            {flash?.success || flash?.error}
                        </Alert>
                    )}

                    {isNeedsRevision && latestRevisionComment && (
                        <Paper sx={{ p: 3, mb: 3, borderLeft: '4px solid', borderLeftColor: 'error.main' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                Editor Feedback
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {latestRevisionComment}
                            </Typography>
                        </Paper>
                    )}

                    <Paper sx={{ p: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <TextField
                                    fullWidth
                                    label="Article Title"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth required>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={formData.category_id}
                                        label="Category"
                                        onChange={(e) => handleInputChange('category_id', e.target.value)}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category.id} value={category.id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    Content
                                </Typography>
                                <JoditEditorComponent
                                    value={formData.content}
                                    onChange={handleContentChange}
                                    placeholder="Write your article content here..."
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}>
                                    {!isNeedsRevision && (
                                        <Button
                                            variant="contained"
                                            startIcon={<Save />}
                                            onClick={handleSaveDraft}
                                        >
                                            Save Changes
                                        </Button>
                                    )}

                                    {isNeedsRevision && (
                                        <Button
                                            variant="contained"
                                            color="error"
                                            startIcon={<Send />}
                                            onClick={handleResubmitRevision}
                                        >
                                            Revise & Resubmit
                                        </Button>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Container>

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

export default WriterEdit;
