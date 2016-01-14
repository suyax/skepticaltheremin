var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var routes = require('./config/routes');
var browserHistory = Router.browserHistory;
var Provider = require('react-redux').Provider;
//var store = require('./store');
var applyMiddleware = require('redux').applyMiddleware;
var compose = require('redux').compose;
var createStore = require('redux').createStore;
var combineReducers = require('redux').combineReducers;
//var syncHistory = require('redux-simple-router').syncHistory;
var routeReducer = require('redux-simple-router').routeReducer;






var reducers = require('./reducers');
//var middleware = syncHistory(browserHistory);

var reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));

var finalCreateStore = compose()(createStore);

var store = finalCreateStore(reducer);
//middleware.syncHistoryToStore(store);


ReactDOM.render(
	<Provider store={store}>
  <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
)