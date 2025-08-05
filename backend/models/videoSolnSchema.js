// // const mongoose = require('mongoose');
// // const { Schema } = mongoose;

// // const videoSchema = new Schema({
// //     problemId: {
// //         type: Schema.Types.ObjectId,
// //         ref: 'problemdata',
// //         required: true
// //     },
// //     userId: {
// //         type: Schema.Types.ObjectId,
// //         ref: 'userdata',
// //         required: true,
// //     },
// //     cloudinaryPublicId: {
// //         type: String,
// //         required: true,
// //         unique: true
// //     },
// //     secureUrl: {
// //         type: String,
// //         required: true
// //     },
// //     thumbnailUrl: {
// //         type: String
// //     },
// //     duration: {
// //         type: Number,
// //         required: true
// //     },
// // }, {
// //     timestamps: true
// // });



// // const SolutionVideo = mongoose.model("solutionVideo", videoSchema);

// // module.exports = SolutionVideo;

// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const videoSolutionSchema = new Schema({
//     problem: { // Changed from problemId for clarity
//         type: Schema.Types.ObjectId,
//         ref: 'problemdata',
//         required: true
//     },
//     uploader: { // Changed from userId
//         type: Schema.Types.ObjectId,
//         ref: 'userdata', // Make sure 'userdata' is your correct User model name
//         required: true,
//     },
//     title: { // NEW: Add a title for the video itself
//         type: String,
//         required: true
//     },
//     description: { // NEW: Add a description
//         type: String,
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
//     duration: { // Storing as a string (e.g., "15:30") can be more user-friendly
//         type: String,
//         required: true
//     },
//     views: { // NEW: View Counter
//         type: Number,
//         default: 0
//     },
//     likes: [{ // NEW: Likes array to store user IDs
//         type: Schema.Types.ObjectId,
//         ref: 'userdata'
//     }],
//     dislikes: [{ // NEW: Dislikes array
//         type: Schema.Types.ObjectId,
//         ref: 'userdata'
//     }]
// }, { timestamps: true });


// const SolutionVideo = mongoose.model("SolutionVideo", videoSolutionSchema); // Note the capitalized name

// module.exports = SolutionVideo;


const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const videoSolutionSchema = new Schema({
    problem: {
        type: Schema.Types.ObjectId,
        ref: 'problemdata',
        required: true
    },
    uploader: {
        type: Schema.Types.ObjectId,
        ref: 'userdata',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500
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
        type: String,
        default: ''
    },
    duration: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'userdata'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'userdata'
    }],
    // NEW: Support for multiple solution types
    solutionType: {
        type: String,
        enum: ['video', 'image', 'text', 'audio'],
        default: 'video'
    },
    // NEW: For image/text solutions
    content: {
        type: String,
        default: ''
    },
    // NEW: For tracking quality
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    // NEW: For moderation
    isApproved: {
        type: Boolean,
        default: false
    },
    // NEW: For reporting
    reports: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'userdata'
        },
        reason: {
            type: String,
            enum: ['spam', 'inappropriate', 'wrong_solution', 'other']
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    // NEW: For analytics
    engagement: {
        watchTime: {
            type: Number,
            default: 0
        },
        completionRate: {
            type: Number,
            default: 0
        }
    },
    // NEW: For accessibility
    captionsUrl: {
        type: String,
        default: ''
    },
    // NEW: For translations
    language: {
        type: String,
        default: 'en'
    },
    // NEW: For SEO
    tags: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for like/dislike count
videoSolutionSchema.virtual('likeCount').get(function () {
    return this.likes.length;
});

videoSolutionSchema.virtual('dislikeCount').get(function () {
    return this.dislikes.length;
});
videoSolutionSchema.plugin(mongoosePaginate);

// Indexes for better performance
videoSolutionSchema.index({ problem: 1 });
videoSolutionSchema.index({ uploader: 1 });
videoSolutionSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Middleware to update problem's video solutions when a video is removed

// Middleware to update problem's videoSolutions array when a video is removed
videoSolutionSchema.post('remove', async function (doc) {
    try {
        // Defensive: Only update if doc.problem exists
        if (doc.problem) {
            const Problem = mongoose.model('problemdata');
            await Problem.findByIdAndUpdate(doc.problem, {
                $pull: { videoSolutions: doc._id }
            });
        }
    } catch (err) {
        console.error('Error updating problem after video removal:', err);
    }
});

// Conditional required fields for solutionType
videoSolutionSchema.pre('validate', function (next) {
    // For video solutions, secureUrl and duration are required
    if (this.solutionType === 'video') {
        if (!this.secureUrl) {
            this.invalidate('secureUrl', 'Video URL is required for video solutions');
        }
        if (!this.duration) {
            this.invalidate('duration', 'Duration is required for video solutions');
        }
    }
    // For text solutions, content is required
    if (this.solutionType === 'text') {
        if (!this.content || !this.content.trim()) {
            this.invalidate('content', 'Content is required for text solutions');
        }
    }
    // For image solutions, secureUrl is required
    if (this.solutionType === 'image') {
        if (!this.secureUrl) {
            this.invalidate('secureUrl', 'Image URL is required for image solutions');
        }
    }
    // For audio solutions, secureUrl is required
    if (this.solutionType === 'audio') {
        if (!this.secureUrl) {
            this.invalidate('secureUrl', 'Audio URL is required for audio solutions');
        }
    }
    next();
});
const SolutionVideo = mongoose.model("SolutionVideo", videoSolutionSchema);

module.exports = SolutionVideo; 