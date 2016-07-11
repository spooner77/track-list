var React = require('react');
var Track = require('./Track');
var ClassNames = require('classnames');
var TrackStore = require('../stores/TrackStore');
var AppActions = require('../actions/AppActions');

function getStateFromStore(component) {
  return {
    fieldList: component.props.fieldList,
    target: component.props.traget,
    order: component.props.order
  };
};

var PlaylistHeader = React.createClass({

  propTypes: {
      fieldList: React.PropTypes.array,
      target: React.PropTypes.string,
      order: React.PropTypes.string,
      handleClick: React.PropTypes.func
  },

  getInitialState: function() {
    return getStateFromStore(this);
  },

  handleClick: function(item) {
    this.props.handleClick(item);
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
    var classList = {
      'glyphicon': true,
      'pull-right': true
    };
    classList[this.getIconClass(item, this.props.order)] = true;

    var classes = ClassNames(classList);

    return (
      <th key={item} onClick={this.handleClick.bind(null, item)}>
          {item}
          <span className={classes} aria-hidden="true"></span>
      </th>
    );
  },

  getIconClass: function(target, order) {
    if ( this.props.traget == target )
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
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.target !== this.props.target || nextProps.order !== this.props.order;
  }
});

module.exports = PlaylistHeader;
