(function(){

	var Promise = require('promise');
	
	var utility = require('../services/utility.service');
	var User = require('../models/user.model');
	
	var user_service = {};
	user_service.getUserById = getUserById;
	user_service.getUsers = getUsers;
	user_service.addUser = addUser;
	user_service.updateUser = updateUser;
	user_service.addTask = addTask;
	
	function getUserById(id) {
		let errMsg = [];
		if(!id) {
			errMsg.push('User ID is not provided');
		}
		if(errMsg.length) {
			return utility.getDefaultRejectedPromise(errMsg);
		}

		return new Promise(function(resolve, reject) {
			User.getUserById(id, function(err, user) {
				if(err) {
					reject(err);
				} else {
					resolve(user);
				}
			});
		});
	}
	
	function getUsers() {
		return new Promise(function(resolve, reject) {
			User.getUsers(function(err, users) {
				if(err) {
					reject(err);
				} else {
					resolve(users);
				}
			});
		});
	}

	function addUser(user) {
		let errMsg = [];
		if(!user.first_name) {
			errMsg.push('First name is required');
		}
		if(!user.last_name) {
			errMsg.push('Last name is required');
		}
		if(!user.email) {
			errMsg.push('Email is required');
		}
		if(errMsg.length) {
			return utility.getDefaultRejectedPromise(errMsg);
		}
		
		return new Promise(function(resolve, reject) {
			User.addUser(user, function(err, new_user) {
				if(err) {
					reject(err);
				} else {
					resolve(new_user);
				}
			});
		});
	}

	function updateUser(id, user) {
		let errMsg = [];
		if(!id) {
			errMsg.push('User ID is not provided');
		}
		if(!user.first_name) {
			errMsg.push('First name is required');
		}
		if(!user.last_name) {
			errMsg.push('Last name is required');
		}
		if(!user.email) {
			errMsg.push('Email is required');
		}
		if(errMsg.length) {
			return utility.getDefaultRejectedPromise(errMsg);
		}
		
		return new Promise(function(resolve, reject) {
			User.updateUser({"_id": id}, user, function(err, data) {
				if(err) {
					reject(err);
				} else {
					user.id = id;
					data.user = user;
					resolve(data);
				}
			});
		});
	}

	function addTask(user_id, task) {
		return new Promise(function(resolve, reject) {
			User.addTask({"_id": user_id}, task, function(err, data) {
				if(err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}
	
	module.exports = user_service;
})();