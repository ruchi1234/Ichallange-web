var express = require('express');
var session = require('express-session');
var router = express.Router();
var bcrypt = require('bcrypt')
var user = require('./../../schema/users');
var challenge = require('./../../schema/challenge');

var flash = require('express-flash');


//global variable for bcrypt
const saltRounds = 10;


//Signup Page
router.get('/', function (req, res, next) {
    res.render('signup');//Rendering Signup Page
});
  
  
  
//Signup user in ichallenge
router.post('/', function (req, res, next) {
    var findemail = { 'email': req.body.email };
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        console.log("password:"+hash);
        var registerData = new user({
            'username': req.body.username,
            'email': req.body.email,
            'password': hash,
            'country': req.body.country,
            'state': req.body.state,
            'agreement':req.body.remember,
            'month': req.body.month,
            'date': req.body.date,
            'year': req.body.year
        });
        console.log(registerData);
        user.findOne(findemail, function (err, users) {
            if (err) {
                console.log("error occured");
            }
            //if user found.
            else if (users) {
                console.log('EMAIL already exists');
                res.render('signup', { title: 'signup' });//Rendering Signup Page
            }
            else {
                registerData.save(function (err,users) {
                    if (err) {
                        console.log('not inserted');
                        res.send(err);
                    }
                    else {
                        var updateData = { '$set': {"invites.$.invitation_user_id": users._id,"invites.$.username": users.username}};

                        var invitation_user_id= {invites :{$elemMatch: {'email':users.email}}};
                        challenge.updateMany(invitation_user_id,updateData,{new:true},
                            function(err,challenges) 
                            {
                                if (err) 
                                {
                                    //req.toastr.error('Not Updated');
                                    console.log('not updated');
                                }
                                else 
                                {
                                    var uemail = users.email;
                                    
                                    req.session.user=users;
                                    console.log('Inserted succesfuly');
                                    res.redirect('/lobby');//Redirecting to lobby page
                                }
                            });
                       
                    }
                });
            }
        });
    });
});

module.exports = router;
  