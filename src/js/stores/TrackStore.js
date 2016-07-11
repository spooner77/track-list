var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var ActionConstants = require('../constants/ActionConstants');
var FilterStore = require('./FilterStore');
var Assign = require('object-assign');


var CHANGE_EVENT = 'change';
var ORDER_ASC = 'asc';
var ORDER_DESC = 'desc';

var items = [];
var orderTarget = null;
var order = ORDER_ASC;

function loadData(data) {
  data.forEach(function(item) {
      if ( !item )
        return;

      var track = {};
      track.id = parseInt(item.id,10);
      track.Artist = _.isString(item.Artist) ? item.Artist : "";
      track.Song = _.isString(item.Song) ? item.Song  : "";
      track.Genre = _.isString(item.Genre) ? item.Genre : "";
      track.Year = _.isString(item.Year) ? item.Year : "";
      track.Time = parseInt(item.Time,10);

      items.push(track);

      TrackStore.emitChange()
    }
  );
};

function setOrder(target) {
  if ( orderTarget == target )
  {
    switch(order)
    {
      case ORDER_ASC:
        // change sort order if select same target
        order = ORDER_DESC;
        break;
      case ORDER_DESC:
        // clear the sort order if user choose the same target twice
        orderTarget = null;
        order = ORDER_ASC;
        break;
    }
  }
  else {
    orderTarget = target;
    order = ORDER_ASC;
  }
}

var TrackStore = Assign({}, EventEmitter.prototype, {
  ARTIST_FIELD: 'Artist',
  SONG_FIELD: 'Song',
  GENRE_FIELD: 'Genre',
  YEAR_FIELD: 'Year',
  TIME_FIELD: 'Time',
  ORDER_ASC:ORDER_ASC,
  ORDER_DESC:ORDER_DESC,

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  getFieldList: function() {
    return [this.ARTIST_FIELD, this.SONG_FIELD, this.GENRE_FIELD, this.YEAR_FIELD, this.TIME_FIELD];
  },

  getFilteredItems: function(filter, first, count) {
    var result = _.where(items, filter);

    if ( orderTarget && this.getFieldList().indexOf(orderTarget) != -1 ) {
      result.sort(function(val1, val2) {
        return (val1[orderTarget]).localeCompare(val2[orderTarget]) * ( order == ORDER_DESC ? -1 : 1 );
      });
    }

    return result.slice(first, count);
  },

  getOrderTarget: function() {
    return orderTarget;
  },

  getOrder: function() {
    return order;
  }
});

TrackStore.dispatchToken = AppDispatcher.register(function(payload){
	var action = payload.action;
	switch(action.actionType) {
		case ActionConstants.LOAD_DATA:
			loadData(action.data);
      AppDispatcher.waitFor([FilterStore.dispatchToken]);
			TrackStore.emitChange();
			break;
    case ActionConstants.CHANGE_FILTER:
      AppDispatcher.waitFor([FilterStore.dispatchToken]);
      TrackStore.emitChange();
      break;
    case ActionConstants.CHANGE_ORDER:
      setOrder(action.target);
      TrackStore.emitChange();
      break;
		default:
			// do nothing
  }
});

module.exports = TrackStore;
