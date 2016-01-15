var React = require('react');
var helpers = require('../utils/helpers');

var Logout = React.createClass({
  componentDidMount: function() {
    localStorage.removeItem('username');
    console.log('didmount');
  },
  render: function(){
    return (<div>
              <h1>You are now logged out</h1>
              <a href="#login"> click to login again </a>
            </div>
            )}
});

module.exports = Logout;
