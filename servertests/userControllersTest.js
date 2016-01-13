var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = require('../models/user.js');
var Pin = require('../models/pin.js');
var UserController = require('../controllers/userControllers.js');

describe('Define Models', function(){

  describe('User Model', function () {

    it('User should be a Mongoose model', function () {
      expect(new User()).to.be.instanceOf(mongoose.Model);
    });
    it('should have a schema', function () {
      expect(User.schema).to.exist;
    });

  });

  describe('Pin Model', function () {

    it('pin should be a Mongoose model', function () {
      expect(new Pin()).to.be.instanceOf(mongoose.Model);
    });
    it('should have a schema', function () {
      expect(Pin.schema).to.exist;
    });

  });

})


var clearDB = function (done) {
  mongoose.connection.collections['users'].remove(done);
};
var dbURI = 'mongodb://localhost/mapstest';

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
            // pins: [{"lat":37.78696217255432,"lng":-122.40696430206299,"timestamp":1452391665585,"details":{"note":"I LOVE this place."},"infoWindow":{"content":"<p>Dat info dohhh</p>"}}]
          },
          {
            username: 'Ian',
            password: 'Ianyian'
          },
          {
            username: 'Nikola',
            password: 'niki',
            // pins: [{"lat":37.78613123179135,"lng":-122.40491509437561,"timestamp":1452394116848,"details":{"note":"I hate this place."},"infoWindow":{"content":"<p>skip skip</p>"}}]
          }
        ];
      User.create(users, done);
    });
  });

  it('should have a method that creates a new user record in the database', function (done) {
    // console.log('create user test')
    var query = {username: 'mark', password: 'mypassword'}; 

    UserController.addUser(query, function(err, res) {
      expect(res.password).to.equal("mypassword");
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
      console.log(res);
      expect(res.pins[0].timestamp).to.equal(1452391665585);
    });
    
    done();

  });

  xit('should have a method that given the name of a user, updates their pins, i.e., add a new breadcrumb', function (done) {
    
    var username = 'Ian';
    var newpin = {"lat":37.78650430839168,"lng":-122.40644931793213,"timestamp":1452391678701,"details":{"note":"I meh this place."}};

    UserController.updatePins({username: username}, newpin, function(err, enteredPin) {
      console.log('entered pin', enteredPin.lat === 37.78650430839168);
      var match = (enteredPin.lat === 37.78650430839168);

      // expect(match).to.equal(true)
      expect(enteredPin.lat).to.equal(37.78650430839168);

    });

    done();
    
   
  });

  xit('should have a method that removes lastPin(,i.e., undo) database for a user', function (done) {

    //not used functionality yet but can use

    // var username = 'lex';
    // var pinId;
    // UserController.deletePin( {username: username}, pinId, function(err, res) {
    //   console.log('response', res);
    //   expect(res.length).to.equal(1452394116848);
    // });

    // done();
  });

  it('should have a method that reads all users from the database at once', function (done) {

    UserController.getAll(function(err, res) {
      expect(res.length).to.equal(3);
    });
    done();

  });


});

