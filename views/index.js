var express = require('express');
var session = require('express-session');
var router = express.Router();
var challenge = require('./../schema/challenge');
var user = require('./../schema/users');
var nodemailer = require('nodemailer');
var fs = require("fs");
var multer = require("multer");
var http = require('http');
var util = require('util');

var flash = require('connect-flash');
var passportGoogle = require('./../auth/google');
var passportFacebook= require('./../auth/facebook');
//To store image file in folder
var upload = multer({ dest: 'assets/images' })
var upload_profile_pic = multer({ dest: 'assets/profile_image' })


//Sign in Page
router.get('/', function(req, res, next) {
  if(!req.session.user)
  {
    res.render('signin');     //Rendering Signin Page
  }
  else{
    
        res.redirect('/lobbypage');//Redirect to Lobbypage
      
  }
  
});

router.post('/', function (req, res, next) {
  var findemail = { 'email': req.body.email_login };
  console.log(findemail);
  var password = req.body.password_login;
  user.findOne(findemail, function (err, users) {
    if (users) {

      if (users.password == password) {
       req.session.user=users;

        //var username = users.username;
        res.redirect('/lobbypage');//Redirect to Lobbypage
      }
      else {
        res.render('signin', { span: '**Email or Password entered is incorrect' });//Rendering Signin Page
      }
    }
    else {
      res.render('signin', { span: '**Email not found'});//Rendering Signin Page
    }
  });
});


//Create Challenge Page
router.get('/create_challenge', function (req, res, next) {
  if(!req.session.user)
  {
    res.redirect('/');
  }
  else{
    if(req.session.user.is_social)
    {
      var myString=req.session.user.username;
     
      var username = myString.slice(0, -5);
       ;
    }
    else
    {
      var username = req.session.user.username;
      
    }
  // console.log(req.query.name);
  res.render('create_challenge',{ 'Username': username });//Rendering Creat Challenge Page
  }
});

//Post Create Challenge Page
router.post('/create_challenge', upload.array('answer_image',12), function (req, res, next) {
  //console.log("post method is calling");
  var username = req.session.user.username;

  var files = [];
  var fileKeys = Object.keys(req.files);

  fileKeys.forEach(function(key) {
      files.push(req.files[key].filename);
  });

  // console.log(req.body.question);
  // console.log(req.body.question_cc);
  // console.log(req.body.answer);
  
  var answerlist=[];
  var answer = req.body.answer;
  answer.forEach(function(entry) {
    answerlist.push(entry);
     // console.log(entry);
  });
  console.log(answerlist);


var questionlist=[]
var question = req.body.question_cc;
question.forEach(function(key,index){
    questionlist.push(key);
  
});
console.log(questionlist);
// console.log(answer);

  // var test = req.body.question_cc;
  // var answerlist;

  // test.forEach(function(key,index){
  //   var temp={
  //     question_marks: req.body.question[key],
  //     question: req.body.question_cc[key].index,
      
  //     answerlist:forEach(function(key_answer,index)
  //     {
  //     answertext:  req.body.answer[key_answer].index
  //     image: files
  //     })
      
  //   }
  // });
  // console.log(test);
  // console.log(temp);
  // console.log(answerlist);
  
  // var question =
  // { 
  //   'key_question': 132,
  //   'questionlist': [
  //   question_marks = req.body.question,
  //   question = req.body.question_cc,
  //   ],
  //   'answerlist': [
  //     key=1,
  //     answertext=req.body.answer,
  //     image= files
  //   ]  
  // }
  //    console.log(question);
  // }
  // var challengeData = new challenge({
  //      manager: username,
  //     challengeName: req.body.challenge_name,
  //     template: req.body.template,
  //     Date: req.body.date_cc,
  //     time: req.body.time ,
  //     category: req.body.category,
  //     series:req.body.series,
  //     entry:req.body.entry,
  //     invites:req.body.invites,
  //     prize:req.body.prize,
  //     question : question
  //   });

  // challengeData.save(function (err,challenge) {
  //   if (err) {
  //     console.log('not inserted');
  //     res.send(err);
  //   }
  //   else 
  //   {
  //     console.log('Inserted succesfuly');
  //     console.log(challenge);
  //     res.redirect('/profile');
  //   }
});
  


//Forgot Password Page
router.get('/forgot_password', function (req, res, next) {
  res.render('forgot_password');//Rendering Forgot Password Page
});

                 
// router.post('/forgot_password', function (req, res) {
//   res.redirect('/confirm_password');

// });

router.post('/confirm_password', function (req, res) {
  res.render('confirm_password')//Rendering Confirm Password Page
});


//Signup Page
router.get('/signup', function (req, res, next) {
  res.render('signup');//Rendering Signup Page
});




