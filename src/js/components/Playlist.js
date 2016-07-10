var React = require('react');
var Track = require('./Track');
var TrackStore = require('../stores/TrackStore');
var FilterStore = require('../stores/FilterStore');

function getStateFromStore() {
  return {
    list: TrackStore.getFilteredItems(FilterStore.getAllFilters(), {}, 0, 30)
  };
};

var Playlist = React.createClass({
  getInitialState: function() {
    return getStateFromStore();
  },

  render: function() {
    var rows = []
    if ( !this.state.list.length )
      rows.push(<tr><td key="no_items" colSpan="5" className="text-center">No tracks</td></tr>);
    else {
      rows = this.state.list.map(function(item, index) {
        return (
          <Track key={index} track={item} />
        );
      });
    }

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
