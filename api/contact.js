var express = require('express');
var router = express.Router();
var user = require('./../schema/users');
var challenges = require('./../schema/challenge');
var score = require('./../schema/score');
var contacts = require('./../schema/contacts');
var nodemailer = require('nodemailer');
var fs = require("fs");
var http = require('http');
var util = require('util');
var moment = require('moment');
var Promise = require("bluebird");

router.get('/', function (req, res) {
    if (!req.query.user_id) {
        // console.log(req.query);
        res.status(500).json({ success: false, message: 'Something wrong' });
    }
    else {
        const login_user_id = req.query.user_id;
        var contact_user_id = {'user_id': login_user_id};
        contacts.find(contact_user_id,{},{
            skip:0, // Starting Row
            sort:{
                contact_name : 1 //Sort by total_marks Added DESC
            }},function(err,contact){
            if(err){
                console.log('error'+err);
                res.status(500).json({ status: 500, success: false, message: 'Something happen wrong', contact: []});
            }
            else{
                res.json({ status: 200, success: true, message: 'Successful',contact:contact  }); 
            }
          });
    
    }
})


router.post('/add_contact', function (req, res, next) {
    
    if(!req.body.user_id)
    {
      // console.log(req.query);
      res.status(500).json({ success: false, message: 'Something wrong' });
    }
    else
    {
        const login_user_id = req.body.user_id;
        let condition= { $and: [ { user_id: login_user_id }, { contact_email: req.body.contact_email } ] };
        contacts.findOne(condition, ('_id')).exec()
        .then(function (contactResult) 
        {   
            
            if(!contactResult)
            {
                let contactdata = new contacts({
                    user_id: login_user_id,
                    contact_name: req.body.contact_name,
                    contact_email: req.body.contact_email,
                    contact_mobile: req.body.contact_mobile,
                });
                return contactdata.save().exec()      
            }
            else
            {
                return false;
            }
        })
        .then(function (contacts) {
            if(contacts)
            {
                res.json({ status: 200, success: true, message: 'Successful', contacts: contacts });
            }
            else{
                res.json({ status: 200, success: false, message: 'contact already exist' });
            }
        })
        .catch(function(error){
            console.log(error);
            return res.status(500).json({ success: false, message: 'Something wrong' });
            
        })
    }

});


//Router for update contact details(POST)
//Router for update contact details(POST)
router.post('/update_contact', function(req,res,next){
    
    if(!req.body.user_id)
    {
      // console.log(req.query);
      res.status(500).json({ success: false, message: 'Something wrong' });
    }
    else
    {
      let  uid = req.body.contact_id;
      let id={ '_id' : uid};
      
      let updated_contact_data = ({
        contact_name: req.body.contact_name,
        contact_email: req.body.contact_email,
        contact_mobile: req.body.contact_mobile
      });
  
      contacts.findByIdAndUpdate(id,updated_contact_data,{new:true},function (err,contact) {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: false, message: 'Something wrong contact is not updated' });
        }
        else 
        {
            
            res.json({ status: 200, success: true, message: 'Successful', contacts: contact });
        }
      });
    }
});


//Router for delete contact page(GET)
router.get('/delete_contact/:user_id/:id', function (req, res, next) {
    if(!req.params.user_id)
    {
      // console.log(req.query);
      res.status(500).json({ success: false, message: 'Something wrong' });
    }
    else
    {
      var uid = req.params.id;
      var id={ '_id' : uid};
      console.log(uid);
      contacts.findByIdAndRemove(id,function(err,contact){
        if(err){
            console.log(err);
            return res.status(500).json({ success: false, message: 'Something wrong contact is not deleted' });
        }
        else{
          console.log('contact deleted');
          console.log(contact);
            res.json({ status: 200, success: true, message: 'Successful', contacts: contact });
        }
      });
    }
});
  

module.exports = router;