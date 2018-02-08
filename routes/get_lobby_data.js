var express = require('express');
var session = require('express-session');
var router = express.Router();
var challenge = require('./../schema/challenge');
var user = require('./../schema/users');
var contacts = require('./../schema/contacts');
var score = require('./../schema/score');

var flash = require('express-flash');


router.get('/', (req, res) => {
    if(!req.session.user)
    {
        res.redirect('/signin');
    }
    else{
        var username;
        var user_id = req.session.user._id;
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
        var users = { 'username': req.session.user.username };
        console.log(users);
      
       
                challenge.find({'is_publish':'1'},('user_id challengeName manager Date entry invites'), function(err,challenge)
                {
                    if(err)
                    {
                        console.log("error occured");
                    }
                    else
                    {
                        console.log(challenge);
                        score.find({},('player_id challenge_id'),function(err,player){
                            if(player == null){
                                console.log("player not fetched");
                                //res.render('lobby',{'Username': username ,'test':challenge,'user_id':user_id});//Rendering Lobbypage Page
                            }
                            else{
                                console.log(player);
                                console.log("fetched successfully2");
                                res.render('get_lobby_data',{'Username': username ,'test':challenge,'user_id':user_id,'player':player});//Rendering Lobbypage Page
                            }
                        })
                        // console.log("fetched successfully");
                        // res.render('lobby',{'Username': username ,'test':challenge,'user_id':user_id});//Rendering Lobbypage Page
                    }
                });
    }
});
module.exports = router;