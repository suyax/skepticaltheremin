var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var app = require('../server.js');
var Users = require('../models/user.js');

console.log('server testing...');

var testUsers = [
  {
    userName: 'mark',
    password: 'markymark',
    pins: []
  },
  {
    userName: 'lex',
    password: 'lexylex',
    pins: []
  },
  {
    userName: 'Ian',
    password: 'Ianyian',
    pins: []
  },
  {
    userName: 'Nikola',
    password: 'nikoaynik',
    pins: []
  }
];

var getBody = function (res) {
  return res.body ? res.body : JSON.parse(res.text);
};

describe('RESTful API', function () {

  beforeEach(function () {
    var usersCopy = JSON.parse(JSON.stringify(testUsers));
    Users.setAll(usersCopy);
    
    console.log('usersCopy')
  });

  describe('route: /api', function () {

    describe('GET', function () {

      it('responds with a 200 (OK)', function (done) {

        request(app)
          .get('/api/users')
          .expect(200, done);

      });

    });


  //   describe('POST', function () {

  //     var newUser = {
  //       name: 'Josh',
  //       email: 'josh@josh.io'
  //     };

  //     it('responds with a 201 (Created) when a valid user is sent', function (done) {

  //       request(app)
  //         .post('/api/users')
  //         .send(newUser)
  //         .expect(201, done);

  //     });

  //   });

  // });

  // describe('/api/users/:id', function () {

  //   describe('GET', function () {

  //     it('responds with a 200 (OK) when a user with a matching `id` exists', function (done) {

  //       request(app)
  //         .get('/api/users/1')
  //         .expect(200, done);

  //     });


  //   });

  //   describe('PUT', function () {

  //     it('responds with a 200 (OK) when a user with the matching `id` is updated', function (done) {

  //       request(app)
  //         .put('/api/users/1')
  //         .send({ name: 'Taka-san' })
  //         .expect(200, done);

  //     });

  //   });

  //   describe('DELETE', function () {

  //     it('responds with a 200 (OK) when a user with the matching `id` is deleted', function (done) {

  //       request(app)
  //         .delete('/api/users/1')
  //         .expect(200, done);

  //     });


  //   });

  });

});
