var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var ActionConstants = require('../constants/ActionConstants');
var FilterStore = require('./FilterStore');
var Assign = require('object-assign');


var CHANGE_EVENT = 'change';
var ORDER_ASC = 'asc';
var ORDER_DESC = 'desc';

var target = null;
var order = ORDER_ASC;

function setOrder(targ) {
  if ( target == targ )
  {
    switch(order)
    {
      case ORDER_ASC:
        // change sort order if select same target
        order = ORDER_DESC;
        break;
      case ORDER_DESC:
        // clear the sort order if user choose the same target twice
        target = null;
        order = ORDER_ASC;
        break;
    }
  }
  else {
    target = targ;
    order = ORDER_ASC;
  }
}

var OrderStore = Assign({}, EventEmitter.prototype, {
  ORDER_ASC:ORDER_ASC,
  ORDER_DESC:ORDER_DESC,

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  getTarget: function() {
  	return target;
  },

  getOrder: function() {
    return order;
  }
});

TrackStore.dispatchToken = AppDispatcher.register(function(payload){
	var action = payload.action;
	switch(action.actionType) {
    case ActionConstants.CHANGE_ORDER:
      setOrder(target);
      break;
		default:
			// do nothing
  }
});

module.exports = TrackStore;
