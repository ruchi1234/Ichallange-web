
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var nodemailer = require('nodemailer');
var multer = require('multer');
var http = require('http');
var util = require('util');
var session = require('express-session');



var check_email = require('./routes/validation/check_email');  
var check_name = require('./routes/validation/check_name');
var check_user = require('./routes/validation/check_user');
var profile_image = require('./routes/profile_image');

var passport = require('passport');
var flash = require('express-flash');
const mailer = require('express-mailer'); // call express

var index = require('./routes/index');
var get_lobby_data = require('./routes/get_lobby_data');

var create_challenge = require('./routes/challenge/create_challenge');
var edit_challenge = require('./routes/challenge/edit_challenge');
var lobby = require('./routes/challenge/lobby');
var play_challenge = require('./routes/challenge/play_challenge'); 
var invites=require('./routes/challenge/invites');
var delete_challenge = require('./routes/challenge/delete_challenge');

var contacts = require('./routes/usersdetail/contact'); 
var change_password = require('./routes/usersdetail/change_password'); 
var signin = require('./routes/usersdetail/signin');
var signup = require('./routes/usersdetail/signup');
var profile = require('./routes/usersdetail/profile');
var forgot_password = require('./routes/usersdetail/forgot_password');
var social_signup = require('./routes/usersdetail/social_signup');
var user_inbox = require('./routes/usersdetail/user_inbox');
var score = require('./routes/challenge/score');
var publish = require('./routes/challenge/publish');
var challenge_detail = require('./routes/challenge/challenge_detail');

var api = require('./api/index');
var challangeApi = require('./api/challange');
var contactapi = require('./api/contact');

var app = express();

// Configure express-mail and setup default mail data.
mailer.extend(app, {
  from: 'rajkumar.webnexus@gmail.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
  user: 'rajkumar.webnexus@gmail.com', // gmail id
  pass: 'web@nexus' // gmail password
  }
});


mongoose.connect('mongodb://localhost/ichallenge', {useMongoClient: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(flash());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser({uploadDir:'./assets/images'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(session(
  { secret: 'dsfgvsdgrgredgbdrefthtrfdhn' ,
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/index', index);
app.use('/check_email', check_email);
app.use('/check_name', check_name);
app.use('/check_user', check_user);
app.use('/profile_image', profile_image);
app.use('/signin', signin);
app.use('/signup', signup);
app.use('/profile', profile);
app.use('/forgot_password', forgot_password);
app.use('/social_signup', social_signup)
app.use('/create_challenge', create_challenge);
app.use('/edit_challenge', edit_challenge);
app.use('/lobby', lobby);
app.use('/contacts', contacts);
app.use('/change_password', change_password);
app.use('/invites',invites);
app.use('/play_challenge',play_challenge);
app.use('/user_inbox',user_inbox);
app.use('/delete_challenge', delete_challenge);
app.use('/score',score);
app.use('/publish',publish);
app.use('/challenge_detail',challenge_detail);
app.use('/get_lobby_data', get_lobby_data);


app.use('/api',api);
app.use('/api/challange',challangeApi);
app.use('/api/contact',contactapi);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = app;

