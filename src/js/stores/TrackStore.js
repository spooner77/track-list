var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var AppConstants = require('../constants/AppConstants');
var FilterStore = require('./FilterStore');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var items = [];
var filter = {};

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

var TrackStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  getOriginalItems: function() {
  	return items;
  },

  getFilteredItems: function(filter, sort, first, count) {
    var result = _.where(items, filter);

    result.sort(function(val1, val2) {
      val1.Artist.localeCompare(val2.Artist)
    });

    return result.slice(first, count);
  }
});

TrackStore.dispatchToken = AppDispatcher.register(function(payload){
	var action = payload.action;
	switch(action.actionType) {
		case AppConstants.LOAD_DATA:
			loadData(action.data);
      AppDispatcher.waitFor([FilterStore.dispatchToken]);
			TrackStore.emitChange();
			break;
    case AppConstants.USER_CHANGE_FILTER:
      AppDispatcher.waitFor([FilterStore.dispatchToken]);
      TrackStore.emitChange();
      break;
		default:
			// do nothing
  }
});

module.exports = TrackStore;
