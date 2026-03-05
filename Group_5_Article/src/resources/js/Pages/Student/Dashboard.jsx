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
    Alert,
    Fade,
    AppBar,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    IconButton,
    Avatar,
    Chip,
    Menu as MuiMenu,
    MenuItem as MuiMenuItem,
    Stack
} from '@mui/material';
import {
    Article,
    Comment,
    Menu,
    Dashboard,
    Visibility,
    Chat,
    Person,
    Logout
} from '@mui/icons-material';

const drawerWidth = 240;

const StudentDashboard = ({ publishedArticles, myComments, categories, selectedCategory }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleViewArticle = (article) => {
        router.visit(`/student/articles/${article.id}`);
    };

    const handleLogout = () => {
        router.post('/logout', {}, {
            onFinish: () => {
                handleMenuClose();
            }
        });
    };

    const switchRole = (role) => {
        router.post(`/switch-role/${role}`, {}, {
            onFinish: () => {
                handleMenuClose();
            }
        });
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
                    Student Panel
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
                        <Article />
                    </ListItemIcon>
                    <ListItemText primary="Published Articles" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Comment />
                    </ListItemIcon>
                    <ListItemText primary="My Comments" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <>
            <Head title="Student Dashboard" />
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
                            Student Dashboard
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
                            <MuiMenuItem onClick={() => { handleMenuClose(); router.get('/profile'); }}>
                                Profile
                            </MuiMenuItem>
                            <Divider />
                            <MuiMenuItem onClick={() => { switchRole('writer'); }}>
                                Switch to Writer
                            </MuiMenuItem>
                            <MuiMenuItem onClick={() => { switchRole('editor'); }}>
                                Switch to Editor
                            </MuiMenuItem>
                            <Divider />
                            <MuiMenuItem onClick={handleLogout}>
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
                                    Student Dashboard
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} lg={8}>
                                        <Box sx={{ mb: 6 }}>
                                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', mb: 3 }}>
                                                Published Articles
                                            </Typography>

                                            {!publishedArticles || publishedArticles.length === 0 ? (
                                                <Alert severity="info" sx={{ mb: 2 }}>
                                                    <Typography color="text.secondary">
                                                        No published articles available yet. Check back later for new content!
                                                    </Typography>
                                                </Alert>
                                            ) : (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                                                    {publishedArticles.map((article) => (
                                                        <Card key={article.id} sx={{ 
                                                            minWidth: 280, 
                                                            maxWidth: 320,
                                                            flex: '1 1 calc(33.333% - 16px)',
                                                            mb: 2,
                                                            transition: 'transform 0.2s',
                                                            '&:hover': { 
                                                                transform: 'translateY(-4px)',
                                                                boxShadow: 4
                                                            }
                                                        }}>
                                                            <CardContent sx={{ p: 2 }}>
                                                                <Typography variant="h6" gutterBottom sx={{ 
                                                                    fontWeight: 'bold', 
                                                                    fontSize: '1rem',
                                                                    lineHeight: 1.2,
                                                                    mb: 1,
                                                                    color: '#1976d2'
                                                                }}>
                                                                    {article.title}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary" sx={{ 
                                                                    fontSize: '0.875rem',
                                                                    lineHeight: 1.4,
                                                                    mb: 2,
                                                                    display: '-webkit-box',
                                                                    WebkitLineClamp: 3,
                                                                    WebkitBoxOrient: 'vertical',
                                                                    overflow: 'hidden'
                                                                }}>
                                                                    {article.content?.substring(0, 150)}...
                                                                </Typography>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                                                    <Chip
                                                                        label={article.category?.name}
                                                                        size="small"
                                                                        color="primary"
                                                                        variant="outlined"
                                                                    />
                                                                    <Chip
                                                                        label={`By ${article.writer?.name || 'Unknown'}`}
                                                                        size="small"
                                                                        color="secondary"
                                                                        variant="outlined"
                                                                    />
                                                                </Box>
                                                                <Button
                                                                    size="small"
                                                                    variant="contained"
                                                                    startIcon={<Visibility />}
                                                                    onClick={() => handleViewArticle(article)}
                                                                    sx={{ 
                                                                        borderRadius: 2,
                                                                        textTransform: 'none',
                                                                        fontWeight: 'medium'
                                                                    }}
                                                                >
                                                                    Read Article
                                                                </Button>
                                                            </CardContent>
                                                        </Card>
                                                    ))}
                                                </Box>
                                            )}
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} lg={4}>
                                        <Card sx={{ mb: 3 }}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                    <Typography variant="h6" color="secondary">
                                                        My Comments ({myComments?.length || 0})
                                                    </Typography>
                                                    <Button 
                                                        variant="outlined" 
                                                        size="small"
                                                        onClick={() => router.visit('/student/my-comments')}
                                                        startIcon={<Comment />}
                                                    >
                                                        View All
                                                    </Button>
                                                </Box>
                                                {myComments?.length === 0 ? (
                                                    <Typography color="text.secondary">You haven't commented yet</Typography>
                                                ) : (
                                                    <Stack spacing={2}>
                                                        {myComments.slice(0, 3).map((comment) => (
                                                            <Card key={comment.id} sx={{ p: 2, bgcolor: 'grey.50' }}>
                                                                <Typography variant="subtitle2" fontWeight="bold" color="primary">
                                                                    On: {comment.article?.title}
                                                                </Typography>
                                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                                    {comment.content?.substring(0, 100)}...
                                                                </Typography>
                                                                <Typography variant="caption" color="text.secondary">
                                                                    {new Date(comment.created_at).toLocaleDateString()}
                                                                </Typography>
                                                            </Card>
                                                        ))}
                                                        {myComments.length > 3 && (
                                                            <Button 
                                                                variant="text" 
                                                                size="small"
                                                                onClick={() => router.visit('/student/my-comments')}
                                                                sx={{ alignSelf: 'center' }}
                                                            >
                                                                View {myComments.length - 3} more comments
                                                            </Button>
                                                        )}
                                                    </Stack>
                                                )}
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom color="info.main">
                                                    Engagement Stats
                                                </Typography>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <Typography variant="h3" color="primary" fontWeight="bold">
                                                        {myComments?.length || 0}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Comments Posted
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ textAlign: 'center', mt: 2 }}>
                                                    <Typography variant="h3" color="success" fontWeight="bold">
                                                        {publishedArticles?.length || 0}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Articles Available
                                                    </Typography>
                                                </Box>
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

export default StudentDashboard;
