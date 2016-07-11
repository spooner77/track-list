var React = require('react');
var Track = require('./Track');
var PlaylistHeader = require('./PlaylistHeader');
var TrackStore = require('../stores/TrackStore');
var FilterStore = require('../stores/FilterStore');
var AppActions = require('../actions/AppActions');

function getStateFromStore() {
  return {
    trackList: TrackStore.getFilteredItems(FilterStore.getAllFilters(), 0, 30)
  };
};

var Playlist = React.createClass({
  getInitialState: function() {
    return getStateFromStore();
  },

  render: function() {
    var rows = []
    if ( !this.state.trackList.length )
      rows.push(<tr key="no_items"><td colSpan="5" className="text-center">No tracks</td></tr>);
    else {
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
