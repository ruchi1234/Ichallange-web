var express = require('express');
var router = express.Router();
var user = require('./../schema/users');

router.get('/', function (req, res, next) {
    var checkpassword =req.query.check_password;
    var user_name = { 'username': req.query.username};
    user.findOne(user_name, function(err, users) {
        if (users) {
            if(users.password==checkpassword)
            {
                res.send({ result: 0 });}
                else{
            res.send({ result: 1 });
                }
        }
        else {
            res.send({ result: 1 });
        }
    });
   // res.send({ result: 1 });
});
module.exports = router;