
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var multer = require('multer');
var http = require('http');
var util = require('util');
var session = require('express-session');


var index = require('./routes/index');
var check_email = require('./routes/check_email');  
var check_name = require('./routes/check_name');
var check_user = require('./routes/check_user');

var app_api = require('./api/index');

var passport = require('passport');
var flash = require('connect-flash');

var app = express();

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
app.use('/api', app_api);

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

