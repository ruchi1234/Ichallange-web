
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var challengeSchema = new Schema({
    challengeName: { type: String, required: true},
    template: { type: String, required: true },
    Date: {type: String, required: true},
    time: {type: String, required: true} ,
    category: {type: String, required: true},
    series:{type: String, required: true},
    entry:{type: String, required: true},
    invites:{type: String, required: false},
    prize:{type: String, required: false},
    manager: {type: String.name, ref: "User"}, 
    question:[
      {
        'key_question': Number,
        questionlist: [],
        answerlist : []
      }
    ]
  },
  {
    versionKey: false
  }
    );
    var Challenge = mongoose.model('Challenge', challengeSchema);
    module.exports = Challenge;
