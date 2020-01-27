var express = require('express');
var router = express.Router();
var axios = require('axios');

/* Para a autorização e encriptação  */
var passport = require('passport');
var bcrypt = require('bcryptjs');

/* PARA OS FICHEIROS */
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

const apiUser = 'http://localhost:3001/api/user';
const apiPost = 'http://localhost:3001/api/post';
const apiGroup = 'http://localhost:3001/api/group';

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/users/:email', verificaAutenticacao, function(req, res) {
	axios
		.get(
			apiUser +
				'/my-profile/' +
				req.params.email +
				'?token=' +
				req.session.passport.user.token
		)
		.then(dados => {
			res.render('myProfile', { dados: dados.data });
		})
		.catch(e => console.log(e));
});

router.get('/addFriend/:id', verificaAutenticacao, function(req, res) {
	axios
		.get(
			apiUser +
				'/addFriend/' +
				req.session.passport.user.email +
				'?friend=' +
				req.params.id +
				'&token=' +
				req.session.passport.user.token
		)
		.then(dados => {
			res.render('feed', { dados: dados.data });
		})
		.catch(e => console.log(e));
});

router.get('/feed', verificaAutenticacao, function(req, res) {
	axios
		.get(
			apiUser +
				'/feed/' +
				req.session.passport.user.email +
				'?token=' +
				req.session.passport.user.token
		)
		.then(dados => {
			console.log(dados.data.friends.posts);
			res.render('feed', { dados: dados.data });
		})
		.catch(e => console.log(e));
});

router.get('/signout', verificaAutenticacao, (req, res) => {
	req.logout();
	res.redirect('/');
});

router.get('/myProfile', verificaAutenticacao, (req, res) => {
	axios
		.get(
			apiUser +
				'/my-profile/' +
				req.session.passport.user.email +
				'?token=' +
				req.session.passport.user.token
		)
		.then(dados => {
			console.log(dados.data);
			res.render('myProfile', { dados: dados.data });
		})
		.catch(e => console.log(e));
});

router.get('/editProfile', verificaAutenticacao, (req, res) => {
	axios
		.get(
			apiUser +
				'/my-profile/' +
				req.session.passport.user.email +
				'?token=' +
				req.session.passport.user.token
		)
		.then(dados => {
			res.render('editProfile', { dados: dados.data });
		})
		.catch(e => console.log(e));
});

router.get('/groups/:id', verificaAutenticacao, (req, res) => {
	axios
		.get(
			apiGroup +
				'/' +
				req.params.id +
				'?token=' +
				req.session.passport.user.token
		)
		.then(dados => {
			console.log(dados.data);
			res.render('group', { dados: dados.data });
		})
		.catch(e => console.log(e));
});

router.get('/groups', verificaAutenticacao, (req, res) => {
	axios
		.get(
			apiUser +
				'/myGroups/' +
				req.session.passport.user._id +
				'/?token=' +
				req.session.passport.user.token
		)
		.then(myGroups => {
			console.log(myGroups.data);
			axios
				.get(apiGroup + '/?token=' + req.session.passport.user.token)
				.then(groups => {
					console.log(myGroups.data);
					console.log(groups.data);
					res.render('groups', {
						myGroups: myGroups.data,
						groups: groups.data
					});
				})
				.catch(e => res.write('Welcome to our API'));
		})
		.catch(e => res.write('Welcome to our API'));
});

router.post(
	'/newGroup',
	upload.single('photo'),
	verificaAutenticacao,
	(req, res) => {
		console.log(req.file);
		console.log(req.body);
		if (req.file) {
			let oldPath = __dirname + '/../' + req.file.path;
			let newPath =
				__dirname + '/../public/files/' + req.file.originalname;

			fs.rename(oldPath, newPath, function(err) {
				if (err) throw err;
			});

			var isPrivate = false;

			if (req.body.isPrivate === 'True') {
				isPrivate = true;
			}

			let date = new Date();

			axios
				.post(
					apiGroup +
						'/newGroup/' +
						'?token=' +
						req.session.passport.user.token,
					{
						createdBy: req.session.passport.user._id,
						name: req.body.name,
						description: req.body.description,
						photo: req.file.originalname,
						dateOfCreation: date.toISOString(),
						isPrivate: isPrivate
					}
				)
				.then(dados => res.redirect('/groups'))
				.catch(e => console.log(e));
		} else {
			var isPrivate = false;

			if (req.body.isPrivate === 'True') {
				isPrivate = true;
			}

			let date = new Date();

			axios
				.post(
					apiGroup +
						'/newGroup/' +
						'?token=' +
						req.session.passport.user.token,
					{
						createdBy: req.session.passport.user._id,
						name: req.body.name,
						description: req.body.description,
						dateOfCreation: date.toISOString(),
						isPrivate: isPrivate
					}
				)
				.then(dados => res.redirect('/groups'))
				.catch(e => console.log(e));
		}
	}
);

