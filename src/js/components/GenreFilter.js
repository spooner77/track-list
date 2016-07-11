var React = require('react');

var FilterStore = require('../stores/FilterStore');
var TrackStore = require('../stores/TrackStore');

var AppActions = require('../actions/AppActions');

function getStateFromStore() {
  return {
    value: FilterStore.getFilter("Genre"),
    options: FilterStore.getGenreOptions(),
  };
};

var GenresFilter = React.createClass({

  getInitialState: function() {
    return getStateFromStore();
  },

  valueChange: function(event) {
    AppActions.changeFilter(TrackStore.GENRE_FIELD, event.target.value);
  },

  render: function() {
    var options = [];
    options.push(<option key="all" value="" >All</option>);

    this.state.options.forEach( function(option, index) {
       options.push(<option key={option.id} value={option.item} >{option.item}</option>);
     } );

    return (
        <fieldset className="form-group">
            <label htmlFor="genre-filter">Genre</label>
            <select id="genre-filter" className="form-control" name="Genre" value={this.state.value} onChange={this.valueChange} >
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

module.exports = GenresFilter;
