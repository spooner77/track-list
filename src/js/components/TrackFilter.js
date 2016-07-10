var React = require('react');
var ArtistFilter = require('./ArtistFilter');

var TrackFilter = React.createClass({
  render: function() {
    return (
        <div className="col-md-3 col-md-offset-1">
            <h3>Filter</h3>
            <form>
                <ArtistFilter />
            </form>
        </div>
    )
  }
});

module.exports = TrackFilter;
