var React = require('react');
var Track = require('./Track');
var PaginationItem = require('./PaginationItem');
var _ = require('underscore');
var TrackStore = require('../stores/TrackStore');
var AppActions = require('../actions/AppActions');

function getStateFromStore() {
  return {
    perPage: TrackStore.getItemsPrePageCount(),
    itemsPerPageList: TrackStore.getItemsPrePageList(),
    itemsCount: TrackStore.getItemsCount(),
  };
};

var ItemsPerPage = React.createClass({

  getInitialState: function() {
    return getStateFromStore(this);
  },

  handleItemsCountClick: function(item) {
    AppActions.changePageItemsCount(item);
  },

  render: function() {
    if ( !this.state.itemsPerPageList || this.state.itemsCount < _.min(this.state.itemsPerPageList) )
    {
      return null;
    }

    var itemsPerPage = this.getItemsPerPageList();

    return (
        <ul className="pagination tracklist-items-per_page">
          {itemsPerPage}
        </ul>
    )
  },

  getItemsPerPageList: function() {
    var rows = [];

    // render items
    this.state.itemsPerPageList.map(function(item) {
      var pageClass = (this.state.perPage === item) ? 'active' : '';
      rows.push(<PaginationItem key={item} itemClass={pageClass} onHandleClick={this.handleItemsCountClick.bind(null, item)} label={item} />);
    }.bind(this));

    return rows;
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

module.exports = ItemsPerPage;
