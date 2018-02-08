var express = require('express');
var session = require('express-session');
var router = express.Router();

var challenge = require('./../../schema/challenge');
var user = require('./../../schema/users');
var score = require('./../../schema/score');
var contacts = require('./../../schema/contacts');


var bcrypt = require('bcrypt');
var crypto = require('crypto');



var flash = require('express-flash');


router.get('/',function(req, res, next)
{
    if(!req.session.user)
    {
      res.redirect('/');
    }
    else
    {
        if(req.session.user.is_social)
        {
            var myString=req.session.user.username;
            console.log(myString);
            var sillyString = myString.slice(0, -5);
            var username =sillyString ;
        }
        else
        {
            var username = req.session.user.username;
            
        }
       
        var user_id= req.session.user._id;
        var user_name= req.session.user.username;
        var player_id={'player_id':user_id};
            var invitation_user_id= {
                $and: [
                        {'is_publish':1},
                        {invites :
                            {$elemMatch:
                                {'username':user_name}
                            }
                        }
                    ]
                };
            challenge.find(invitation_user_id,function(err,challenges)
            {
                if(err)
                {
                    console.log("error occured");
                }
                else
                {
                    score.find(player_id,('player_id challenge_id'),function(err,player){
                        if(err){
                            console.log("player not fetched");
                            //res.render('inbox',{'Username': username ,'test':challenge,'user_id':user_id});//Rendering Lobbypage Page
                        }
                        else{
                            console.log(player);
                            console.log("fetched successfully2");
                            console.log("users"+challenges);
                            res.render('inbox',{ 'Username': username, 'test':challenges,'user_id':user_id,'player':player });//Rendering Inbox page
                        }
                    });
                    
                }
            });
        
    }
});

module.exports = router;