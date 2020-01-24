var express = require('express');
var router = express.Router();
var axios = require('axios')
var passport = require('passport')
var bcrypt = require('bcryptjs')

const apiUser = 'http://localhost:3001/api/user';

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/feed', verificaAutenticacao, function(req, res){
  axios.get(apiUser + '/my-profile/' + req.session.passport.user.email + '?token=' + req.session.passport.user.token)
    .then(dados => res.render('feed', {dados: dados.data}))
    .catch(e => console.log(e));
});

router.get('/signout', verificaAutenticacao, (req,res) => {
  req.logout()
  res.redirect('/')
});

router.get('/my-profile', verificaAutenticacao, (req, res) => {
  res.render('my-profile')
})

/* POST Sign In */
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/feed',
    successFlash: "Utilizador autenticado com sucesso",
    failureRedirect: '/',
    failureFlash: "Utilizador ou password incorretos"
  })
)

/* POST Sign Up */
router.post('/signup', (req, res) => {
  console.log(req.body);
  var hash = bcrypt.hashSync(req.body.password, 8);
  axios.post(apiUser + '/new', {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    password: hash
  })
    .then(data => res.render('signupsuccess'))
    .catch(e => res.render('error', {error: e}));
})

function verificaAutenticacao(req,res,next){
  if(req.isAuthenticated()){
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else{
    res.redirect("/");}
}

module.exports = router;