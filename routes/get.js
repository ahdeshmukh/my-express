(function(){
	const express = require('express');
	const router = express.Router();
	const utility = require('../services/utility.service');
	const userService = require('../services/user.service');

	router.get('/hello/:id?', function(req, res, next){
		var return_text = req.first_middle_ware + ' GET route on things - Hello from get.js';
		var current_date_time = utility.getCurrentDateTime();
		if(req.params.id) {
			return_text += '. The id you specified is ' + req.params.id;
		}
	   res.data = return_text + ' requested on ' + current_date_time;
	   next();
	});
	
	router.get('/user/:id', function(req, res){
		userService.getUserById(req.params.id).then(function(user){
			let result = utility.returnResult(user, req);
			res.json(result);
		}, function(err) {
			/*let error = utility.returnError(err);
			let result = utility.returnResult(error, req);
			res.json(result);*/
			let result = utility.returnErrorResponse(err, req);
			res.json(result);
		});
	});
	
	router.get('/users', function(req, res, next){
		userService.getUsers().then(function(users){
			var result = utility.returnResult(users, req);
			res.json(result);
		}, function(err) {
			/*var error = utility.returnError(err);
			var result = utility.returnResult(error, req);
			res.json(result);*/
			let result = utility.returnErrorResponse(err, req);
			res.json(result);
		});
	});

	router.get('/get-users-tasks-count-by-status/:id', function(req, res, next){
		userService.getUsersTasksCountByStatus(req.params.id).then(function(count_tasks_by_status){
			var result = utility.returnResult(count_tasks_by_status, req);
			res.json(result);
		}, function(err) {
			var error = utility.returnError(err);
			var result = utility.returnResult(error, req);
			res.json(result);
		});
	});
	
	router.get('/get-users-tasks-list/:uid', function(req, res, next){
		userService.getUsersTasksList(req.params.uid).then(function(tasks){
			var result = utility.returnResult(tasks, req);
			res.json(result);
		}, function(err) {
			var error = utility.returnError(err);
			var result = utility.returnResult(error, req);
			res.json(result);
		});
	});
	
	router.get('/get-users-tasks-list-by-status/:uid/:taskStatus?', function(req, res, next){
		userService.getUsersTasksListByStatus(req.params.uid, req.params.taskStatus).then(function(tasks){
			var result = utility.returnResult(tasks, req);
			res.json(result);
		}, function(err) {
			var error = utility.returnError(err);
			var result = utility.returnResult(error, req);
			res.json(result);
		});
	});

	//export this router to use in our server.js
	module.exports = router;
	
})();
