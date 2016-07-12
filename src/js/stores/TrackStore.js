var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var ActionConstants = require('../constants/ActionConstants');
var FilterStore = require('./FilterStore');
var Assign = require('object-assign');


var CHANGE_EVENT = 'change';
var ORDER_ASC = 'asc';
var ORDER_DESC = 'desc';

// original data
var items = [];

// filterd items
var filteredItems = [];

// order
var orderTarget = null;
var order = ORDER_ASC;

// pagination data
var page = 1;
var itemsPrePage = 10;
var itemsPrePageList = [10, 20, 30];

function loadData(data) {
  page = 1;
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
    }
  );
  filteredItems = items.slice();
};

function setFilter(filter) {
  page = 1;
  filteredItems = _.where(items, filter);
};

function setPage(p) {
  page = p;
};

function setItemsPrePageCount(count) {
  page = 1;
  itemsPrePage = count;
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

  // get playlist items
  getItems: function() {
    var result = filteredItems.slice();

    if ( orderTarget && this.getFieldList().indexOf(orderTarget) != -1 ) {
      result.sort(function(val1, val2) {
        var v1 = val1[orderTarget];
        var v2 = val2[orderTarget];
        var val = 0;

        if ( _.isString(v1) && _.isString(v2) )
          val = (val1[orderTarget]).localeCompare(val2[orderTarget]);
        else if ( v1 > v2 )
          val = 1;
        else if ( v1 < v2 )
          val = -1;

        return val * ( order == ORDER_DESC ? -1 : 1 );
      });
    }

    return result.slice((page-1)*this.getItemsPrePageCount(), page*this.getItemsPrePageCount());
  },

  getItemsCount: function() {
    return filteredItems.length;
  },

  // pagination
  getPage: function() {
    return page;
  },

  getPagesCount: function() {
    return Math.ceil(this.getItemsCount() / this.getItemsPrePageCount());
  },

  getItemsPrePageCount: function() {
    return itemsPrePage;
  },

  getItemsPrePageList: function() {
    return itemsPrePageList;
  },

  // order
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
        setFilter(FilterStore.getAllFilters());
        TrackStore.emitChange();
        break;

      case ActionConstants.CHANGE_ORDER:
        setOrder(action.target);
        TrackStore.emitChange();
        break;

      case ActionConstants.CHANGE_PAGE:
        if ( TrackStore.getPagesCount() >= action.page ) {
          setPage(action.page);
          TrackStore.emitChange();
        }
        break;

      case ActionConstants.CHANGE_ITEMS_PER_PAGE_COUNT:
        if ( TrackStore.getItemsPrePageList().indexOf(action.count) != -1 ) {
          setItemsPrePageCount(action.count);
          TrackStore.emitChange();
        }
        break;

      default:
        // do nothing
  }
});

module.exports = TrackStore;
