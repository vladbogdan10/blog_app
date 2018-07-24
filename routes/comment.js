var express      = require('express'),
    router       = express.Router(),
    Blog         = require('../models/blog'),
    Comment      = require('../models/comment'),
    middleWare   = require('../middleware/middleware'),
    sanitizeHtml = require('sanitize-html');


router.post('/blogs/:id/comments', middleWare.isLoggedIn, function(req, res) {
  Blog.findById(req.params.id, function(err, blog) {
    if (err) {
      req.flash('error', 'Something went wrong! Try again.');
      res.redirect('back');
    } else {
      if (!req.body.comment.body) {
        req.flash('error', 'Your comment could not be submited because was empty!');
        res.redirect('/blogs/' + blog._id);
      } else {
        req.body.comment.text = sanitizeHtml(req.body.comment.body);
        Comment.create(req.body.comment, function(err, comment) {
          if (err) {
            req.flash('error', 'Something went wrong');
            res.redirect('/blogs/' + blog._id);
          } else {
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.author.img = req.user.img;
            comment.save();
            blog.comments.push(comment);
            blog.save();
            req.flash('success', 'Your comment was successfully added');
            res.redirect('/blogs/' + blog._id);
          }
        });
      }
    }
  });
});

module.exports = router;