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
    res.redirect('/admin/login');
  }
};

module.exports = middleWareObj;