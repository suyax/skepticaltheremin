var mongoose = require('mongoose');

var pinSchema = mongoose.schema({
  note: String,
  lat: Number,
  lng: Number,
  timestamp Number
});

var Pin = mongoose.model('Pin', userSchema);

module.exports.pin = Pin;
module.exports.schema = pinSchema;
