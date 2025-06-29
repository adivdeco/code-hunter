const mongoose = require('mongoose')
const {Schema} = mongoose;


const noteSchema = new Schema({
    userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  problemId: {
    type: Schema.Types.ObjectId,
    ref: 'problemdata',
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// Ensure each user can only have ONE note per problem
noteSchema.index({ userId: 1, problemId: 1 }, { unique: true });

const Note = mongoose.model('note', noteSchema);
module.exports = Note;
