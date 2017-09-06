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
		//let result = utility.returnResult(req.body, req);
		//res.json(result);
		var user = {"first_name":req.body.first_name, "last_name":req.body.last_name, "email":req.body.email};
		var add_user_result = user_service.addUser(user, function(data) {
			console.log(data);
		});
		console.log(add_user_result);
		res.json(add_user_result);
	});

	//export this router to use in our server.js
	module.exports = router;
})();