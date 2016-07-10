
 var Dispatcher = require('flux').Dispatcher;
 var Assign = require('object-assign');
 var AppConstants = require('../constants/AppConstants');

 var AppDispatcher = Assign(new Dispatcher(), {

 	handleViewAction: function(action) {
     	this.dispatch({
       		source: AppConstants.VIEW_ACTION,
       		action: action
     	});
   	}
 });

 module.exports = AppDispatcher;
