var express = require('express');
var session = require('express-session');
var router = express.Router();

var user = require('./../../schema/users');


var bcrypt = require('bcrypt');
var crypto = require('crypto');



var flash = require('express-flash');



//global variable for bcrypt
const saltRounds = 10;



//Forgot Password Page
router.get('/', function (req, res, next) {
  if(!req.session.user)
  {
    res.render('forgot_password');
  }
  else{
    res.redirect('/lobby');
  }
  
  //Rendering Forgot Password Page
});


//redirect after clicking the link in mail
router.get('/reset/:token', function(req, res) {
  user.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, users) {
    var user_ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    if (!users) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot_password');
    }
    
    else if(users.ip==user_ip)
    {
      console.log(user_ip);
      console.log(users.ip);
      res.render('reset', {user: req.user});
    }
  });
});


//send mail for  password reset succefull
router.post('/reset/:token', function(req, res,next) {
  user.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, users) {
        if (!users) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
          //console.log("password:"+hash)
          
        users.password = hash;
        
        users.resetPasswordToken = undefined;
        users.resetPasswordExpires = undefined;


        users.save(function(err,users_detail) {
          if(err)
          {

          }
            var mailOptions = {
              to: users_detail.email,
              subject: 'Reset Password',
              user: { // data to view template, you can access as - user.name
                name: users_detail.username,
                email:users_detail.email
              }
            }
              
            // Send email.
            res.mailer.send('reset_email', mailOptions, function (err, message) {
              if (err) {
                console.log(err);
                return;
              }
               req.flash('success','Password succefully change');
               res.redirect('/signin');
            });
           
          
        });
      });
  });

});



//To send mail for reset password
router.get('/sendemail',function(req,res,next){
  var useremail=req.query.email_forgot_password;
  var token;
  var user_email;
  //create a token for the user
  console.log('token getting..');
  crypto.randomBytes(20, function(err, buf) {
    token = buf.toString('hex');
    
  });
   
  console.log("toketn get");
  user.findOne({ 'email':useremail }, function(err, users) {              //
    if (!users) {
      req.flash('error', 'No account with that email address exists.');
      return res.redirect('/forgot_password');
    }
    else if(users.is_social==0){
      var user_ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
      users.resetPasswordToken = token;
      users.ip=user_ip;
      user_email-=users.email;
      users.resetPasswordExpires = Date.now() + 300000; // 5 min
        console.log("data in user");
        users.save(function (err,users)  {
        console.log("perfectly save");
        // Setup email data.
        var mailOptions = {
          to: users.email,
          subject: 'Reset Password',
          user: { // data to view template, you can access as - user.name
            name: users.username,
            url: 'http://'+req.headers.host+ '/forgot_password/reset/' + token
          }
        }
      
        // Send email.
        res.mailer.send('email', mailOptions, function (err, message) {
          if (err) {
            console.log(err);
            //res.send('There was an error sending the email'+ err);
            req.flash('error', 'There was an error sending the email');
            return res.redirect('/forgot_password');
          }
          req.flash('info', 'An e-mail has been sent to ' + users.email + ' with further instructions.');
          res.redirect('/forgot_password');
        });
      });
    }
    else{
      req.flash('error', 'Please sign up with Ichallange');
      return res.redirect('/forgot_password');
    }
  });
});

router.get('/seemail',function(res,req,next)
{
  req.render('email');
});

module.exports = router;