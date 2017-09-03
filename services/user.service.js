(function(){
	
	var utility = require('../services/utility.service');
	
	var user_service = {};
	user_service.getUserById = getUserById;
	user_service.getUsers = getUsers;
	
	function getUserById(id) {
		return {"id":1, "first_name":"John", "last_name":"Doe"};
	}
	
	function getUsers() {
		return [{"id":1, "first_name":"John", "last_name":"Doe"}, {"id":2, "first_name":"Jane", "last_name":"Doe"}];
		//return utility.returnError('Some error in getting users');
	}
	
	module.exports = user_service;
})();