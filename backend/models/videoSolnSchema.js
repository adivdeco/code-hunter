// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const videoSchema = new Schema({
//     problemId: {
//         type: Schema.Types.ObjectId,
//         ref: 'problemdata',
//         required: true
//     },
//     userId: {
//         type: Schema.Types.ObjectId,
//         ref: 'userdata',
//         required: true,
//     },
//     cloudinaryPublicId: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     secureUrl: {
//         type: String,
//         required: true
//     },
//     thumbnailUrl: {
//         type: String
//     },
//     duration: {
//         type: Number,
//         required: true
//     },
// }, {
//     timestamps: true
// });



// const SolutionVideo = mongoose.model("solutionVideo", videoSchema);

// module.exports = SolutionVideo;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoSolutionSchema = new Schema({
    problem: { // Changed from problemId for clarity
        type: Schema.Types.ObjectId,
        ref: 'problemdata',
        required: true
    },
    uploader: { // Changed from userId
        type: Schema.Types.ObjectId,
        ref: 'userdata', // Make sure 'userdata' is your correct User model name
        required: true,
    },
    title: { // NEW: Add a title for the video itself
        type: String,
        required: true
    },
    description: { // NEW: Add a description
        type: String,
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
    duration: { // Storing as a string (e.g., "15:30") can be more user-friendly
        type: String,
        required: true
    },
    views: { // NEW: View Counter
        type: Number,
        default: 0
    },
    likes: [{ // NEW: Likes array to store user IDs
        type: Schema.Types.ObjectId,
        ref: 'userdata'
    }],
    dislikes: [{ // NEW: Dislikes array
        type: Schema.Types.ObjectId,
        ref: 'userdata'
    }]
}, { timestamps: true });


const SolutionVideo = mongoose.model("SolutionVideo", videoSolutionSchema); // Note the capitalized name

module.exports = SolutionVideo;