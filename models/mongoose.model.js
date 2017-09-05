(function() {
    
    var config = require('../configs/config');
    
    class MyMongoose {
        /*connection;
        host;
        database;
        port;*/

        constructor() {
            //var mongodb_config = config.mongodb;
            this.driver = config.mongodb.driver;
            this.host = config.mongodb.host;
            this.port = config.mongodb.port;
            this.database = config.mongodb.database;
        }
    }

    module.exports = MyMongoose;
})();