
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactsSchema = new Schema({
    user_id:{type:String, required:true},
    contact_name: { type: String, required: true},
    contact_email: { type: String, required: true },
    contact_mobile: {type: String, required: false}
  },
  {
    versionKey: false
  }
    );
    var Contacts = mongoose.model('Contacts', contactsSchema);
    module.exports = Contacts;
