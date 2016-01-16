var React = require('react');
var helpers = require('../utils/helpers');

var Logout = React.createClass({
  getInitialState: function() {
    return {
      username: localStorage.getItem('username')
    };
  },
  componentDidMount: function() {
    FB.logout(function(response) {
       console.log(response);
    });
    localStorage.clear();
    console.log('didmount');
  },
  render: function(){
    return (<div>
              <h1>Thank you for visiting {this.state.username}</h1>
              <a href="#map"> click to log in again </a>
            </div>
            )}
});

module.exports = Logout;
