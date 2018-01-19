var express = require('express');
var router = express.Router();

/* post users listing. */
router.get('/', function(req, res, next) {
  res.render('signin');
});




module.exports = router;
