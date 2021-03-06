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

router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Group.consultGroup(req.params.id)
        .then(group => res.jsonp(group))
        .catch(error => res.status(500).jsonp(error));
})

router.get('/addMember/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Group.addMember(req.params.id, req.query.userid)
        .then(group =>{
            User.addGroup(req.query.userid, group._id)
                .then(member => res.jsonp(group))
                .catch(error => res.status(500).jsonp(error));
        })
        .catch(error => res.status(500).jsonp(error));
});

router.get('/addMemberPerEmail/:id', passport.authenticate('jwt', {session: false}), (req, res) =>{
    console.log(req.query);
    User.userLogin(req.query.email)
        .then(user => {
            console.log(user);
            Group.addMember(req.params.id, user._id)
                .then(group => {
                    console.log(group)
                    User.addGroup(user._id, group._id)
                    .then(u => res.jsonp(group))
                    .catch(error => res.status(500).jsonp(error));
                })
                .catch(error => res.status(500).jsonp(error));
        })
        .catch(error => res.status(500).jsonp(error));
});


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
