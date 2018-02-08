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


var count_array=[];
var count;
//profile page
router.get('/', function (req, res, next) {
  if(!req.session.user){
    res.redirect('/signin');
  }
  else{
        var msg;
            if(req.session.user.is_social)
        {
            var myString=req.session.user.username;
            var sillyString = myString.slice(0, -5);
            var username =sillyString ;
        }
        else
        {
            var username = req.session.user.username;
        }
        var user_id = req.session.user._id;
        users = { 'username': req.session.user.username };
        user.findOne(users, function (err, users) {
            if (err) {
                console.log("error occured");
            }
            else{
                var uemail = users.email;
                var image= users.image;
                challenge.find({},('_id challengeName user_id Date time invites is_publish entry'), function(err,challenges)
                {
                    if(err)
                    {
                        console.log("error occured");
                    }
                    else
                    {
                        console.log("fetched successfully");
                        
                        //-console.log("users"+challenges);
                        score.aggregate(
                            [  
                                {
                                    $match:
                                    {
                                        'player_id' : user_id
                                    }
                                }  ,
                                { 
                                    $group: 
                                    { 
                                        "_id" : "$challenge_id",
                                        score: 
                                        { 
                                            $push: 
                                            { 
                                                total_marks: '$total_marks', 
                                                max_marks: '$max_marks', 
                                                player_id: '$player_id',
                                                challange:'$challenge_id'
                                            } 
                                        } 
                                    }
                                },
                                
                                {
                                    $unwind: { path: '$score', includeArrayIndex: 'globalRank', } 
                                },
                                { 
                                    $sort: 
                                    { 
                                        'score.total_marks': -1
                                    } 
                                },                               
                            ]).then(function(player) 
                            {
                                    
                                    player.forEach(function(value,index){
                                        var tot_marks=value.score['total_marks'];
                                        var challenge_id= value.score['challange']
                                        let scores = score.find( {'challenge_id':challenge_id}).distinct('total_marks');
                                        scores.then(function(result){
                                            //console.log('result'+result);
                                            count= 1;
                                            var array_for_count={};
                                            for(var i=0; i< result.length;i++)
                                            { 
                                                
                                                if(tot_marks < result[i])
                                                {
                                                    count = count+1;
                                                }
                                                
                                            }
                                            array_for_count.count = count;
                                            array_for_count.challenge_id = challenge_id;
                                            count_array.push(array_for_count);
                                           // console.log('count_inner1'+JSON.stringify(count_array));
                                        })
                                        console.log(player);
                                        //console.log('count_inner2'+JSON.stringify(count_array));
                                    }); 
                                    res.render('profile',{ 'Username': username ,'Image':image,'Email': uemail,'test':challenges,'is_social':req.session.user.is_social,'user_id':user_id ,'player':player, 'temp_player':player.score});//Rendering Profile Page                          
                                    console.log("Testing inner")
                                    return Promise.all(count_array );
                            }).then(function(count_array){
                                console.log("Testing outer")
                                //console.log('temp_value outer' +count_array);
                            })
                                .catch(function(error){
                                    console.log(error);
                                })
                        
                    }
                });
            }
        });
    }
});
// var count_array=[];
// function rank(tot_marks,challenge_id){
//     console.log('function:   '+ tot_marks+ 'challange: '+challenge_id);
//     var player_challange_id = {'challenge_id':challenge_id};
    
//     score.find( {'challenge_id':challenge_id}).distinct('total_marks',
//         function(err,result){
//         if(err)
//         {
//             console.log(err);
//         }
//         else{
//             console.log(result);
//             var count= 1;
//             for(var i=0; i< result.length;i++)
//             {
                
//                 //-console.log('result'+result[i]);
                
//                 if(tot_marks < result[i])
//                 {
//                     count = count+1;
//                 }
//             }
//             count_array.push(count)
//             console.log('count'+count_array);
//             return count;
//         }
//         console.log('outer'+ count);
        
//     });
// }




