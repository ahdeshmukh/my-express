(function(){
	
	var utility = require('../services/utility');
	
	var user_service = {};
	user_service.getUserById = getUserById;
	user_service.getUsers = getUsers;
	
	function getUserById(id) {
		var user = {"id":1, "first_name":"John", "last_name":"Doe"};
		return utility.returnResult(user);
		//return users;
	}
	
	function getUsers() {
		var users = [{"id":1, "first_name":"John", "last_name":"Doe"}, {"id":2, "first_name":"Jane", "last_name":"Doe"}];
		return utility.returnResult(users);
	}
	
	module.exports = user_service;
})();