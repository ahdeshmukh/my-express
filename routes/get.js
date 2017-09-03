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
		var user = user_service.getUserById(req.params.id);console.log(user);
		var result = utility.returnResult(user, req);
		res.json(result);
	});
	
	router.get('/users', function(req, res, next){
		var users = user_service.getUsers();
		var result = utility.returnResult(users, req);
		res.json(result);
	});

	//export this router to use in our server.js
	module.exports = router;
	
})();
