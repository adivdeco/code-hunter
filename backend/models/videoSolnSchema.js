const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoSchema = new Schema({
    problemId: {
        type: Schema.Types.ObjectId,
        ref: 'problemdata',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userdata',
        required: true,
    },
    cloudinaryPublicId: {
        type: String,
        required: true,
        unique: true
    },
    secureUrl: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String
    },
    duration: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});



const SolutionVideo = mongoose.model("solutionVideo", videoSchema);

module.exports = SolutionVideo;
