var mongoose = require('mongoose');

var pinSchema = new mongoose.Schema({
  _creator: {type: String, ref: "User"  },
  address: String,
  lat: Number,
  lng: Number,
  details: {},
  timestamp: Date
});


// pinSchema.pre('save', true, function(next, done) {
//   // calling next kicks off the next middleware in parallel
  

//   next();
//   setTimeout(done, 100);
// });

var Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;


