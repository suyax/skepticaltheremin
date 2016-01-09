
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

// var router = require('./routers/router.js')
// var userController = require('./controllers/userController.js');
// var classController = require('./controllers/classController.js');

var app = express();
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/maps');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, "./public")));
// Any prefixed that hit the /api will be directed to our router.
    
  // // app.use('/api', router);

app.get("/", function (req, res) {
  console.log('home')
  res.send(__dirname + "..public/index.html");
});

//
  // app.get('/users/:username', function (req, res) {
  //   console.log('user get')

  //   userController.findOne( {username: req.params.username} , function(err, person){
  //     if (err) {
  //       return res.json({err: err})
  //     }
  //     res.json(person)
  //   });

  // });

  // app.get('/users', function (req, res) {
  //   console.log('user get')

  //   userController.findAll({}, function(err, person){
  //     if (err) {
  //       return res.json({err: err})
  //     }
  //     res.json(person)
  //   });

  // });

  // app.put('/users/:username', function (req, res) {

  //   console.log('users post')
  //   console.log(req.params)


  //   // userController.createUser({
  //   //   query:{userName: username},
  //   //   update:{$push: {pins: {pin} } },
  //   //   new: true,
  //   //   upsert : true
  //   //   }
  //   //   , function(err, person){
  //   //    if (err) {
  //   //     return res.json({err: err})
  //   //   }
  //   //   res.json(person)
  //   // })


  // });





console.log('mapp app on port ' + port);
app.listen(port);  
