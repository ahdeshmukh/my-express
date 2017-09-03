(function(){
	
	var utility = require('../services/utility.service');
	
	var user_service = {};
	user_service.getUserById = getUserById;
	user_service.getUsers = getUsers;
	
	function getUserById(id) {
		//return utility.returnError('Where the hell is the user');
		try {
			user = {"id":1, "first_name":"John", "last_name":"Doe"};
		} catch(err) {
			return utility.returnError(err);
		}
		return user;
	}
	
	function getUsers() {
		//return utility.returnError('Kahan maar gaye sare users???');
		try {
			users = [{"id":1, "first_name":"John", "last_name":"Doe"}, {"id":2, "first_name":"Jane", "last_name":"Doe"}];
		} catch(err) {
			return utility.returnError('Kahan maar gaye sare users???');
		}
		return users;
	}
	
	module.exports = user_service;
})();