var React = require('react');

var Search = require('./Search');
var Map = require('./Map');
var CurrentLocation = require('./CurrentLocation');
var LocationList = require('./LocationList');
var SearchUser = require('./SearchUser');
var helpers = require('../utils/helpers');
var Signup = require('./Signup');


var MapApp = React.createClass({

  getInitialState(){

    // Extract the favorite locations from local storage

    var favorites = [];

    // if(localStorage.favorites){
    //   favorites = JSON.parse(localStorage.favorites);
    // }

    // Nobody would get mad if we center it on Paris by default

    return {
      user: '',
      loggedin: false,
      favorites: favorites,
      currentAddress: 'Hack Reactor',
      mapCoordinates: {
        lat: 37.7836966,
        lng: -122.4089664
      },
      center: {
        lat: 37.7836966,
        lng: -122.4089664
      }
    };
  },

  loginUser(username){
    console.log("logged in:", username);
    this.setState({user: username, loggedin: true}); 
    helpers.getAllBreadCrumbs(username, function(data){
      if(data){
        this.setState({favorites: data.pins});
      }
    }.bind(this));

  },

  componentDidMount(){
  },

  toggleFavorite(address){

    if(this.isAddressInFavorites(address)){
      this.removeFromFavorites(address);
    }
    else{
      this.addToFavorites(address);
    }

  },

  addToFavorites(address){

    var favorites = this.state.favorites;

    favorites.push({
      address: address,
      timestamp: Date.now()
    });

    this.setState({
      favorites: favorites
    });

    localStorage.favorites = JSON.stringify(favorites);
  },

  addToFavBreadCrumbs(id, lat, lng, timestamp, details, location) {
    var favorites = this.state.favorites;
    var breadcrumb = {
      id: id,
      lat: lat,
      lng: lng,
      timestamp: timestamp,
      details: details,
      address: this.state.currentAddress,
      location: location
    };
    favorites.push(breadcrumb);

    this.setState({
      favorites: favorites
    });

    helpers.addBreadCrumb(this.state.user, breadcrumb, function(data){
      console.log(data);
    });
    localStorage.favorites = JSON.stringify(favorites);

  },

  removeFromFavorites(address){

    var favorites = this.state.favorites;
    var index = -1;

    for(var i = 0; i < favorites.length; i++){

      if(favorites[i].address == address){
        index = i;
        break;
      }

    }

    // If it was found, remove it from the favorites array

    if(index !== -1){
      
      favorites.splice(index, 1);

      this.setState({
        favorites: favorites
      });

      localStorage.favorites = JSON.stringify(favorites);
    }

  },

  isAddressInFavorites(address){

    var favorites = this.state.favorites;

    for(var i = 0; i < favorites.length; i++){

      if(favorites[i].address == address){
        return true;
      }

    }

    return false;
  },

  searchForAddress(address, cb, recenter){
    var self = this;
    console.log("search called", address);

    // We will use GMaps' geocode functionality,
    // which is built on top of the Google Maps API

    GMaps.geocode({
      address: address,
      callback: function(results, status) {

        if (status !== 'OK') return;

        var latlng = results[0].geometry.location;

        self.setState({
          currentAddress: results[0].formatted_address,
          mapCoordinates: {
            lat: latlng.lat(),
            lng: latlng.lng()
          }
        });

        if(recenter){
          self.setState({
            center: {
              lat: latlng.lat(),
              lng: latlng.lng()
            }
          });
        }

        if(cb){
          cb(results[0].formatted_address); 
        }

      }
    });

  },

  render(){
    if(this.state.loggedin){
      return (

        <div>
          <h1 className="col-xs-12 col-md-6 col-md-offset-3">My Breadcrumbs</h1>
          <Search onSearch={this.searchForAddress} />

          <Map lat={this.state.mapCoordinates.lat}
            lng={this.state.mapCoordinates.lng}
            favorites={this.state.favorites}
            onFavoriteToggle={this.toggleFavorite}
            onAddToFavBcs={this.addToFavBreadCrumbs}
            searchAddress={this.searchForAddress}
            address={this.state.currentAddress} 
            center={this.state.center} 
            loginUser={this.loginUser}
            user={this.state.user} />

          <LocationList locations={this.state.favorites}
            activeLocationAddress={this.state.currentAddress} 
            onClick={this.searchForAddress} />

        </div>

      );
    } else {
      return <Signup loginUser={this.loginUser}/>
    }
  }

});

module.exports = MapApp;
