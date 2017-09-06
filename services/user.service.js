(function(){

	var Promise = require('promise');
	
	var utility = require('../services/utility.service');
	//var my_mongoose = require('../services/mongoose.service');
	var User = require('../models/user.model');
	
	var user_service = {};
	user_service.getUserById = getUserById;
	user_service.getUsers = getUsers;
	user_service.addUser = addUser;
	
	function getUserById(id) {
		//return utility.returnError('Where the hell is the user');
		let user;
		try {
			user = {"id":1, "first_name":"John", "last_name":"Doe"};
			//let con = my_mongoose.connect();;
		} catch(err) {
			return utility.returnError(err);
		}
		return user;
	}
	
	function getUsers() {
		return new Promise(function(resolve, reject) {
			User.getUsers(function(err, users) {
				if(err) {
					//users = utility.returnError(err);
					reject(err);
				} else {
					resolve(users);
				}
			});
		});

	}

	function addUser(user) {
		let result = false;
		try {
			//result = my_mongoose.insert('User', user);
		} catch(err) {//console.log(err);
			return utility.returnError(err);
		}
		return result;
	}
	
	module.exports = user_service;
})();