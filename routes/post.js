(function(){
	var express = require('express');
	var router = express.Router();

	router.post('/hello', function(req, res){
	   res.send('POST route on things- Hello from post.js.');
	});

	//export this router to use in our server.js if necessary
	module.exports = router;
})();