var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../Controllers/UserController');
var Post = require('../Controllers/PublicationController');

router.get(
	'/feed/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Post.feed(req.params.id)
			.then(posts => {
				res.jsonp(posts)
			})
			.catch(error => res.status(500).jsonp(error));
	}
);

router.post(
	'/newPost',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Post.newPost(req.body)
			.then(post => {
				User.addPost(post.author, post._id)
					.then(dados => res.jsonp(dados))
					.catch(error => res.status(500).jsonp(error));
			})
			.catch(error => res.status(500).jsonp(error));
	}
);

module.exports = router;
