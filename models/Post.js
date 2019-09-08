const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  likes: {
    type: Number,
    default: 0
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
