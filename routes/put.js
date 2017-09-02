(function(){
	var express = require('express');
	var router = express.Router();
	var utility = require('../services/utility');

	router.put('/hello', function(req, res, next){
		var current_date_time = utility.getCurrentDateTime();
		res.final_data = req.first_middle_ware + ' PUT route on things - Hello from put.js requested on ' + current_date_time;
		next();
	});

	//export this router to use in our server.js
	module.exports = router;
})();