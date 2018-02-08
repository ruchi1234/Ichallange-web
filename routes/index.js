

var express = require('express');
var session = require('express-session');
var router = express.Router();
var challenge = require('./../schema/challenge');
var user = require('./../schema/users');
var score = require('./../schema/score');

var fs = require("fs");
var multer = require("multer");
var http = require('http');
var util = require('util');

var bcrypt = require('bcrypt');
var crypto = require('crypto');
var async = require('async');     //For crypting the password
var xoauth2=require('xoauth2');
// var mailer = require('express-mailer'); // call express


var flash = require('connect-flash');
var passportGoogle = require('./../auth/google');
var passportFacebook= require('./../auth/facebook');
//To store image file in folder
var upload = multer({ dest: 'assets/images' })
var upload_profile_pic = multer({ dest: 'assets/profile_image' })


//global variable for bcrypt
const saltRounds = 10;

//Ichallenge for home page
router.get('/', function(req, res, next) {
  if(!req.session.user)
  {
    challenge.find({'is_publish':'1'},('Date challengeName manager entry'),function(err,challenges){
      if(err){
        console.log('not found');
      }
      else{
        console.log('found');
        //-console.log(challenges);
        score.aggregate(
          [
             {
               $group : {
                  "_id" : "$challenge_id",
                  highestMarks: { $max: "$total_marks" },
                  player_name:{ $max: '$player_name' },
                  maxMarks:{ $max: '$max_marks' }
                  
               }
             }
             
          
          ], function(err,players) {
            if (err){
              console.log(err);
            } 
            else {
              console.log('players: '+JSON.stringify(players));
              res.render('index',{'challenges':challenges,'player': players})
            }
        }
       )
        // score.find({},function(err,players){
        //   if(err){
        //     console.log(err);
        //   }
        //   else{
        //     console.log('player'+players);
        //     res.render('index',{'challenges':challenges,'player': players});     //Rendering Index Page
        //   }
        // });
        
      }
    });
  }
  else{
    
    res.redirect('/lobby');//Redirect to Lobbypage
      
  }
  
});

router.get('/about_us', function(req, res, next) {
  if(!req.session.user)
  {
    res.render('about_us',{})
  }
  else{
    if(req.session.user.is_social)
    {
        var myString=req.session.user.username;
        console.log(myString);
        var sillyString = myString.slice(0, -5);
        var username =sillyString ;
    }
    else
    {var username = req.session.user.username;}
    res.render('about_us',{'Username': username});
      
  }
  
});
router.get('/carrers', function(req, res, next) {
  if(!req.session.user)
  {
    res.render('carrers',{})
  }
  else{
    if(req.session.user.is_social)
    {
        var myString=req.session.user.username;
        console.log(myString);
        var sillyString = myString.slice(0, -5);
        var username =sillyString ;
    }
    else
    {var username = req.session.user.username;}
    rres.render('carrers',{'Username': username});
      
  }
  
});
router.get('/partnership', function(req, res, next) {
  if(!req.session.user)
  {
    res.render('partnership',{})
  }
  else{
    if(req.session.user.is_social)
    {
        var myString=req.session.user.username;
        console.log(myString);
        var sillyString = myString.slice(0, -5);
        var username =sillyString ;
    }
    else
    {var username = req.session.user.username;}
    res.render('partnership',{'Username': username});
      
  }
  
});
router.get('/investers', function(req, res, next) {
  if(!req.session.user)
  {
    res.render('investers',{})
  }
  else{
    if(req.session.user.is_social)
    {
        var myString=req.session.user.username;
        console.log(myString);
        var sillyString = myString.slice(0, -5);
        var username =sillyString ;
    }
    else
    {var username = req.session.user.username;}
    res.render('investers',{'Username': username});
      
  }
  
});

router.get('/contact_us', function(req, res, next) {
  if(!req.session.user)
  {
    res.render('contact_us',{});
  }
  else{
    if(req.session.user.is_social)
        {
            var myString=req.session.user.username;
            console.log(myString);
            var sillyString = myString.slice(0, -5);
            var username =sillyString ;
        }
        else
        {var username = req.session.user.username;}
    res.render('contact_us',{'Username': username});//Redirect to Lobbypage
      
  }
  
});

router.get('/feedback', function(req, res, next) {
  if(!req.session.user)
  {
    res.render('feedback',{})
  }
  else{
    if(req.session.user.is_social)
    {
        var myString=req.session.user.username;
        console.log(myString);
        var sillyString = myString.slice(0, -5);
        var username =sillyString ;
    }
    else
    {var username = req.session.user.username;}
    res.render('feedback',{'Username': username});
      
  }
  
});

router.get('/sponsors', function(req, res, next) {
  if(!req.session.user)
  {
    res.render('sponsors',{})
  }
  else{
    if(req.session.user.is_social)
        {
            var myString=req.session.user.username;
            console.log(myString);
            var sillyString = myString.slice(0, -5);
            var username =sillyString ;
        }
        else
        {var username = req.session.user.username;} 
        res.render('sponsors',{'Username': username});
      
  }
  
});

router.get('/advertisers', function(req, res, next) {
  if(!req.session.user)
  {
    res.render('advertisers',{})
  }
  else{
    if(req.session.user.is_social)
    {
        var myString=req.session.user.username;
        console.log(myString);
        var sillyString = myString.slice(0, -5);
        var username =sillyString ;
    }
    else
    {var username = req.session.user.username;}
    res.render('advertisers',{'Username': username});
      
  }
  
});
router.get('/terms_of_use', function(req, res, next) {
  if(!req.session.user)
  {
    res.render('terms_of_use',{})
  }
  else{
    res.redirect('/lobby');//Redirect to Lobbypage
      
  }
  
});

						
module.exports = router;

