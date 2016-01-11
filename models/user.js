//Users should have a unique username, password, and an array
//for storeing pins.
//Required by userController.js

var mongoose = require('mongoose');
var Pin =  require('./pin.js') //no longer needed here

var userSchema = new mongoose.Schema({
  username: { type: String, index: { unique: true } },
  password: String,
  pins: Array
});


var User = mongoose.model('User', userSchema);


module.exports = User;
