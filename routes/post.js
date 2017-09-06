(function(){
	var express = require('express');
	var router = express.Router();
	var utility = require('../services/utility.service');

	router.post('/hello', function(req, res, next){
		var current_date_time = utility.getCurrentDateTime();
		let result = utility.returnResult(req.first_middle_ware + ' POST route on things - Hello from post.js requested on ' + current_date_time, req);
		res.json(result);
	});

	router.post('/add-user', function(req, res, next) {
		let result = utility.returnResult(req.params, req);
		res.json(result);
	});

	//export this router to use in our server.js
	module.exports = router;
})();