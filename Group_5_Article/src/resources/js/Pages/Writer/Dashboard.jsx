import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
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
    Menu as MuiMenu,
    MenuItem as MuiMenuItem
} from '@mui/material';
import {
    Create,
    Article,
    Send,
    Edit,
    Visibility,
    Menu,
    Dashboard,
    Logout,
    Person
} from '@mui/icons-material';
import JoditEditorComponent from '@/Components/JoditEditor';

const drawerWidth = 240;

const WriterDashboard = ({ drafts, submitted, needsRevision, published, categories }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category_id: ''
    });
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/writer/articles', formData, {
            onSuccess: () => {
                setFormData({ title: '', content: '', category_id: '' });
                setShowCreateForm(false);
            }
        });
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleContentChange = (newContent) => {
        setFormData(prev => ({ ...prev, content: newContent }));
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

    const handleSubmitArticle = (articleId) => {
        router.post(`/writer/articles/${articleId}/submit`, {}, {
            onSuccess: () => window.location.reload()
        });
    };

    const handleEditArticle = (articleId) => {
        router.put(`/writer/articles/${articleId}`, formData, {
            onSuccess: () => window.location.reload()
        });
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

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Writer Panel
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                <ListItem button onClick={() => setShowCreateForm(!showCreateForm)}>
                    <ListItemIcon>
                        <Create />
                    </ListItemIcon>
                    <ListItemText primary="Create Article" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Article />
                    </ListItemIcon>
                    <ListItemText primary="My Drafts" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Send />
                    </ListItemIcon>
                    <ListItemText primary="Submitted Articles" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <>
            <Head title="Writer Dashboard" />
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
                            Writer Dashboard
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
                            <MuiMenuItem onClick={() => { handleMenuClose(); switchRole('editor'); }}>
                                Switch to Editor
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
                                    Welcome to Your Writer Dashboard
                                </Typography>

                                {showCreateForm && (
                                    <Slide direction="down" in={showCreateForm}>
                                        <Paper sx={{ p: 3, mb: 3 }}>
                                            <Typography variant="h6" gutterBottom>
                                                Create New Article
                                            </Typography>
                                            <form onSubmit={handleSubmit}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} md={6}>
                                                        <TextField
                                                            fullWidth
                                                            label="Article Title"
                                                            value={formData.title}
                                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth required>
                                                            <InputLabel>Category</InputLabel>
                                                            <Select
                                                                value={formData.category_id}
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
                                                        <Typography variant="subtitle1" gutterBottom>
                                                            Content
                                                        </Typography>
                                                        <JoditEditorComponent
                                                            value={formData.content}
                                                            onChange={handleContentChange}
                                                            placeholder="Write your article content here..."
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            startIcon={<Create />}
                                                            sx={{ mr: 2 }}
                                                        >
                                                            Create Article
                                                        </Button>
                                                        <Button
                                                            onClick={() => setShowCreateForm(false)}
                                                            variant="outlined"
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </form>
                                        </Paper>
                                    </Slide>
                                )}

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Card sx={{ mb: 3 }}>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom color="primary">
                                                    My Drafts ({drafts.length})
                                                </Typography>
                                                {drafts.length === 0 ? (
                                                    <Typography color="text.secondary">No drafts yet</Typography>
                                                ) : (
                                                    drafts.map((article) => (
                                                        <Card key={article.id} sx={{ mb: 2 }}>
                                                            <CardContent>
                                                                <Typography variant="subtitle1" fontWeight="bold">
                                                                    {article.title}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {article.category?.name}
                                                                </Typography>
                                                            </CardContent>
                                                            <CardActions>
                                                                <Button
                                                                    size="small"
                                                                    startIcon={<Send />}
                                                                    onClick={() => handleSubmitArticle(article.id)}
                                                                >
                                                                    Submit
                                                                </Button>
                                                                <Button size="small" startIcon={<Edit />}>
                                                                    Edit
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
                                                <Typography variant="h6" gutterBottom color="warning.main">
                                                    Submitted Articles ({submitted.length})
                                                </Typography>
                                                {submitted.length === 0 ? (
                                                    <Typography color="text.secondary">No submitted articles</Typography>
                                                ) : (
                                                    submitted.map((article) => (
                                                        <Card key={article.id} sx={{ mb: 2 }}>
                                                            <CardContent>
                                                                <Typography variant="subtitle1" fontWeight="bold">
                                                                    {article.title}
                                                                </Typography>
                                                                <Chip
                                                                    label={article.status?.label}
                                                                    color={getStatusColor(article.status)}
                                                                    size="small"
                                                                    sx={{ mt: 1 }}
                                                                />
                                                            </CardContent>
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
                                                                {article.revisions?.length > 0 && (
                                                                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                                                        Latest feedback: {article.revisions[0].comments}
                                                                    </Typography>
                                                                )}
                                                            </CardContent>
                                                            <CardActions>
                                                                <Button size="small" startIcon={<Edit />}>
                                                                    Revise
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
                                                    Published Articles ({published.length})
                                                </Typography>
                                                {published.length === 0 ? (
                                                    <Typography color="text.secondary">No published articles yet</Typography>
                                                ) : (
                                                    published.map((article) => (
                                                        <Card key={article.id} sx={{ mb: 2 }}>
                                                            <CardContent>
                                                                <Typography variant="subtitle1" fontWeight="bold">
                                                                    {article.title}
                                                                </Typography>
                                                                <Chip
                                                                    label={article.status?.label}
                                                                    color="success"
                                                                    size="small"
                                                                    sx={{ mt: 1 }}
                                                                />
                                                            </CardContent>
                                                            <CardActions>
                                                                <Button size="small" startIcon={<Visibility />}>
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
        </>
    );
};

export default WriterDashboard;
