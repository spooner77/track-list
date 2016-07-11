var React = require('react');
var Track = require('./Track');
var ClassNames = require('classnames');
var TrackStore = require('../stores/TrackStore');
var AppActions = require('../actions/AppActions');

function getStateFromStore() {
  return {
    fieldList: TrackStore.getFieldList(),
    target:TrackStore.getOrderTarget(),
    order:TrackStore.getOrder()
  };
};

var PlaylistHeader = React.createClass({

  getInitialState: function() {
    return getStateFromStore(this);
  },

  handleClick: function(item) {
    AppActions.changeOrder(item);
  },

  render: function() {
    var rows = [];

    if ( this.state.fieldList.length )
    {
      rows = this.state.fieldList.map(this._renderItem);
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
    classList[this.getIconClass(item, this.state.order)] = true;

    var classes = ClassNames(classList);

    return (
      <th key={item} onClick={this.handleClick.bind(null, item)}>
          {item}
          <span className={classes} aria-hidden="true"></span>
      </th>
    );
  },

  getIconClass: function(target, order) {
    if ( this.state.target == target )
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

  componentDidMount: function() {
    TrackStore.addChangeListener(this._onChaged);
  },

  componentWillUnmount: function() {
    TrackStore.removeChangeListener(this._onChaged);
  },

  _onChaged: function() {
    this.setState(getStateFromStore());
  }
});

module.exports = PlaylistHeader;
