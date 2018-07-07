var express    = require('express'),
    router     = express.Router(),
    // passport   = require('passport'),
    // User       = require('../models/user'),
    middleWare = require('../middleware/middleware');

// ADMIN ROUTE
router.get('/admin', middleWare.isAdmin, function(req, res) {
  res.render('admin/admin');
});

// // CREATE NEW ADMIN ROUTE
// router.post('/admin', middleWare.isAdmin, function(req, res) {
//   var newAdmin = new User({
//     username: req.body.username,
//     email: req.body.email,
//     admin: true
//   });
//   User.register(newAdmin, req.body.password, function(err) {
//     if (err) {
//       req.flash('error', err.message);
//       return res.redirect('/admin');
//     }
//     passport.authenticate('local')(req, res, function() {
//       req.flash('success', 'New admin created!');
//       res.redirect('/admin');
//     });
//   });
// });

// //LOG IN ROUTE
// router.get('/admin/login', function(req, res) {
//   res.render('admin/admin-login');
// });

// //ADMIN LOGIN
// router.post('/admin/login', passport.authenticate('local', 
//   {
//     successRedirect: '/admin',
//     failureRedirect: '/admin/login',
//     failureFlash: true,
//     successFlash: 'Welcome Back! '
//   }), function(req, res) {
// });

module.exports = router;