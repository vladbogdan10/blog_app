var express    = require('express'),
    router     = express.Router(),
    Blog       = require('../models/blog'),
    User       = require('../models/user'),
    middleWare = require('../middleware/middleware');

// ADMIN ROUTE
router.get('/admin',middleWare.isAdmin, function(req, res) {
  if (!req.user) {
    req.flash('error', 'Login as admin!');
    res.redirect('/login');
  } else {
      Blog.find({'author.username': req.user.username})
      .sort({createdAt: -1})
      .exec(function(err, blogs) {
      if (err) {
        req.flash('error', 'Something went wrong! Try again.');
        res.redirect('back');
      } else {
        res.render('admin/admin', {blogs: blogs});
      }
    });
  }
});

// NEW ADMIN ROUTE
router.get('/admin/new', middleWare.isAdmin, function(req, res) {
  res.render('admin/new');
});

// CREATE NEW ADMIN ROUTE
router.post('/admin', middleWare.isAdmin, function(req, res) {
  var newAdmin = new User({
    username: req.body.username,
    email: req.body.email,
    admin: true
  });
  User.register(newAdmin, req.body.password, function(err) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/admin');
    } else {
      res.redirect('/admin');
    }
  });
});

module.exports = router;