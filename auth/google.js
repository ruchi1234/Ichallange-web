var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User =  require('./../schema/users');

passport.use(new GoogleStrategy({
    clientID: "515290351127-a9b8mcvub0fmtg0jefec575vlpcujrjt.apps.googleusercontent.com",
    clientSecret: "m0xIsB7JVAqejQfED5eU9Bih",
    callbackURL: "http://ec2-18-218-152-243.us-east-2.compute.amazonaws.com:8080/index/google/callback",
    scope:"profile"
  },
  function(accessToken, refreshToken, profile, done) 
  
  {
      var rad=makeid();
      var name=profile.name.givenName +rad;
    console.log(profile);
    //check user table for anyone with a google  ID of profile.id
    User.findOne({
      'userid': profile.id
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        //No user was found... so create a new user with values from google (all the profile. stuff)
        if (!user) {
            User.findOne({'username': name}, function(err, user_detail) {
                if (err) {
                    return done(err);
                }
               if(!user_detail)
                {
                    user = new User({
                    username: name,
                    email: profile.emails[0].value,
                    userid: profile.id,
                    is_social:1,
                    provider: "google"
                    });
                    user.save(function(err) {
                        if (err) console.log(err);
                    return done(err, user);
                    });

                }
                else {
                    //found user. Return
                    return done(err, user);
                }
            });
        } else {
            //found user. Return
            return done(err, user);
        }
    });
}
));
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

module.exports = passport;