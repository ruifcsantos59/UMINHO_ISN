var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../Controllers/UserController');

/* GET user info my-profile . */
router.get('/my-profile/:email', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.user(req.params.email)
        .then(user => {
            res.jsonp(user)
        })
        .catch(e => res.status(500).jsonp(e));
});

/* GET user info login . */
router.get('/:email', passport.authenticate('jwt', { session: false }), function (req, res) {
    User.userLogin(req.params.email)
        .then(user => {
            res.jsonp(user)
        })
        .catch(e => res.status(500).jsonp(e)); 
});

/* GET Find Users per Name */
router.get('/', passport.authenticate('jwt', {session: false}), function(req,res){
    if(req.query.name) {
        User.findUsers(req.query.name)
            .then(users => {
                res.jsonp(users);
            })
            .catch(e => res.status(500).jsonp(e));
    }else {
        res.jsonp({"message": "Não foram encontrados utilizadores com esse nome"})
    }
});

router.post('/addPost/:id', (req, res) => {

})

/* POST find and update user */
router.post('/editProfile/:email', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.updateUser(req.params.email, req.body)
        .then(user => {
            res.jsonp(user);
        })
        .catch(error => res.status(500).jsonp(error));
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
