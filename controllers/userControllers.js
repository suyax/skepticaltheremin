var mongoose = require('mongoose');
var User = require('../models/user.js');

// Given the name of a user, retrieve their record from the database
exports.getUserByName = function (name, callback) {
  User.findOne(name, function (err, person) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, person);
  });
};

// Given the name of a user, update their `email` property
exports.updateEmailByName = function (name, newEmail, callback) {

  User.findOne({ name: name }, function (err, doc) {
    if (err) {
      callback(err);
      return;
    }

    doc.email = newEmail;
    doc.save();
    callback(null, doc);
    
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
