(function() {
    
    var config = require('../configs/config');
    
    class User {
        constructor() {
            //var mongodb_config = config.mongodb;
            this.host = config.mongodb.host;
            this.port = config.mongodb.port;
            this.database = config.mongodb.database;
        }
    }

    module.exports = User;
})();