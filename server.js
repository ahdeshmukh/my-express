(function(){
	const express = require('express')
	const app = express()

	// home page
	app.use(express.static('public')) // use public folder for static file

	var get_routes = require('./routes/get.js');
	var post_routes = require('./routes/post.js');
	var put_routes = require('./routes/put.js');
	var delete_routes = require('./routes/delete.js');
	
	var utility = require('./services/utility');
	
	app.use(function(req, res, next){
		req.first_middle_ware = 'STARTINGXX -';
		if(req.url == '/restricted') {
			res.send('Restricted route');
			return;
		}
		next();
	});

	app.use('/', get_routes);
	app.use('/', post_routes);
	app.use('/', put_routes);
	app.use('/', delete_routes);
	
	app.use(function(req, res){
		var current_env = utility.getCurrentEnv();
		//res.send(res.final_data + ' - ENDINGYY. Current environment is ' + current_env);
		var result = {};
		result.sucess = true;
		result.data = res.data;
		result.env = current_env;
		result.host = req.headers.host;
		
		res.json(result);
	});
	
	app.listen(process.env.PORT || 8080, () => console.log('All is ok'))
	
})();