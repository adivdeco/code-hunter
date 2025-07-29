
// const Comment = require('../models/Comment.js');
// const Problem = require('../models/problemSchema.js')

// const getCommentsForProblem = async (req, res) => {
//     try {
//         const { problemId } = req.params;
//         const comments = await Comment.find({ problem: problemId, parentComment: null })
//             .sort({ createdAt: -1 });

//         res.status(200).json({
//             success: true,
//             count: comments.length,
//             data: comments
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, error: 'Server Error' });
//     }
// };


// const createComment = async (req, res) => {
//     try {


//         const { problemId } = req.params;
//         const { content } = req.body;
//         const userId = req.finduser._id;


//         if (!content || content.trim() === '') {
//             return res.status(400).json({ success: false, error: 'Comment content is required.' });
//         }

//         const newComment = await Comment.create({
//             content,
//             user: userId,
//             problem: problemId
//         });

//         // We need to manually populate the user field for the response
//         const populatedComment = await Comment.findById(newComment._id);

//         res.status(201).json({
//             success: true,
//             data: populatedComment
//         });
//     } catch (error) {
//         console.error("❌ Error creating comment:", error); // 🪵 Add this
//         res.status(500).json({ message: "Error creating comment", error: error.message });
//     }
// };

// module.exports = {
//     getCommentsForProblem,
//     createComment
// }

const Comment = require('../models/Comment.js');
const Problem = require('../models/problemSchema.js');

const getCommentsForProblem = async (req, res) => {
    try {
        const { problemId } = req.params;
        const comments = await Comment.find({
            problem: problemId,
            parentComment: null
        })
            .sort({ isPinned: -1, createdAt: -1 });

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
        const { problemId } = req.params;
        const { content } = req.body;
        const userId = req.finduser._id;

        if (!content || content.trim() === '') {
            return res.status(400).json({ success: false, error: 'Comment content is required.' });
        }

        const newComment = await Comment.create({
            content,
            user: userId,
            problem: problemId
        });

        const populatedComment = await Comment.findById(newComment._id);

        res.status(201).json({
            success: true,
            data: populatedComment
        });
    } catch (error) {
        console.error("❌ Error creating comment:", error);
        res.status(500).json({ message: "Error creating comment", error: error.message });
    }
};

const likeComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.finduser._id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, error: 'Comment not found' });
        }

        const likeIndex = comment.likes.indexOf(userId);
        if (likeIndex === -1) {
            comment.likes.push(userId);
        } else {
            comment.likes.splice(likeIndex, 1);
        }

        await comment.save();

        res.status(200).json({
            success: true,
            likes: comment.likes
        });
    } catch (error) {
        console.error("❌ Error liking comment:", error);
        res.status(500).json({ message: "Error liking comment", error: error.message });
    }
};

const replyToComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = req.finduser._id;

        if (!content || content.trim() === '') {
            return res.status(400).json({ success: false, error: 'Reply content is required.' });
        }

        const parentComment = await Comment.findById(commentId);
        if (!parentComment) {
            return res.status(404).json({ success: false, error: 'Parent comment not found' });
        }

        const newReply = await Comment.create({
            content,
            user: userId,
            problem: parentComment.problem,
            parentComment: commentId
        });

        const populatedReply = await Comment.findById(newReply._id);

        res.status(201).json({
            success: true,
            data: populatedReply
        });
    } catch (error) {
        console.error("❌ Error replying to comment:", error);
        res.status(500).json({ message: "Error replying to comment", error: error.message });
    }
};

const pinComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        // Check if user is admin (you should have this in your middleware)
        if (req.finduser.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Only admins can pin comments' });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, error: 'Comment not found' });
        }

        comment.isPinned = !comment.isPinned;
        await comment.save();

        res.status(200).json({
            success: true,
            isPinned: comment.isPinned
        });
    } catch (error) {
        console.error("❌ Error pinning comment:", error);
        res.status(500).json({ message: "Error pinning comment", error: error.message });
    }
};

module.exports = {
    getCommentsForProblem,
    createComment,
    likeComment,
    replyToComment,
    pinComment
};