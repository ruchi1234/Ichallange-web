var express = require('express');
var session = require('express-session');
var router = express.Router();
var challenge = require('./../../schema/challenge');
var user = require('./../../schema/users');
var contact = require('./../../schema/contacts');
var score = require('./../../schema/score');
var fs = require("fs");
var multer = require("multer");
var http = require('http');
var util = require('util');

var bcrypt = require('bcrypt');
var crypto = require('crypto');
var async = require('async');     //For crypting the password
var xoauth2=require('xoauth2');
// var mailer = require('express-mailer'); // call express


var flash = require('express-flash');
var passportGoogle = require('./../../auth/google');
var passportFacebook= require('./../../auth/facebook');
//To store image file in folder
var upload = multer({ dest: 'assets/images' })
var upload_profile_pic = multer({ dest: 'assets/profile_image' })


//global variable for bcrypt
const saltRounds = 10;


var score_player = [];


//profile page
router.get('/:challenge_id', function (req, res, next) {
  if(!req.session.user){
    res.redirect('/signin');
  }
  else{
        var msg;
        
        var challenge_id={'_id':req.params.challenge_id};
        if(req.session.user.is_social)
        {
        var myString=req.session.user.username;
        //console.log(myString);
        var sillyString = myString.slice(0, -5);
        var username =sillyString ;
        }
        else
        {
        var username = req.session.user.username;
        }
        
        
        //console.log(users);
        var score_challenge_id={'challenge_id':req.params.challenge_id};
       
                challenge.find(challenge_id,['_id','challengeName','user_id','prize','manager','entry'], function(err,challenges){
                if(err){
                    console.log("error occured");
                }
                else{
                    console.log("fetched successfully");
                    console.log("users"+challenges);
                    score.find(score_challenge_id,['player_name', 'player_id', 'max_marks', 'total_marks' ,'challenge_id'],{
                      skip:0, // Starting Row
                      sort:{
                        total_marks: -1 //Sort by total_marks Added DESC
                      }},function(err,player) {
                          if (err){
                            console.log(err);
                          } 
                          else {

                            console.log("player"+player);                       
                            res.render('challenge_detail',{ 'Username': username ,'test':challenges,'player':player});//Rendering Profile Page                          
                          }
                      }
                     )
                    
 
                }
            });
                
            
        
    }
});








module.exports = router;