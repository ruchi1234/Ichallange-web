var express = require('express');
var session = require('express-session');
var router = express.Router();

var user = require('./../../schema/users');


var bcrypt = require('bcrypt');
var crypto = require('crypto');



var flash = require('express-flash');



//global variable for bcrypt
const saltRounds = 10;



router.get('/:invitation_id/:challenge_id',function(req,res,next)
{

    var invitation_id= req.params.invitation_id;
    var challenge_id= req.params.challenge_id;
    req.session.redirectTo= {'challenge_id':challenge_id,'invitation_id':invitation_id};
    if(!req.session.user)
    {
        res.redirect('/signin');
    }
    else
    {
        res.redirect('/play_challenge/'+challenge_id);
    }


});

module.exports = router;