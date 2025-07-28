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
        ref: 'User', // Make sure you have a 'User' model
        required: true
    },
    problem: {
        type: mongoose.Schema.ObjectId,
        ref: 'Problem', // Make sure you have a 'Problem' model
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
        select: 'name profilePicture' // Fetch only name and profile picture from the User model
    });
    next();
});


const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment