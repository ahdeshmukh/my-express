(function(){
	var express = require('express');
	var router = express.Router();
	var utility = require('../services/utility.service');
	var user_service = require('../services/user.service');

	router.post('/hello', function(req, res, next){
		var current_date_time = utility.getCurrentDateTime();
		let result = utility.returnResult(req.first_middle_ware + ' POST route on things - Hello from post.js requested on ' + current_date_time, req);
		res.json(result);
	});

	router.post('/add-user', function(req, res, next) {
		let user = {"first_name":req.body.first_name, "last_name":req.body.last_name, "email":req.body.email};
		user_service.addUser(user).then(function(user) {
			var result = utility.returnResult(user, req);
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