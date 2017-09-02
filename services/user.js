(function(){
	
	var utility = require('../services/utility');
	
	var user_service = {};
	user_service.getUserById = getUserById;
	user_service.getUsers = getUsers;
	
	function getUserById(id) {
		var users = [];
		users = this.getUsers();
		return utility.returnResult(users);
		//return users;
	}
	
	function getUsers() {
		return [{"id":1, "first_name":"John", "last_name":"Doe"}, {"id":2, "first_name":"Jane", "last_name":"Doe"}];
	}
	
	module.exports = user_service;
})();