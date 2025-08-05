const mongoose = require('mongoose');
const { Schema } = mongoose;

const analyticsEventSchema = new Schema({
    eventType: {
        type: String,
        required: true,
        index: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userdata',
        index: true
    },
    solutionId: {
        type: Schema.Types.ObjectId,
        ref: 'SolutionVideo',
        index: true
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'SolutionVideo',
        index: true
    },
    problemId: {
        type: Schema.Types.ObjectId,
        ref: 'problemdata',
        index: true
    },
    metadata: {
        type: Schema.Types.Mixed // Flexible structure for different event types
    },
    ipAddress: {
        type: String
    },
    userAgent: {
        type: String
    }
}, {
    timestamps: true
});

// Indexes for faster querying
analyticsEventSchema.index({ createdAt: 1 });
analyticsEventSchema.index({ eventType: 1, createdAt: 1 });

const AnalyticsEvent = mongoose.model('AnalyticsEvent', analyticsEventSchema);

module.exports = AnalyticsEvent;