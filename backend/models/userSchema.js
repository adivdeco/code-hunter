const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 10,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
        // maxLength:10,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    isPaidUser: {  // New field
        type: Boolean,
        default: false
    },
    lastActive: {  // New field
        type: Date,
        default: Date.now
    },
    problemSolved: {
        type: [{
            problemId: {
                type: Schema.Types.ObjectId,
                ref: 'problemdata',
            },
            solvedAt: {  // New subfield
                type: Date,
                default: Date.now
            },
        }],
    },
    problemSolved2: {
        type: [{
            problemdata: {
                type: Schema.Types.ObjectId,
                ref: 'problemdata',
            }

        }],
    },

    subscription: {  // New field for more detailed subscription info
        type: {
            plan: String,
            startsAt: Date,
            expiresAt: Date,
            autoRenew: Boolean
        },
        default: null
    },
    country: {
        type: String,
        uppercase: true,
        trim: true,
        maxlength: 2,
        default: 'IN',
    },
    avatar: {
        type: String,
        default: '',
    },




}, {
    timestamps: true,
});

userSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await mongoose.model('solution').deleteMany({
            userId: doc._id
        });
    }
});

const User = mongoose.model('userdata', userSchema);
module.exports = User;