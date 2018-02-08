
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var challengeSchema = new Schema({
    user_id:{type:String, required:true},
    is_publish:{type:Number,default:0},
    challengeName: { type: String, required: true},
    template: { type: String, required: true },
    Date: {type: String, required: true},
    time: {type: String, required: true} ,
    category: {type: String, required: true},
    series:{type: String, required: true},
    entry:{type: String, required: true},
    invites:{},
    prize:{type: String, required: false},
    manager: {type: String.name, ref: "User"}, 
    question:{}
  },
  {
    versionKey: false
  }
    );
    var Challenge = mongoose.model('Challenge', challengeSchema);
    module.exports = Challenge;
