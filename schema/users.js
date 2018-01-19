// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique:true},
  password: { type: String, required: false },
  resetPasswordToken: {type: String, default: 00000111},
  resetPasswordExpires: Date,
  country: {type: String, required: false},
  state:{type: String, required: false},
  month:{type: Number, required: false},
  date:{type: Number, required: false},
  year:{type: Number, required: false},
  provider:{type: String, required: false},
  is_login:{type: Number, required: true, default:0},
  userid:{type: String, required: false},
  is_social:{type: Number, required: true, default:0},
  agreement:{type:Boolean, required:true, default:true},
  
  // created_at: Date,
  // ip:{type: Number,required:true},
  // invites:{type: Object, require: true}
},
{
  versionKey: false
}
);

userSchema.statics.findByName = function(username, cb) {
  return this.find({ username: username }, cb);
};

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;