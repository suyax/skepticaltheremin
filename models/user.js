var mongoose = require('mongoose');

var userSchema = mongoose.schema({
  userName: { type: String, index: { unique: true } };
  password: String;
  pins: Array;
})

var User = mongoose.model('User', userSchema);
