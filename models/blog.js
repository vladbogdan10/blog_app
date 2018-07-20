var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var blogSchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String,
  body: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String,
    img: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
}, {timestamps: true});

blogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Blog', blogSchema);