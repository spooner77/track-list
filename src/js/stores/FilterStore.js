var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var filter = {};

var ArtistList = [];
var GenreList= [];
var YearList = [];

var addListStoreItem = function(store, item) {
  if ( item && _.isString(item) && store.indexOf(item) == -1 )
  {
    store.push(item);
  }
  return false;
};

var loadData = function(data) {
  data.forEach(function(item) {
      if ( !item )
        return;

      addListStoreItem(ArtistList, item.Artist);
      addListStoreItem(GenreList, item.Genre);
      addListStoreItem(YearList, item.Year);
    });

    ArtistList.sort();
    GenreList.sort();
    YearList.sort();
};

var clean = function() {
  filter = {};
  ArtistList = [];
  GenreList= [];
  YearList = [];
};

var FilterStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  addFilter: function(key, value) {
    filter[key] = value;
  },

  removeFilter: function(key) {
    if ( filter.hasOwnProperty(key) )
    {
      delete filter[key];
    }
  },

  getFilter: function(key) {
    return filter.key;
  },

  getAllFilters: function() {
    return filter;
  },

  getArtistOptions: function() {
    return ArtistList;
  },

  getGenreOptions: function() {
    return GenreList;
  },

  getYearOptions: function() {
    return YearList;
  }
});

FilterStore.dispatchToken = AppDispatcher.register(function(payload){
	var action = payload.action;
	switch(action.actionType) {
		case AppConstants.LOAD_DATA:
			clean();
      loadData(action.data)
			FilterStore.emitChange();
			break;
    case AppConstants.USER_CHANGE_FILTER:
        var key = action.filterKey;
        var value = action.value;
        if ( !value ) {
          FilterStore.removeFilter(key);
        }
        else {
          FilterStore.addFilter(key,value);
        }
  			break;
		default:
			// do nothing
  }
});

module.exports = FilterStore;
