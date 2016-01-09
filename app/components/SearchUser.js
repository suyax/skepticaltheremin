var React = require('react');

var SearchUser = React.createClass({
  getInitialState: function() {
    return {username: ''};
  },
  handleUsernameChange: function(e) {
    this.setState({username: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var username = this.state.username.trim();
    if (!username) {
      return;
    }
    // this.props.onCommentSubmit({username: username});
    $.ajax({
      url: this.props.url + '/' + username,
      // dataType: 'json',
      // type: 'POST',
      // data: comment,
      type: 'GET',
      success: function(data) {
        // this.setState({data: data});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    this.setState({username: ''});
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

module.exports = SearchUser;