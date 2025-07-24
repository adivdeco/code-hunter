// models/chatSchema.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userdata', // Ensure this matches your User model name
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500 // Good practice to set a max length
    },

}, { timestamps: true });


chatSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 });

const Chat = mongoose.model('chat', chatSchema); // Changed to 'Chat' for convention
module.exports = Chat;