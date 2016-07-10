var React = require('react');
var ArtistFilter = require('./ArtistFilter');
var GenreFilter = require('./GenreFilter');
var YearFilter = require('./YearFilter');

var TrackFilter = React.createClass({
  render: function() {
    return (
        <div className="col-md-3 col-md-offset-1">
            <h3>Filter</h3>
            <form>
                <ArtistFilter />
                <GenreFilter />
                <YearFilter />
            </form>
        </div>
    )
  }
});

module.exports = TrackFilter;
