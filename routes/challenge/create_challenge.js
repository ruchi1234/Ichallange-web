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

var flash = require('express-flash');
var passportGoogle = require('./../../auth/google');
var passportFacebook= require('./../../auth/facebook');

//For storing image files
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './public/images/assets/images' ); // set the destination
    },
    filename: function(req, file, callback){
        callback(null, Date.now() + '.png'); // set the file name and extension
    }
});
  var upload = multer({storage: storage});


//Create Challenge Page
router.get('/', function (req, res, next) {
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
    var contact_user_id = {'user_id': req.session.user._id};
        contacts.find(contact_user_id,function(err,contacts)
        {
            if(err)
            {
                console.log("error occured");
            }
            else
            {
                console.log(contacts);
                res.render('create_challenge',{ 'Username': username , 'contacts':contacts });//Rendering Profile Page
            }
        });
    }
});


invitesHandler = async(req,callback) => {
    var invites= [];
    let contact_name;
    let user_counter=0;
    var temp_contact_name = req.body.invites;
    if(!Array.isArray(temp_contact_name)){
        contact_name = [temp_contact_name]; 
    }
    else{
        contact_name= temp_contact_name;
    }
        contact_name.forEach(function(value,index){
            var invites_name = {'contact_name': value};
            console.log(invites_name);
            contacts.find(invites_name, function(err,contact){
                var uid=0;
                contact.forEach(function(item) {
                    uid=item._id;
                    console.log("uid:"+uid);
                });
                if (err) 
                {console.log('not updated');}
                else if(uid)
                { 
                    console.log(contact);
                    if(uid==user_id)
                    {
                    console.log(contact);
                    var temp_email = contact[0].contact_email;
                    var user_email = {'email': temp_email};
                    user.find(user_email, function(err,user){

                        var uid=0;
                        user.forEach(function(item) {
                            uid=item._id;
                        });
                        if (err) 
                        {console.log('not found');}
                        if(user)
                        {
                            user_counter++;
                            if(uid==0){
                                //For storing invites
                                var tempInvites = {};
                            
                                    tempInvites.invitation_user_id =  null;
                                    tempInvites.username = contact[0].contact_name;
                                    tempInvites.email = contact[0].contact_email;
                                    tempInvites.is_accepted = false;
                                    tempInvites.isInvite = 0;
                                    invites.push(tempInvites);
                                //console.log('not registered: '+JSON.stringify(invites));
                                //callback(invites);
                            }
                            else if (uid){
                                //For storing invites
                                var tempInvites = {};
                            
                                    tempInvites.invitation_user_id =  user[0]._id;
                                    tempInvites.username = user[0].username;
                                    tempInvites.email = user[0].email;
                                    tempInvites.is_accepted = false;
                                    tempInvites.isInvite = 0;
                                    invites.push(tempInvites);
                                    //callback(invites);
                                //console.log('registered'+JSON.stringify(invites));  
                            }
                           if(user_counter == contact_name.length)
                           {
                                callback(invites);
                           }
                        }
                        console.log('call internal');
                       
                    });
                }
                else{
                    callback(invites);
                }
            }
            });
            console.log('call external');
            callback(invites);
        });
}
  


  
//Post Create Challenge Page
router.post('/', upload.any(), function (req, res, next) {
    if(!req.session.user)
    {
        res.redirect('/');
    }
    else{
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
    var user_id= req.session.user._id;
    var questionPoint = req.body.question;
    var answerList = req.body.answer;
    var questionText = req.body.question_cc;
    var imageList = req.files;
    var question = [];
    var right_answer = req.body.right_answer;
    var i=0;
    questionPoint.forEach(function(value,index)
    {
    //For storing question
    var tempQuest = {};
        
        tempQuest.question_mark =  value;
        tempQuest.question_Text = questionText[index];
        if(index == i){
            tempQuest.right_answer = right_answer[index];
            i++;
        }
        //For storing answer
        var answer = [];
        answerList[index].forEach(function(localvalue,localindex){
          var tempAnswer = {};
            tempAnswer.answerText = localvalue;
            imageList.forEach(function(imagevalue, key){
                 if('answer_image['+index+']['+localindex+']' == imageList[key].fieldname){
                   var image = imageList[key].filename;
                   tempAnswer.image = image;
                 }
            })
            answer.push(tempAnswer);
        })
        tempQuest.quesanswerList = answer;
        question.push(tempQuest);
    })
 
invitesHandler(req,function(invites){
    
    //console.log('invites'+invites);   
    console.log('invites'+JSON.stringify(invites));   
   
          
        var challengeData = new challenge({
            user_id: req.session.user._id,
            manager: username,
            challengeName: req.body.challenge_name,
            template: req.body.template,
            Date: req.body.date_cc,
            time: req.body.time,
            category: req.body.category,
            series:req.body.series,
            entry:req.body.entry,
            invites:invites,
            prize:req.body.prize,
            question : question
        });
    
        challengeData.save(function (err,challenge) 
        {
            if (err) 
            {
                console.log('not inserted');
                res.send(err);
            }
            else 
            {
                console.log('inserted successfully');
                req.flash('info', 'An e-mail has been sent  with further instructions.');
                console.log(challenge);
                res.redirect('/profile');
            }
        });
    })
}
});  


module.exports = router;