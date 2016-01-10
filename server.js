
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

// var router = express.Router();
var router = require('./router.js')

var userController = require('./controllers/userControllers.js');

var app = express();
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/maps');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./public")));
    

//redirect to home at a hash url
// need to add middleware for actual loging authentication
app.get('/signup', function(req, res){
  console.log('signup');
  res.redirect('/#map')
});

app.post('/login', function(req, res){
  console.log('signup');
  res.redirect('/#map')
})

//api 
app.use('/api', router);


console.log('mapp app on port ' + port);
app.listen(port);  
