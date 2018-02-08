var express = require('express');
var router = express.Router();
var user = require('./../../schema/users');

router.get('/', function (req, res, next) {
    var check_email =req.query.check_email;
    var findemail = { 'email': req.query.email};
    user.findOne(findemail, function(err, users) {
        if (users) {
            if(users.email==check_email)
            {
                res.send({ result: 0 });}
                else{
            res.send({ result: 1 });
                }
        }
        else {
            res.send({ result: 0 });
        }
    });
   // res.send({ result: 1 });
});


//Ajax for checking email existence in mongo
router.get('/forgot_password', function (req, res, next) {
    
    var findemail = { 'email': req.query.email};
    user.findOne(findemail, function(err, users) {
        if (users) 
        {
            if(users.is_social)
            {res.send({ result: 2 });}
            else{res.send({ result: 0 });}                      
                
        }
        else {
            
            res.send({ result: 1 });
        }
    });
   
   // res.send({ result: 1 });
});

// router.post('/', function (req, res, next) {
//     var findemail = { 'email': req.body.get_param };
//     user.findOne(findemail, function(err, users) {
//         if (users) {
//             res.send({ result: 1 });
//         }
//         else {
//             res.send({ result: 0 });
//         }
//     });
//    // res.send({ result: 1 });
// });
module.exports = router;