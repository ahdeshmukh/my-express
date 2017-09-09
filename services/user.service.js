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
		return new Promise(function(resolve, reject) {
			User.addUser(user, function(err, users) {
				if(err) {
					reject(err);
				} else {
					resolve(users);
				}
			});
		});
	}

	function updateUser(id, user) {
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