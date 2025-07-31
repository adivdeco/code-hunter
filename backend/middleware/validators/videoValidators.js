// middleware/validators/videoValidators.js

const { body, param } = require('express-validator');

const likeDislikeValidator = [
    param('videoId').isMongoId().withMessage('Invalid video ID format')
];

module.exports = { likeDislikeValidator };