var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/', passport.authenticate('jwt', {session: false}),function(req, res, next) {
  
});

module.exports = router;
