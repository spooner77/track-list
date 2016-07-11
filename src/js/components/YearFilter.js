var React = require('react');
var TrackStore = require('../stores/TrackStore');
var FilterStore = require('../stores/FilterStore');
var AppActions = require('../actions/AppActions');

function getStateFromStore() {
  return {
    value: FilterStore.getFilter("Year"),
    options: FilterStore.getYearOptions(),
  };
};

var YearFilter = React.createClass({

  getInitialState: function() {
    return getStateFromStore();
  },

  valueChange: function(event) {
    AppActions.changeFilter(TrackStore.YEAR_FIELD, event.target.value);
  },

  render: function() {
    var options = [];
    options.push(<option key="all" value="" >All</option>);

    this.state.options.forEach( function(option, index) {
       options.push(<option key={option.id} value={option.item} >{option.item}</option>);
     } );

    return (
        <fieldset className="form-group">
            <label htmlFor="year-filter">Year</label>
            <select id="year-filter" className="form-control" name="Year" value={this.state.value} onChange={this.valueChange} >
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

module.exports = YearFilter;
