var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = require('../models/user.js');
var Pin = require('../models/pin.js');

var UserController = require('../controllers/userControllers.js');

var dbURI = 'mongodb://localhost/mapstest';

var clearDB = function (done) {
  mongoose.connection.collections['users'].remove(done);
};

describe('User Controller', function () {
  // Connect to database before any tests
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
            username: 'lex',
            password: 'lexylex',
            pins: [{"lat":37.78696217255432,"lng":-122.40696430206299,"timestamp":1452391665585,"details":{"note":"I LOVE this place."},"infoWindow":{"content":"<p>Dat info dohhh</p>"}}]
          },
          {
            username: 'Ian',
            password: 'Ianyian'
          },
          {
            username: 'Nikola',
            password: 'niki',
            pins: [{"lat":37.78613123179135,"lng":-122.40491509437561,"timestamp":1452394116848,"details":{"note":"I hate this place."},"infoWindow":{"content":"<p>skip skip</p>"}}]
          }
        ];
     
      User.create(users, done);
    })
  });

  it('should have a method that creates a new user record in the database', function (done) {
    // console.log('create user test')
    var query = {username: 'mark', password: 'mypassword', pins: [] }; 
  
    UserController.addUser(query, function(err, res) {
      expect(JSON.stringify(res)).to.equal(JSON.stringify(query));
    });

    done();
  });

  it('should have a method that deletes a user record in the database', function (done) {

    var newuser = {username: 'mark'}; 
    UserController.removeUser(newuser, function(err, res) {
      expect(res).to.equal(JSON.stringify({"ok":1,"n":0}));
    });
    done();

  });

  it('should have a method that given the name of a user, retrieves their record from the database', function (done) {
  
    var userSearchObj = {username: 'lex'};

    UserController.findOne(userSearchObj, function(err, res) {
      expect(res.pins.timestamp).to.equal(1452391665585);
    });
    
    done();

  });

  it('should have a method that given the name of a user, updates their pins, i.e., add a new breadcrumb', function (done) {

    var username = 'Ian';
    var newpin = {"lat":37.78650430839168,"lng":-122.40644931793213,"timestamp":1452391678701,"details":{"note":"I meh this place."},"infoWindow":{"content":"<p>llllalala</p>"}};

    UserController.updatePins({username: username}, newpin, function(err, enteredPin) {
      // console.log('entered pin', enteredPin)
      expect(enteredPin.lat).to.equal(-122.40644931793213);
    });
    done();

  });

  xit('should have a method that removes lastPin(,i.e., undo) database for a user', function (done) {

    var username = 'lex';
    UserController.removeLastPin( {username: username}, function(err, res) {
      console.log('response', res);
      expect(res).to.equal(1452394116848);
    });

    done();
  });

  it('should have a method that reads all users from the database at once', function (done) {

    UserController.getAll(function(err, res) {
      expect(res.length).to.equal(3);
    });
    done();

  });


});

