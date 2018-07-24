var express    = require('express'),
    router     = express.Router(),
    User       = require('../models/user'),
    middleWare = require('../middleware/middleware'),
    multer     = require('multer'),
    upload     = multer({dest: 'public/uploads/profile-images'});

// INDEX ROUTE
router.get('/user', middleWare.isLoggedIn, function(req, res) {
  res.redirect('/user/' + req.user.id);
});

// USER ROUTE
router.get('/user/:id', middleWare.isOwner, function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      req.flash('error', 'Something went wrong! Try again.');
      res.redirect('back');
    } else {
      res.render('user', {user: user});
    }
  });
});

// UPDATE USER ROUTE
router.put('/user/:id', function(req, res) {
  User.findOneAndUpdate({_id: req.user._id}, req.body.user, {upsert: true},
    function(err, foundUser) {
      if (err) {
        req.flash('error', 'Email address already taken!');
        res.redirect('back');
      } else {
        foundUser.changePassword(req.body.user.oldPassword, 
          req.body.user.newPassword, function(passwordErr) {
          if (passwordErr) {
            req.flash('error', passwordErr.message);
            res.redirect('back');
          } else {
            foundUser.save(function(error) {
              if (error) {
                console.log(error);
              } else {
                req.flash('success', 'Successfully updated!');
                res.redirect('back');
              }
            });
          }
        });
      }
    });
});

// DELETE USER ROUTE
router.delete('/user/:id', function(req, res) {
  User.findByIdAndRemove(req.user._id, function(err) {
    if (err) {
      req.flash('error', 'Something went wrong! Try again!');
      res.redirect('back');
    } else {
      req.flash('success', 'Your account has been deleted!');
      res.redirect('/');
    }
  });
});

router.post('/user/avatar', upload.single('img_upload'), function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if (err) {
      req.flash('error', 'Something went wrong! Try again!');
      res.redirect('back');
    } else {
      if (!req.file) {
        req.flash('error', 'Please choose an image!');
        res.redirect('back');
      } else {
        user.img = req.file.path;
        user.save();
        res.redirect('back');
      }
    }
  });
});

module.exports = router;