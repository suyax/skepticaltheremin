var mongoose = require('mongoose');
var User = require('../models/user.js');


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

// exports.removeLastPin = function (name, callback) {

//   User.findOne(name, function (err, doc) {
//     console.log('updating database')
//     if (err) {
//       callback(err);
//       return;
//     }

//     doc.pins.pop();
//     doc.save();
//     callback(null, doc.pins);
  
//   });

// };

exports.readAllUsers = function (callback) {
  User.find({}, function (err, persons) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, persons);
  });
};
