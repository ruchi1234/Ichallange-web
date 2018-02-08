


var express = require('express');
var session = require('express-session');
var router = express.Router();
var challenge = require('./../../schema/challenge');
var user = require('./../../schema/users');
var contacts = require('./../../schema/contacts');
var nodemailer = require('nodemailer');
var fs = require("fs");
var http = require('http');
var util = require('util');


//Play Challenge Page
router.get('/'+':id', function (req, res, next) {
    if(!req.session.user)
    {
      res.redirect('/');
    }
    else
    {
      if(req.session.user.is_social)
      {
        var myString=req.session.user.username;
        var username = myString.slice(0, -5);
      }
      else
      {
        var username = req.session.user.username;
      }
      var username = req.session.user.username;
      var uid = req.params.id;
      console.log(username);
      challenge.findById({ '_id': uid }, function (err, challenge) 
        {
            if (err) 
            {
                console.log('not fetched');
            }
            else 
            {
                var contact_user_id = {'user_id': req.session.user._id};
                contacts.find(contact_user_id,function(err,contacts)
                {
                    if(err)
                    {
                        console.log("error occured");
                    }
                    else
                    {
                        console.log('fetched successfully');
                var val= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                res.render('play_challenge',{ 'Username': username ,'challenges':challenge, id :uid, 'val':val,'contacts':contacts});//Rendering Edit challenge Page
                    }
                });
            }
        });
    }
});


router.post('/'+':id', function (req, res, next) {
    if(!req.session.user)
    {
        res.redirect('/');
    }
    else
    {
        
    }
});
module.exports= router;