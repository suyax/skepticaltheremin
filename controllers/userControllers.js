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

//find pins of single user
exports.findOne = function (name, callback) {
  User.findOne(name, function (err, person) {
    if (err) {
      callback(err);
      return;
    }
    
    var pins;
    if (!person) {
      pins = [];
    } else {
      pins = person.pins;
    }
    callback(null, pins);
  });
};

//find user and add new pin to pins collection, one aat a time
exports.updatePins = function (name, newPin, callback) {

  if(!newPin){
    return;
  } else {
    User.findOneAndUpdate(name, {$push: {pins: newPin}}, function (err, doc) {
      if (err) {
        callback(err);
        return;
      }

      console.log('doc:',doc)
      callback(null, doc);
    
    });
  }
};

// buggy
// exports.updatePins = function (name, newPin, callback) {

//   User.findOne(name, function (err, doc) {
//     if (err) {
//       callback(err);
//       return;
//     }
//     console.log('doc1', doc)
//     var pinToCreate = new Pin(newPin);
//     // pinToCreate._creator = doc._id;
//     var pins = doc.pins;
//     pins.push(pinToCreate);
//     doc.save();

//     console.log('doc2',doc)

//     callback(null, doc.pins);
  
//   });

// };

//remove specific pin pin and refactor from remove last
// exports.removePin = function (name, callback) {

//   User.findOne(name, function (err, doc) {
//     console.log('remove from database')
//     if (err) {
//       callback(err);
//       return;
//     }

//     doc.pins.pop();
//     doc.save();
//     callback(null, doc.pins);
  
//   });

// };

//remove last pin
exports.removeLastPin = function (name, callback) {

  User.findOne(name, function (err, doc) {
    console.log('remove from database')
    if (err) {
      callback(err);
      return;
    }

    if(doc){
      doc.pins.pop();
      doc.save();
    }
    callback(null, doc);
  
  });

};

//

//get all people --for testing mostly
exports.getAll = function (callback) {
  User.find({}, function (err, persons) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, persons);
  });
};

//example pins
// [{"lat":37.78696217255432,"lng":-122.40696430206299,"timestamp":1452391665585,"details":{"note":"I LOVE this place."},"infoWindow":{"content":"<p>Dat info dohhh</p>"}},
// {"lat":37.78650430839168,"lng":-122.40644931793213,"timestamp":1452391678701,"details":{"note":"I meh this place."},"infoWindow":{"content":"<p>llllalala</p>"}},
// {"lat":37.78613123179135,"lng":-122.40491509437561,"timestamp":1452394116848,"details":{"note":"I hate this place."},"infoWindow":{"content":"<p>skip skip</p>"}}]
