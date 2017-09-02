(function(){
	var express = require('express');
	var router = express.Router();

	router.put('/hello', function(req, res, next){
	   res.final_data = req.first_middle_ware + ' PUT route on things- Hello from put.js';
	   next();
	});

	//export this router to use in our server.js if necessary
	module.exports = router;
})();