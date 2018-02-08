var express = require('express');
var router = express.Router();
var user = require('./../../schema/users');

router.get('/', function (req, res, next) {
    var check_name =req.query.name;
    var findname = { 'username': req.query.username};
    user.findOne(findname, function(err, users) {
        if (users) 
        {
            console.log(users);
            if(users.username==check_name)
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




module.exports = router;