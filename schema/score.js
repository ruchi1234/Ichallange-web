
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scoreSchema = new Schema({
    player_name:{type:String, required:true},
    player_id:{type:String, required:true},
    challenge_id: { type: String, required: true},
    max_marks: { type: String, required: true },
    total_marks: {type: String, required: true},
    player_answer:{}
  },
  {
    versionKey: false
  }
    );
    var score = mongoose.model('score', scoreSchema);
    module.exports = score;
