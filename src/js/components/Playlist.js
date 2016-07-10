var React = require('react');
var Track = require('./Track');
var TrackStore = require('../stores/TrackStore');
var FilterStore = require('../stores/FilterStore');

function getStateFromStore() {
  return {
    list: TrackStore.getFilteredItems(FilterStore.getAllFilters(), {}, 0, 30)
  };
};

function getTrackItem(item, index) {
  return (
    <Track key={index} track={item} />
  );
};

var Playlist = React.createClass({
  getInitialState: function() {
    return getStateFromStore();
  },

  render: function() {
    var rows = this.state.list.map(getTrackItem);
    return (
        <div className="col-md-8">
            <h3>Playlist</h3>
            <div className="table-responsive">
                <table className="table table-striped playlist">
                    <thead>
                        <tr>
                            <th>
                                Artist
                                <span className="glyphicon glyphicon-sort-by-attributes pull-right" aria-hidden="true"></span>
                            </th>
                            <th>
                                Song
                                <span className="glyphicon glyphicon-sort-by-attributes-alt pull-right" aria-hidden="true"></span>
                            </th>
                            <th>
                                Genre
                                <span className="glyphicon glyphicon-sort pull-right" aria-hidden="true"></span>
                            </th>
                            <th>
                                Year
                                <span className="glyphicon glyphicon-sort pull-right" aria-hidden="true"></span>
                            </th>
                            <th>
                                Time
                                <span className="glyphicon glyphicon-sort pull-right" aria-hidden="true"></span>
                            </th>
                        </tr>
                    </thead>
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
  },
});

module.exports = Playlist;