router.post('/signup', function (req, res, next) {
 var findemail = { 'email': req.body.email };
 var registerData = new user({
   'username': req.body.username,
   'email': req.body.email,
   'password': req.body.password,
   'country': req.body.country,
   'state': req.body.state,
   'agreement':req.body.remember,
   'month': req.body.month,
   'date': req.body.date,
   'year': req.body.year
 });
 console.log(registerData);

 user.findOne(findemail, function (err, users) {
   if (err) {
     console.log("error occured");
   }
   //if user found.
   else if (users) {
     console.log('EMAIL already exists');
     res.render('signup', { title: 'signup' });//Rendering Signup Page
   }
   else {
     registerData.save(function (err) {
       if (err) {
         console.log('not inserted');
         res.send(err);
       }
       else {
         console.log('Inserted succesfuly');
         res.redirect('/');//Redirecting to Signin Page
       }
     });
   }
 });
});


//LobbyPage After signup 
router.get('/lobbypage', (req, res) => {
  if(!req.session.user)
  {
    res.redirect('/');
  }
  else{
    var username;
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
    
    user.findOne(users, function (err, users) {
      if (err) {
        console.log("error occured");
      }
      else{
        var uemail = users.email;
        console.log(uemail);
        challenge.find({}, function(err,challenge){
          if(err){
            console.log("error occured");
          }
          else{
            console.log("fetched successfully");
            res.render('lobbypage',{'Username': username ,'test':challenge});//Rendering Lobbypage Page
          }
        });
       }
    });
  }
  //Rendering Lobby Page
});

// router.post('/lobbypage', function (req, res, next) {
//   res.render('lobbypage');
// });





//Profile Page
// router.get('/profile', function (req, res, next) {
//   if(!req.session.user)
//   {
//     res.redirect('/');
//   }
//   else
//   {
//     var users = { 'username': req.session.user.username };
//     var username = req.session.user.username;
//     console.log(users);
    
//     user.findOne(users, function (err, users) {
//       if (err) {
//         console.log("error occured");
//       }
//       else{
//         var uemail = users.email;
//         console.log(uemail);
//         res.render('profile',{ 'Username': username ,'Email': uemail});//Rendering Profile Page
//       }
//     });
//   }
// });
var message=0;
var messagesfail=0;
router.get('/profile', function (req, res, next) {
  if(!req.session.user)
  {
    res.redirect('/');
  }
  else
  {
    var msg;
    if (message)
    {
     
      req.flash("msg", "Data updated successfully");
      msg=req.flash('msg');
      
      message=0;
    }
    else{
      msg=null;
      
    }
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
     users = { 'username': req.session.user.username };
    
    console.log(users);
    
    user.findOne(users, function (err, users) {
      if (err) {
        console.log("error occured");
      }
      else{
        var uemail = users.email;
        console.log(uemail);
        var challenge_manager = { 'manager': req.session.user.username };
        challenge.find(challenge_manager, function(err,challenge){
          if(err){
            console.log("error occured");
          }
          else{
            console.log(challenge);
            console.log("fetched successfully");
          
            res.render('profile',{ 'Username': username ,'Email': uemail,'test':challenge,'is_social':req.session.user.is_social, 'messages':msg });//Rendering Profile Page
          }
        });
        // res.render('profile',{ 'Username': username ,'Email': uemail});//Rendering Profile Page
      }
    });


  }
});

//function to update profile
router.post('/profile', function (req, res, next) {
  
  if(!req.session.user)
  {
    res.redirect('/');
  }
  else{
  var user_id= req.session.user._id;    
  if(req.session.user.is_social)
  {
     var email_social= req.session.user.email;
  }
  else
  {
    var email_social =req.body.email;
  }                                 //function to change profile in mongodb
  var updateData ={
    'username': req.body.username,
    'email': email_social,
    'country': req.body.country,
    'state': req.body.state,
    'agreement':req.body.remember,
    'month': req.body.month,
    'date': req.body.date,
    'year': req.body.year
  };
 
  user.findByName(req.body.username, function(err, users_detail) {
    var uid=0;
    console.log("user_detail:"+users_detail);
      users_detail.forEach(function(item) {
        uid=item._id;
        console.log("uid:"+uid);
      });
    if (err) 
    {
     
      console.log('not updated');
    }
    else
    if(uid)
    { 
      console.log(users_detail);
      
      if(uid==user_id)
      {
        user.findByIdAndUpdate(user_id,updateData,{new:true},
          function(err,users) 
          {
            if (err) 
            {
              //req.toastr.error('Not Updated');
              console.log('not updated');
            }
            else 
            {
              var uemail = users.email;
              var uname = users.username;
              console.log('Updated succesfuly');
              // req.flash("msg", "Data updated successfully");
              //res.locals.messages = req.flash();
              message = 1;
              //console.log(res.locals.messages);
              res.redirect('/profile');
            }
          });
      }
      else
      {
        
        console.log(req.body.user_id);
        
        console.log(uid);
        console.log(users_detail);
        //req.toastr.error('Not Updated');
        console.log(' if part Updated unsuccesfuly');
        messagesfail=1;
        res.redirect('/edit_profile');
      }
  }
  else
  {
    user.findByIdAndUpdate(user_id,updateData,{new:true},
      function(err,users) 
      {
        if (err) 
        {
          //req.toastr.error('Not Updated');
          console.log('not updated');
        }
        else 
        {
          req.session.user=users;
          var uemail = users.email;
          var uname = users.username;
          console.log('Updated succesfuly');
          // req.flash('msg', "Updated succesfuly");
          message = 1;
         
          console.log(res.locals.messages);
          res.redirect('/profile');
        }
      });
    }
  });
  
  
  // user.findOne(users, function (err, users) {
} 
});


