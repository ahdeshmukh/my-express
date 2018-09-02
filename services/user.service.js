(function(){

	var Promise = require('promise');
	var bcrypt = require('bcrypt-nodejs');
	
	var utility = require('../services/utility.service');
	var User = require('../models/user.model');
	
	var userService = {};
	userService.getUserById = getUserById;
	userService.getUsers = getUsers;
	userService.addUser = addUser;
	userService.updateUser = updateUser;
	userService.addTask = addTask;
	userService.updateUserTask = updateUserTask;
	userService.getUsersTasksCountByStatus = getUsersTasksCountByStatus;
	userService.getUsersTasksList = getUsersTasksList;
	userService.getUsersTasksListByStatus = getUsersTasksListByStatus;
	
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
					user.password = null;
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
		
		// make the email lower case
		user.email = user.email.toLowerCase();
		
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
		
		// make the email lower case
		user.email = user.email.toLowerCase();
		
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

	function addTask(userId, task) {
		let errMsg = [];
		if(!userId) {
			errMsg.push('User ID is not provided');
		}
		if(!task) {
			errMsg.push('Task is not provided');
		}
		if(errMsg.length) {
			return utility.getDefaultRejectedPromise(errMsg);
		}
		return new Promise(function(resolve, reject) {
			User.addTask({"_id": userId}, task, function(err, data) {
				if(err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}

	function updateUserTask(userId, task) {
		let errMsg = [];
		if(!userId) {
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
			errMsg.push('Cannot update task as status is not provided');
		}
		if((task.status !== 'in_progress') && (task.status !== 'complete')) {
			errMsg.push('Invalid status. The status of the task can only be "In Progress" or "Complete"');
		}

		if((task.status === 'in_progress') && (task.currentStatus !== 'new')) {
			errMsg.push('Invalid status change. You can only change to In Progress from New');
		}
		
		if((task.status === 'complete') && !(task.currentStatus === 'new' || task.currentStatus === 'in_progress')) {
			errMsg.push('xxx Invalid status change. You can only change to Complete from New or In Progress');
		}
		
		if(errMsg.length) {
			return utility.getDefaultRejectedPromise(errMsg);
		}
		return new Promise(function(resolve, reject) {
			User.updateTask(userId, task, function(err, resp) {
				if(err) {
					reject(err);
				} else {
					let result = {"task": task, "resp": resp};
					resolve(result);
				}
			});
		});
	}

	function getUsersTasksCountByStatus(userId) {
		let errMsg = [];
		if(!userId) {
			errMsg.push('User ID is not provided');
		}
		if(errMsg.length) {
			return utility.getDefaultRejectedPromise(errMsg);
		}
		return new Promise(function(resolve, reject) {
			User.getUsersTasksCountByStatus(userId, function(err, data) {
				if(err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}
	
	function getUsersTasksList(userId) {
		let errMsg = [];
		if(!userId) {
			errMsg.push('User ID is not provided');
		}
		if(errMsg.length) {
			return utility.getDefaultRejectedPromise(errMsg);
		}
		return new Promise(function(resolve, reject) {
			User.getUsersTasksList(userId, function(err, data) {
				if(err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}
	
	function getUsersTasksListByStatus(userId, taskStatus) {
		let errMsg = [];
		if(!userId) {
			errMsg.push('User ID is not provided');
		}
		/*if(!taskStatus) {
			let taskStatus = 'new';
		}*/
		if(errMsg.length) {
			return utility.getDefaultRejectedPromise(errMsg);
		}
		return new Promise(function(resolve, reject) {
			User.getUsersTasksListByStatus(userId, taskStatus, function(err, data) {
				if(err) {
					reject(err);
				} else {
					let tasks = [];
					if(data.length > 0) {
						tasks = (data[0].tasks) ? data[0].tasks : [];
					}
					resolve(tasks);
				}
			});
		});
	}
	
	module.exports = userService;
})();