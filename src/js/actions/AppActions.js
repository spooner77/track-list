var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');

var AppActions = {
  changeFilter: function(filterKey, value) {
    AppDispatcher.handleViewAction({
      actionType:ActionConstants.CHANGE_FILTER,
      filterKey: filterKey,
      value: value
    });
  },
  loadData: function(data) {
    AppDispatcher.handleViewAction({
      actionType:ActionConstants.LOAD_DATA,
      data: data
    });
  },
  changeOrder: function(target) {
    AppDispatcher.handleViewAction({
      actionType:ActionConstants.CHANGE_ORDER,
      target: target
    });
  }
}

module.exports = AppActions;
