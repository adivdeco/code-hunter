// routes/discussionRoutes.js
const express = require('express');
const { getCommentsForProblem, createComment } = require('../controllers/commentController.js');
const userMiddleware = require('../middleware/userMiddleware.js'); // You need an auth middleware

const discussionRoutes = express.Router();

discussionRoutes.get('/:problemId', getCommentsForProblem)

discussionRoutes.post('/:problemId', userMiddleware, createComment); // Use your auth middleware here

module.exports = discussionRoutes