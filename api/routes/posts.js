var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../Controllers/UserController');
var Post = require('../Controllers/PublicationController');
var Group = require('../Controllers/GroupController');

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
		console.log(req.query.groupID)
		if(req.query.groupID){
			Post.newPost(req.body)
			.then(post => {
				User.addPost(post.author, post._id)
					.then(dados => {
						Group.addPost(req.query.groupID, post._id)
							.then(g => {
								console.log(g);
								res.jsonp(dados)
							})
							.catch(error => res.status(500).jsonp(error));
					})
					.catch(error => res.status(500).jsonp(error));
			})
			.catch(error => res.status(500).jsonp(error));
		}else {
			Post.newPost(req.body)
			.then(post => {
				User.addPost(post.author, post._id)
					.then(dados => res.jsonp(dados))
					.catch(error => res.status(500).jsonp(error));
			})
			.catch(error => res.status(500).jsonp(error));
		}

	}
);

module.exports = router;
