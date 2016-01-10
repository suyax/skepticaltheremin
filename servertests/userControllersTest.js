var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = require('../models/user.js');
var Pin = require('../models/pin.js');

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


// var expect = require('chai').expect;
// var mongoose = require('mongoose');
// var User = require('../models/user');
// var Pin = require('../models/pin');

// var UserController = require('../controllers/userControllers');


// var dbURI = 'mongodb://localhost/maps';

// var clearDB = function (done) {
//   mongoose.connection.collections['users'].remove(done);
// };

// describe('User Controller', function () {
//   // Connect to database before any tests
//   before(function (done) {
//     if (mongoose.connection.db) {
//       return done();
//     }
//     mongoose.connect(dbURI, done);
//   });

//   beforeEach(function (done) {
//     clearDB(function () {
//       var users = [
//      {
//         userName: 'mark',
//         password: 'markymark',
//         pins: [{"lat":37.78696217255432,"lng":-122.40696430206299,"timestamp":1452391665585,"details":{"note":"I LOVE this place."},"infoWindow":{"content":"<p>Dat info dohhh</p>"}}]
//       },
//       {
//         userName: 'lex',
//         password: 'lexylex'
//       },
//       {
//         userName: 'Ian',
//         password: 'Ianyian'
//       },
//       {
//         userName: 'Nikola',
//         password: 'nikoaynik'
//       }
//       ];

//       // See http://mongoosejs.com/docs/models.html for details on the `create` method
//       User.create(users, done);
//     });
//   });

//   it('should have a method that given the name of a user, retrieves their record from the database', function (done) {

//     var userSearchObj = {userName: 'mark'};
   
//     UserController.getUserByName(userSearchObj, function(err, res) {
//       console.log(res)
//       expect(res.password).to.equal('markymark');
//     });
    
//     done();

//   });

//   xit('should have a method that given the name of a user, updates their `pins` property', function (done) {
//     // TODO: Write test(s) for a method exported by `userController` that behaves as described one line above
//     // HINT: The `done` passed in is quite important...
//     var username = 'Magee';
//     var oldemail = 'magee@magee.com';
//     var newemail = 'aaa@magee.com';

//     UserController.updateEmailByName(username, newemail, function(err, updatedUser) {
//       expect(updatedUser.email).to.equal(newemail);
//     });

//     done();
//   });

//   xit('should have a method that reads all users from the database at once', function (done) {
//     // TODO: Write test(s) for a method exported by `userController` that behaves as described one line above
//     // HINT: The `done` passed in is quite important...

//     UserController.readAllUsers(function(err, res) {
//       expect(res.length).to.equal(5);
//     });

//     done();
//   });

// });
