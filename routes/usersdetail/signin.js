var express = require('express');
var session = require('express-session');
var router = express.Router();

var bcrypt = require('bcrypt');
var flash = require('express-flash');

var user = require('./../../schema/users');

//global variable for bcrypt
const saltRounds = 10;



//Show signin page
router.get('/', function(req, res, next){
    if(!req.session.user){
      res.render('signin');     //Rendering Signin Page
    }
    else{
      res.redirect('/lobby'); //Redirect to Lobbypage
    }
});

//Signin to the ichallenge
router.post('/', function (req, res, next){
    var findemail = { 'email': req.body.email_login };
    console.log(findemail);
    var password = req.body.password_login;
    user.findOne(findemail, function (err, users){
        if (users){
            bcrypt.compare(password,users.password, function(err, result){
                if(result){
                   
                req.session.user=users;
                console.log(res.session);
                res.redirect('/lobby');
                }
                else{
                //Redirect to Lobbypage
                res.render('signin', { span: '**Email or Password entered is incorrect' });//Rendering Signin Page
                }
            });
        }
        else{  
            var findusername = { 'username': req.body.email_login };
            user.findOne(findusername, function (err, users){
                if (users){
                    bcrypt.compare(password,users.password, function(err, result){
                        if(result){
                            req.session.user=users;
                            console.log(req.session.user);
                            console.log(req.session.redirectTo);
                                if(req.session.redirectTo)
                                {
                                    var redirect=req.session.redirectTo.challenge_id;
                                    console.log(redirect);
                                    res.redirect('/play_challenge/'+redirect);
                                }
                                else{
                                    //var username = users.username;
                                    res.redirect('/lobby');
                                }
                        }
                        else{
                            //Redirect to Lobbypage
                            res.render('signin', { span: '** Password is incorrect' });//Rendering Signin Page
                        }
                    });
                }
                else{
                    res.render('signin', { span: '**Email or Username not found'});//Rendering Signin Page
                }
            });
        }
    });
});

//logout the account
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    req.logout();
    console.log(req.session);
    
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
     
    res.redirect('/');//Rendering to singin page
});

module.exports = router;