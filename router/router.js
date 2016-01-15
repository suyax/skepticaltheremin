
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// var path = require('path');

var router = express.Router();
var userController = require('../controllers/userControllers.js');
//*Requirerd by server.js*

console.log('using router...')

//////////////////
//users
//////////////////

//get all users. not usually useful
router.route('/users')
  .get(function (req, res) {
    console.log('user get')
    userController.getAll(function(err, person){
      if (err) {
        return res.json({err: err})
      }
      res.json(person)
    });
  });

//create user
router.route('/users')
  .post(function (req, res) {
    //example:
    console.log("post to /users", req.body.username,req.body.password);
    var newuser = {
      username: req.body.username,
      password: req.body.password,
      pins: []
    }

    userController.addUser(newuser, function(err, pins){
       if (err) {
        console.log(err);
        return res.json({err: err});
      }
      res.status(201).json(pins);
    });
  });

//delete user
router.route('/users')
  .delete(function (req, res) {
    userController.removeUser({username: req.body.username}, function(err, user){
       if (err) {
        return res.json({err: err});
      }
      res.json(user);
    });
  });

//check user
router.route('/usersCheck')
  .post(function (req, res) {
    //example:
    console.log("post to usersCheck", req.body.username,req.body.password);
    var newuser = {
      username: req.body.username,
      password: req.body.password,
      pins: []
    }

    userController.checkUser(newuser, function(err, pins){
       if (err) {
        console.log(err);
        return res.json({err: err});
      }
      if (pins) {
        console.log(201);
        res.status(201).json(pins);
      } else {
        console.log(404);
        res.status(404).json({});
      }
    });
  });
//////////////////
//pins
//////////////////

//get array of pins for single user

router.route('/maps')
  .get(function (req, res) {
    userController.getAllPins(function (err, res) {
      if (err) {
        return res.json({err: err});
      }
      res.json(pins);
    })
  })

router.route('/maps/:username')
  .get(function (req, res) {
    var username = req.params.username;

    userController.findOne({username: username}, function(err, person){
      if (err) {
        return res.json({err: err})
      }
      //sends back entire person object currently. refactor to only the pins array
      res.json(person)
    });
  });

//insert new pin in pins array on user obj
router.route('/maps/:username')
  .put(function (req, res) {
    var username = req.params.username;
    var newpin = req.body;
    newpin.username = username;
    console.log('PUT REQUEST GETS CALLED')

    if(JSON.stringify(newpin) !== JSON.stringify({})){
      userController.updatePins({username: username}, newpin, function(err, pins){
        if (err) {
          return res.json({err: err});
        }
        res.json(pins)

      });
    } else {
      res.json({})
    }


  });

// delete last pin from array
// router.route('/maps/:username')
//   .delete(function (req, res) {
//     var username = req.params.username;
//     userController.removeLastPin({userName: username}, function(err, pins){
//        if (err) {
//         return res.json({err: err});
//       }
//       res.json(pins);
//     });
//   });

//delete a spcific pin
router.route('/maps/:username')
  .delete(function (req, res) {
    var username = req.params.username;
    var pinId = req.body._id;
    userController.deletePin({username: username}, pinId, function(err, doc) {
      if (err) {
        return res.json({err: err});
      }
      res.json(doc);
    });
  });

module.exports = router;
