var mongoose = require('mongoose');
//Required by userController.js

var pinSchema = new mongoose.Schema({
  id: Number,
  address: String,
  lat: Number, //latitude
  lng: Number, //longitude
  details: {},
  timestamp: Date,
  location: String,
  username: String,
  category: String
});


var Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;


