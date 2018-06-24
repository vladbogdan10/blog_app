var express      = require('express'),
    router       = express.Router(),
    Blog         = require('../models/blog'),
    middleWare   = require('../middleware/middleware'),
    sanitizeHtml = require('sanitize-html');


// NEW ROUTE
router.get('/blogs/new', middleWare.isLoggedIn, function(req, res) {
  res.render('new');
});

// CREATE ROUTE
router.post('/blogs', middleWare.isLoggedIn, function(req, res) {
  var title  = req.body.title,
      image  = req.body.image,
      body   = sanitizeHtml(req.body.body, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),
      author = {
        id: req.user._id,
        username: req.user.username
      };

  var newBlog = {title: title, image: image, body: body, author: author};

  Blog.create(newBlog, function(err) {
    if (err) {
      res.render('new');
      console.log(err);
    } else {
      res.redirect('/blogs');
    }
  });
});

// SHOW ROUTE
router.get('/blogs/:id', function(req, res) {
  Blog.findById(req.params.id, function(err, showBlogPost) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('show', {blog: showBlogPost});
    }
  });
});

// EDIT ROUTE
router.get('/blogs/:id/edit', function(req, res) {
  Blog.findById(req.params.id, function(err, blogPost) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('edit', {blog: blogPost});
    }
  });
});

// UPDATE ROUTE
router.put('/blogs/:id', function(req, res) {
  req.body.blog.body = sanitizeHtml(req.body.blog.body, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
  });
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlogPost) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs/' + req.params.id);
    }
  });
});

// DELETE ROUTE
router.delete('/blogs/:id', function(req, res) {
  Blog.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs');
    }
  });
});

module.exports = router;