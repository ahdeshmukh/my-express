(function(){
	const express = require('express');
	const router = express.Router();
	const utility = require('../services/utility.service');
	const userService = require('../services/user.service');
	const authService = require('../services/auth.service');

	router.post('/hello', function(req, res, next){
		let current_date_time = utility.getCurrentDateTime();
		let result = utility.returnResult(req.first_middle_ware + ' POST route on things - Hello from post.js requested on ' + current_date_time, req);
		res.json(result);
	});

	router.post('/add-user', function(req, res, next) {
		let user_data = req.body;
		userService.addUser(user_data).then(function(user) {
			let result = utility.returnResult(user, req);
			res.json(result);
		}, function(err) {
			let error = utility.returnError(err);
			let result = utility.returnResult(error, req);
			res.json(result);
		});
	});

	router.post('/user-add-task', function(req, res, next) {
		let task = req.body.name;
		let user_id = req.body.user_id;
		userService.addTask(user_id, task).then(function(task_result) {
			let result = utility.returnResult(task_result, req);
			res.json(result);
		}, function(err) {
			let error = utility.returnError(err);
			let result = utility.returnResult(error, req);
			res.json(result);
		});
	});

	router.post('/login', function(req, res, next) {
		let credentials = req.body;
		authService.login(credentials).then(function(auth_result) {
			let result = utility.returnResult(auth_result, req);
			res.json(result);
		}, function(err) {
			let error = utility.returnError(err);
			let result = utility.returnResult(error, req);
			res.json(result);
		});
	});

	//export this router to use in our server.js
	module.exports = router;
})();