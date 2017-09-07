(function(){
	var config = {
		env: 'Dev',
		/*mongodb: {
			'driver': 'mongodb',
			'host': 'localhost',
			'port': '27017',
			'database': 'mean_stack',
			'user':'',
			'password': ''
		}*/
		mongodb: {
			'driver': 'mongodb',
			'host': 'ds129394.mlab.com',
			'port': '29394',
			'database': 'heroku_l9h0958w',
			'user':'heroku_l9h0958w',
			'password': 'amm7qffiikm267ec82rbq4mpr9'
		}
	};
	
	module.exports = config;
})();
// mongodb://heroku_l9h0958w:amm7qffiikm267ec82rbq4mpr9@ds129394.mlab.com:29394/heroku_l9h0958w