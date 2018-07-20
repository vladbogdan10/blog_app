var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose'); 

var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  img: {type: String, default: 'public/images/user-avatar.png'},
  admin: Boolean
});

UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model('User', UserSchema);