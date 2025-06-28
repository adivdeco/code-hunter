
const mongoose = require('mongoose');
const { Schema } = mongoose;

const solutionSchema = new Schema({

    problemId:{
        type:Schema.Types.ObjectId,
        ref: 'problemdata',
        required: true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    code:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true,
        enum: ['c++', 'java', 'javascript']
    },
    status:{
        type: String,
        enum:['pending', 'accepted', 'wrong_amnswer', 'error'],
        default:'pending'
    },
    runtime:{
        type: Number,
        default: 0
    },
    memory:{
        type: Number,
        default: 0
    },
    errormessage:{
        type: String,
        default: ''
    },
    testCasesPassed:{
        type: Number,
        default: 0
    },
    testCasesTotal:{
        type: Number,
        default: 0
    },
    
},{ 
    timestamps: true,
    versionKey: false,
})
solutionSchema.index({ problemId: 1, userId: 1 }); 

const Solution = mongoose.model('solution' , solutionSchema);
module.exports = Solution;