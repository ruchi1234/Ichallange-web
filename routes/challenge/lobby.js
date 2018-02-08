
var express = require('express');
var session = require('express-session');
var router = express.Router();
var challenge = require('./../../schema/challenge');
var user = require('./../../schema/users');
var contacts = require('./../../schema/contacts');
var score = require('./../../schema/score');
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


//LobbyPage After signup 
router.get('/',(req,res) =>{
    if(!req.session.user)
    {
        res.redirect('/signin');
    }
    else{
        var username;
        var user_id = req.session.user._id;
        if(req.session.user.is_social)
        {
            var myString=req.session.user.username;
            console.log(myString);
            var sillyString = myString.slice(0, -5);
            var username =sillyString ;
        }
        else
        {
            var username = req.session.user.username;
            
        }
        res.render('lobby',{'Username': username ,'user_id':user_id});//Rendering Lobbypage Page);
    }
});

module.exports = router;




