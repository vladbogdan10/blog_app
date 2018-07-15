middleWareObj = {};

middleWareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('/login');
  }
};

middleWareObj.isAdmin = function (req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    return next();
  } else {
    req.flash('error', 'You need to be logged in as admin to do that');
    res.redirect('/login');
  }
};

middleWareObj.isOwner = function(req, res, next) {
  if (req.isAuthenticated() && req.user._id == req.params.id) {
    return next();
  } else {
    res.redirect('/user');
  }
};

module.exports = middleWareObj;