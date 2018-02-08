

var express = require('express');
var session = require('express-session');
var router = express.Router();
var challenge = require('./../../schema/challenge');
var user = require('./../../schema/users');
var contacts = require('./../../schema/contacts');
var nodemailer = require('nodemailer');
var fs = require("fs");
var multer = require("multer");
var http = require('http');
var util = require('util');

var bcrypt = require('bcrypt');
var crypto = require('crypto');
var async = require('async');     //For crypting the password
var xoauth2=require('xoauth2');

var flash = require('connect-flash');
var passportGoogle = require('./../../auth/google');
var passportFacebook= require('./../../auth/facebook');

//global variable for bcrypt for passwords
const saltRounds = 10;

//Change Password
router.get('/', function (req, res, next) {
    if(!req.session.user)
    {
        res.redirect('/');
    }
    else
    {
        var username = req.session.user.username;
        res.render('change_password',{ 'Username': username });//Rendering Change Password Page
    }
});
  
  
  
  
//Change Password
router.post('/', function (req, res, next) {
    if(!req.session.user)
    {
        res.redirect('/');
    }
    else
    {
        var user_name= req.session.user.username;
        
        bcrypt.hash(req.body.email_change_password, saltRounds, function(err, hash) 
        {
            console.log("password:"+hash);
            var options = { new: true }; 
            var updateData ={'password': hash};
            var query   = { 'username': user_name }; 
            user.findOneAndUpdate(query, updateData, options,
            function(err,users) 
            {
                if (err) 
                {
                    console.log('not updated');
                }
                else 
                {
                    req.session.user=users;
                    var uemail = users.email;
                    var uname = users.username;
                    console.log('Updated succesfuly');
                    res.redirect('/profile');
                }
            });
        }); 
    }
});

module.exports = router;