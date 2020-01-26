var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../Controllers/UserController');
var Post = require('../Controllers/PublicationController');
var Group = require('../Controllers/GroupController');

/* GET All groups */
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Group.groups()
        .then(groups => res.jsonp(groups))
        .catch(error => res.status(500).jsonp(error));
})

/* POST new Post */
router.post('/newGroup', passport.authenticate('jwt', {session: false}), (req, res) => {
    Group.newGroup(req.body)
        .then(group => {
            User.addGroup(group.createdBy, group._id)
                .then(dados => res.jsonp(dados))
                .catch(error => res.status(500).jsonp(error));
        })
        .catch(error => res.status(500).jsonp(error));
});

module.exports = router;
