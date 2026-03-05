import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    Grid,
    Paper,
    Avatar,
    IconButton,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    AppBar,
    Menu,
    MenuItem,
    Fade,
    Tooltip,
    Badge,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard,
    Article,
    RateReview,
    Publish,
    Visibility,
    Person,
    Schedule,
    Refresh,
    Logout,
    ArrowBack,
    TrendingUp,
    Assignment
} from '@mui/icons-material';

const drawerWidth = 280;

const EditorDashboard = ({ pending, needsRevision, published }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [revisionDialog, setRevisionDialog] = useState(false);
    const [revisionComments, setRevisionComments] = useState('');

    const { flash } = usePage().props;

    const switchRole = (role) => {
        router.post(`/switch-role/${role}`, {}, {
            onFinish: () => {
                handleMenuClose();
            }
        });
    };

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

    const drawer = (
        <Box>
            <Toolbar sx={{ backgroundColor: '#1565c0', color: '#fff' }}>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Editor Dashboard
                </Typography>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List>
                <ListItem button onClick={() => setDrawerOpen(false)}>
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Overview" />
                </ListItem>
                <ListItem button onClick={() => setDrawerOpen(false)}>
                    <ListItemIcon>
                        <Article />
                    </ListItemIcon>
                    <ListItemText primary="All Articles" />
                </ListItem>
            </List>
        </Box>
    );

    const drawerContent = (
        <Box sx={{ width: drawerWidth, backgroundColor: '#fafafa' }}>
            <Toolbar />
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                    Quick Stats
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#e3f2fd', color: '#fff', borderRadius: 2 }}>
                            <TrendingUp sx={{ fontSize: 32, mb: 1 }} />
                            <Typography variant="h4">{pending.length}</Typography>
                            <Typography variant="body2">Pending Review</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#f44336', color: '#fff', borderRadius: 2 }}>
                            <Assignment sx={{ fontSize: 32, mb: 1 }} />
                            <Typography variant="h4">{needsRevision.length}</Typography>
                            <Typography variant="body2">Needs Revision</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#4caf50', color: '#fff', borderRadius: 2 }}>
                            <Publish sx={{ fontSize: 32, mb: 1 }} />
                            <Typography variant="h4">{published.length}</Typography>
                            <Typography variant="body2">Published</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#2196f3', color: '#fff', borderRadius: 2 }}>
                            <Visibility sx={{ fontSize: 32, mb: 1 }} />
                            <Typography variant="h4">{(pending?.length || 0) + (needsRevision?.length || 0) + (published?.length || 0)}</Typography>
                            <Typography variant="body2">Total Articles</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );

    const ArticleCard = ({
        article,
        statusColor,
        onReview,
        onRequestRevision,
        onPublish,
        canPublish = true,
        canRequestRevision = true,
        reviewLabel = 'Review'
    }) => (
        <Card 
            sx={{ 
                mb: 3, 
                borderRadius: 3,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                '&:hover': {
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s ease-in-out'
                }
            }}
        >
            <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Avatar 
                        sx={{ 
                            bgcolor: statusColor, 
                            width: 48, 
                            height: 48,
                            mr: 2,
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                        }}
                    >
                        <Article sx={{ color: '#fff' }} />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 0.5, lineHeight: 1.2 }}>
                            {article.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Chip 
                                label={article.status?.label}
                                color="default"
                                size="small"
                                sx={{ fontWeight: 'bold', bgcolor: statusColor, color: '#fff' }}
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                                By {article.writer?.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                                Category: {article.category?.name}
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 2, p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                            <Typography variant="body2" sx={{ fontSize: '0.875rem', lineHeight: 1.4, color: '#555' }}>
                                {article.content?.substring(0, 150)}...
                            </Typography>
                        </Box>
                        {article.revisions?.length > 0 && (
                            <Box sx={{ mt: 2, p: 2, backgroundColor: '#fff3e0', borderRadius: 2 }}>
                                <Typography variant="body2" color="error" sx={{ fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center' }}>
                                    <Schedule sx={{ fontSize: 16, mr: 1 }} />
                                    Previous Feedback:
                                </Typography>
                                <Typography variant="body2" sx={{ fontStyle: 'italic', fontSize: '0.875rem' }}>
                                    {article.revisions[0].comments}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
                <Tooltip title="Review this article" arrow>
                    <Button 
                        size="small" 
                        startIcon={<RateReview />}
                        onClick={() => onReview(article)}
                        variant="outlined"
                    >
                        {reviewLabel}
                    </Button>
                </Tooltip>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {canRequestRevision && (
                        <Tooltip title="Request revisions" arrow>
                            <Button 
                                size="small" 
                                startIcon={<Refresh />}
                                onClick={() => onRequestRevision(article)}
                                color="error"
                                variant="outlined"
                            >
                                Request Revision
                            </Button>
                        </Tooltip>
                    )}
                    {canPublish && (
                        <Tooltip title="Publish this article" arrow>
                            <Button 
                                size="small" 
                                startIcon={<Publish />}
                                onClick={() => onPublish(article)}
                                color="success"
                                variant="contained"
                            >
                                Publish
                            </Button>
                        </Tooltip>
                    )}
                </Box>
            </CardActions>
        </Card>
    );

    return (
        <>
            <Head title="Editor Dashboard" />
            <Box sx={{ display: 'flex', backgroundColor: '#fafafa' }}>
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: drawerWidth },
                        ml: { sm: 0 },
                        backgroundColor: '#1565c0',
                        color: '#fff',
                        boxShadow: '0 4px 12px rgba(21,28,31,0.15)',
                        zIndex: 1200
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={() => setDrawerOpen(!drawerOpen)}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            Article Management System
                        </Typography>
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                    <Drawer
                        variant="temporary"
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
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
                        {drawerContent}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ 
                        flexGrow: 1, 
                        p: 3, 
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        backgroundColor: '#fafafa',
                        minHeight: '100vh'
                    }}
                >
                    <Toolbar />
                    <Fade in={true} timeout={800}>
                        <Container maxWidth="xl">
                            {flash?.success && (
                                <Box sx={{ mb: 3 }}>
                                    <Paper 
                                        sx={{ 
                                            p: 3, 
                                            backgroundColor: '#4caf50', 
                                            color: '#fff',
                                            borderRadius: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            border: '1px solid #81c784'
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ mr: 2 }}>
                                            ✓ Success
                                        </Typography>
                                        <Typography variant="body1">
                                            {flash.success}
                                        </Typography>
                                    </Paper>
                                </Box>
                            )}
                            
                            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1565c0', mb: 3 }}>
                                Article Review Queue
                            </Typography>
                            
                            <Grid container spacing={3}>
                                <Grid item xs={12} lg={4}>
                                    <Paper sx={{ p: 3, backgroundColor: '#fff', borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, pb: 2, borderBottom: '2px solid #e0e0e0' }}>
                                            <Badge badgeContent={pending.length} color="warning" sx={{ mr: 2 }}>
                                                <RateReview sx={{ fontSize: 28 }} />
                                            </Badge>
                                            <Typography variant="h5" color="warning.main">
                                                Pending Review ({pending.length})
                                            </Typography>
                                        </Box>
                                        {pending.length === 0 ? (
                                            <Box sx={{ textAlign: 'center', py: 6 }}>
                                                <Article sx={{ fontSize: 64, color: '#ccc' }} />
                                                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                                                    No articles pending review
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                    Articles submitted by writers will appear here for your review
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Box>
                                                {pending.map((article) => (
                                                    <ArticleCard
                                                        key={article.id}
                                                        article={article}
                                                        statusColor="warning.main"
                                                        onReview={handleReview}
                                                        onRequestRevision={openRevisionDialog}
                                                        onPublish={handlePublish}
                                                        canPublish={(article?.status_id === 2) || (article?.status?.name === 'submitted')}
                                                        canRequestRevision={(article?.status_id === 2) || (article?.status?.name === 'submitted')}
                                                        reviewLabel="Review Article"
                                                    />
                                                ))}
                                            </Box>
                                        )}
                                    </Paper>
                                </Grid>
                                
                                <Grid item xs={12} lg={4}>
                                    <Paper sx={{ p: 3, backgroundColor: '#fff', borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, pb: 2, borderBottom: '2px solid #e0e0e0' }}>
                                            <Badge badgeContent={needsRevision.length} color="error" sx={{ mr: 2 }}>
                                                <Refresh sx={{ fontSize: 28 }} />
                                            </Badge>
                                            <Typography variant="h5" color="error.main">
                                                Needs Revision ({needsRevision.length})
                                            </Typography>
                                        </Box>
                                        {needsRevision.length === 0 ? (
                                            <Box sx={{ textAlign: 'center', py: 6 }}>
                                                <Schedule sx={{ fontSize: 64, color: '#ccc' }} />
                                                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                                                    No articles need revision
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                    Articles requiring changes will appear here
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Box>
                                                {needsRevision.map((article) => (
                                                    <ArticleCard
                                                        key={article.id}
                                                        article={article}
                                                        statusColor="error.main"
                                                        onReview={handleReview}
                                                        onRequestRevision={openRevisionDialog}
                                                        onPublish={handlePublish}
                                                        canPublish={false}
                                                        canRequestRevision={false}
                                                        reviewLabel="Review"
                                                    />
                                                ))}
                                            </Box>
                                        )}
                                    </Paper>
                                </Grid>
                                
                                <Grid item xs={12} lg={4}>
                                    <Paper sx={{ p: 3, backgroundColor: '#fff', borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, pb: 2, borderBottom: '2px solid #e0e0e0' }}>
                                            <Badge badgeContent={published.length} color="success" sx={{ mr: 2 }}>
                                                <Publish sx={{ fontSize: 28 }} />
                                            </Badge>
                                            <Typography variant="h5" color="success.main">
                                                Published by You ({published.length})
                                            </Typography>
                                        </Box>
                                        {published.length === 0 ? (
                                            <Box sx={{ textAlign: 'center', py: 6 }}>
                                                <Visibility sx={{ fontSize: 64, color: '#ccc' }} />
                                                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                                                    No published articles yet
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                    Articles you publish will appear here
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Box>
                                                {published.map((article) => (
                                                    <ArticleCard
                                                        key={article.id}
                                                        article={article}
                                                        statusColor="success.main"
                                                        onReview={handleReview}
                                                        onRequestRevision={openRevisionDialog}
                                                        onPublish={handlePublish}
                                                        canPublish={false}
                                                        canRequestRevision={false}
                                                        reviewLabel="View"
                                                    />
                                                ))}
                                            </Box>
                                        )}
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </Fade>
                </Box>
            </Box>

            <Dialog open={revisionDialog} onClose={() => setRevisionDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ backgroundColor: '#1565c0', color: '#fff' }}>
                    Request Revision
                </DialogTitle>
                <DialogContent sx={{ p: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Article: {selectedArticle?.title}
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Revision Comments"
                        value={revisionComments}
                        onChange={(e) => setRevisionComments(e.target.value)}
                        placeholder="Please specify what revisions are needed..."
                        required
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#fafafa', px: 3, py: 2 }}>
                    <Button onClick={() => setRevisionDialog(false)}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleRequestRevision} 
                        variant="contained" 
                        color="error"
                        disabled={!revisionComments.trim()}
                        startIcon={<Refresh />}
                    >
                        Send Revision Request
                    </Button>
                </DialogActions>
            </Dialog>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1.5,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'secondary.main',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <MenuItem onClick={() => { handleMenuClose(); router.get('/profile'); }}>
                    <Avatar />
                    Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { switchRole('writer'); }}>
                    <ListItemIcon>
                        <ArrowBack />
                    </ListItemIcon>
                    Switch to Writer
                </MenuItem>
                <MenuItem onClick={() => { switchRole('student'); }}>
                    <ListItemIcon>
                        <Person />
                    </ListItemIcon>
                    Switch to Student
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default EditorDashboard;
