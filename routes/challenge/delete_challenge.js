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
  
  
  
  
  //Router for delete challenge(GET)
  router.get('/'+':id', function (req, res, next) {
    if(!req.session.user)
    {
      res.redirect('/');
    }
    else
    {
      var username = req.session.user.username;
      var uid = req.params.id;
      var id={ '_id' : uid};
      console.log(uid);
      challenge.findByIdAndRemove(id,function(err,challenges){
        if(err){
          console.log('challenge not deleted' );
        }
        else{
          console.log('challenge deleted');
          console.log(challenges);
          res.redirect('/profile');
        }
      });
    }
  });

module.exports = router;