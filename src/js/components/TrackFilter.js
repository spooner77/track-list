var React = require('react');
var FilterSelectBox = require('./FilterSelectBox');
var AppActions = require('../actions/AppActions');
var TrackStore = require('../stores/TrackStore');

var TrackFilter = React.createClass({
  propTypes: {
    filters: React.PropTypes.object,
    ArtistList: React.PropTypes.array,
    GenreList: React.PropTypes.array,
    YearList: React.PropTypes.array
  },

  valueChange: function(event) {
    AppActions.changeFilter(event.target.name, event.target.value);
  },

  render: function() {
    return (
        <div className="col-md-3 col-md-offset-1">
            <h3>Filter</h3>
            <form>
                <FilterSelectBox
                  key={TrackStore.ARTIST_FIELD}
                  label={TrackStore.ARTIST_FIELD}
                  value={this.props.filters.Artist}
                  options={this.props.ArtistList}
                  target={TrackStore.ARTIST_FIELD}
                  handleChange={this.valueChange}
                  />
                <FilterSelectBox
                  key={TrackStore.GENRE_FIELD}
                  label={TrackStore.ARTIST_FIELD}
                  value={this.props.filters.Genre}
                  options={this.props.GenreList}
                  target={TrackStore.GENRE_FIELD}
                  handleChange={this.valueChange} />
                <FilterSelectBox
                  key={TrackStore.YEAR_FIELD}
                  label={TrackStore.ARTIST_FIELD}
                  value={this.props.filters.Year}
                  options={this.props.YearList}
                  target={TrackStore.YEAR_FIELD}
                  handleChange={this.valueChange} />
            </form>
        </div>
    )
  }
});

module.exports = TrackFilter;
