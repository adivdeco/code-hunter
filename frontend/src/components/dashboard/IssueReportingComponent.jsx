import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
    useTheme,
    Fade,
    Zoom,
    Slide,
    Paper,
    Avatar,
    Tooltip,
    CircularProgress
} from '@mui/material';
import {
    AttachFile,
    BugReport,
    Feedback,
    PriorityHigh,
    Send,
    Close,
    ExpandMore,
    ExpandLess,
    Info,
    CheckCircle,
    Image,
    Description,
    Code,
    Computer,
    Language,
    Memory
} from '@mui/icons-material';
import Dropzone from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';

const IssueReportingComponent = () => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        issueType: 'bug',
        priority: 'medium',
        attachments: [],
        stepsToReproduce: '',
        expectedBehavior: '',
        actualBehavior: '',
        deviceInfo: '',
        browserInfo: '',
        osInfo: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [expandedSection, setExpandedSection] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileRejections, setFileRejections] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileDrop = (acceptedFiles, rejectedFiles) => {
        setFormData(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...acceptedFiles]
        }));
        setFileRejections(rejectedFiles);
    };

    const removeAttachment = (index) => {
        setFormData(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
    };

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Issue submitted:', formData);
        setSubmitted(true);
        setIsSubmitting(false);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'low': return theme.palette.success.main;
            case 'medium': return theme.palette.warning.main;
            case 'high': return theme.palette.error.main;
            case 'critical': return theme.palette.error.dark;
            default: return theme.palette.text.secondary;
        }
    };

    const getIssueTypeIcon = (type) => {
        switch (type) {
            case 'bug': return <BugReport />;
            case 'feature': return <Feedback />;
            case 'ui': return <Image />;
            case 'security': return <PriorityHigh />;
            default: return <Info />;
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
            >
                <Card sx={{
                    maxWidth: `100%`,
                    height: 839,
                    mx: 'auto',
                    p: 22,
                    textAlign: 'center',
                    background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <Zoom in={true} style={{ transitionDelay: '100ms' }}>
                        <Box sx={{
                            width: 80,
                            height: 80,
                            bgcolor: theme.palette.success.light,
                            borderRadius: '50%',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3
                        }}>
                            <CheckCircle sx={{ fontSize: 48, color: theme.palette.success.dark }} />
                        </Box>
                    </Zoom>

                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, letterSpacing: -0.5 }}>
                        Report Submitted Successfully!
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
                        We've received your issue report and our team will review it shortly. You'll receive updates via email.
                    </Typography>

                    <Paper elevation={0} sx={{
                        p: 3,
                        mb: 4,
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                        borderRadius: 2,
                        textAlign: 'left',
                        maxWidth: 400,
                        mx: 'auto'
                    }}>
                        <Typography variant="subtitle2" color="text.secondary">Reference Number</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                            #{Math.random().toString(36).substring(2, 10).toUpperCase()}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ mr: 2, color: getPriorityColor(formData.priority) }}>
                                {getIssueTypeIcon(formData.issueType)}
                            </Box>
                            <Box>
                                <Typography variant="body2">{formData.title}</Typography>
                                <Chip
                                    label={formData.priority}
                                    size="small"
                                    sx={{
                                        mt: 0.5,
                                        bgcolor: getPriorityColor(formData.priority),
                                        color: 'white',
                                        textTransform: 'capitalize',
                                        fontSize: '0.7rem'
                                    }}
                                />
                            </Box>
                        </Box>
                    </Paper>

                    <Button
                        variant="outlined"
                        sx={{
                            mt: 2,
                            px: 4,
                            borderRadius: 50,
                            borderWidth: 2,
                            '&:hover': { borderWidth: 2 }
                        }}
                        onClick={() => setSubmitted(false)}
                    >
                        Report Another Issue
                    </Button>
                </Card>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card sx={{
                maxWidth: `100%`,
                mx: 'auto',
                boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
                borderRadius: 4,
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <Box sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    p: 4,
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <Box sx={{
                        position: 'absolute',
                        top: -50,
                        right: -50,
                        width: 200,
                        height: 200,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,0.1)'
                    }} />
                    <Box sx={{
                        position: 'absolute',
                        bottom: -80,
                        right: -80,
                        width: 250,
                        height: 250,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,0.05)'
                    }} />

                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1 }}>
                            <BugReport sx={{ verticalAlign: 'middle', mr: 2, fontSize: 32 }} />
                            Report an Issue
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                            Help us improve by reporting bugs, suggesting features, or providing feedback.
                        </Typography>
                    </Box>
                </Box>

                <CardContent sx={{ p: 0 }}>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ p: 4 }}>
                            <Grid container spacing={3}>
                                {/* Issue Title */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Issue Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Feedback color="primary" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="filled"
                                        sx={{
                                            '& .MuiFilledInput-root': {
                                                borderRadius: 2,
                                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                                            }
                                        }}
                                    />
                                </Grid>
                                {/* issue type */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="filled" sx={{
                                        '& .MuiFilledInput-root': {
                                            borderRadius: 2,
                                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                                        }
                                    }}>
                                        <InputLabel>Issue Type</InputLabel>
                                        <Select
                                            name="issueType"
                                            value={formData.issueType}
                                            onChange={handleChange}
                                            label="Issue Type"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    {getIssueTypeIcon(formData.issueType)}
                                                </InputAdornment>
                                            }
                                        >
                                            <MenuItem value="bug">
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <BugReport sx={{ mr: 1, color: theme.palette.error.main }} />
                                                    Bug Report
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="feature">
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Feedback sx={{ mr: 1, color: theme.palette.info.main }} />
                                                    Feature Request
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="ui">
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Image sx={{ mr: 1, color: theme.palette.warning.main }} />
                                                    UI/UX Issue
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="security">
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <PriorityHigh sx={{ mr: 1, color: theme.palette.error.dark }} />
                                                    Security Concern
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="other">
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Info sx={{ mr: 1 }} />
                                                    Other
                                                </Box>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {/* pyority */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="filled" sx={{
                                        '& .MuiFilledInput-root': {
                                            borderRadius: 2,
                                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                                        }
                                    }}>
                                        <InputLabel>Priority</InputLabel>
                                        <Select
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleChange}
                                            label="Priority"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <PriorityHigh sx={{ color: getPriorityColor(formData.priority) }} />
                                                </InputAdornment>
                                            }
                                        >
                                            <MenuItem value="low">
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Box sx={{
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: theme.palette.success.main,
                                                        borderRadius: '50%',
                                                        mr: 1
                                                    }} />
                                                    Low Priority
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="medium">
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Box sx={{
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: theme.palette.warning.main,
                                                        borderRadius: '50%',
                                                        mr: 1
                                                    }} />
                                                    Medium Priority
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="high">
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Box sx={{
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: theme.palette.error.main,
                                                        borderRadius: '50%',
                                                        mr: 1
                                                    }} />
                                                    High Priority
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="critical">
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Box sx={{
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: theme.palette.error.dark,
                                                        borderRadius: '50%',
                                                        mr: 1
                                                    }} />
                                                    Critical
                                                </Box>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>


                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    multiline
                                    rows={4}
                                    placeholder="Please describe the issue in detail..."
                                    variant="filled"
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            borderRadius: 2,
                                            marginTop: 5,
                                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                                        }
                                    }}
                                />
                            </Grid>
                        </Box>

                        {/* Expandable Additional Information Section */}
                        <Paper elevation={0} sx={{
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            borderRadius: 0,
                            borderTop: `1px solid ${theme.palette.divider}`,
                            borderBottom: `1px solid ${theme.palette.divider}`
                        }}>
                            <Box
                                onClick={() => toggleSection('additional')}
                                sx={{
                                    p: 3,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                                    }
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Additional Information
                                </Typography>
                                {expandedSection === 'additional' ? <ExpandLess /> : <ExpandMore />}
                            </Box>

                            <Slide
                                direction="down"
                                in={expandedSection === 'additional'}
                                mountOnEnter
                                unmountOnExit
                            >
                                <Box sx={{ p: 4, pt: 0 }}>
                                    <Grid container spacing={5}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Steps to Reproduce"
                                                name="stepsToReproduce"
                                                value={formData.stepsToReproduce}
                                                onChange={handleChange}
                                                multiline
                                                rows={3}
                                                placeholder="1. Go to...\n2. Click on...\n3. Observe..."
                                                variant="filled"
                                                sx={{
                                                    '& .MuiFilledInput-root': {
                                                        borderRadius: 2,
                                                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                                                    }
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Expected Behavior"
                                                name="expectedBehavior"
                                                value={formData.expectedBehavior}
                                                onChange={handleChange}
                                                multiline
                                                rows={3}
                                                variant="filled"
                                                sx={{
                                                    '& .MuiFilledInput-root': {
                                                        borderRadius: 2,
                                                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                                                    }
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Actual Behavior"
                                                name="actualBehavior"
                                                value={formData.actualBehavior}
                                                onChange={handleChange}
                                                multiline
                                                rows={3}
                                                variant="filled"
                                                sx={{
                                                    '& .MuiFilledInput-root': {
                                                        borderRadius: 2,
                                                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Slide>
                        </Paper>

                        {/* Expandable Environment Details Section */}
                        <Paper elevation={0} sx={{
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            borderRadius: 0,
                            borderBottom: `1px solid ${theme.palette.divider}`
                        }}>
                            <Box
                                onClick={() => toggleSection('environment')}
                                sx={{
                                    p: 3,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                                    }
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Environment Details
                                </Typography>
                                {expandedSection === 'environment' ? <ExpandLess /> : <ExpandMore />}
                            </Box>

                            <Slide
                                direction="down"
                                in={expandedSection === 'environment'}
                                mountOnEnter
                                unmountOnExit
                            >
                                <Box sx={{ p: 4, pt: 0 }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                fullWidth
                                                label="Device Information"
                                                name="deviceInfo"
                                                value={formData.deviceInfo}
                                                onChange={handleChange}
                                                placeholder="e.g., iPhone 13, Samsung Galaxy S21"
                                                variant="filled"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Memory color="secondary" />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{
                                                    '& .MuiFilledInput-root': {
                                                        borderRadius: 2,
                                                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                                                    }
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                fullWidth
                                                label="Browser Information"
                                                name="browserInfo"
                                                value={formData.browserInfo}
                                                onChange={handleChange}
                                                placeholder="e.g., Chrome 98, Safari 15"
                                                variant="filled"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Language color="secondary" />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{
                                                    '& .MuiFilledInput-root': {
                                                        borderRadius: 2,
                                                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                                                    }
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                fullWidth
                                                label="OS Information"
                                                name="osInfo"
                                                value={formData.osInfo}
                                                onChange={handleChange}
                                                placeholder="e.g., Windows 11, macOS Monterey"
                                                variant="filled"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Computer color="secondary" />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{
                                                    '& .MuiFilledInput-root': {
                                                        borderRadius: 2,
                                                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Slide>
                        </Paper>

                        {/* Attachments Section */}
                        <Box sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                Attachments
                            </Typography>

                            <Dropzone
                                onDrop={handleFileDrop}
                                accept={{
                                    'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
                                    'text/*': ['.log', '.txt'],
                                    'application/*': ['.pdf', '.doc', '.docx'],
                                    'video/*': ['.mp4', '.mov']
                                }}
                                maxSize={5 * 1024 * 1024} // 5MB
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()}
                                        sx={{
                                            border: `2px dashed ${theme.palette.divider}`,
                                            borderRadius: 2,
                                            p: 4,
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                            '&:hover': {
                                                borderColor: theme.palette.primary.main,
                                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                    >
                                        <input {...getInputProps()} />
                                        <Box sx={{
                                            width: 60,
                                            height: 60,
                                            bgcolor: theme.palette.primary.light,
                                            borderRadius: '50%',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 2
                                        }}>
                                            <AttachFile sx={{ fontSize: 30, color: theme.palette.primary.dark }} />
                                        </Box>
                                        <Typography variant="h6" sx={{ mb: 1 }}>
                                            Drag & drop files here
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            or click to browse your files
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Supports images, documents, logs, and videos (max 5MB each)
                                        </Typography>
                                    </Box>
                                )}
                            </Dropzone>

                            {fileRejections.length > 0 && (
                                <Box sx={{ mt: 2 }}>
                                    {fileRejections.map(({ file, errors }, index) => (
                                        <Paper key={index} elevation={0} sx={{
                                            p: 2,
                                            mb: 1,
                                            bgcolor: theme.palette.error.light,
                                            color: theme.palette.error.contrastText,
                                            borderRadius: 1,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <Close sx={{ mr: 1 }} />
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography variant="body2">
                                                    {file.name} - {file.size > 5 * 1024 * 1024 ?
                                                        'File too large (max 5MB)' :
                                                        'File type not supported'}
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    ))}
                                </Box>
                            )}

                            {formData.attachments.length > 0 && (
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                        Selected Files ({formData.attachments.length})
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {formData.attachments.map((file, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                <Paper elevation={0} sx={{
                                                    p: 2,
                                                    borderRadius: 2,
                                                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    position: 'relative',
                                                    overflow: 'hidden'
                                                }}>
                                                    <Avatar sx={{
                                                        mr: 2,
                                                        bgcolor: theme.palette.primary.light,
                                                        color: theme.palette.primary.dark
                                                    }}>
                                                        {file.type.startsWith('image/') ? <Image /> :
                                                            file.type.startsWith('video/') ? <Description /> :
                                                                file.type.startsWith('text/') ? <Code /> :
                                                                    <Description />}
                                                    </Avatar>
                                                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                                        <Typography noWrap sx={{ fontWeight: 500 }}>
                                                            {file.name}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                                        </Typography>
                                                    </Box>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => removeAttachment(index)}
                                                        sx={{ ml: 1 }}
                                                    >
                                                        <Close fontSize="small" />
                                                    </IconButton>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            )}
                        </Box>

                        <Box sx={{
                            p: 3,
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            borderTop: `1px solid ${theme.palette.divider}`
                        }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Typography variant="body2" color="text.secondary">
                                    All fields are securely processed
                                </Typography>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Send />}
                                    sx={{
                                        px: 4,
                                        borderRadius: 50,
                                        minWidth: 180,
                                        height: 48,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        '&:hover': {
                                            boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                                            transform: 'translateY(-1px)'
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Issue'}
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default IssueReportingComponent;