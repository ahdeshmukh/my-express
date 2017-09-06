(function(){
	
	var utility = require('../services/utility.service');
	var my_mongoose = require('../services/mongoose.service');
	
	var user_service = {};
	user_service.getUserById = getUserById;
	user_service.getUsers = getUsers;
	
	function getUserById(id) {
		//return utility.returnError('Where the hell is the user');
		let user;
		try {
			user = {"id":1, "first_name":"John", "last_name":"Doe"};
			let con = my_mongoose.connect();;
		} catch(err) {
			return utility.returnError(err);
		}
		return user;
	}
	
	function getUsers() {
		//return utility.returnError('Oh no, there are no users to be found');
		try {
			users = [{"id":1, "first_name":"John", "last_name":"Doe"}, {"id":2, "first_name":"Jane", "last_name":"Doe"}];
		} catch(err) {
			return utility.returnError(err);
		}
		return users;
	}
	
	module.exports = user_service;
})();