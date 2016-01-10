var request = require('request');

exports.getAllBreadCrumbs = function(username, cb) {
  $.ajax({
    url: '/api/maps/' + username,
    type: 'GET',
    success: function(data) {
      // this.setState({data: data});
      console.log(data);
      return cb(data);
    },
    error: function(xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }
  });
};

exports.addBreadCrumb = function(username, bcInfo, cb) {
  $.ajax({
    url: '/api/maps/' + username,
    dataType: 'json',
    type: 'PUT',
    data: bcInfo,
    success: function(data) {
      // this.setState({data: data});
      console.log(data);
      return cb(data);
    },
    error: function(xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }
  });
};

module.exports = helpers;
