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
      <form action="/login" method="post" role="form">
        <div className="form-group">
          <label htmlFor="username" className="col-sm-2">Username: </label>
          <div className="col-sm-10">
            <input id="username" type="text" name="username" className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="col-sm-2">Password: </label>
          <div className="col-sm-10" >
          <input id="password" type="password" name="password" className="form-control" />
          </div>
        </div>
        <div>
          <input type="submit" className="btn btn-primary" value="Login" />
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