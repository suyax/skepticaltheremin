var mongoose = require('mongoose');
var User = require('../models/user.js');

// Given the name of a user, retrieve their record from the database
exports.createUser = function (name, callback) {

}

exports.findOne = function (name, callback) {
  User.findOne(name, function (err, person) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, person);
  });
};

// Given the name of a user, update their `email` property
exports.updatePins = function (name, newPin, callback) {

  User.findOne(name, function (err, doc) {
    console.log('updating database')
    if (err) {
      callback(err);
      return;
    }

    doc.pins.push(newPin);
    doc.save();
    callback(null, doc.pin);
  
  });

};

// Read all users from the database at once
exports.readAllUsers = function (callback) {
  User.find({}, function (err, persons) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, persons);
  });
};
