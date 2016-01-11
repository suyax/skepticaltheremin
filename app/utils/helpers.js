
var getAllBreadCrumbs = function(username, cb) {
  console.log(username);
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

var addBreadCrumb = function(username, breadcrumb, cb) {
  console.log(username);
  $.ajax({
    url: '/api/maps/' + username,
    dataType: 'json',
    type: 'PUT',
    data: breadcrumb,
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

var helpers = {
  getAllBreadCrumbs: getAllBreadCrumbs,
  addBreadCrumb: addBreadCrumb
}

module.exports = helpers;
