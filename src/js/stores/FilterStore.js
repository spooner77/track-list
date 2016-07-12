var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var ActionConstants = require('../constants/ActionConstants');
var Assign = require('object-assign');
var Hash = require('object-hash');


var CHANGE_EVENT = 'change';
var filter = {};

var ArtistList = [];
var GenreList= [];
var YearList = [];

function addListStoreItem(store, item) {
  if ( item && _.isString(item) && _.findIndex(store, {item:item}) == -1 )
  {
      store.push({id:Hash.MD5(item), item:item});
  }
};

function loadData(data) {
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

function clean() {
  filter = {};
  ArtistList = [];
  GenreList= [];
  YearList = [];
};

var FilterStore = Assign({}, EventEmitter.prototype, {
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

      case ActionConstants.LOAD_DATA:
        clean();
        loadData(action.data);
        FilterStore.emitChange();
        break;

      case ActionConstants.CHANGE_FILTER:
        var key = action.filterKey;
        var value = action.value;

        if ( !value ) {
          FilterStore.removeFilter(key);
        }
        else {
          FilterStore.addFilter(key,value);
        }

        FilterStore.emitChange();
        break;

      default:
      // do nothing
    }
});

module.exports = FilterStore;
