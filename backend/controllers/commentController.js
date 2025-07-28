
const Comment = require('../models/Comment.js');
const Problem = require('../models/problemSchema.js')

const getCommentsForProblem = async (req, res) => {
    try {
        const { problemId } = req.params;
        const comments = await Comment.find({ problem: problemId, parentComment: null })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: comments.length,
            data: comments
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


const createComment = async (req, res) => {
    try {
        console.log("🧪 req.finduser:", req.finduser);

        const { problemId } = req.params;
        const { content } = req.body;
        const userId = req.finduser._id;
        console.log(userId, content);


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
        console.error("❌ Error creating comment:", error); // 🪵 Add this
        res.status(500).json({ message: "Error creating comment", error: error.message });
    }
};

module.exports = {
    getCommentsForProblem,
    createComment
}