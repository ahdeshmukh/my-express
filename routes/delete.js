(function(){
	var express = require('express');
	var router = express.Router();

	router.delete('/hello', function(req, res){
	   res.send('DELETE route on things- Hello from delete.js.');
	});

	//export this router to use in our server.js if necessary
	module.exports = router;
})();