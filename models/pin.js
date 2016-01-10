var mongoose = require('mongoose');

var pinSchema = new mongoose.Schema({
  // _creator: {type: String, ref: "User"  },
  id: Number,
  address: String,
  lat: Number,
  lng: Number,
  details: {},
  timestamp: Date
});


var Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;


