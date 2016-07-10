var React = require('react');

var FilterStore = require('../stores/FilterStore');
var AppUtils = require('../utils/AppUtils');
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
    AppActions.changeFilter("Year", event.target.value);
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
