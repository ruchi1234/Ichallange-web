

var express = require('express');
var session = require('express-session');
var router = express.Router();
var challenge = require('./../../schema/challenge');
var user = require('./../../schema/users');
var contacts = require('./../../schema/contacts');
var nodemailer = require('nodemailer');
var fs = require("fs");
var multer = require("multer");
var http = require('http');
var util = require('util');

var bcrypt = require('bcrypt');
var crypto = require('crypto');
var async = require('async');     //For crypting the password
var xoauth2=require('xoauth2');

var flash = require('connect-flash');
var passportGoogle = require('./../../auth/google');
var passportFacebook= require('./../../auth/facebook');


//Router for contact page(GET)
router.get('/', function (req,res,next){
    if(!req.session.user)
    {
        res.redirect('/');
    }
    else{
    var username = req.session.user.username;
    var contact_user_id = {'user_id': req.session.user._id};
    contacts.find(contact_user_id,function(err,contacts){
      if(err){
        console.log("error occured");
      }
      else{
        console.log(contacts);
        res.render('contacts',{ 'Username': username , 'contacts':contacts });//Rendering Contact Page
      }
    });
  }
});
  
  
  //Router for contact page(POST)
  router.post('/', function (req, res, next) {
    if(!req.session.user)
    {
      res.redirect('/');
    }
    else
    {
      var username = req.session.user.username;
      var uid = req.params.id;
      console.log(username);
      console.log('hello');
      res.redirect('/add_contact');
    }
  });
  
  
  //Router for add contact page(GET)
  router.get('/add_contact', function (req, res, next) {
    if(!req.session.user)
    {
      res.redirect('/');
    }
    else
    {
      var username = req.session.user.username;
      var uid = req.params.id;
      console.log(username);
      console.log('hello');
      res.render('add_contact',{ 'Username': username });
    }
  });
  
  
  //Router for add contact page(POST)
  router.post('/add_contacts', function (req, res, next) {
    if(!req.session.user)
    {
      res.redirect('/');
    }
    else
    {
      var username = req.session.user.username;
      console.log(username);
      //res.redirect('/profile');
      var contactdata = new contacts({
        user_id: req.session.user._id,
        contact_name: req.body.add_contact_name,
        contact_email: req.body.add_contact_email,
        contact_mobile: req.body.add_contact_mobile,
        manager: username
      });
  
      contactdata.save(function (err,contacts) {
        if (err) {
          console.log('not inserted');
          res.send(err);
        }
        else 
        {
          console.log('Inserted succesfuly');
          console.log(contacts);
          res.redirect('/contacts');
        }
      });
    }
  });
  
  //Router for edit contact details 
  router.get('/edit_contact/'+':id', function(req,res,next){
    if(!req.session.user)
    {
      res.redirect('/');
    }
    else
    {
      var username = req.session.user.username;
      var uid = req.params.id;
      var id={ '_id' : uid};
      console.log(uid);
      contacts.findById(id,function(err,contacts){
        if(err){
          console.log('contact not deleted' );
        }
        else{
          console.log('contact deleted');
          console.log(contacts);
          res.render('edit_contact',{ 'Username': username, 'contacts':contacts });
        }
      });
    }
  });
  
  
  //Router for update contact details(POST)
  router.post('/update_contact/'+':id', function(req,res,next){
    if(!req.session.user)
    {
      res.redirect('/');
    }
    else
    {
      var uid = req.params.id;
      var id={ '_id' : uid};
      console.log(uid);
      var username = req.session.user.username;
      console.log(username);
      var updated_contact_data = ({
        user_id: req.session.user._id,
        contact_name: req.body.edit_contact_name,
        contact_email: req.body.edit_contact_email,
        contact_mobile: req.body.edit_contact_mobile
      });
  
      contacts.findByIdAndUpdate(id,updated_contact_data,{new:true},function (err,contacts) {
        if (err) {
          console.log('contact not updated');
          res.send(err);
        }
        else 
        {
          console.log('contact updated succesfuly');
          console.log(contacts);
          res.redirect('/contacts');
        }
      });
    }
  });
  
  
  //Router for delete contact page(GET)
  router.get('/delete_contact/'+':id', function (req, res, next) {
    if(!req.session.user)
    {
      res.redirect('/');
    }
    else
    {
      var username = req.session.user.username;
      var uid = req.params.id;
      var id={ '_id' : uid};
      console.log(uid);
      contacts.findByIdAndRemove(id,function(err,contacts){
        if(err){
          console.log('contact not deleted' );
        }
        else{
          console.log('contact deleted');
          console.log(contacts);
          res.redirect('/contacts');
        }
      });
    }
  });

  module.exports = router;