var mongoose = require('mongoose');
var User = require('../models/user.js');
var Pin = require('../models/pin.js');

//////////////////
//users controllers
//////////////////

exports.addUser = function(name, callback) {
  User.create(name, function (err, person) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, person);
  });
}

exports.removeUser = function(name, callback) {
  User.remove(name, function (err, person) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, person);
  });
}

//////////////////
//pins controllers
//////////////////
exports.findOne = function (name, callback) {
  User.findOne(name, function (err, person) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, person.pins);
  });
};

// var newPin = {address: 'myaddress', lat: 1, lng: 3}
exports.updatePins = function (name, newPin, callback) {

  User.findOne(name, function (err, doc) {
    if (err) {
      callback(err);
      return;
    }

    var pinToCreate = new Pin(newPin);
    pinToCreate._creator = doc._id;

    doc.pins.push(pinToCreate);
    doc.save();

    callback(null, doc.pins);
  
  });

};

exports.removeLastPin = function (name, callback) {

  User.findOne(name, function (err, doc) {
    console.log('remove from database')
    if (err) {
      callback(err);
      return;
    }

    doc.pins.pop();
    doc.save();
    callback(null, doc.pins);
  
  });

};

exports.readAllUsers = function (callback) {
  User.find({}, function (err, persons) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, persons);
  });
};
