var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var ActionConstants = require('../constants/ActionConstants');
var Assign = require('object-assign');
var Hash = require('object-hash');


var CHANGE_EVENT = 'change';
var ORDER_ASC = 'asc';
var ORDER_DESC = 'desc';

// original data
var items = [];

// filterd items
var filteredItems = [];

// filter data
var filter = {};
var ArtistList = [];
var GenreList= [];
var YearList = [];

// order
var orderTarget = null;
var order = ORDER_ASC;

// pagination data
var page = 1;
var itemsPerPage = 10;
var itemsPerPageList = [10, 20, 30];

/**
 * load data to store
 * @param {Object[]} data
 */
function loadData(data) {
  page = 1;
  cleanFilter();

  data.forEach(function(item) {
      if ( !item )
        return;

      // add track to original data storage
      var track = {};
      track.id = parseInt(item.id,10);
      track.Artist = _.isString(item.Artist) ? item.Artist : "";
      track.Song = _.isString(item.Song) ? item.Song  : "";
      track.Genre = _.isString(item.Genre) ? item.Genre : "";
      track.Year = _.isString(item.Year) ? item.Year : "";
      track.Time = parseInt(item.Time,10);

      items.push(track);

      // add data to filter lists
      addFilterListItem(ArtistList, item.Artist);
      addFilterListItem(GenreList, item.Genre);
      addFilterListItem(YearList, item.Year);

    }
  );
  // fill filtered data storege
  filteredItems = items.slice();

  // sort filter lists
  ArtistList.sort();
  GenreList.sort();
  YearList.sort();
};

/**
 * Add item to selected filter store
 * @param {Object[]} store
 * @param {String} item
 */
function addFilterListItem(store, item) {
  if ( item && _.isString(item) && _.findIndex(store, {item:item}) == -1 )
  {
      store.push({id:Hash.MD5(item), item:item});
  }
};

/**
 * @param {String} key
 * @param {String} value
 */
function addFilter(key, value) {
  filter[key] = value;
}

/**
 * @param {String} key
 */
function removeFilter(key) {
  if ( filter.hasOwnProperty(key) )
  {
    delete filter[key];
  }
}

/**
 * Clean all filter data
 */
function cleanFilter() {
  filter = {};
  ArtistList = [];
  GenreList= [];
  YearList = [];
};

/**
 * update store data when filter change
 */
function onChangeFilter() {
  page = 1;
  filteredItems = _.where(items, filter);
};

/**
 * Set current page
 * @param {Number} p
 */
function setPage(p) {
  page = p;
};

/**
 * @param {Number} count
 */
function setItemsPerPageCount(count) {
  page = 1;
  itemsPerPage = count;
};

/**
 * Set tracklist order
 * @param {String} target - column name
 */
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

    return result.slice((page-1)*this.getItemsPerPageCount(), page*this.getItemsPerPageCount());
  },

  // filters

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
  },

  // pagination

  getItemsCount: function() {
    return filteredItems.length;
  },

  getPagesCount: function() {
    return Math.ceil(this.getItemsCount() / this.getItemsPerPageCount());
  },

  getPage: function() {
    return page;
  },

  getItemsPerPageCount: function() {
    return itemsPerPage;
  },

  getItemsPerPageList: function() {
    return itemsPerPageList;
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
        TrackStore.emitChange();
        break;

      case ActionConstants.CHANGE_FILTER:
        var key = action.filterKey;
        var value = action.value;

        if ( !value ) {
          removeFilter(key);
        }
        else {
          addFilter(key,value);
        }

        onChangeFilter();

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
        if ( TrackStore.getItemsPerPageList().indexOf(action.count) != -1 ) {
          setItemsPerPageCount(action.count);
          TrackStore.emitChange();
        }
        break;

      default:
        // do nothing
  }
});

module.exports = TrackStore;
