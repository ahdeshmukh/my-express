(function(){
	var express = require('express');
	var router = express.Router();
	var utility = require('../services/utility.service');
	var user_service = require('../services/user.service');

	router.get('/hello/:id?', function(req, res, next){
		var return_text = req.first_middle_ware + ' GET route on things - Hello from get.js';
		var current_date_time = utility.getCurrentDateTime();
		if(req.params.id) {
			return_text += '. The id you specified is ' + req.params.id;
		}
	   res.data = return_text + ' requested on ' + current_date_time;
	   next();
	});
	
	router.get('/user/:id', function(req, res, next){
		user_service.getUserById(req.params.id).then(function(user){
			var result = utility.returnResult(user, req);
			res.json(result);
		}, function(err) {
			var error = utility.returnError(err);
			var result = utility.returnResult(error, req);
			res.json(result);
		});
	});
	
	router.get('/users', function(req, res, next){
		user_service.getUsers().then(function(users){
			var result = utility.returnResult(users, req);
			res.json(result);
		}, function(err) {
			var error = utility.returnError(err);
			var result = utility.returnResult(error, req);
			res.json(result);
		});
	});

	router.get('/get-users-tasks-count-by-status/:id', function(req, res, next){
		user_service.getUsersTasksCountByStatus(req.params.id).then(function(count_tasks_by_status){
			var result = utility.returnResult(count_tasks_by_status, req);
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
