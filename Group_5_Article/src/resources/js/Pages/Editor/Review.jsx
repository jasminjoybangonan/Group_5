import React, { useState, useRef, useMemo, useCallback } from 'react';
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
    DialogActions
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

    const handlePublish = () => {
        router.post(`/editor/articles/${article.id}/publish`, {}, {
            onSuccess: () => router.get('/editor/dashboard')
        });
    };

    const handleRequestRevision = () => {
        router.post(`/editor/articles/${article.id}/revision`, {
            comments: revisionComments
        }, {
            onSuccess: () => router.get('/editor/dashboard')
        });
    };

    return (
        <>
            <Head title={`Review: ${article.title}`} />
            <Fade in={true} timeout={1000}>
                <Container maxWidth="lg">
                    <Box sx={{ py: 4 }}>
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={() => router.get('/editor/dashboard')}
                            sx={{ mb: 3 }}
                        >
                            Back to Dashboard
                        </Button>

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
                                    variant="contained"
                                    color="success"
                                    size="large"
                                    startIcon={<Publish />}
                                    onClick={handlePublish}
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
        </>
    );
};

export default Review;
