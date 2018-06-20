var express    = require('express'),
    router     = express.Router();
    // middleWare = require('../middleware/middleware');

router.get('/user/:id', function(req, res) {
  res.render('admin-panel');
});

module.exports = router;