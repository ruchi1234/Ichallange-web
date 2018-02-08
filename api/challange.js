var express = require('express');
var router = express.Router();
var challenges = require('./../schema/challenge');
var user = require('./../schema/users');
var contacts = require('./../schema/contacts');
var score = require('./../schema/score');
var nodemailer = require('nodemailer');
var fs = require("fs");
var http = require('http');
var util = require('util');

router.post('/create', function (req, res, next) {
    //console.log('create challange is calling'+ JSON.stringify(req.body));
    //let response = {};
    res.json({ status: 200, success: false, message: 'Invalid login details' });

})

router.get('/lobby', function (req, res, next) {
    if (!req.query.user_id) {
        // console.log(req.query);
        res.status(500).json({ success: false, message: 'Something wrong' });
    }
    else {

        const login_user_id = req.query.user_id;
        let lobbyChallangeList = [];


        challenges.find({ 'is_publish': '0' }, ('user_id challengeName manager Date entry invites'))
            .then(function (challenge) {
                challenge.forEach(function (value, index) {
                    value = value.toObject();

                    if (value.entry == "public") {
                        if (value.user_id == login_user_id) {
                            value['isEnterDisable'] = true;
                        }
                        else {
                           //let isEnterEnable =  score.find({ player_id: login_user_id, challenge_id: value._id }, ('player_id challenge_id'));
                           value['isEnterDisable'] = false;
                           
                        }

                    }
                    else {
                        
                        let isInvitedUser =value.invites.filter(function( obj ) {
                            return obj.b == login_user_id;
                        });
                       
                        //let isInvitedUser = value.invites(o => o.invitation_user_id === login_user_id);
                       
                        if (isInvitedUser) {

                            let isEnterEnable = score.find({ player_id: login_user_id, challenge_id: value._id }, ('player_id challenge_id'));
                            
                            value['isEnterDisable'] = isEnterEnable == null ? false : true;
                          
                        }
                        else {
                            value['isEnterDisable'] = true;
                        }

                    }
                    lobbyChallangeList.push(value);
                })
                
                return Promise.all(lobbyChallangeList );
            }).then(function(lobbyChallangeList){
                res.json({ status: 200, success: true, message: 'Successful', challenge: lobbyChallangeList });
               
            })
            .catch(function(error){
                return res.status(500).json({ success: false, message: 'Something wrong' });
                
            })
        
        
    }

})
module.exports = router;