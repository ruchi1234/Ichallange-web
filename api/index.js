var express = require('express');
var router = express.Router();
var user = require('./../schema/users');
var challenges = require('./../schema/challenge');
var score = require('./../schema/score');
var nodemailer = require('nodemailer');
var fs = require("fs");
var http = require('http');
var util = require('util');
var moment = require('moment');
var Promise = require("bluebird");
var bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/signup', function (req, res, next) {
    let response = {};
    // console.log(req.body);

    var findemail = { 'email': req.body.email };
    var registerData = new user({
        'username': req.body.username,
        'email': req.body.email,
        'password': req.body.password,
        'country': req.body.country,
        'state': req.body.states,
        /*
         'month': req.body.month,
         'date': req.body.date,
         'year': req.body.year
         */
    });

    console.log(registerData);

    user.findOne(findemail, function (err, users) {
        if (err) {

            return res.status(500).json({ success: false, message: 'Something wrong' });
        }
        //if user found.
        else if (users) {
            // console.log('EMAIL already exists');
            res.json({ status: 200, success: false, message: 'Email already exist' });


        }
        else {
            registerData.save(function (err, user) {
                if (err) {
                    return res.status(500).json({ status: 500, success: false, message: 'Something wrong' });

                }
                else {

                    console.log(user.id);
                    let userInfo = {
                        user_id: user.id,
                        user_name: user.username,
                    }
                    res.json({ status: 200, success: true, userInfo: userInfo, message: 'Registration successfully' });

                }

            });
        }

    });


});
router.post('/login', function (req, res, next) {
    let response = {};
    // console.log(req.body);

    var findEmailOrUser = { $and: [{ $or: [{ 'email': req.body.email }, { 'username': req.body.email }] }, { $or: [{ 'password': req.body.password }] }] };
    user.findOne(findEmailOrUser, function (err, user) {

        if (err) {

            return res.status(500).json({ success: false, message: 'Something wrong' });
        }
        //if user found.
        else if (!user) {
            // console.log('EMAIL already exists');
            res.json({ status: 200, success: false, message: 'Invalid login details' });

        }
        else {

            console.log(user.id);
            let userInfo = {
                user_id: user.id,
                user_name: user.username,
            }
            res.json({ status: 200, success: true, userInfo: userInfo, message: 'Login successfully' });
        }

    });


});
var rank = function (total_marks) {
    return score.distinct('total_marks').count({ "total_marks": { "$gt": total_marks } })

}

router.get('/profile', function (req, res, next) {
    if (req.query.user_id) {
        let logged_in_user = req.query.user_id;
        let isInvitedUser = "";
        let currentChallanges = [];
        let oldChallanges = [];
        let challengeList = [];
        //let my_rank = '-';
        user.findOne({ '_id': req.query.user_id }, ('_id username email image')).exec()
            .then(function (profile) {

                return challenges.find({ 'is_publish': 1 }, ('_id user_id challengeName Date time prize manager entry Category')).exec()
                    .then(function (challangeData) {
                        return [profile, challangeData];
                    })

            })
            .then(function (result) {
                
                let profile = result[0];
                let challangeData = result[1];
                
                var promises = Promise.each(challangeData, function (value, index) {
                    value = value.toObject();

                     return score.find({ 'player_id': logged_in_user, 'challenge_id': value._id }, ('_id player_name player_id max_marks total_marks'))
                        .then(function (hasPlayer) {

                            if (value.invites) {
                                let isInvitedUser = value.invites.filter(function (obj) {
                                    return obj.b == logged_in_user;
                                });
                            }

                            if (hasPlayer || value.user_id == logged_in_user || isInvitedUser != '') {


                                //hasPlayer = hasPlayer.toObject();
                               

                                if (hasPlayer[0]) {
                                    hasPlayer = hasPlayer[0];
                                    //console.log("has player id");
                                    value['my_mark'] = hasPlayer.total_marks;
                                    value['isEnterDisable'] = true;

                                }
                                else {
                                    if (value.user_id == logged_in_user) {
                                        value['isEnterDisable'] = true;
                                    }
                                    else {
                                        value['isEnterDisable'] = false;
                                    }
                                }

                                
                                challengeList.push(value);
                               
                                

                            }
                        })
                });

                Promise.all(promises).then(function (results) {
                   
                    var promises = Promise.each(challengeList, function (value, index) {
                        return rank = score.distinct('total_marks').count({ "total_marks": { "$gt": value.total_marks } }).exec()
                        .then(function (rank) {
                            console.log("my rank " + rank + 1);
                            
                                value.rank = rank + 1;
                           
                           
                            if (moment(new Date(value.date)).format("DD/MM/YYYY") >= moment(new Date(value.date)).format("DD/MM/YYYY")) {
                                currentChallanges.push(value);
                               
                            }
                            else {
                                oldChallanges.push(value);
                            }
                        })
                    });
                    Promise.all(promises).then(function (results) {
                        res.json({ status: 200, success: true, message: 'Successful',profile:profile , currentChallanges: currentChallanges, oldChallanges: oldChallanges });       
                    });
                    
                    
                });

                
            })

            .catch(function (error) {
                res.status(500).json({ status: 500, success: false, message: 'Something happen wrong', profile: {}, currentChallanges: [], oldChallanges: [] });
                console.log(error);
            })
    }
    else {
        res.status(500).json({ status: 500, success: false, message: 'Something happen wrong', profile: {}, currentChallanges: [], oldChallanges: [] });
    }

    //res.send({ status: 200 });
})
router.post('/updatePassword', function (req, res, next) {
    let logged_in_user = req.body.user_id;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
   if(logged_in_user)
   {
        user.findOne({'_id': logged_in_user})
        .then(function(user){
           
            return bcrypt.compare(oldPassword,user.password)
        })
        .then(function(result){
            
            if(result)
            {
                bcrypt.hash(newPassword, saltRounds, function(err, hash) 
                {
                    let updateData = {
                        'password': hash
                    }
                    return user.findOneAndUpdate(logged_in_user,updateData,{new:true})
                })
            }
            else{
                res.json({status: 200, success: false, message: 'old password don`t match'});
            }
        })
        .then(function(result){
            res.json({status: 200, success: true, message: 'Password has been changed successfuly'});
        })
        .catch(function(error){
            console.log(error);
            res.status(500).json({status: 500, success: false, message: 'Something happening wrong'});
        })
    }
    else
    {
        res.status(500).json({status: 500, success: false, message: 'Something happening wrong'});
    }
   console.log(req.body);
})
router.get('/', function (req, res) {
    console.log("hello");
})

module.exports = router;