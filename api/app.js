var createError = require('http-errors');
var express = require('express');
var path = require('path');


//CONEXÃO À BASE DE DADOS MONGO
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/uminho_isn', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(()=> console.log('Servidor Mongo da API da agenda a correr...'))
  .catch((erro)=> console.log('Mongo: erro na conexão: ' + erro))
  
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/posts');
var groupRouter = require('./routes/groups');

//AUTENTICAÇÃO COM JWT
var passport = require('passport');
var JWTStrategy = require('passport-jwt').Strategy
var ExtractJWT = require('passport-jwt').ExtractJwt

var extractFromQS = function(req){
  var token = null
  if(req.query && req.query.token) token = req.query.token
  return token
}

var extractFromBody = function(req){
  var token = null
  if(req.body && req.body.token) token = req.body.token
  return token
}

passport.use(new JWTStrategy({
  secretOrKey: 'uminho-isn',
  jwtFromRequest: ExtractJWT.fromExtractors([extractFromQS, extractFromBody])
}, async (payload, done) => {
  try{
    return done(null, payload)
  }
  catch(error){
    return done(error)
  }
}))

//FIM DA PARTE DE AUTENTICAÇÃO

var app = express();

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/post', postRouter);
app.use('/api/group', groupRouter);

module.exports = app;
