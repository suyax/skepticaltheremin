var React = require('react');
var helpers = require('../utils/helpers');

var Logout = React.createClass({
  componentDidMount: function() {
    localStorage.clear();
  },

  render: function(){
    return <h1>You are now logged out</h1>
  }
});

module.exports = Logout;
