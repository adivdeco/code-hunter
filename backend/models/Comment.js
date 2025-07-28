// models/Comment.js
const mongoose = require('mongoose')
const { Schema } = mongoose;


const commentSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Comment content cannot be empty.'],
        trim: true,
        maxlength: [2000, 'Comment cannot be more than 2000 characters.']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'userdata', // Make sure you have a 'User' model
        required: true
    },
    problem: {
        type: mongoose.Schema.ObjectId,
        ref: 'problemdata', // Make sure you have a 'Problem' model
        required: true
    },
    // For future "reply-to" functionality
    parentComment: {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment',
        default: null
    }
}, { timestamps: true });

// Populate user details whenever a comment is found
commentSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name avatar'
    });
    next();
});


const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment