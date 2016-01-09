var mongoose = require('mongoose');

var pinSchema = new mongoose.Schema({
  address: String,
  lat: Number,
  lng: Number,
  details: {},
  timestamp: Date
});

var Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;


