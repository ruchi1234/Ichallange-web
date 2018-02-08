
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

//To display edit challenge page
router.get('/'+':id', function (req, res, next) {
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
                res.render('edit_challenge',{ 'Username': username ,'challenge':challenge, id :uid, 'val':val,'contacts':contacts});//Rendering Edit challenge Page
                    }
                });
            }
        });
    }
});
  

invitesHandler_edit = async(req,callback) => {
    var invites= [];
    let contact_name;
    let user_counter=0;
    var temp_contact_name = req.body.invites;
    console.log('body'+ temp_contact_name);
    // if(!Array.isArray(temp_contact_name)){
    //     contact_name = [temp_contact_name]; 
    //     console.log('isarray:'+ contact_name);
    // }
    // else{
    //     contact_name= temp_contact_name;
    //     console.log('isnotarray:'+ contact_name);
    // }
        console.log('array'+ temp_contact_name);
        temp_contact_name.forEach(function(value,index){
            var invites_name = {'contact_name': value};
            console.log(invites_name);
            contacts.find(invites_name, function(err,contact){
                if(err){
                    console.log('contact not found');
                }
                else{
                    console.log('contact found');
                    console.log(contact);
                    // console.log(contact[0].contact_email);
                    // var temp_email = contact[0].contact_email;
                    // var user_email = {'email': temp_email};
                    // user.find(user_email, function(err,user){

                    //     var uid=0;
                    //     user.forEach(function(item) {
                    //         uid=item._id;
                    //     });
                    //     if (err) 
                    //     {console.log('not found');}
                    //     if(user)
                    //     {
                    //         user_counter++;
                    //         if(uid==0){
                    //             //For storing invites
                    //             var tempInvites = {};
                    //                 console.log(contact);
                    //                 tempInvites.invitation_user_id =  null;
                    //                 tempInvites.username = contact[0].contact_name;
                    //                 tempInvites.email = contact[0].contact_email;
                    //                 tempInvites.is_accepted = false;
                    //                 invites.push(tempInvites);
                    //             //console.log('not registered: '+JSON.stringify(invites));
                    //             //callback(invites);
                    //         }
                    //         else if (uid){
                    //             //For storing invites
                    //             var tempInvites = {};
                            
                    //                 tempInvites.invitation_user_id =  user[0]._id;
                    //                 tempInvites.username = user[0].username;
                    //                 tempInvites.email = user[0].email;
                    //                 tempInvites.is_accepted = false;
                    //                 invites.push(tempInvites);
                    //                 //callback(invites);
                    //             //console.log('registered'+JSON.stringify(invites));  
                    //         }
                    //        if(user_counter == contact_name.length)
                    //        {
                    //             callback(invites);
                    //        }
                    //     }
                    //     console.log('call internal');
                       
                    // });
                }
            });
            console.log('call external');
            // callback(invites);
        });
}



//For edit the challenge in database
router.post('/'+':id', upload.any('answer_image',12), function (req, res, next) {
    if(!req.session.user)
    {
        res.redirect('/');
    }
    else{
        var uid = req.params.id;
        //console.log(uid);
          
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
        
        var files = [];
        var fileKeys = Object.keys(req.files);
    
        fileKeys.forEach(function(key) 
        {
            files.push(req.files[key].filename);
        });  
      
        var questionPoint = req.body.question;
        var answerList = req.body.answer;
        var questionText = req.body.question_cc;
        var imageList = req.files;
        var question = [];
        var right_answer = req.body.right_answer;
        var hidden_image_name = req.body.hidden_image_name;
        //console.log(hidden_image_name);
        i=0;
        questionPoint.forEach(function(value,index){
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
                hidden_image_name[index].forEach(function(imagevalue, key){
                    if(localindex == key){
                        var image = imagevalue;
                        tempAnswer.image = image;
                    }                                
                })
                imageList.forEach(function(imagevalue, key){
                    if('answer_image['+index+']['+localindex+']' == imageList[key].fieldname)
                    {
                        var image = imageList[key].filename;
                        //console.log(image);
                        if(image != null)
                        {
                            tempAnswer.image = image;
                        }
                        //console.log(tempAnswer.image);
                    }
                })
                answer.push(tempAnswer);
                
            })
            //console.log(imageList);
            console.log(answer);
            tempQuest.quesanswerList = answer;
            question.push(tempQuest);
            console.log(question);
        })
invitesHandler_edit(req,function(invites){

    //console.log('invites'+invites);   
    console.log('invites'+JSON.stringify(invites));   
              
    var challengeData = ({
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
        //console.log(challengeData);
        var options = { multi: true }; 
        var query   = { '_id':  uid }; 
        // challenge.findByIdAndUpdate(query, challengeData, options,function(err,challenges) 
        // {
        //     if (err) 
        //     {
        //         //console.log('challenge not updated');
        //         res.send(err);
        //     }
        //     else 
        //     {
        //         // console.log('Challenge Updated');
        //         // console.log(challenges);
        //         res.redirect('/profile');
        //     }
        // });
})
    }
});

module.exports = router;
