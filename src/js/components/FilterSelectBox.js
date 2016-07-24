var React = require('react');
var SelectOption = require('./SelectOption');

var FilterSelectBox = React.createClass({

  propTypes: {
    value: React.PropTypes.string,
    options: React.PropTypes.array,
    target: React.PropTypes.string,
    handleChange: React.PropTypes.func
  },

  render: function() {
    var options = [];
    options.push(<SelectOption key="all" value="" label="All" />);

    this.props.options.forEach( function(option, index) {
       options.push(<SelectOption key={option.id} value={option.item} label={option.item} />);
     } );

    return (
        <fieldset className="form-group">
            <label htmlFor={this.props.target+"-filter"}>{this.props.label}</label>
            <select id={this.props.target+"-filter"} className="form-control" name={this.props.target} value={this.props.value} onChange={this.props.handleChange} >
              {options}
            </select>
        </fieldset>
    )
  }
});

module.exports = FilterSelectBox;
