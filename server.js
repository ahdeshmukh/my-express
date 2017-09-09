(function(){
	const express = require('express');
	const app = express();
	const bodyParser = require('body-parser');
	const mongoose = require('mongoose');

	const utility_service = require('./services/utility.service');

	const mongoose_service = require('./services/mongoose.service');
	const mongo_connection_string = mongoose_service.getConnectionString();

	mongoose.connect(mongo_connection_string, {useMongoClient: true, reconnectTries: 3});
	var db = mongoose.connection;
	var mongoose_connection_success = true;
	var mongoose_error = null;
	mongoose.connection.on('error',function (err, res) {  
		mongoose_error = utility_service.returnError(err);
		mongoose_connection_success = false;
	});
	
	// home page
	app.use(express.static('public')) // use public folder for static file

	app.use(bodyParser.json())

	var get_routes = require('./routes/get.js');
	var post_routes = require('./routes/post.js');
	var put_routes = require('./routes/put.js');
	var delete_routes = require('./routes/delete.js');
	
	var utility = require('./services/utility.service');
	
	app.use(function(req, res, next){
		if(!mongoose_connection_success) {
			res.json(utility_service.returnResult(mongoose_error));
			return;
		}
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

	app.listen(process.env.PORT || 4000, () => console.log('All is ok'));
	
})();