var React = require('react');

var SelectOption = React.createClass({
  render: function() {
    return (<option value={this.props.value} >{this.props.label}</option>);
  }
});

module.exports = SelectOption;
