var React = require('react');

var Track = React.createClass({
  propTypes: {
      track: React.PropTypes.object
    },

  formatTime: function (str) {
      var sec_num = parseInt(str, 10);
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours == 0) {hours = ""}
      else if (hours < 10) {hours = "0"+hours+":";}

      if (minutes < 10) {minutes = "0"+minutes;}

      if (seconds < 10) {seconds = "0"+minutes;}

      return hours+minutes+':'+seconds;
  },

  render: function() {
    var time = this.formatTime(this.props.track.Time);
    return (
      <tr>
        <td>{this.props.track.Artist}</td>
        <td>{this.props.track.Song}</td>
        <td>{this.props.track.Genre}</td>
        <td>{this.props.track.Year}</td>
        <td>{time}</td>
      </tr>
    )
  }
});

module.exports = Track;
