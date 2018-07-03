var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
}, {timestamps: true});

module.exports = mongoose.model('Blog', blogSchema);