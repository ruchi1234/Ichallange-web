var express = require('express');
var router = express.Router();
var user = require('./../schema/users');
var nodemailer = require('nodemailer');
var fs = require("fs");
var http = require('http');
var util = require('util');


router.post('/signup', function (req, res, next) {
   let response = {};
    
    var findemail = { 'email': req.body.email };
    var registerData = new user({
        'username': req.body.username,
        'email': req.body.email,
        'password': req.body.password,
        'country': req.body.country,
        'state': req.body.state,
        'month': req.body.month,
        'date': req.body.date,
        'year': req.body.year
    });
   
    //console.log(registerData);
    
    user.findOne(findemail, function (err, users) {
        if (err) {
           
            return res.status(500).json({success: false,message:'Something wrong'});
        }
        //if user found.
        else if (users) {
           // console.log('EMAIL already exists');
            res.json({success: false,message:'Email already exist'});
           
            
        }
        else {
            registerData.save(function (err) {
                if (err) {
                    return res.status(500).json({success: false,message:'Something wrong'});
                    
                }
                else {
                    

                    
                    res.json({success: true,message:'Registration successfully'});
           
                }
               
            });
        }
       
    });
    
});
router.get('/signup',function(req,res){
    console.log("hello");
})
router.get('/',function(req,res){
    console.log("hello");
})

module.exports = router;