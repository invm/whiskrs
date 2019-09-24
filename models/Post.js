const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  postImage: {
    type: String
  },
  likes: {
    type: Array,
    default: []
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
