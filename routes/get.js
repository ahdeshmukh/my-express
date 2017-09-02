(function(){
	var express = require('express');
	var router = express.Router();
	var utility = require('../services/utility');

	router.get('/hello/:id?', function(req, res, next){
		var return_text = req.first_middle_ware + ' GET route on things - Hello from get.js';
		var current_date_time = utility.getCurrentDateTime();
		if(req.params.id) {
			return_text += '. The id you specified is ' + req.params.id;
		}
	   res.final_data = return_text + ' requested on ' + current_date_time;
	   next();
	});

	/*router.get('/hello/:id', function(req, res){
	   res.send('GET route on things- Hello from get.js. The id you specified is ' + req.params.id);
	});*/

	//export this router to use in our server.js if necessary
	module.exports = router;
	
})();
