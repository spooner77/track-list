var React = require('react');

var SelectOption = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    options: React.PropTypes.string
  },
  
  render: function() {
    return (<option value={this.props.value} >{this.props.label}</option>);
  }
});

module.exports = SelectOption;
