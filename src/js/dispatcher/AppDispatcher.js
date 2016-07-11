
 var Dispatcher = require('flux').Dispatcher;
 var Assign = require('object-assign');
 var ActionConstants = require('../constants/ActionConstants');

 var AppDispatcher = Assign(new Dispatcher(), {

 	handleViewAction: function(action) {
     	this.dispatch({
       		source: ActionConstants.VIEW_ACTION,
       		action: action
     	});
   	}
 });

 module.exports = AppDispatcher;
