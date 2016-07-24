var React = require('react');
var Playlist = require('./Playlist');
var TrackStore = require('../stores/TrackStore');
var Playlist = require('./Playlist');
var Filter = require('./TrackFilter');

function getStateFromStore() {
  return {
    // playlist
    trackList: TrackStore.getItems(),

    // playlist header
    fieldList: TrackStore.getFieldList(),
    orderTarget:TrackStore.getOrderTarget(),
    order:TrackStore.getOrder(),

    // pagination
    page: TrackStore.getPage(),
    itemsPerPageList: TrackStore.getItemsPerPageList(),
    perPage: TrackStore.getItemsPerPageCount(),
    itemsCount: TrackStore.getItemsCount(),

    // filter
    filters: TrackStore.getAllFilters(),
    ArtistList: TrackStore.getArtistOptions(),
    GenreList: TrackStore.getGenreOptions(),
    YearList: TrackStore.getYearOptions(),

  };
};

var Music = React.createClass({
  getInitialState: function() {
    return getStateFromStore();
  },

  render: function() {
    return (
        <div>
            <div className="page-header">
                <h1>Music</h1>
            </div>
            <Playlist
              trackList={this.state.trackList}
              // playlist header
              fieldList={this.state.fieldList}
              orderTarget={this.state.orderTarget}
              order={this.state.order}
              // pagination
              perPage={this.state.perPage}
              itemsPerPageList={this.state.itemsPerPageList}
              itemsCount={this.state.itemsCount}
              page={this.state.page} />
            <Filter
              filters={this.state.filters}
              ArtistList={this.state.ArtistList}
              GenreList={this.state.GenreList}
              YearList={this.state.YearList} />
        </div>
    )
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

module.exports = Music;
