var express = require('express');
var session = require('express-session');
var router = express.Router();

var user = require('./../../schema/users');

var flash = require('connect-flash');
var passportGoogle = require('./../../auth/google');
var passportFacebook= require('./../../auth/facebook');




/* GOOGLE ROUTER */
router.get('/google', passportGoogle.authenticate('google', {     scope: [
'https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'
] }));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/signup' }),
  function(req, res) {
    
    res.redirect('/social_signup/authenticate');
});




/* FACEBOOK ROUTER */
router.get('/facebook',passportFacebook.authenticate('facebook', {scope : ['public_profile', 'email']
}));

router.get('/facebook/callback',passportFacebook.authenticate('facebook', { failureRedirect: '/signup' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/social_signup/authenticate');
});


router.get('/authenticate', ensureAuthenticated, function(req, res, next) {
  req.session.user=req.user;
  if(req.session.user){
        res.redirect('/lobby');
    }
  else{
        res.redirect('/signup');
    }
});




//function to ensure if the user is authenticated from social
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/signup');
}


module.exports = router;