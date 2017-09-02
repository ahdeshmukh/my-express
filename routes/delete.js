(function(){
	var express = require('express');
	var router = express.Router();

	router.delete('/hello', function(req, res, next){
	   res.final_data = req.first_middle_ware + ' DELETE route on things- Hello from delete.js';
	   next();
	});

	//export this router to use in our server.js if necessary
	module.exports = router;
})();