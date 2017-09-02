(function(){
	var express = require('express');
	var router = express.Router();

	router.get('/hello', function(req, res){
	   res.send('GET route on things- Hello from get.js.');
	});

	router.get('/hello/:id', function(req, res){
	   res.send('GET route on things- Hello from get.js. The id you specified is ' + req.params.id);
	});

	//export this router to use in our server.js if necessary
	module.exports = router;
	
})();