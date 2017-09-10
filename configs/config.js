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
		/*mongodb: {
			'driver': 'mongodb',
			'host': 'ds129394.mlab.com',
			'port': '29394',
			'database': 'heroku_l9h0958w',
			'user':'heroku_l9h0958w',
			'password': 'amm7qffiikm267ec82rbq4mpr9'
		}*/
		mongodb: {
			'driver': 'mongodb',
			'user': 'amit',
			'password': 'dSDqwirHabCmEInU',
			'database': 'mean_stack',
			'replicaSet': {
				'name': 'mean-stack-1-shard-0',
				'nodes':[
					{'host':'mean-stack-1-shard-00-00-jigs7.mongodb.net', 'port':'27017'},
					{'host':'mean-stack-1-shard-00-01-jigs7.mongodb.net', 'port':'27017'},
					{'host':'mean-stack-1-shard-00-02-jigs7.mongodb.net', 'port':'27017'}
				]
			},
			'additionalOptions': [
				{'name':'ssl', 'value':true},
				{'name':'authSource', 'value':'admin'}
			]
		}
	};
	
	module.exports = config;
})();