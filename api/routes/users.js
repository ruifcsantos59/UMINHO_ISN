var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET user info. */
router.get('/:id', passport.authenticate('jwt', {session: false}),function(req, res, next) {
  
});

module.exports = router;
