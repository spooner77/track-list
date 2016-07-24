var React = require('react');
var Track = require('./Track');
var TrackStore = require('../stores/TrackStore');
var AppActions = require('../actions/AppActions');

var PlaylistHeader = React.createClass({
  propTypes: {
    fieldList: React.PropTypes.array,
    target: React.PropTypes.string,
    order: React.PropTypes.string,
    handleClick: React.PropTypes.func.isRequired
  },

  render: function() {
    var rows = [];

    if ( this.props.fieldList.length )
    {
      rows = this.props.fieldList.map(this._renderItem);
    }

    return (
        <thead>
            <tr>
                {rows}
            </tr>
        </thead>
    )
  },

  _renderItem: function(item, index) {
    var classes = "glyphicon pull-right " + this.getIconClass(item, this.props.order);

    return (
      <th key={item} onClick={this.props.handleClick.bind(null, item)}>
          {item}
          <span className={classes} aria-hidden="true"></span>
      </th>
    );
  },

  getIconClass: function(target, order) {
    if ( this.props.target == target )
    {
      switch(order)
      {
        case TrackStore.ORDER_ASC:
          return 'glyphicon-sort-by-attributes';
        case TrackStore.ORDER_DESC:
          return 'glyphicon-sort-by-attributes-alt';
      }
    }

    return 'glyphicon-sort';
  }
});

module.exports = PlaylistHeader;
