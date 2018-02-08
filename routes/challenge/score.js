
var express = require('express');
var session = require('express-session');
var router = express.Router();
var challenge = require('./../../schema/challenge');
var user = require('./../../schema/users');
var contact = require('./../../schema/contacts');
var score = require('./../../schema/score')
var fs = require("fs");
var multer = require("multer");
var http = require('http');
var util = require('util');

//function to update profile
router.post('/'+':id', function (req, res, next) {  
  
    if(!req.session.user)
    {
      res.redirect('/signin');
    }
    else
    {
        var username = req.session.user.username;
        var user_id = req.session.user._id;
        var challenge_id;
        let marks;
        let user_counter=0;
        var temp_marks = req.body.marks;
        var total_marks = 0;
        var max_marks = 0;
        let correct_answer=[];
        if(!Array.isArray(temp_marks)){
            marks = [temp_marks]; 
        }
        else{
            marks= temp_marks;
        }
        var uid ={'_id': req.params.id};
        var user_answer = req.body.answer;
        
        var player_answer = req.body.right_answer;
        console.log('user_answer: '+user_answer);
        console.log('marks: '+marks);
        console.log('correct_answer: '+player_answer);
        console.log(uid);
        challenge.findOne(uid,function(err,challenges){
            if(err){
                console.log('challenge not found');
            }
            else{
                challenge_id = challenges._id;
                console.log(challenges);

                marks.forEach(function(value,index){
                    var str = challenges.question[index].right_answer;
                    var right_answer = str.toUpperCase();
                    if(user_answer != null){
                        var temp_answer = {};
                        if(user_answer[index] == right_answer){
                            total_marks= total_marks + parseInt(challenges.question[index].question_mark);
                            temp_answer.question = index+1;
                            temp_answer.correct_answer = challenges.question[index].right_answer;
                            temp_answer.player_answer = user_answer[index];
                            correct_answer.push(temp_answer);
                        }
                        else{
                            console.log(total_marks);
                            temp_answer.question = index+1;
                            temp_answer.player_answer = user_answer[index];
                            temp_answer.correct_answer = challenges.question[index].right_answer;
                            correct_answer.push(temp_answer);
                        }

                    }
                    max_marks = max_marks+ parseInt(value);
                })
                console.log('player_id: '+user_id);
                console.log('challenge_id: '+ challenge_id);
                console.log('max_marks: '+max_marks);
                console.log('player_answer'+ JSON.stringify(correct_answer));
                console.log('total_marks: '+ total_marks);
                
            
                var player_score = new score({
                    player_name: username,
                    player_id:user_id,
                    challenge_id:challenge_id,
                    max_marks:max_marks,
                    total_marks:total_marks,
                    player_answer : correct_answer
                });
                player_score.save(function(err,scores){
                    if(err){
                        console.log('score not saved');
                    }
                    else{
                        console.log('score saved');
                        console.log(scores);
                        res.redirect('/lobby');
                    }
                });
            }
        });
        
          
      } 
  });
module.exports = router;  

