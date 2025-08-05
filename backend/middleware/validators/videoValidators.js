// // middleware/validators/videoValidators.js

// const { body, param } = require('express-validator');

// const likeDislikeValidator = [
//     param('videoId').isMongoId().withMessage('Invalid video ID format')
// ];

// module.exports = { likeDislikeValidator };

const { body, param, query } = require('express-validator');
const { SOLUTION_TYPES, REPORT_REASONS, LANGUAGES } = require('../../constants');

const solutionIdValidator = [
    param('solutionId')
        .isMongoId()
        .withMessage('Invalid solution ID format')
];

const videoIdValidator = [
    param('videoId')
        .isMongoId()
        .withMessage('Invalid video ID format')
];

const problemIdValidator = [
    param('problemId')
        .isMongoId()
        .withMessage('Invalid problem ID format')
];

const uploadSolutionValidator = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 120 }).withMessage('Title must be less than 120 characters'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),

    body('solutionType')
        .isIn(SOLUTION_TYPES).withMessage(`Invalid solution type. Must be one of: ${SOLUTION_TYPES.join(', ')}`),

    body('content')
        .if(body('solutionType').equals('text'))
        .notEmpty().withMessage('Content is required for text solutions')
        .isLength({ max: 10000 }).withMessage('Content must be less than 10000 characters'),

    body('language')
        .optional()
        .isIn(LANGUAGES).withMessage(`Invalid language. Must be one of: ${LANGUAGES.join(', ')}`),

    body('tags')
        .optional()
        .isArray({ max: 10 }).withMessage('Maximum 10 tags allowed')
        .custom((tags) => {
            if (tags.some(tag => tag.length > 20)) {
                throw new Error('Each tag must be less than 20 characters');
            }
            return true;
        })
];

const reportSolutionValidator = [
    body('reason')
        .isIn(REPORT_REASONS).withMessage(`Invalid reason. Must be one of: ${REPORT_REASONS.join(', ')}`),

    body('comment')
        .optional()
        .trim()
        .isLength({ max: 200 }).withMessage('Comment must be less than 200 characters')
];

const translationValidator = [
    body('targetLanguage')
        .isIn(LANGUAGES).withMessage(`Invalid target language. Must be one of: ${LANGUAGES.join(', ')}`)
        .not()
        .equals(body('language')).withMessage('Target language must be different from source language')
];

const solutionQueryValidator = [
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('Page must be a positive integer')
        .toInt(),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50')
        .toInt(),

    query('sortBy')
        .optional()
        .isIn(['createdAt', 'views', 'likes', 'duration']).withMessage('Invalid sort field'),

    query('sortOrder')
        .optional()
        .isIn(['asc', 'desc']).withMessage('Invalid sort order'),

    query('solutionType')
        .optional()
        .isIn(SOLUTION_TYPES).withMessage(`Invalid solution type. Must be one of: ${SOLUTION_TYPES.join(', ')}`),

    query('language')
        .optional()
        .isIn(LANGUAGES).withMessage(`Invalid language. Must be one of: ${LANGUAGES.join(', ')}`),

    query('search')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('Search query must be less than 100 characters')
];

const trackViewValidator = [
    body('watchTime')
        .optional()
        .isFloat({ min: 0 }).withMessage('Watch time must be a positive number'),

    body('isCompleted')
        .optional()
        .isBoolean().withMessage('isCompleted must be a boolean value')
];

module.exports = {
    solutionIdValidator,
    videoIdValidator,
    problemIdValidator,
    uploadSolutionValidator,
    reportSolutionValidator,
    translationValidator,
    solutionQueryValidator,
    trackViewValidator,
    // Backward compatibility
    likeDislikeValidator: videoIdValidator
};