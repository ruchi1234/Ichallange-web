var express = require('express');
var session = require('express-session');
var router = express.Router();
var challenge = require('./../../schema/challenge');
var user = require('./../../schema/users');
var contacts = require('./../../schema/contacts');


var flash = require('express-flash');


router.get('/:challenge_id', function (req, res, next) {
    if(!req.session.user)
    {
        res.redirect('/');
    }
    else{
        if(req.session.user.is_social)
        {
        var myString=req.session.user.username;
        //console.log(myString);
        var sillyString = myString.slice(0, -5);
        var username =sillyString ;
        }
        else
        {
        var username = req.session.user.username;
        }
        var challenge_id={'_id':req.params.challenge_id};
        challenge.findOne(challenge_id,('invites'),function(err,challenge_detail){
            if(err)
            {
                console.log(err);
                //res.send('There was an error sending the email'+ err);
                req.flash('error', 'There was an error sending the emai');
            }
            else
            {   console.log(challenge_detail);
                for( var d=0;d<(challenge_detail.invites).length;d++)
                {
                    var email=challenge_detail.invites[d].email;
                    var mailOptions = {
                        to: challenge_detail.invites[d].email,
                        subject: 'Invitation from ichallenge',
                        user: { // data to view template, you can access as - user.name
                            name: challenge_detail.invites[d].username,
                            by: username,
                            url: 'http://'+req.headers.host+ '/invites/22/'+challenge_detail._id
                        }
                    }
                    // Send email.
                    res.mailer.send('invitation', mailOptions, function (err, message) {
                        if (err) {
                            console.log(err);
                            //res.send('There was an error sending the email'+ err);
                            req.flash('error', 'There was an error sending the email');
                        }
                    });
                }
                        var updateData = { 'is_publish':1};
                        var invitation_email= {'_id':challenge_detail._id};
                        challenge.findOneAndUpdate(invitation_email,updateData,{ upsert: true },
                        function(err,challenges) 
                        {
                            if (err) 
                            {
                                //req.toastr.error('Not Updated');
                                console.log('not updated');
                            }
                            else 
                            {
                                req.flash('info', 'An e-mail has been sent  with further instructions.');
                                
                            }
                        });
                        
                    
                
                console.log(challenge);
                res.redirect('/profile');
            } 
        });
    }
});

module.exports = router;