// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const userSchema = new Schema({

//     name: {
//         type: String,
//         required: true,
//         trim: true,
//         minLength: 3,
//         maxLength: 10,
//         lowercase: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true,
//     },
//     password: {
//         type: String,
//         required: function () { return !this.githubId }, // password required only for normal users
//         minlength: 4,
//     },

//     githubId: {
//         type: String,
//         unique: true,
//         sparse: true, // allow null for normal users
//     },

//     username: {
//         type: String,
//         trim: true,
//     },

//     role: {
//         type: String,
//         enum: ['user', 'admin'],
//         default: 'user',
//     },
//     isPaidUser: {  // New field
//         type: Boolean,
//         default: false
//     },
//     lastActive: {  // New field
//         type: Date,
//         default: Date.now
//     },
//     problemSolved: {
//         type: [{
//             problemId: {
//                 type: Schema.Types.ObjectId,
//                 ref: 'problemdata',
//             },
//             solvedAt: {  // New subfield
//                 type: Date,
//                 default: Date.now
//             },
//         }],
//     },

//     subscription: {  // New field for more detailed subscription info
//         type: {
//             plan: String,
//             startsAt: Date,
//             expiresAt: Date,
//             autoRenew: Boolean
//         },
//         default: null
//     },
//     country: {
//         type: String,
//         uppercase: true,
//         trim: true,
//         maxlength: 2,
//         default: 'IN',
//     },
//     avatar: {
//         type: String,
//         default: '',
//     },




// }, {
//     timestamps: true,
// });

// userSchema.post('findOneAndDelete', async function (doc) {
//     if (doc) {
//         await mongoose.model('solution').deleteMany({
//             userId: doc._id
//         });
//     }
// });

// const User = mongoose.model('userdata', userSchema);
// module.exports = User;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50,
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
        required: function () {
            return !this.githubId;
        },
        minlength: 4,
    },

    githubId: {
        type: String,
        unique: true,
        sparse: true, // allows null for non-GitHub users
    },

    username: {
        type: String,
        trim: true,
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

    isPaidUser: {
        type: Boolean,
        default: false,
    },

    subscription: {
        plan: {
            type: String,
            default: null,
        },
        startsAt: {
            type: Date,
            default: null,
        },
        expiresAt: {
            type: Date,
            default: null,
        },
        autoRenew: {
            type: Boolean,
            default: false,
        }
    },

    lastActive: {
        type: Date,
        default: Date.now,
    },

    problemSolved: [{
        problemId: {
            type: Schema.Types.ObjectId,
            ref: 'problemdata',
        },
        solvedAt: {
            type: Date,
            default: Date.now,
        },
    }],

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

    streak: {
        type: Number,
        default: 0,
    }

}, { timestamps: true });

// Automatically delete user's solutions on profile deletion
userSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await mongoose.model('solution').deleteMany({ userId: doc._id });
    }
});

const User = mongoose.model('userdata', userSchema);
module.exports = User;
