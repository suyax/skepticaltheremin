
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
      console.log(status, err.toString());
    }
  });
};

var addBreadCrumb = function(username, breadcrumb, cb) {
  console.log(username, ' ADD BREAKCRUMB HELPER CALLED');
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
      console.log(status, err.toString());
    }
  });
};

var signupUser = function(username, password, cb){
  console.log(username,password);
  var user = {
    username: username,
    password: password
  };
  $.ajax({
    url: '/api/users',
    type: 'POST',
    data: user,
    dataType: 'json',
    success: function(data){
      window.location.href = "#map";
      if(cb){
        cb(data);
      }
    },
    error: function(xhr, status, err) {
      console.log("err");
      console.log(xhr.toString(), status.toString(), err.toString());
      // console.log(status, err.toString());
    }

  });
};

var checkUser = function(username, password, cb){
  console.log(username, password);
  var user = {
    username: username,
    password: password
  };
  $.ajax({
    url: '/api/usersCheck',
    type: 'POST',
    data: user,
    dataType: 'json',
    success: function(data){
      console.log("1111111!!!!!!!!!!!!!!!!", data);
      window.location.href = "#map";
      if(cb){
        cb(data);
      }
    },
    error: function(xhr, status, err) {
      cb();
      console.log(xhr.toString(), status.toString(), err.toString());
      // console.log(status, err.toString());
    }
  });
};

var login = function(username, password, cb){
  console.log(username,password);
  var user = {
    username: username,
    password: password
  };
  $.ajax({
    url: '/api/users', //This needs to be a different route for login. not yet implemented
    type: 'POST',
    data: user,
    dataType: 'json',
    success: function(data){
      window.location.href = "#map";
      if(cb){
        cb(data);
      }
    },
    error: function(xhr, status, err) {
      console.log("err");
      console.log(xhr.toString(), status.toString(), err.toString());
      // console.log(status, err.toString());
    }

  });
};

var helpers = {
  getAllBreadCrumbs: getAllBreadCrumbs,
  addBreadCrumb: addBreadCrumb,
  signupUser: signupUser,
  login: login,
  checkUser: checkUser
}

module.exports = helpers;
