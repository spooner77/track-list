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
  changePage: function(page) {
    AppDispatcher.handleViewAction({
      actionType:ActionConstants.CHANGE_PAGE,
      page: page
    });
  },

  changePageItemsCount: function(count) {
    AppDispatcher.handleViewAction({
      actionType:ActionConstants.CHANGE_ITEMS_PER_PAGE_COUNT,
      count: count
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
