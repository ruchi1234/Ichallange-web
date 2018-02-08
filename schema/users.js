// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique:true},
  password: { type: String, required: false },
  resetPasswordToken: {type: String},
  country: {type: String, required: false},
  state:{type: String, required: false},
  month:{type: Number, required: false},
  date:{type: Number, required: false},
  year:{type: Number, required: false},
  provider:{type: String, required: false},
  ip:{type: String, required: false},
  resetPasswordExpires: { type: Date ,required: false},
  is_login:{type: Number, required: true, default:0},
  userid_social:{type: String, required: false},
  is_social:{type: Number, required: true, default:0},
  agreement:{type:Boolean, required:true, default:true},
  image:{type:String, required:false, default:null}
  
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