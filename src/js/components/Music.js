var React = require('react');
var Playlist = require('./Playlist');
var Filter = require('./TrackFilter');
var Playlist = require('./Playlist');

var Music = React.createClass({
  render: function() {
    return (
        <div>
            <div className="page-header">
                <h1>Music</h1>
            </div>
            <Playlist />
            <Filter />
        </div>
    )
  }
});

module.exports = Music;
