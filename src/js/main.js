/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var Music = require('./components/Music');
var AppActions = require('./actions/AppActions');

var data = [
  {"id":1, "Artist":"Justin Turner","Song":"venenatis non sodales","Genre":"Electronic Music","Year":"1995","Time":52},
  {"id":2, "Artist":"Anna Franklin","Song":"risus semper porta","Genre":"Pop","Year":"2009","Time":43},
  {"id":3, "Artist":"Janet Morgan","Song":"in quam fringilla rhoncus mauris","Genre":"Rap","Year":"2010","Time":26},
  {"id":4, "Artist":"Helen Sanchez","Song":"id ligula","Genre":"Rock","Year":"1991","Time":43},
  {"id":5, "Artist":"Donna Reid","Song":"lacus purus aliquet at feugiat","Genre":"Electronic Music","Year":"2006","Time":32},
  {"id":6, "Artist":"Roger Hall","Song":"est donec odio","Genre":"Pop","Year":"2000","Time":25},
  {"id":7, "Artist":"Donna Bowman","Song":"eget congue eget","Genre":"Pop","Year":"2010","Time":83},
  {"id":8, "Artist":"Donna1","Song":"vitae ipsum","Genre":"Electronic Music","Year":"2011","Time":56},
  {"id":9, "Artist":"Denise Spencer","Song":"montes nascetur ridiculus mus","Genre":"Electronic Music","Year":"2012","Time":88},
  {"id":10, "Artist":"Cheryl Willis","Song":"mauris viverra","Genre":"Rap","Year":"1999","Time":73},
  {"id":11, "Artist":"Benjamin Wagner","Song":"magna at nunc commodo placerat","Genre":"Pop","Year":"1996","Time":75},
  {"id":12, "Artist":"Benjamin Collins","Song":"etiam faucibus cursus urna ut","Genre":"Electronic Music","Year":"2009","Time":70}
];

AppActions.loadData(data);

ReactDOM.render(
  <Music />,
  document.getElementById('content')
);
