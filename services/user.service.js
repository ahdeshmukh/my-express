(function(){

	var Promise = require('promise');
	var bcrypt = require('bcrypt-nodejs');
	
	var utility = require('../services/utility.service');
	var User = require('../models/user.model');
	
	var user_service = {};
	user_service.getUserById = getUserById;
	user_service.getUsers = getUsers;
	user_service.addUser = addUser;
	user_service.updateUser = updateUser;
	user_service.addTask = addTask;
	user_service.updateUserTask = updateUserTask;
	user_service.getUsersTasksCountByStatus = getUsersTasksCountByStatus;
	
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
		if(!user.password) {
			errMsg.push('Password is required');
		}
		if(errMsg.length) {
			return utility.getDefaultRejectedPromise(errMsg);
		}

		// hash the password
		user.password = bcrypt.hashSync(user.password);
		
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

	function updateUserTask(user_id, task) {
		let errMsg = [];
		if(!user_id) {
			errMsg.push('User ID is not provided');
		}
		if(!task) {
			errMsg.push('Task is not provided');
		}
		if(!task.name) {
			errMsg.push('Task cannot be identified as Task name is not provided');
		}
		if(!task.created_time) {
			errMsg.push('Task cannot be identified as Task created time is not provided');
		}
		if(!task.status) {
			errMsg.push('Cannot update task as new status is not provided');
		}
		if((task.status != 'in_progress') || (task.status != 'complete')) {
			errMsg.push('Invalid status. The status of the task can only be "in Progress" or "Complete"');
		}
		if(errMsg.length) {
			return utility.getDefaultRejectedPromise(errMsg);
		}
		return new Promise(function(resolve, reject) {
			User.updateTask(user_id, task, function(err, data) {
				if(err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}

	function getUsersTasksCountByStatus(user_id) {
		let errMsg = [];
		if(!user_id) {
			errMsg.push('User ID is not provided');
		}
		if(errMsg.length) {
			return utility.getDefaultRejectedPromise(errMsg);
		}
		return new Promise(function(resolve, reject) {
			User.getUsersTasksCountByStatus(user_id, function(err, data) {
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