(function(){
	const express = require('express');
	const app = express();
	const bodyParser = require('body-parser');
	const mongoose = require('mongoose');

	var config = require('./configs/config');
	var mongo_connection_string = config.mongodb.driver + '://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.database;

	mongoose.connect(mongo_connection_string, {useMongoClient: true});
	var db = mongoose.connection;
	
	// home page
	app.use(express.static('public')) // use public folder for static file

	app.use(bodyParser.json())

	var get_routes = require('./routes/get.js');
	var post_routes = require('./routes/post.js');
	var put_routes = require('./routes/put.js');
	var delete_routes = require('./routes/delete.js');
	
	var utility = require('./services/utility.service');
	
	app.use(function(req, res, next){
		req.first_middle_ware = 'STARTINGXX -';
		if(req.url == '/restricted') {
			//res.send('Restricted route for ' + req.method);
			res.json({'success':false, 'error':req.url + ' is a restricted route for ' + req.method})
			return;
		}
		next();
	});

	app.use('/', get_routes);
	app.use('/', post_routes);
	app.use('/', put_routes);
	app.use('/', delete_routes);

	app.listen(process.env.PORT || 8080, () => console.log('All is ok'))
	
})();