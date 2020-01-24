var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../Controllers/UserController');

/* GET user info my-profile . */
router.get('/my-profile/:email', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.user(req.params.email)
        .then(user => res.jsonp(user))
        .catch(e => res.status(500).jsonp(e));
});

/* GET user info login . */
router.get('/:email', passport.authenticate('jwt', { session: false }), function (req, res) {
    User.userLogin(req.params.email)
        .then(user => {
            console.log(user);
            res.jsonp(user)
        })
        .catch(e => res.status(500).jsonp(e)); 
});

/* POST new user */
router.post('/new', (req, res) => {
    User.newUser(req.body)
        .then(user => {
            res.jsonp(user)
        })
        .catch(error => res.status(500).jsonp(error));
});

module.exports = router;
