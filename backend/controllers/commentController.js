// controllers/commentController.js
const Comment = require('../models/Comment.js');
const Problem = require('../models/problemSchema.js')
// @desc    Get all comments for a problem
// @route   GET /api/discussion/:problemId
// @access  Public
const getCommentsForProblem = async (req, res) => {
    try {
        const { problemId } = req.params;
        const comments = await Comment.find({ problem: problemId, parentComment: null })
            .sort({ createdAt: -1 }); // Newest first

        res.status(200).json({
            success: true,
            count: comments.length,
            data: comments
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create a new comment
// @route   POST /api/discussion/:problemId
// @access  Private (requires authentication)
const createComment = async (req, res) => {
    try {
        const { problemId } = req.params;
        const { content } = req.body;
        const userId = req.user.id; // Assumes your auth middleware adds `req.user`

        if (!content || content.trim() === '') {
            return res.status(400).json({ success: false, error: 'Comment content is required.' });
        }

        const newComment = await Comment.create({
            content,
            user: userId,
            problem: problemId
        });

        // We need to manually populate the user field for the response
        const populatedComment = await Comment.findById(newComment._id);

        res.status(201).json({
            success: true,
            data: populatedComment
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

module.exports = {
    getCommentsForProblem,
    createComment
}