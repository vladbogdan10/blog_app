var express    = require('express'),
    router     = express.Router(),
    User       = require('../models/user'),
    middleWare = require('../middleware/middleware');


router.get('/user', middleWare.isLoggedIn, function(req, res) {
  res.redirect('/user/' + req.user.id);
});

router.get('/user/:id', middleWare.isOwner, function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render('user', {user: user});
    }
  });
});

router.put('/user/:id', function(req, res) {
  res.send('update route');
});

router.delete('/user/:id', function(req, res) {
  res.send('delete route');
});

module.exports = router;