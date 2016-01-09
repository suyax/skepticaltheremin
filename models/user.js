var mongoose = require('mongoose');

// var pinSchema =  require('./pin.js').schema
//esting with simple array for pins value

var userSchema = new mongoose.Schema({
  userName: { type: String, index: { unique: true } },
  password: String,
  pins: Array

});

var User = mongoose.model('User', userSchema);

module.exports = User;