//Edit Profile Page
router.get('/edit_profile', function (req, res, next) {
  if(!req.session.user)
  {
    res.redirect('/');
  }
  else{ 
    var msg;
    if (messagesfail)
    {
      req.flash("msg", "Data is not updated ");
      msg=req.flash('msg');
      messagesfail=0;
    }
    else
    {
      msg=null;
    } 
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
  console.log(username);
  
  user.findOne(users, function (err, users) {
    if (err) {
      console.log('not fetched');
    }
    else {
      console.log('fetched succesfuly');
      var month = users.month;
      console.log(month);
      res.render('edit_profile', { 'Username': username, test: users,'messages':msg });
    }
  });
}
  //res.render('edit_profile',{ 'Username': username });//Rendering Edit Profile Page
});
  
  

//Change Password
router.get('/change_password', function (req, res, next) {
  if(!req.session.user)
  {
    res.redirect('/');
  }
  else{
  var username = req.session.user.username;
 
  res.render('change_password',{ 'Username': username });//Rendering Change Password Page
  }
});




//Change Password
router.post('/change_password', function (req, res, next) {
  if(!req.session.user)
  {
    res.redirect('/');
  }
  else{
  var user_name= req.session.user.username;
  console.log(user_name);
  var options = { new: true }; 
  var updateData ={'password': req.body.email_change_password};
  var query   = { 'username': user_name }; 
  user.findOneAndUpdate(query, updateData, options,
    function(err,users) 
    {
      if (err) 
      {
        console.log('not updated');
      }
      else 
      {
        req.session.user=users;
        var uemail = users.email;
        var uname = users.username;
        // req.flash("msg", "Data updated successfully");
        //         res.locals.messages = req.flash();
        console.log('Updated succesfuly');
        res.render('profile',{ 'Username': uname ,'Email': uemail});
      }
    }); 
  }
});


//logout the account
router.get('/logout', function (req, res, next) {
  req.session.destroy();
  req.logout();
  console.log(req.session);
  
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
   
  res.redirect('/');//Rendering to singin page
});



/* GOOGLE ROUTER */
router.get('/google',
  passportGoogle.authenticate('google', {     scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
] }));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    
    res.redirect('/authenticate');
  });

/* FACEBOOK ROUTER */
router.get('/facebook',
passportFacebook.authenticate('facebook', { 
  scope : ['public_profile', 'email']
}));

router.get('/facebook/callback',
passportFacebook.authenticate('facebook', { failureRedirect: '/' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/authenticate');
});


router.get('/authenticate', ensureAuthenticated, function(req, res, next) {
  req.session.user=req.user;
  res.redirect('/lobbypage');
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}
  

  router.get('/edit_challenge/'+':id', function (req, res, next) {
    if(!req.session.user)
    {
      res.redirect('/');
    }
    else{
    var username = req.session.user.username;
    var uid = req.params.id;
    console.log(uid);
    challenge.findById({ '_id': uid }, function (err, challenge) {
      if (err) {
        console.log('not fetched');
      }
      else {
        console.log('fetched successfully');
        res.render('edit_challenge',{ 'Username': username ,'test':challenge, id :uid});//Rendering Edit challenge Page
      }
    });
   }
  });


module.exports = router;

// router.post('/forgot_password', function (req, res, next) {
//   //console.log("in post");
//   var findemail = { 'email': req.body.email_forgot_password };
//   user.findOne(findemail, function (err, users) {
//     if (users) {
//       if (users.password == password) {
//         var username = users.username;
//         res.redirect('/lobbypage');
//       }
//       else {
//         res.render('signin', { span: '**Email or Password entered is incorrect' });
//       }
//     }
//     else {
//       console.log('Email not found ');
//       console.log('Email not found ');
//       res.render('signin', { span: '**Email not found' });
//     }
//   });
// });

// router.get('/mail',function(req,res,next){
//    var smtpTransport = nodemailer.createTransport("SMTP",{
//              host: "smtp.gmail.com", // hostname
//     secureConnection: true, // use SSL
//     port: 465, // port for secure SMTP
//             auth: {
//                  user: "rajkumar.webnexus@gmail.com",
//                  pass: "web@nexus"
//             }
//         });
//         var mailOptions = {
//           from: "deepaknath.webnexus@gmail.com", // sender address
//           to: "deepaknath.webnexus@gmail.com", // list of receivers
//           subject: "hi" + " ✔", // Subject line
//           //text: "Hello world ✔", // plaintext body
//           html: "<b>Testing </b>" // html body
//         }
//         smtpTransport.sendMail(mailOptions, function(error, response){
//         if(error){
//              res.send("Email could not sent due to error: "+error);
//         }else{
//              res.send("Email has been sent successfully");
//         } 
//     }); 
// })



