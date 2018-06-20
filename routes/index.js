var express  = require('express'),
    router   = express.Router(),
    passport = require('passport'),
    User     = require('../models/user');


router.get('/', function(req, res) {
  res.redirect('/blogs');
});

// INDEX ROUTE
router.get('/blogs', function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log('ERROR!');
    } else {
      res.render('index', {blogs: blogs});
    }
  });
});

// REGISTER ROUTE
router.get('/register', function(req, res) {
  res.render('register');
});

// SIGN UP LOGIC
router.post('/register', function(req, res) {
  var newUser = new User({username: req.body.username, email: req.body.email});
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, function() {
      req.flash('success', 'Welcome to my humble blog project ' + '<strong>' + user.username + '</strong>');
      res.redirect('/blogs');
    });
  });
});

//LOG IN ROUTE
router.get('/login', function(req, res) {
  res.render('login');
});

// LOG IN LOGIC
router.post('/login', passport.authenticate('local', 
  {
    successRedirect: '/blogs',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: 'Welcome Back! '
  }), function(req, res) {
});

// LOG OUT ROUTE
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'Logged you out!');
  res.redirect('/blogs');
});

module.exports = router;