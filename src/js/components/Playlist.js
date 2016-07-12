var React = require('react');
var PlaylistHeader = require('./PlaylistHeader');
var TrackStore = require('../stores/TrackStore');
var FilterStore = require('../stores/FilterStore');
var AppActions = require('../actions/AppActions');
var Track = require('./Track');
var Pagination = require('./Pagination');
var ItemsPerPage = require('./ItemsPerPage');

function getStateFromStore() {
  return {
    trackList: TrackStore.getItems()
  };
};

var Playlist = React.createClass({
  getInitialState: function() {
    return getStateFromStore();
  },

  render: function() {
    var rows = []
    if ( !this.state.trackList.length ) {
      rows.push(<tr key="no_items"><td colSpan="5" className="text-center">No tracks</td></tr>);
    } else {
      rows = this.state.trackList.map(function(item) {
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
                    <PlaylistHeader />
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <div className="text-center">
                  <Pagination />
                  <div className="btn-group btn-group-lg pull-right">
                    <ItemsPerPage />
                  </div>
                </div>
            </div>
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

module.exports = Playlist;
