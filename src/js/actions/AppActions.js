var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
  changeFilter: function(filterKey, value){
    AppDispatcher.handleViewAction({
      actionType:AppConstants.USER_CHANGE_FILTER,
      filterKey: filterKey,
      value: value
    });
  },

  loadData: function(data){
      AppDispatcher.handleViewAction({
        actionType:AppConstants.LOAD_DATA,
        data: data
      });
  }
}

module.exports = AppActions;
