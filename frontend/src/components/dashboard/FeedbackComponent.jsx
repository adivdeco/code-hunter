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
    CircularProgress,
    Rating,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails,

} from '@mui/material';
import {
    ThumbUp,
    ThumbDown,
    SentimentVerySatisfied,
    SentimentSatisfied,
    SentimentNeutral,
    SentimentDissatisfied,
    SentimentVeryDissatisfied,
    Close,
    ExpandMore,
    Send,
    Feedback as FeedbackIcon,
    Star,
    StarBorder,
    EmojiEmotions,
    TagFaces,
    MoodBad,
    InsertEmoticon,
    BugReport
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const FeedbackComponent = () => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        feedbackType: 'general',
        rating: 0,
        sentiment: '',
        message: '',
        email: '',
        allowContact: false
    });

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (event, newValue) => {
        setFormData(prev => ({ ...prev, rating: newValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // console.log('Feedback submitted:', formData);
        setSubmitted(true);
        setIsSubmitting(false);
    };

    const resetForm = () => {
        setFormData({
            feedbackType: 'general',
            rating: 0,
            sentiment: '',
            message: '',
            email: '',
            allowContact: false
        });
        setSubmitted(false);
    };

    // const getSentimentIcon = () => {
    //     switch (formData.sentiment) {
    //         case 'very-satisfied': return <SentimentVerySatisfied color="success" sx={{ fontSize: 40 }} />;
    //         case 'satisfied': return <SentimentSatisfied color="success" sx={{ fontSize: 40 }} />;
    //         case 'neutral': return <SentimentNeutral color="warning" sx={{ fontSize: 40 }} />;
    //         case 'dissatisfied': return <SentimentDissatisfied color="error" sx={{ fontSize: 40 }} />;
    //         case 'very-dissatisfied': return <SentimentVeryDissatisfied color="error" sx={{ fontSize: 40 }} />;
    //         default: return <EmojiEmotions color="primary" sx={{ fontSize: 40 }} />;
    //     }
    // };

    const getFeedbackTypeColor = () => {
        switch (formData.feedbackType) {
            case 'bug': return theme.palette.error.main;
            case 'suggestion': return theme.palette.info.main;
            case 'compliment': return theme.palette.success.main;
            default: return theme.palette.primary.main;
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
                    mx: 'auto',
                    p: 36,
                    textAlign: 'center',
                    background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    borderRadius: 4,
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
                            <ThumbUp sx={{ fontSize: 48, color: theme.palette.success.dark }} />
                        </Box>
                    </Zoom>

                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, letterSpacing: -0.5 }}>
                        Thank You for Your Feedback!
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
                        We truly appreciate you taking the time to share your thoughts with us. Your feedback helps us improve.
                    </Typography>

                    {formData.rating > 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <Rating
                                value={formData.rating}
                                readOnly
                                precision={0.5}
                                icon={<Star fontSize="inherit" sx={{ color: theme.palette.warning.main }} />}
                                emptyIcon={<StarBorder fontSize="inherit" sx={{ color: theme.palette.text.disabled }} />}
                            />
                        </Box>
                    )}

                    <Button
                        variant="outlined"
                        sx={{
                            mt: 2,
                            px: 4,
                            borderRadius: 50,
                            borderWidth: 2,
                            '&:hover': { borderWidth: 2 }
                        }}
                        onClick={resetForm}
                    >
                        Submit More Feedback
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

                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1 }}>
                            <FeedbackIcon sx={{ verticalAlign: 'middle', mr: 2, fontSize: 32 }} />
                            Share Your Feedback
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                            We'd love to hear your thoughts, suggestions, or concerns
                        </Typography>
                    </Box>
                </Box>

                <CardContent sx={{ p: 0 }}>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ p: 4 }}>
                            <Grid container spacing={15}>

                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Feedback Type</InputLabel>
                                        <Select
                                            name="feedbackType"
                                            value={formData.feedbackType}
                                            onChange={handleChange}
                                            label="Feedback Type"
                                            variant="filled"
                                            sx={{
                                                '& .MuiFilledInput-root': {
                                                    borderRadius: 2,
                                                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                                                }
                                            }}
                                        >
                                            <MenuItem value="general">
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <FeedbackIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                                                    General Feedback
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="bug">
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <BugReport sx={{ mr: 1, color: theme.palette.error.main }} />
                                                    Bug Report
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="suggestion">
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <TagFaces sx={{ mr: 1, color: theme.palette.info.main }} />
                                                    Feature Suggestion
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="compliment">
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <InsertEmoticon sx={{ mr: 1, color: theme.palette.success.main }} />
                                                    Compliment
                                                </Box>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            How would you rate your experience?
                                        </Typography>
                                        <Rating
                                            name="rating"
                                            value={formData.rating}
                                            onChange={handleRatingChange}
                                            precision={0.5}
                                            size="large"
                                            icon={<Star fontSize="inherit" sx={{
                                                color: theme.palette.warning.main,
                                                fontSize: '2.5rem'
                                            }} />}
                                            emptyIcon={<StarBorder fontSize="inherit" sx={{
                                                color: theme.palette.text.disabled,
                                                fontSize: '2.5rem'
                                            }} />}
                                        />
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl component="fieldset" fullWidth>
                                        <FormLabel component="legend" sx={{ mb: 1 }}>
                                            How do you feel about our service?
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            name="sentiment"
                                            value={formData.sentiment}
                                            onChange={handleChange}
                                            sx={{ justifyContent: 'space-between' }}
                                        >
                                            <Tooltip title="Very Satisfied" placement="top">
                                                <FormControlLabel
                                                    value="very-satisfied"
                                                    control={
                                                        <Radio
                                                            icon={<SentimentVerySatisfied sx={{ fontSize: 32 }} />}
                                                            checkedIcon={<SentimentVerySatisfied color="success" sx={{ fontSize: 32 }} />}
                                                            sx={{ p: 1 }}
                                                        />
                                                    }
                                                    label=""
                                                    labelPlacement="bottom"
                                                />
                                            </Tooltip>
                                            <Tooltip title="Satisfied" placement="top">
                                                <FormControlLabel
                                                    value="satisfied"
                                                    control={
                                                        <Radio
                                                            icon={<SentimentSatisfied sx={{ fontSize: 32 }} />}
                                                            checkedIcon={<SentimentSatisfied color="success" sx={{ fontSize: 32 }} />}
                                                            sx={{ p: 1 }}
                                                        />
                                                    }
                                                    label=""
                                                    labelPlacement="bottom"
                                                />
                                            </Tooltip>
                                            <Tooltip title="Neutral" placement="top">
                                                <FormControlLabel
                                                    value="neutral"
                                                    control={
                                                        <Radio
                                                            icon={<SentimentNeutral sx={{ fontSize: 32 }} />}
                                                            checkedIcon={<SentimentNeutral color="warning" sx={{ fontSize: 32 }} />}
                                                            sx={{ p: 1 }}
                                                        />
                                                    }
                                                    label=""
                                                    labelPlacement="bottom"
                                                />
                                            </Tooltip>
                                            <Tooltip title="Dissatisfied" placement="top">
                                                <FormControlLabel
                                                    value="dissatisfied"
                                                    control={
                                                        <Radio
                                                            icon={<SentimentDissatisfied sx={{ fontSize: 32 }} />}
                                                            checkedIcon={<SentimentDissatisfied color="error" sx={{ fontSize: 32 }} />}
                                                            sx={{ p: 1 }}
                                                        />
                                                    }
                                                    label=""
                                                    labelPlacement="bottom"
                                                />
                                            </Tooltip>
                                            <Tooltip title="Very Dissatisfied" placement="top">
                                                <FormControlLabel
                                                    value="very-dissatisfied"
                                                    control={
                                                        <Radio
                                                            icon={<SentimentVeryDissatisfied sx={{ fontSize: 32 }} />}
                                                            checkedIcon={<SentimentVeryDissatisfied color="error" sx={{ fontSize: 32 }} />}
                                                            sx={{ p: 1 }}
                                                        />
                                                    }
                                                    label=""
                                                    labelPlacement="bottom"
                                                />
                                            </Tooltip>
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                            </Grid>
                            {/* textarea */}
                            <Grid item xs={12} marginTop={10}>
                                <TextField
                                    fullWidth
                                    label="Your Feedback"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    multiline
                                    rows={9}
                                    placeholder="Tell us what you think..."
                                    variant="filled"
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            borderRadius: 2,
                                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} marginTop={5}>
                                <Accordion
                                    elevation={0}
                                    expanded={expanded}
                                    onChange={() => setExpanded(!expanded)}
                                    sx={{
                                        bgcolor: 'transparent',
                                        '&:before': {
                                            display: 'none'
                                        }
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        sx={{
                                            p: 0,
                                            minHeight: 'auto',
                                            '& .MuiAccordionSummary-content': {
                                                my: 1
                                            }
                                        }}
                                    >
                                        <Typography variant="subtitle2" color="primary">
                                            Optional Contact Information
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ p: 0 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Email Address"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="If you'd like us to follow up"
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
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
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
                                    Your feedback is anonymous unless you provide contact info
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
                                        transition: 'all 0.3s ease',
                                        bgcolor: getFeedbackTypeColor(),
                                        '&:hover': {
                                            bgcolor: getFeedbackTypeColor(),
                                            opacity: 0.9
                                        }
                                    }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Feedback'}
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default FeedbackComponent;