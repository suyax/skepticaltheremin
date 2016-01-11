var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = require('../models/user.js');
var Pin = require('../models/pin.js');
var UserController = require('../controllers/userControllers');

var dbURI = 'mongodb://localhost/mapstest';

var clearDB = function (done) {
  mongoose.connection.collections['users'].remove(done);
};

describe('User Controller', function () {

  before(function (done) {
    if (mongoose.connection.db) {
      return done();
    }
    mongoose.connect(dbURI, done);
  });

  beforeEach(function (done) {
    clearDB(function () {
      var users = [
       {
          userName: 'mark',
          password: 'markymark',
          pins: [{"lat":37.78696217255432,"lng":-122.40696430206299,"timestamp":1452391665585,"details":{"note":"I LOVE this place."},"infoWindow":{"content":"<p>Dat info dohhh</p>"}}]
        },
        {
          userName: 'lex',
          password: 'lexylex'
        },
        {
          userName: 'Ian',
          password: 'Ianyian'
        },
        {
          userName: 'Nikola',
          password: 'nikoaynik',
          pins: [{"lat":37.78613123179135,"lng":-122.40491509437561,"timestamp":1452394116848,"details":{"note":"I hate this place."},"infoWindow":{"content":"<p>skip skip</p>"}}]
        }
      ];

      User.create(users, done);
      
    });
  });

  describe('Pins Functionality:', function(){

    var newPin0 = {"lat":37.78696217255432,"lng":-122.40696430206299,"timestamp":1452391665585,"details":{"note":"I LOVE this place."},"infoWindow":{"content":"<p>Dat info dohhh</p>"}};
    var newPin1 = {"lat":37.78650430839168,"lng":-122.40644931793213,"timestamp":1452391678701,"details":{"note": "meh could be better..."},"infoWindow":{"content":"<p>llllalala</p>"}};
    var newPin2 = {"lat":37.78613123179135,"lng":-122.40491509437561,"timestamp":1452394116848,"details":{"note":"I hate this place."},"infoWindow":{"content":"<p>skip skip</p>"}};

    it('should have a method that given the name of a user, retrieves their record from the database', function (done) {
    
      var userSearchObj = {userName: 'lex'}; 
      console.log(userSearchObj)
      UserController.findOne(userSearchObj, function(err, res) {
        console.log(res[0].timestamp)
        expect(res[0].timestamp).to.equal(1452394116848);
        // expect(res[0].lat).to.equal(37.78613123179135);
      });
      done();
      
    });

    xit('should have a method that given the name of a user, updates their pins, i.e., add a new breadcrumb', function (done) {

      var username = 'lex';

      UserController.updatePins({userName: username}, newPin1, function(err, enteredPin) {
        expect(JSON.stringify(newPin1)).to.equal(JSON.stringify(enteredPin));
      });
      done();
    });

    xit('should have a method that deletes the most recent pin added', function (done) {

      var username = 'mark';
      // UserController.updatePins({userName: username}, newPin1, function(err, updatedpin) {
      //   if (err) {
      //     return res.json({err: err});
      //   }
      //   res.json(updatedpin);
      // });
      // console.log('a')

      // UserController.updatePins({userName: username}, newPin2, function(err, updatedPin) {
      //   if (err) {
      //     return res.json({err: err});
      //   }
      //   res.json(updatedPin);
      // });

      // console.log('b')

      UserController.removeLastPin({userName: username}, function(err, lastPin) {
        // if (err) {
        //   return res.json({err: err});
        // }
        // res.json(lastPin);
        console.log(lastPin)
        expect(JSON.stringify(lastPin)).to.equal(JSON.stringify(newPin0));

      });

      // UserController.findOne({userName: username}, function(err, res) {
      //   console.log('finding...')
      //   expect(res.length).to.equal(1);
      // });
  
      done();
    });
  });

});
