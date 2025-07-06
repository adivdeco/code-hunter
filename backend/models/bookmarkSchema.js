

const mongoose = require('mongoose')
const { Schema } = mongoose;

const markSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdata",
        required: true
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "problemdata",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const BookMark = mongoose.model('bookmark', markSchema);
module.exports = BookMark;