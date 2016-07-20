var React = require('react');
var Track = require('./Track');
var PaginationItem = require('./PaginationItem');
var _ = require('underscore');
var TrackStore = require('../stores/TrackStore');
var AppActions = require('../actions/AppActions');

function getStateFromStore() {
  return {
    page: TrackStore.getPage(),
    pageCount: TrackStore.getPagesCount()
  };
};

var Pagination = React.createClass({

  getInitialState: function() {
    return getStateFromStore(this);
  },

  handlePageClick: function(item) {
    if ( item == this.state.page || item <= 0 || item > this.state.pageCount ) {
      return;
    }
    AppActions.changePage(item);
  },

  render: function() {
    if ( this.state.pageCount ==  0 )
    {
      return null;
    }
    var pages = this.getPagesList();

    return (
        <ul className="pagination tracklist-pagination">
          {pages}
        </ul>
    )
  },

  getPagesList: function() {
    var rows = [];
    var list = _.range(1,this.state.pageCount+1);

    // render items
    list.map((function(item) {
        var pageClass = (this.state.page === item) ? 'active' : '';
        rows.push(<PaginationItem key={item} itemClass={pageClass} onHandleClick={this.handlePageClick.bind(null, item)} label={item} />);
    }).bind(this));

    // render side's arrows
    if ( this.state.pageCount > 1 ) {
      var prevClass = "";
      var nextClass = "";

      if ( this.state.page === 1 ) {
        prevClass = "disabled";
      }
      if ( this.state.page === this.state.pageCount ) {
        nextClass = "disabled";
      }

      rows.unshift(<PaginationItem
        itemClass={prevClass}
        key="prev"
        onHandleClick={this.handlePageClick.bind(null, (this.state.page-1))}
        label="&laquo;" /> );

      rows.push(<PaginationItem
        itemClass={nextClass}
        key="next"
        onHandleClick={this.handlePageClick.bind(null, (this.state.page+1))}
        label="&raquo;" />);
    }

    return rows
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

module.exports = Pagination;
