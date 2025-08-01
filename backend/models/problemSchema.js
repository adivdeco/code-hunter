const mongoose = require('mongoose');
const { Messages } = require('openai/resources/chat/completions.js');
const { Schema } = mongoose;


const problemSchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    demo: {
        type: Boolean,
        default: false
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
    },
    tags: {
        type: String,
        enum: ['array', 'string', 'linkedlist', 'tree', 'graph', 'dynamic programming', 'greedy', 'backtracking'],
        required: true,
    },
    companies: {
        type: [String],
        enum: ['Google', 'Netflix', 'TCS', 'Amazon', 'Microsoft', 'Facebook', 'Apple', 'Goldman Sachs', 'Flipkart'],
        required: true,
    },
    visibleTestCases: [
        {
            input: {
                type: String,
                required: true,
            },
            output: {
                type: String,
                required: true,
            },
            explanation: {
                type: String,
                required: true
            }
        }
    ],
    hiddenTestCases: [
        {
            input: {
                type: String,
                required: true,
            },
            output: {
                type: String,
                required: true,
            }
        }
    ],

    startCode: [
        {
            language: {
                type: String,
                required: true,
            },
            initialCode: {
                type: String,
                required: true
            }
        }
    ],
    referenceSolution: [
        {
            language: {
                type: String,
                required: true,
            },
            completeCode: {
                type: String,
                required: true
            }
        }
    ],

    problemCreator: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    messages: [
        {
            role: {
                type: String,
                enum: ['user', 'admin'],
                required: true
            },
            content: {
                type: String,
                required: true
            }
        }
    ],

    videoSolutions: [{
        type: Schema.Types.ObjectId,
        ref: 'SolutionVideo'
    }]



})

const Problem = mongoose.model('problemdata', problemSchema);
module.exports = Problem;