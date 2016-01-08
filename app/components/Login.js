var React = require('react');

var Login = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
    };
  },
  handleChange: function(event) {
    console.log(event.target, event.target.value);
    this.setState({username: event.target.value});
  },
  login: function(e){
    e.preventDefault();
    // console.log("login: ", this.state.username, this.state.password);

  },

  render: function(){
    var value = this.state.value;
    return(

      <div>
      <h2>Login</h2>
      <form action="/login" method="post">
        <div>
          <label htmlFor="username">Username: </label>
          <input id="username" type="text" name="username" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" name="password" />
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
      <p>
        <a href="#signup">Create an Account &rarr;</a>
      </p>
      </div>

    )
  }
});

module.exports = Login;