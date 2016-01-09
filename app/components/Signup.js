var React = require('react');

var Signup = React.createClass({
  render: function(){
    return(
      <div>
         <h2>Sign up</h2>
         <form action="#signup" method="post">
           <div>
             <label htmlFor="username">Username:</label>
             <input id="username" type="text" name="username" />
           </div>
           <div>
             <label htmlFor="password">Password:</label>
             <input id="password" type="password" name="password" />
           </div>
           <div>
             <input className="btn btn-primary" type="submit" value="Sign up" />
           </div>
       </form>
       <p>
         <a href="/login">Login to your account &rarr;</a>
       </p>
      </div>

    )
  }
});

module.exports = Signup;