router.post(
	'/editProfile',
	upload.single('photo'),
	verificaAutenticacao,
	(req, res) => {
		let oldPath = __dirname + '/../' + req.file.path;
		let newPath = __dirname + '/../public/files/' + req.file.originalname;

		fs.rename(oldPath, newPath, function(err) {
			if (err) throw err;
		});

		axios
			.post(
				apiUser +
					'/editProfile/' +
					req.session.passport.user.email +
					'?token=' +
					req.session.passport.user.token,
				{
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					phone: req.body.phone,
					dateOfBirth: req.body.dateOfBirth,
					gender: req.body.gender,
					description: req.body.description,
					photo: req.file.originalname
				}
			)
			.then(dados => {
				res.render('myProfile', { dados: dados.data });
			})
			.catch(e => console.log(e));
	}
);

router.post('/findUsers', verificaAutenticacao, (req, res) => {
	axios
		.get(
			apiUser +
				'/?name=' +
				req.body.name +
				'&token=' +
				req.session.passport.user.token
		)
		.then(dados => {
			console.log(dados.data);
			res.render('findUsers', { dados: dados.data });
		})
		.catch(e => console.log(e));
});

router.post(
	'/signin',
	passport.authenticate('local', {
		successRedirect: '/feed',
		successFlash: 'Utilizador autenticado com sucesso',
		failureRedirect: '/',
		failureFlash: 'Utilizador ou password incorretos'
	})
);

router.post('/signup', (req, res) => {
	var hash = bcrypt.hashSync(req.body.password, 8);
	axios
		.post(apiUser + '/new', {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phone: req.body.phone,
			email: req.body.email,
			dateOfBirth: req.body.dateOfBirth,
			gender: req.body.gender,
			password: hash
		})
		.then(data => res.render('signupSuccess'))
		.catch(e => res.render('error', { error: e }));
});

router.post(
	'/newPost',
	upload.array('file'),
	verificaAutenticacao,
	(req, res) => {
		if (req.files) {
      let arrayFiles = [];

			for (let index = 0; index < req.files.length; index++) {
				let file = req.files[index];

				let oldPath = __dirname + '/../' + file.path;
				let newPath =
					__dirname + '/../public/files/' + file.originalname;

				fs.rename(oldPath, newPath, function(err) {
					if (err) throw err;
				});

				let newFile = {
					name: file.originalname,
					mimetype: file.mimetype
				};

				arrayFiles.push(newFile);
      }
      
      let date = new Date();
			axios
				.post(
					apiPost +
						'/newPost/' +
						'?token=' +
						req.session.passport.user.token,
					{
						author: req.session.passport.user._id,
						content: req.body.content,
						files: arrayFiles,
						dateOfCreation: date.toISOString()
					}
				)
				.then(dados => {
					res.redirect('/feed');
				})
				.catch(e => console.log(e));
		} else {

			let date = new Date();

			axios
				.post(
					apiPost +
						'/newPost/' +
						'?token=' +
						req.session.passport.user.token,
					{
						author: req.session.passport.user._id,
						content: req.body.content,
						dateOfCreation: date.toISOString()
					}
				)
				.then(dados => {
					res.redirect('/feed');
				})
				.catch(e => console.log(e));
		}
	}
);

function verificaAutenticacao(req, res, next) {
	if (req.isAuthenticated()) {
		//req.isAuthenticated() will return true if user is logged in
		next();
	} else {
		res.redirect('/');
	}
}

module.exports = router;
