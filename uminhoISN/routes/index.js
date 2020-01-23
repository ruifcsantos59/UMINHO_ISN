var express = require('express');
var router = express.Router();
var axios = require('axios')
var passport = require('passport')
var bcrypt = require('bcryptjs')

const apiUser = 'http://localhost:3001/api/user';

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/feed', function(req, res){
  res.render('feed');
})


/* POST Sign In */
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/feed',
    successFlash: 'Utilizador autenticado com sucesso!',
    failureRedirect: '/',
    failureFlash: 'Utilizador ou password inválido(s)...'
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