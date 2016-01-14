var React = require('react');
//search bar
var Search = React.createClass({

  getInitialState() {
    return { value: '' };
  },

  handleChange(event) {
    this.setState({value: event.target.value});
  },

  handleSubmit(event){

    event.preventDefault();

    // When the form is submitted, call the onSearch callback that is passed to the component

    this.props.onSearch(this.state.value, null, true);

    // Unfocus the text input field
    this.getDOMNode().querySelector('input').blur();
  },

  render() {

    return (
      //https://facebook.github.io/react/docs/forms.html
      <form id="geocoding_form" className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="col-xs-12 col-md-6 col-md-offset-3">
            <div className="input-group">
              <div className="styled-select">
              <label>Crime Categories</label>
                <select>
                    <option value="Assault">Assault</option>
                    <option value="Theft/Larceny">Theft/Larceny</option>
                    <option value="Burglary">Burglary</option>
                    <option value="Vandalism">Vandalism</option>
                    <option value="Drugs/alcohol Violations">Drugs/alcohol Violations</option>
                    <option value="Motor Vehicle Theft">Motor Vehicle Theft</option>
                </select>
              </div>
              <input type="text" className="form-control" id="address" placeholder="Find a location..."
              value={this.state.value} onChange={this.handleChange} />
              <span className="input-group-btn">
              <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
              </span>
            </div>
          </div>
        </div>
      </form>
    );

  }
});

module.exports = Search;
