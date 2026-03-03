import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Grid,
    Button,
    Card,
    CardContent,
    CardActions,
    Chip,
    Alert,
    Fade,
    Slide,
    AppBar,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Menu as MuiMenu,
    MenuItem as MuiMenuItem
} from '@mui/material';
import {
    Article,
    Send,
    Edit,
    Visibility,
    Menu,
    Dashboard,
    RateReview,
    Publish,
    Refresh,
    Logout,
    Person
} from '@mui/icons-material';

const drawerWidth = 240;

const EditorDashboard = ({ pending, needsRevision, published }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [revisionDialog, setRevisionDialog] = useState(false);
    const [revisionComments, setRevisionComments] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleRequestRevision = () => {
        if (selectedArticle) {
            router.post(`/editor/articles/${selectedArticle.id}/revision`, {
                comments: revisionComments
            }, {
                onSuccess: () => {
                    setRevisionDialog(false);
                    setRevisionComments('');
                    setSelectedArticle(null);
                }
            });
        }
    };

    const handlePublish = (article) => {
        router.post(`/editor/articles/${article.id}/publish`, {}, {
            onSuccess: () => window.location.reload()
        });
    };

    const handleReview = (article) => {
        router.get(`/editor/articles/${article.id}/review`);
    };

    const openRevisionDialog = (article) => {
        setSelectedArticle(article);
        setRevisionDialog(true);
    };

    const getStatusColor = (status) => {
        switch (status?.name) {
            case 'draft': return 'default';
            case 'submitted': return 'warning';
            case 'needs_revision': return 'error';
            case 'published': return 'success';
            default: return 'default';
        }
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    const switchRole = (role) => {
        router.post(`/switch-role/${role}`);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Editor Panel
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <RateReview />
                    </ListItemIcon>
                    <ListItemText primary="Pending Articles" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Refresh />
                    </ListItemIcon>
                    <ListItemText primary="Needs Revision" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Publish />
                    </ListItemIcon>
                    <ListItemText primary="Published" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <>
            <Head title="Editor Dashboard" />
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
                            onClick={() => setDrawerOpen(!drawerOpen)}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            Editor Dashboard
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
                            <MuiMenuItem onClick={() => { handleMenuClose(); switchRole('writer'); }}>
                                Switch to Writer
                            </MuiMenuItem>
                            <MuiMenuItem onClick={() => { handleMenuClose(); switchRole('student'); }}>
                                Switch to Student
                            </MuiMenuItem>
                            <Divider />
                            <MuiMenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>
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
                                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                    Editor Dashboard
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Card sx={{ mb: 3, backgroundColor: '#fff3e0' }}>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom color="warning.main">
                                                    Pending Review ({pending.length})
                                                </Typography>
                                                {pending.length === 0 ? (
                                                    <Typography color="text.secondary">No articles pending review</Typography>
                                                ) : (
                                                    pending.map((article) => (
                                                        <Card key={article.id} sx={{ mb: 2 }}>
                                                            <CardContent>
                                                                <Typography variant="subtitle1" fontWeight="bold">
                                                                    {article.title}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    By: {article.writer?.name}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    Category: {article.category?.name}
                                                                </Typography>
                                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                                    {article.content?.substring(0, 150)}...
                                                                </Typography>
                                                                <Chip
                                                                    label={article.status?.label}
                                                                    color="warning"
                                                                    size="small"
                                                                    sx={{ mt: 1 }}
                                                                />
                                                            </CardContent>
                                                            <CardActions>
                                                                <Button
                                                                    size="small"
                                                                    startIcon={<RateReview />}
                                                                    onClick={() => handleReview(article)}
                                                                    variant="contained"
                                                                >
                                                                    Review
                                                                </Button>
                                                                <Button
                                                                    size="small"
                                                                    startIcon={<Refresh />}
                                                                    onClick={() => openRevisionDialog(article)}
                                                                    color="error"
                                                                >
                                                                    Request Revision
                                                                </Button>
                                                                <Button
                                                                    size="small"
                                                                    startIcon={<Publish />}
                                                                    onClick={() => handlePublish(article)}
                                                                    color="success"
                                                                >
                                                                    Publish
                                                                </Button>
                                                            </CardActions>
                                                        </Card>
                                                    ))
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Card sx={{ mb: 3 }}>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom color="error.main">
                                                    Needs Revision ({needsRevision.length})
                                                </Typography>
                                                {needsRevision.length === 0 ? (
                                                    <Typography color="text.secondary">No articles need revision</Typography>
                                                ) : (
                                                    needsRevision.map((article) => (
                                                        <Card key={article.id} sx={{ mb: 2 }}>
                                                            <CardContent>
                                                                <Typography variant="subtitle1" fontWeight="bold">
                                                                    {article.title}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    By: {article.writer?.name}
                                                                </Typography>
                                                                {article.revisions?.length > 0 && (
                                                                    <Box sx={{ mt: 1 }}>
                                                                        <Typography variant="body2" color="error">
                                                                            Previous feedback:
                                                                        </Typography>
                                                                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                                                            {article.revisions[0].comments}
                                                                        </Typography>
                                                                    </Box>
                                                                )}
                                                                <Chip
                                                                    label={article.status?.label}
                                                                    color="error"
                                                                    size="small"
                                                                    sx={{ mt: 1 }}
                                                                />
                                                            </CardContent>
                                                            <CardActions>
                                                                <Button
                                                                    size="small"
                                                                    startIcon={<RateReview />}
                                                                    onClick={() => handleReview(article)}
                                                                >
                                                                    Review
                                                                </Button>
                                                            </CardActions>
                                                        </Card>
                                                    ))
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Card sx={{ mb: 3 }}>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom color="success.main">
                                                    Published by You ({published.length})
                                                </Typography>
                                                {published.length === 0 ? (
                                                    <Typography color="text.secondary">No articles published yet</Typography>
                                                ) : (
                                                    published.map((article) => (
                                                        <Card key={article.id} sx={{ mb: 2 }}>
                                                            <CardContent>
                                                                <Typography variant="subtitle1" fontWeight="bold">
                                                                    {article.title}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    By: {article.writer?.name}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    Category: {article.category?.name}
                                                                </Typography>
                                                                <Chip
                                                                    label={article.status?.label}
                                                                    color="success"
                                                                    size="small"
                                                                    sx={{ mt: 1 }}
                                                                />
                                                            </CardContent>
                                                            <CardActions>
                                                                <Button
                                                                    size="small"
                                                                    startIcon={<Visibility />}
                                                                    onClick={() => window.open(`/student/articles/${article.id}`, '_blank')}
                                                                >
                                                                    View
                                                                </Button>
                                                            </CardActions>
                                                        </Card>
                                                    ))
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Fade>
                    </Container>
                </Box>
            </Box>

            <Dialog open={revisionDialog} onClose={() => setRevisionDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>Request Revision</DialogTitle>
                <DialogContent>
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
                        placeholder="Please specify the revisions needed..."
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRevisionDialog(false)}>Cancel</Button>
                    <Button onClick={handleRequestRevision} variant="contained" color="error">
                        Send Revision Request
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditorDashboard;
