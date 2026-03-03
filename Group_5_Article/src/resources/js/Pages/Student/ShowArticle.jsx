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
    TextField,
    Avatar,
    Chip,
    Fade,
    Slide,
    AppBar,
    Toolbar,
    IconButton,
    Divider
} from '@mui/material';
import {
    ArrowBack,
    Person,
    Category,
    Comment,
    Send,
    Schedule
} from '@mui/icons-material';

const ShowArticle = ({ article }) => {
    const [newComment, setNewComment] = useState('');

    const handleComment = () => {
        if (newComment.trim()) {
            router.post(`/student/articles/${article.id}/comment`, {
                content: newComment
            }, {
                onSuccess: () => {
                    setNewComment('');
                    window.location.reload();
                }
            });
        }
    };

    return (
        <>
            <Head title={article.title} />
            <Fade in={true} timeout={1000}>
                <Container maxWidth="md">
                    <Box sx={{ py: 4 }}>
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={() => window.history.back()}
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
                                            {article.writer?.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Published on {new Date(article.created_at).toLocaleDateString()}
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
                                        label="Published"
                                        size="small"
                                        color="success"
                                    />
                                </Box>
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="body1" sx={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                                    {article.content}
                                </Typography>
                            </Box>

                            <Divider sx={{ mb: 3 }} />
                        </Paper>

                        <Paper sx={{ p: 4 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                                Comments ({article.comments?.length || 0})
                            </Typography>

                            <Card sx={{ mb: 3 }}>
                                <CardContent>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        label="Add a comment"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Share your thoughts about this article..."
                                    />
                                    <Button
                                        variant="contained"
                                        startIcon={<Send />}
                                        onClick={handleComment}
                                        disabled={!newComment.trim()}
                                        sx={{ mt: 2 }}
                                    >
                                        Post Comment
                                    </Button>
                                </CardContent>
                            </Card>

                            {article.comments?.length > 0 ? (
                                article.comments.map((comment) => (
                                    <Card key={comment.id} sx={{ mb: 2 }}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                                <Avatar sx={{ mr: 2, bgcolor: 'secondary.main', width: 32, height: 32 }}>
                                                    {comment.student?.name?.charAt(0) || 'S'}
                                                </Avatar>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="subtitle2" fontWeight="bold">
                                                        {comment.student?.name}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {new Date(comment.created_at).toLocaleDateString()} at {new Date(comment.created_at).toLocaleTimeString()}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Typography variant="body2" sx={{ ml: 7 }}>
                                                {comment.content}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                                    No comments yet. Be the first to share your thoughts!
                                </Typography>
                            )}
                        </Paper>
                    </Box>
                </Container>
            </Fade>
        </>
    );
};

export default ShowArticle;
