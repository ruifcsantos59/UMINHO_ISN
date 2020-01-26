var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../Controllers/UserController');

/* GET user info my-profile . */
router.get(
	'/my-profile/:email',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		User.user(req.params.email)
			.then(user => {
				res.jsonp(user);
			})
			.catch(e => res.status(500).jsonp(e));
	}
);

/* GET User groups */
router.get(
	'/myGroups/:id',
	passport.authenticate('jwt', { session: false }),
	function(req, res) {
		User.myGroups(req.params.id)
			.then(groups => {
				res.jsonp(groups);
			})
			.catch(e => res.status(500).jsonp(e));
	}
);

//TO TEST!
router.get(
	'/feed/:email',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		User.feed(req.params.email)
			.then(user => {
				res.jsonp(user);
			})
			.catch(e => res.status(500).jsonp(e));
	}
);

/* GET add friends */
router.get(
	'/addFriend/:email',
	passport.authenticate('jwt', { session: false }),
	function(req, res) {
		User.addFriend(req.params.email, req.query.friend)
			.then(user => {
				res.jsonp(user);
			})
			.catch(e => res.status(500).jsonp(e));
	}
);

/* GET user info login . */
router.get(
	'/:email',
	passport.authenticate('jwt', { session: false }),
	function(req, res) {
		User.userLogin(req.params.email)
			.then(user => {
				res.jsonp(user);
			})
			.catch(e => res.status(500).jsonp(e));
	}
);

/* GET Find Users per Name */
router.get('/', passport.authenticate('jwt', { session: false }), function(
	req,
	res
) {
	if (req.query.name) {
		User.searchUsers(req.query.name)
			.then(users => {
				res.jsonp(users);
			})
			.catch(e => res.status(500).jsonp(e));
	} else {
		res.jsonp({
			message: 'Não foram encontrados utilizadores com esse nome'
		});
	}
});

/* POST find and update user */
router.post(
	'/editProfile/:email',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		User.updateUser(req.params.email, req.body)
			.then(user => {
				res.jsonp(user);
			})
			.catch(error => res.status(500).jsonp(error));
	}
);

/* POST new user */
router.post('/new', (req, res) => {
	User.newUser(req.body)
		.then(user => {
			res.jsonp(user);
		})
		.catch(error => res.status(500).jsonp(error));
});

module.exports = router;
