(function(){
	var express = require('express');
	var router = express.Router();

	router.put('/hello', function(req, res){
	   res.send('PUT route on things- Hello from put.js.');
	});

	//export this router to use in our server.js if necessary
	module.exports = router;
})();