//function to update profile
router.post('/', function (req, res, next) {
  
  if(!req.session.user)
  {
    res.redirect('/signin');
  }
  else{
        var user_id= req.session.user._id;                                      //function to change profile in mongodb
        console.log(req.session.user);
        if(req.session.user.is_social)
        {
        var email_social= req.session.user.email;
        var user_name = req.session.user.username;
        }
        else
        {
        var email_social =req.body.email;
        var user_name =req.body.username;
        }                                     //function to change profile in mongodb
        var updateData ={
            'username': user_name,
            'email': email_social,
            'country': req.body.country,
            'state': req.body.state,
            'agreement':req.body.remember,
            'month': req.body.month,
            'date': req.body.date,
            'year': req.body.year
        };
       
        user.findByName(req.body.username, function(err, users_detail) {
            var uid=0;
            console.log("user_detail:"+users_detail);
            users_detail.forEach(function(item) {
                uid=item._id;
                console.log("uid:"+uid);
            });
            if (err) 
            {console.log('not updated');}
            else if(uid)
            { 
                console.log(users_detail);
                if(uid==user_id)
                {
                    user.findByIdAndUpdate(user_id,updateData,{new:true},
                    function(err,users) 
                    {
                        if (err) 
                        {
                        //req.toastr.error('Not Updated');
                        console.log('not updated');
                        }
                        else 
                        {
                            
                            var uemail = users.email;
                            
                            console.log('Updated succesfuly');
                             req.flash('success', 'Data updated successfully');
                            
                            res.redirect('/profile');
                        }
                    });
                }
                else
                {
                    
                
                    
                    console.log(' if part Updated unsuccesfuly');
                    req.flash('error', 'Data not updated successfully');
                    res.redirect('/edit_profile');
                }
            }
            else
            {
                user.findByIdAndUpdate(user_id,updateData,{new:true},function(err,users){
                    if (err){
                        req.flash('error', 'Data not updated successfully');
                        console.log('not updated');
                    }
                    else
                    {
                        if(req.session.user.is_social)
                            {
                                var myString=req.session.user.username;
                                console.log(myString);
                                var sillyString = myString.slice(0, -5);
                                var usernames =sillyString ;
                            }
                            else
                            {
                                var usernames = req.session.user.username;
                                
                            }
                        var challenge_user_id ={'user_id':req.session.user._id};
                        var challenge_query ={'manager': usernames};
                        challenge.update(challenge_user_id, challenge_query,{new:true},
                        function(err,challenges) 
                        {
                            if (err) 
                            {
                                res.send(err);
                                console.log('challenge not updated');
                            }
                            else 
                            {
                                var contact_user_id ={'user_id':user_id};
                                var contact_query ={'manager': usernames};
                                contact.update(contact_user_id, contact_query,{new:true},
                                function(err,contacts) 
                                {
                                    if (err) 
                                    {
                                        //req.toastr.error('Not Updated');
                                        console.log('contacts not updated');
                                    }
                                    else 
                                    {
                                        req.session.user=users;
                                        var uemail = users.email;
                                        
                                        console.log('Updated succesfuly');
                                        // req.flash('msg', "Updated succesfuly");
                                        req.flash('success', 'Data updated successfully');
                                        
                                        
                                        res.redirect('/profile');
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    } 
});


//Edit Profile Page
router.get('/edit_profile', function (req, res, next) {
  if(!req.session.user)
  { res.redirect('/signin');}
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
        var users = { 'username': req.session.user.username };

        console.log(users);
        console.log(username);

        user.findOne(users, function (err, users) {
            if (err) {
                console.log('not fetched');
            }
            else {
                console.log('fetched succesfuly');
                var month = users.month;
                console.log(month);
                res.render('edit_profile', { 'Username': username, test: users });
            }
        });
    }
  //res.render('edit_profile',{ 'Username': username });//Rendering Edit Profile Page
});
  


module.exports = router;





// score.aggregate(
//     [  
//         { 
//             $group: 
//             { 
//                 "_id" : "$challenge_id",
//                 score: 
//                 { 
//                     $push: 
//                     { 
//                         total_marks: '$total_marks', 
//                         max_marks: '$max_marks', 
//                         player_id: '$player_id',
//                         challange:'$challenge_id'
//                     } 
//                 } 
//             }
//         },
//         {
//             $match:
//             {
//                 'score.player_id' : user_id
//             }
//         }  ,
//         {
//             $unwind: { path: '$score', includeArrayIndex: 'globalRank', } 
//         },
//         { 
//             $sort: 
//             { 
//                 'score.total_marks': -1
//             } 
//         },
//         { 
//             $group: 
//             { 
//                 "_id" : "$_id",
//                 score: 
//                 { 
//                     $push: 
//                     { 
//                         total_marks: '$score.total_marks', 
//                         max_marks: '$score.max_marks', 
//                         player_id: '$score.player_id',
//                         challange:'$score.challange'
//                     } 
//                 } 
//             }
//         }                                     
//     ], function(err,player) {
//       if (err){
//         console.log(err);
//       } 
//       else {

//         console.log(player);  
//                 player.forEach(function(value,index){
//                     console.log(player[index]);
//                 }); 

        
//         res.render('profile',{ 'Username': username ,'Image':image,'Email': uemail,'test':challenges,'is_social':req.session.user.is_social,'user_id':user_id ,'player':player, 'temp_player':player.score});//Rendering Profile Page                          
//       }
