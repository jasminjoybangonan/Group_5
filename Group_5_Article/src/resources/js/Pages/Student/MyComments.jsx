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
    CardActions,
    Alert,
    Fade,
    Avatar,
    IconButton,
    AppBar,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Menu as MuiMenu,
    MenuItem as MuiMenuItem
} from '@mui/material';
import {
    ArrowBack,
    Article,
    Comment,
    Menu,
    Dashboard,
    Visibility,
    Person,
    Logout
} from '@mui/icons-material';

const drawerWidth = 240;

const MyComments = ({ myComments }) => {
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

    const handleBackToDashboard = () => {
        router.visit('/student/dashboard');
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
                <ListItem button onClick={() => router.visit('/student/dashboard')}>
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button onClick={() => router.visit('/student/published-articles')}>
                    <ListItemIcon>
                        <Article />
                    </ListItemIcon>
                    <ListItemText primary="Published Articles" />
                </ListItem>
                <ListItem button onClick={() => router.visit('/student/my-comments')}>
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
            <Head title="My Comments" />
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
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            My Comments
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
                        open={false}
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
                                <Button
                                    startIcon={<ArrowBack />}
                                    onClick={handleBackToDashboard}
                                    sx={{ mb: 3 }}
                                >
                                    Back to Dashboard
                                </Button>

                                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                    My Comments ({myComments?.length || 0})
                                </Typography>

                                {!myComments || myComments.length === 0 ? (
                                    <Alert severity="info" sx={{ mt: 2 }}>
                                        <Typography color="text.secondary">
                                            You haven't commented on any articles yet. Start engaging with published articles!
                                        </Typography>
                                    </Alert>
                                ) : (
                                    myComments.map((comment) => (
                                        <Card key={comment.id} sx={{ mb: 3 }}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                                    <Avatar sx={{ mr: 2, bgcolor: 'secondary.main' }}>
                                                        {comment.article?.title?.charAt(0) || 'A'}
                                                    </Avatar>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography variant="subtitle1" fontWeight="bold" color="primary">
                                                            On: {comment.article?.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            By {comment.article?.writer?.name}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                
                                                <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                                                    {comment.content}
                                                </Typography>
                                                
                                                <Typography variant="caption" color="text.secondary">
                                                    Posted on {new Date(comment.created_at).toLocaleDateString()} at {new Date(comment.created_at).toLocaleTimeString()}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button
                                                    size="small"
                                                    onClick={() => handleViewArticle(comment.article)}
                                                    startIcon={<Visibility />}
                                                    variant="outlined"
                                                >
                                                    View Article
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    ))
                                )}
                            </Box>
                        </Fade>
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default MyComments;
