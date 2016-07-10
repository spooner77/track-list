var React = require('react');

var FilterStore = require('../stores/FilterStore');
var AppUtils = require('../utils/AppUtils');
var AppActions = require('../actions/AppActions');

function getStateFromStore() {
  return {
    value: FilterStore.getFilter("Artist"),
    options: FilterStore.getArtistOptions(),
  };
};

var ArtistFilter = React.createClass({

  getInitialState: function() {
    return getStateFromStore();
  },

  valueChange: function(event) {
    AppActions.changeFilter("Artist", event.target.value);
  },

  render: function() {
    var options = [];
    options.push(<option key="all" value="" >All</option>);

    this.state.options.forEach( function(option, index) {
      var hash = AppUtils.generateHash(option);
       options.push(<option key={index} value={option} >{option}</option>);
     } );

    return (
        <fieldset className="form-group">
            <label htmlFor="exampleSelect2">{this.props.label}</label>
            <select className="form-control" name="Artist" value="{this.state.value}" onChange={this.valueChange} >
              {options}
            </select>
        </fieldset>
    )
  },
  componentDidMount: function() {
    FilterStore.addChangeListener(this._onChaged);
  },

  componentWillUnmount: function() {
    FilterStore.removeChangeListener(this._onChaged);
  },

  _onChaged: function() {
    this.setState(getStateFromStore());
  }
});

module.exports = ArtistFilter;
