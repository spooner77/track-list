var React = require('react');

var PaginationItem = React.createClass({
  render: function() {
    return (
      <li className={this.props.itemClass}><a href="javascript://" onClick={this.props.onHandleClick}>{this.props.label}</a></li>
    );
  }
});

module.exports = PaginationItem;
