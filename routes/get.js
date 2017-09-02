(function(){
	var express = require('express');
	var router = express.Router();

	router.get('/hello/:id?', function(req, res){
		var return_text = 'GET route on things- Hello from get.js.';
		if(req.params.id) {
			return_text += 'The id you specified is ' + req.params.id;
		}
	   res.send(return_text);
	});

	/*router.get('/hello/:id', function(req, res){
	   res.send('GET route on things- Hello from get.js. The id you specified is ' + req.params.id);
	});*/

	//export this router to use in our server.js if necessary
	module.exports = router;
	
})();