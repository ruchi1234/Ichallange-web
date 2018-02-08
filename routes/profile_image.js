
var express = require('express');
var session = require('express-session');
var router = express.Router();
var challenge = require('./../schema/challenge');
var user = require('./../schema/users');
var nodemailer = require('nodemailer');
var fs = require("fs");
var multer = require("multer");

//To store image file in folder

var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './public/images/assets/profile_image'); // set the destination
    },
    filename: function(req, file, callback){
        callback(null, Date.now() + '.png'); // set the file name and extension
    }
});
var upload = multer({storage: storage});

  

//Profile_image
router.post('/', upload.single('profile_image'), function (req, res, next) {
   console.log("hello"+ req.file.filename);
    
    var user_name= req.session.user.username;
    var options = { new: true }; 
    var image = {'image':req.file.filename};
    var query   = { 'username': user_name }; 
    console.log(image);
    user.findOneAndUpdate(query, image, options,
        function(err,users) 
        {
        if (err) 
        {
            console.log('not updated');
        }
        else 
        {
            req.session.user=users;
            var uemail = users.email;
            var uname = users.username;
            console.log('Updated succesfuly');
            res.redirect('/profile');
        }
    });
});
  module.exports = router;