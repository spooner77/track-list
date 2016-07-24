var React = require('react');
var PlaylistHeader = require('./PlaylistHeader');
var TrackStore = require('../stores/TrackStore');
var AppActions = require('../actions/AppActions');
var Track = require('./Track');
var Pagination = require('./Pagination');
var ItemsPerPage = require('./ItemsPerPage');

var Playlist = React.createClass({
  propTypes: {
    trackList: React.PropTypes.array,
    // playlist header
    fieldList: React.PropTypes.array,
    orderTarget: React.PropTypes.string,
    order: React.PropTypes.string,
    // pagination
    perPage: React.PropTypes.number,
    itemsCount: React.PropTypes.number,
    itemsPerPageList: React.PropTypes.array,
    page: React.PropTypes.number
  },

  handlePageClick: function(item) {
    if ( item == this.props.page || item <= 0 || item > this.props.pageCount ) {
      return;
    }
    AppActions.changePage(item);
  },

  handleItemsCountClick: function(item) {
    AppActions.changePageItemsCount(item);
  },

  handleHeaderClick: function(item) {
    AppActions.changeOrder(item);
  },

  render: function() {
    var rows = []
    if ( !this.props.trackList.length ) {
      rows.push(<tr key="no_items"><td colSpan="5" className="text-center">No tracks</td></tr>);
    } else {
      rows = this.props.trackList.map(function(item) {
        return (
          <Track key={item.id} track={item} />
        );
      });
    }

    return (
        <div className="col-md-8">
            <h3>Playlist</h3>
            <div className="table-responsive">
                <table className="table table-striped playlist">
                    <PlaylistHeader
                      fieldList={this.props.fieldList}
                      target={this.props.orderTarget}
                      order={this.props.order}
                      handleClick={this.handleHeaderClick}  />
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <div className="text-center">
                  <Pagination
                    page={this.props.page}
                    pagesCount={Math.ceil(this.props.itemsCount / this.props.perPage)}
                    handlePageClick={this.handlePageClick} />
                  <div className="btn-group btn-group-lg pull-right">
                    <ItemsPerPage
                      itemsCount={this.props.itemsCount}
                      perPage={this.props.perPage}
                      itemsPerPageList={this.props.itemsPerPageList}
                      handleItemsCountClick={this.handleItemsCountClick} />
                  </div>
                </div>
            </div>
        </div>
    )
  }
});

module.exports = Playlist;
