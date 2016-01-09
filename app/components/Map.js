var React = require('react');

var Map = React.createClass({

  toggleFavorite(address){
    this.props.onFavoriteToggle(address);
  },

  addFavBreadCrumb(lat, lng, timestamp, details, infoWindow) {
    this.props.onAddToFavBcs(lat, lng, timestamp, details, infoWindow);
  },

  componentDidMount(){

    // Only componentDidMount is called when the component is first added to
    // the page. This is why we are calling the following method manually. 
    // This makes sure that our map initialization code is run the first time.

    this.componentDidUpdate();
  },

  componentDidUpdate(){
    console.log("UPDate");

    if(this.lastLat == this.props.lat && this.lastLng == this.props.lng){

      // The map has already been initialized at this address.
      // Return from this method so that we don't reinitialize it
      // (and cause it to flicker).

      return;
    }

    var bindContext = this;

    this.lastLat = this.props.lat;
    this.lastLng = this.props.lng

    var map = new GMaps({
      el: '#map',
      lat: this.props.lat,
      lng: this.props.lng,
      styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]

    });

    // Adding a marker to the location we are showing
    
    map.addMarker({
      lat: this.props.lat,
      lng: this.props.lng
      // icon: '/'
    });
  },

  render(){

    return (
      <div className="map-holder">
        <p>Loading......</p>
        <div id="map"></div>
      </div>
    );
  }

});

module.exports = Map;
