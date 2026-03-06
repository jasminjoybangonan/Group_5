import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import {
    Typography,
    Box,
    Button,
    Card,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    Chip,
    Grid,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemIcon as MuiListItemIcon,
    Badge,
    FormControl,
    InputLabel,
    Select,
    MenuItem as SelectMenuItem
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
    RateReview,
    Publish,
    Visibility,
    Person,
    Logout,
    ArrowBack,
    Assignment,
    Edit,
    Menu as MenuIcon,
    TrendingUp,
    Create,
    Send,
    Delete,
    Article,
    Comment
} from '@mui/icons-material';
import JoditEditorComponent from '@/Components/JoditEditor';

const WriterDashboard = ({ drafts, submitted, needsRevision, published, categories }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [profileDialog, setProfileDialog] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('dashboard');
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category_id: ''
    });

    const { flash, auth } = usePage().props;

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

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileOpen = () => {
        setProfileDialog(true);
        handleMenuClose();
    };

    const handleProfileClose = () => {
        setProfileDialog(false);
    };

    const handleLogout = () => {
        router.post('/logout', {}, {
            onFinish: () => {
                handleMenuClose();
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/writer/articles', formData, {
            preserveScroll: true,
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

    const handleSubmitArticle = (articleId) => {
        router.post(`/writer/articles/${articleId}/submit`, {}, {
            preserveScroll: true
        });
    };

    const handleOpenArticle = (articleId) => {
        router.get(`/writer/articles/${articleId}/edit`);
    };

    const handleViewPublished = (articleId) => {
        router.get(`/writer/articles/${articleId}/view`);
    };

    const handleDeleteArticle = (article) => {
        if (!window.confirm(`Delete "${article.title}"? This cannot be undone.`)) return;
        router.delete(`/writer/articles/${article.id}`, {
            preserveScroll: true
        });
    };

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
        setShowCreateForm(false);
    };

    const getFilteredArticles = () => {
        switch(selectedFilter) {
            case 'dashboard':
                return []; // Dashboard overview doesn't show articles
            case 'drafts':
                return drafts || [];
            case 'submitted':
                return submitted || [];
            case 'revision':
                return needsRevision || [];
            case 'published':
                return published || [];
            default:
                return drafts || [];
        }
    };

    const getFilterTitle = () => {
        switch(selectedFilter) {
            case 'dashboard':
                return 'Dashboard Overview';
            case 'drafts':
                return 'My Drafts';
            case 'submitted':
                return 'Submitted Articles';
            case 'revision':
                return 'Needs Revision';
            case 'published':
                return 'Published Articles';
            default:
                return 'Dashboard Overview';
        }
    };

    const getFilterColor = () => {
        switch(selectedFilter) {
            case 'dashboard':
                return '#60a5fa';
            case 'drafts':
                return '#94a3b8';
            case 'submitted':
                return '#f59e0b';
            case 'revision':
                return '#ef4444';
            case 'published':
                return '#10b981';
            default:
                return '#60a5fa';
        }
    };

    const getFilterIcon = () => {
        switch(selectedFilter) {
            case 'dashboard':
                return <TrendingUp />;
            case 'drafts':
                return <Edit />;
            case 'submitted':
                return <Send />;
            case 'revision':
                return <RateReview />;
            case 'published':
                return <Publish />;
            default:
                return <TrendingUp />;
        }
    };

    const getStatusColor = (status) => {
        switch (status?.name) {
            case 'draft': return '#94a3b8';
            case 'submitted': return '#f59e0b';
            case 'needs_revision': return '#ef4444';
            case 'published': return '#10b981';
            default: return '#94a3b8';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.name) {
            case 'draft': return <Edit />;
            case 'submitted': return <Send />;
            case 'needs_revision': return <RateReview />;
            case 'published': return <Publish />;
            default: return <Edit />;
        }
    };

    const ArticleCard = ({ article, statusColor, onSubmit, onEdit, onView, onDelete, canSubmit = true, canEdit = true, canDelete = true }) => (
        <Card sx={{ mb: 3, backgroundColor: '#1e293b', border: '1px solid #334155' }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: statusColor, mr: 2 }}>
                        {getStatusIcon(article.status)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>
                            {article.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                            <Chip 
                                label={article.status?.label || 'Unknown'}
                                size="small"
                                sx={{ bgcolor: statusColor, color: '#fff' }}
                            />
                            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                Category: {article.category?.name}
                            </Typography>
                        </Box>
                        {article.revisions?.length > 0 && (
                            <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1 }}>
                                Latest feedback: "{article.revisions[0].comments}"
                            </Typography>
                        )}
                    </Box>
                </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
                {canSubmit && (
                    <Button 
                        size="small" 
                        onClick={() => onSubmit(article.id)}
                        sx={{ color: '#f59e0b' }}
                    >
                        Submit
                    </Button>
                )}
                {canEdit && (
                    <Button 
                        size="small" 
                        onClick={() => onEdit(article.id)}
                        sx={{ color: '#60a5fa' }}
                    >
                        Edit
                    </Button>
                )}
                {onView && (
                    <Button 
                        size="small" 
                        onClick={() => onView(article.id)}
                        sx={{ color: '#10b981' }}
                    >
                        View
                    </Button>
                )}
                {canDelete && (
                    <Button 
                        size="small" 
                        onClick={() => onDelete(article)}
                        sx={{ color: '#ef4444' }}
                    >
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );

    return (
        <ThemeProvider theme={theme}>
            <Head title="Writer Dashboard" />
            
            <Box sx={{ 
                minHeight: "100vh", 
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton component="a" href="/" sx={{ color: '#ffffff' }}>
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                            Writer Dashboard
                        </Typography>
                    </Box>
                    
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
                    <MenuItem onClick={handleProfileOpen}>
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
                    <MenuItem onClick={() => { router.get('/editor/dashboard'); handleMenuClose(); }}>
                        <ListItemIcon>
                            <RateReview sx={{ color: '#ef4444' }} />
                        </ListItemIcon>
                        Switch to Editor
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
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                    {/* Left Sidebar - Filter Buttons */}
                    <Box sx={{ 
                        width: 280,
                        p: 2,
                        backgroundColor: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: 2,
                        mr: 2
                    }}>
                        <Typography variant="h6" sx={{ color: '#ffffff', mb: 3, fontWeight: 'bold' }}>
                            Dashboard
                        </Typography>
                        
                        <List sx={{ p: 0 }}>
                            <ListItem 
                                button 
                                onClick={() => handleFilterClick('dashboard')}
                                sx={{ 
                                    mb: 1,
                                    backgroundColor: selectedFilter === 'dashboard' ? '#60a5fa' : '#0f172a',
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: '#334155' }
                                }}
                            >
                                <ListItemIcon>
                                    <TrendingUp sx={{ color: selectedFilter === 'dashboard' ? '#fff' : '#60a5fa' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Dashboard" 
                                    primaryTypographyProps={{ color: selectedFilter === 'dashboard' ? '#fff' : '#60a5fa', fontWeight: 'bold' }}
                                />
                            </ListItem>

                            <ListItem 
                                button 
                                onClick={() => setShowCreateForm(!showCreateForm)}
                                sx={{ 
                                    mb: 1,
                                    backgroundColor: showCreateForm ? '#60a5fa' : '#0f172a',
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: '#334155' }
                                }}
                            >
                                <ListItemIcon>
                                    <Create sx={{ color: showCreateForm ? '#fff' : '#60a5fa' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Create Article" 
                                    primaryTypographyProps={{ color: showCreateForm ? '#fff' : '#60a5fa', fontWeight: 'bold' }}
                                />
                            </ListItem>

                            <ListItem 
                                button 
                                onClick={() => handleFilterClick('drafts')}
                                sx={{ 
                                    mb: 1,
                                    backgroundColor: selectedFilter === 'drafts' ? '#94a3b8' : '#0f172a',
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: '#334155' }
                                }}
                            >
                                <ListItemIcon>
                                    <Edit sx={{ color: selectedFilter === 'drafts' ? '#fff' : '#94a3b8' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="My Drafts" 
                                    primaryTypographyProps={{ color: selectedFilter === 'drafts' ? '#fff' : '#94a3b8', fontWeight: 'bold' }}
                                />
                            </ListItem>

                            <ListItem 
                                button 
                                onClick={() => handleFilterClick('submitted')}
                                sx={{ 
                                    mb: 1,
                                    backgroundColor: selectedFilter === 'submitted' ? '#f59e0b' : '#0f172a',
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: '#334155' }
                                }}
                            >
                                <ListItemIcon>
                                    <Send sx={{ color: selectedFilter === 'submitted' ? '#fff' : '#f59e0b' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Submitted" 
                                    primaryTypographyProps={{ color: selectedFilter === 'submitted' ? '#fff' : '#f59e0b', fontWeight: 'bold' }}
                                />
                            </ListItem>

                            <ListItem 
                                button 
                                onClick={() => handleFilterClick('revision')}
                                sx={{ 
                                    mb: 1,
                                    backgroundColor: selectedFilter === 'revision' ? '#ef4444' : '#0f172a',
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: '#334155' }
                                }}
                            >
                                <ListItemIcon>
                                    <RateReview sx={{ color: selectedFilter === 'revision' ? '#fff' : '#ef4444' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Needs Revision" 
                                    primaryTypographyProps={{ color: selectedFilter === 'revision' ? '#fff' : '#ef4444', fontWeight: 'bold' }}
                                />
                            </ListItem>

                            <ListItem 
                                button 
                                onClick={() => handleFilterClick('published')}
                                sx={{ 
                                    mb: 1,
                                    backgroundColor: selectedFilter === 'published' ? '#10b981' : '#0f172a',
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: '#334155' }
                                }}
                            >
                                <ListItemIcon>
                                    <Publish sx={{ color: selectedFilter === 'published' ? '#fff' : '#10b981' }} />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Published" 
                                    primaryTypographyProps={{ color: selectedFilter === 'published' ? '#fff' : '#10b981', fontWeight: 'bold' }}
                                />
                            </ListItem>
                        </List>
                    </Box>

                    {/* Main Content Area */}
                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Top Center - Numbers Display */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            mb: 3,
                            gap: 3
                        }}>
                            <Paper sx={{ 
                                p: 2, 
                                backgroundColor: '#1e293b', 
                                border: '1px solid #334155',
                                textAlign: 'center',
                                minWidth: 120
                            }}>
                                <Typography variant="h3" sx={{ color: '#94a3b8', fontWeight: 'bold' }}>
                                    {drafts?.length || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                    Drafts
                                </Typography>
                            </Paper>
                            <Paper sx={{ 
                                p: 2, 
                                backgroundColor: '#1e293b', 
                                border: '1px solid #334155',
                                textAlign: 'center',
                                minWidth: 120
                            }}>
                                <Typography variant="h3" sx={{ color: '#f59e0b', fontWeight: 'bold' }}>
                                    {submitted?.length || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                    Submitted
                                </Typography>
                            </Paper>
                            <Paper sx={{ 
                                p: 2, 
                                backgroundColor: '#1e293b', 
                                border: '1px solid #334155',
                                textAlign: 'center',
                                minWidth: 120
                            }}>
                                <Typography variant="h3" sx={{ color: '#ef4444', fontWeight: 'bold' }}>
                                    {needsRevision?.length || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                    Revision
                                </Typography>
                            </Paper>
                            <Paper sx={{ 
                                p: 2, 
                                backgroundColor: '#1e293b', 
                                border: '1px solid #334155',
                                textAlign: 'center',
                                minWidth: 120
                            }}>
                                <Typography variant="h3" sx={{ color: '#10b981', fontWeight: 'bold' }}>
                                    {published?.length || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                    Published
                                </Typography>
                            </Paper>
                        </Box>

                        
                        {/* Flash Messages */}
                        {flash?.success && (
                            <Box sx={{ mb: 3 }}>
                                <Paper sx={{ p: 2, backgroundColor: '#10b981', color: '#fff' }}>
                                    <Typography>{flash.success}</Typography>
                                </Paper>
                            </Box>
                        )}

                        {/* Create Article Form */}
                        {showCreateForm && (
                            <Paper sx={{ p: 4, backgroundColor: '#1e293b', border: '1px solid #334155', mb: 3 }}>
                                <Typography variant="h5" sx={{ color: '#60a5fa', mb: 3, fontWeight: 'bold' }}>
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
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormControl fullWidth required>
                                                <InputLabel sx={{ color: '#94a3b8' }}>Category</InputLabel>
                                                <Select
                                                    value={formData.category_id}
                                                    onChange={(e) => handleInputChange('category_id', e.target.value)}
                                                    sx={{ 
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#334155',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#60a5fa',
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#60a5fa',
                                                        },
                                                        '& .MuiSvgIcon-root': {
                                                            color: '#94a3b8',
                                                        }
                                                    }}
                                                >
                                                    {categories.map((category) => (
                                                        <SelectMenuItem key={category.id} value={category.id}>
                                                            {category.name}
                                                        </SelectMenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1" sx={{ color: '#ffffff', mb: 2 }}>
                                                Content
                                            </Typography>
                                            <Box sx={{ 
                                                border: '1px solid #334155',
                                                borderRadius: 1,
                                                '& .jodit-container': {
                                                    backgroundColor: '#0f172a !important',
                                                }
                                            }}>
                                                <JoditEditorComponent
                                                    value={formData.content}
                                                    onChange={handleContentChange}
                                                    placeholder="Write your article content here..."
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                startIcon={<Create />}
                                                sx={{ 
                                                    mr: 2,
                                                    bgcolor: '#60a5fa',
                                                    '&:hover': { bgcolor: '#3b82f6' }
                                                }}
                                            >
                                                Create Article
                                            </Button>
                                            <Button
                                                onClick={() => setShowCreateForm(false)}
                                                variant="outlined"
                                                sx={{ 
                                                    color: '#94a3b8',
                                                    borderColor: '#334155',
                                                    '&:hover': { borderColor: '#60a5fa', color: '#60a5fa' }
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        )}

                        {/* Right Side - Articles Display */}
                        <Box sx={{ flexGrow: 1 }}>
                            {selectedFilter === 'dashboard' ? (
                                // Dashboard Overview
                                <Box>
                                    <Typography variant="h5" sx={{ color: '#60a5fa', mb: 3, fontWeight: 'bold' }}>
                                        Writer Dashboard Overview
                                    </Typography>
                                    
                                    {/* Statistics Cards */}
                                    <Grid container spacing={3} sx={{ mb: 4 }}>
                                        <Grid item xs={12} md={3}>
                                            <Paper sx={{ 
                                                p: 3, 
                                                backgroundColor: '#1e293b', 
                                                border: '1px solid #334155',
                                                textAlign: 'center'
                                            }}>
                                                <Typography variant="h3" sx={{ color: '#94a3b8', fontWeight: 'bold' }}>
                                                    {drafts?.length || 0}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                    Drafts
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Paper sx={{ 
                                                p: 3, 
                                                backgroundColor: '#1e293b', 
                                                border: '1px solid #334155',
                                                textAlign: 'center'
                                            }}>
                                                <Typography variant="h3" sx={{ color: '#f59e0b', fontWeight: 'bold' }}>
                                                    {submitted?.length || 0}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                    Submitted
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Paper sx={{ 
                                                p: 3, 
                                                backgroundColor: '#1e293b', 
                                                border: '1px solid #334155',
                                                textAlign: 'center'
                                            }}>
                                                <Typography variant="h3" sx={{ color: '#ef4444', fontWeight: 'bold' }}>
                                                    {needsRevision?.length || 0}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                    Needs Revision
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Paper sx={{ 
                                                p: 3, 
                                                backgroundColor: '#1e293b', 
                                                border: '1px solid #334155',
                                                textAlign: 'center'
                                            }}>
                                                <Typography variant="h3" sx={{ color: '#10b981', fontWeight: 'bold' }}>
                                                    {published?.length || 0}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                                    Published
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    </Grid>

                                    {/* Quick Access Cards */}
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Paper sx={{ 
                                                p: 4, 
                                                backgroundColor: '#1e293b', 
                                                border: '1px solid #334155',
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                                '&:hover': { border: '2px solid #60a5fa' }
                                            }}
                                                onClick={() => handleFilterClick('drafts')}
                                            >
                                                <Edit sx={{ fontSize: 48, color: '#94a3b8', mb: 2 }} />
                                                <Typography variant="h5" sx={{ color: '#94a3b8', fontWeight: 'bold', mb: 1 }}>
                                                    My Drafts
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                                    Manage your draft articles
                                                </Typography>
                                                <Button
                                                    variant="outlined"
                                                    sx={{ 
                                                        color: '#94a3b8',
                                                        borderColor: '#94a3b8',
                                                        '&:hover': { borderColor: '#60a5fa', color: '#60a5fa' }
                                                    }}
                                                >
                                                    View Drafts
                                                </Button>
                                            </Paper>
                                        </Grid>
                                        
                                        <Grid item xs={12} md={6}>
                                            <Paper sx={{ 
                                                p: 4, 
                                                backgroundColor: '#1e293b', 
                                                border: '1px solid #334155',
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                                '&:hover': { border: '2px solid #f59e0b' }
                                            }}
                                                onClick={() => handleFilterClick('submitted')}
                                            >
                                                <Send sx={{ fontSize: 48, color: '#f59e0b', mb: 2 }} />
                                                <Typography variant="h5" sx={{ color: '#f59e0b', fontWeight: 'bold', mb: 1 }}>
                                                    Submitted Articles
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                                    Track submitted articles
                                                </Typography>
                                                <Button
                                                    variant="outlined"
                                                    sx={{ 
                                                        color: '#f59e0b',
                                                        borderColor: '#f59e0b',
                                                        '&:hover': { borderColor: '#d97706', color: '#d97706' }
                                                    }}
                                                >
                                                    View Submitted
                                                </Button>
                                            </Paper>
                                        </Grid>
                                        
                                        <Grid item xs={12} md={6}>
                                            <Paper sx={{ 
                                                p: 4, 
                                                backgroundColor: '#1e293b', 
                                                border: '1px solid #334155',
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                                '&:hover': { border: '2px solid #ef4444' }
                                            }}
                                                onClick={() => handleFilterClick('revision')}
                                            >
                                                <RateReview sx={{ fontSize: 48, color: '#ef4444', mb: 2 }} />
                                                <Typography variant="h5" sx={{ color: '#ef4444', fontWeight: 'bold', mb: 1 }}>
                                                    Needs Revision
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                                    Articles requiring revisions
                                                </Typography>
                                                <Button
                                                    variant="outlined"
                                                    sx={{ 
                                                        color: '#ef4444',
                                                        borderColor: '#ef4444',
                                                        '&:hover': { borderColor: '#dc2626', color: '#dc2626' }
                                                    }}
                                                >
                                                    View Revisions
                                                </Button>
                                            </Paper>
                                        </Grid>
                                        
                                        <Grid item xs={12} md={6}>
                                            <Paper sx={{ 
                                                p: 4, 
                                                backgroundColor: '#1e293b', 
                                                border: '1px solid #334155',
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                                '&:hover': { border: '2px solid #10b981' }
                                            }}
                                                onClick={() => handleFilterClick('published')}
                                            >
                                                <Publish sx={{ fontSize: 48, color: '#10b981', mb: 2 }} />
                                                <Typography variant="h5" sx={{ color: '#10b981', fontWeight: 'bold', mb: 1 }}>
                                                    Published Articles
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                                                    View your published work
                                                </Typography>
                                                <Button
                                                    variant="outlined"
                                                    sx={{ 
                                                        color: '#10b981',
                                                        borderColor: '#10b981',
                                                        '&:hover': { borderColor: '#059669', color: '#059669' }
                                                    }}
                                                >
                                                    View Published
                                                </Button>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Box>
                            ) : (
                                // Create Article Form
                                showCreateForm ? (
                                    <Paper sx={{ p: 4, backgroundColor: '#1e293b', border: '1px solid #334155', mb: 3 }}>
                                        <Typography variant="h5" sx={{ color: '#60a5fa', mb: 3, fontWeight: 'bold' }}>
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
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel sx={{ color: '#94a3b8' }}>Category</InputLabel>
                                                        <Select
                                                            value={formData.category_id}
                                                            label="Category"
                                                            onChange={(e) => handleInputChange('category_id', e.target.value)}
                                                            sx={{ 
                                                                '& .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: '#334155',
                                                                },
                                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: '#60a5fa',
                                                                },
                                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: '#60a5fa',
                                                                },
                                                                '& .MuiInputLabel-root': {
                                                                    color: '#94a3b8',
                                                                },
                                                                '& .MuiInputLabel-focused': {
                                                                    color: '#60a5fa',
                                                                },
                                                                '& .MuiSvgIcon-root': {
                                                                    color: '#94a3b8',
                                                                }
                                                            }}
                                                        >
                                                            {categories.map((category) => (
                                                                <SelectMenuItem key={category.id} value={category.id}>
                                                                    {category.name}
                                                                </SelectMenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1" sx={{ color: '#ffffff', mb: 2 }}>
                                                        Content
                                                    </Typography>
                                                    <Box sx={{ 
                                                        border: '1px solid #334155',
                                                        borderRadius: 1,
                                                        '& .jodit-container': {
                                                            backgroundColor: '#0f172a !important',
                                                        }
                                                    }}>
                                                        <JoditEditorComponent
                                                            value={formData.content}
                                                            onChange={handleContentChange}
                                                            placeholder="Write your article content here..."
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        startIcon={<Create />}
                                                        sx={{ 
                                                            mr: 2,
                                                            bgcolor: '#60a5fa',
                                                            '&:hover': { bgcolor: '#3b82f6' }
                                                        }}
                                                    >
                                                        Create Article
                                                    </Button>
                                                    <Button
                                                        onClick={() => setShowCreateForm(false)}
                                                        variant="outlined"
                                                        sx={{ 
                                                            color: '#94a3b8',
                                                            borderColor: '#334155',
                                                            '&:hover': { borderColor: '#60a5fa', color: '#60a5fa' }
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Paper>
                                ) : (
                                    // Regular Article Lists
                                    <>
                                        <Typography variant="h5" sx={{ color: getFilterColor(), mb: 2, fontWeight: 'bold' }}>
                                            {getFilterTitle()} ({getFilteredArticles().length})
                                        </Typography>
                                        
                                        {getFilteredArticles().length === 0 ? (
                                            <Paper sx={{ p: 4, backgroundColor: '#1e293b', border: '1px solid #334155', textAlign: 'center' }}>
                                                <Typography sx={{ color: '#94a3b8' }}>
                                                    No {getFilterTitle().toLowerCase()}
                                                </Typography>
                                            </Paper>
                                        ) : (
                                            <Box>
                                                {getFilteredArticles().map((article, index) => (
                                                    <Box key={article.id} sx={{ mb: 2 }}>
                                                        <Typography variant="h6" sx={{ color: getFilterColor(), mb: 1 }}>
                                                            Article {index + 1}
                                                        </Typography>
                                                        <ArticleCard
                                                            article={article}
                                                            statusColor={getStatusColor(article.status)}
                                                            onSubmit={handleSubmitArticle}
                                                            onEdit={handleOpenArticle}
                                                            onDelete={handleDeleteArticle}
                                                            canSubmit={selectedFilter === 'drafts'}
                                                            canEdit={selectedFilter === 'drafts' || selectedFilter === 'revision'}
                                                            canDelete={selectedFilter !== 'published'}
                                                            onView={selectedFilter === 'published' ? handleViewPublished : undefined}
                                                        />
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
                                    </>
                                )
                            )}
                        </Box>

                {/* Profile Dialog */}
                <Dialog open={profileDialog} onClose={handleProfileClose} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ backgroundColor: '#1e293b', color: '#ffffff', borderBottom: '1px solid #334155' }}>
                        Writer Profile
                    </DialogTitle>
                    <DialogContent sx={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 2 }}>
                            <Avatar sx={{ width: 64, height: 64, bgcolor: '#f59e0b', mr: 3 }}>
                                {auth?.user?.name?.charAt(0) || 'W'}
                            </Avatar>
                            <Box>
                                <Typography variant="h6" sx={{ color: '#ffffff', mb: 0.5 }}>
                                    {auth?.user?.name || 'Unknown Writer'}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                    {auth?.user?.email || 'No email'}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1 }}>
                                    Role: Writer
                                </Typography>
                            </Box>
                        </Box>
                        
                        <Divider sx={{ backgroundColor: '#334155', mb: 3 }} />
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box>
                                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                                    Total Articles: {drafts?.length + submitted?.length + needsRevision?.length + published?.length || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                                    Published: {published?.length || 0}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                    Member since: {new Date(auth?.user?.created_at).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ backgroundColor: '#1e293b', p: 3 }}>
                        <Button onClick={handleProfileClose} sx={{ color: '#94a3b8' }}>
                            Close
                        </Button>
                        <Button 
                            onClick={() => router.get('/profile.edit')}
                            variant="contained"
                            sx={{ 
                                bgcolor: '#60a5fa', 
                                color: '#fff',
                                '&:hover': { bgcolor: '#3b82f6' }
                            }}
                        >
                            Edit Profile
                        </Button>
                    </DialogActions>
                </Dialog>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default WriterDashboard;
