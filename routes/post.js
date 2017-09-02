(function(){
	var express = require('express');
	var router = express.Router();

	router.post('/hello', function(req, res, next){
	   res.final_data = req.first_middle_ware + ' POST route on things- Hello from post.js';
	   next();
	});

	//export this router to use in our server.js if necessary
	module.exports = router;
})();