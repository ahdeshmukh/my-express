(function() {
    const mongoose = require('mongoose');
    const MyMongoose = require('../models/mongoose.model');
    //MyMongoose = require('../models/mongoose.model').MyMongoose
    //var config = require('../configs/config');

    var my_mongoose = {};
    my_mongoose.getDbCredentials = getDbCredentials;
    my_mongoose.connect = connect;
    my_mongoose.find = find;

    function getDbCredentials() {
        let my_mongoose = new MyMongoose();
        return my_mongoose;
        //return 'Mongoose connection';
    }

    function connect() {
        let credentials = this.getDbCredentials();
        //mongoose.connect('mongodb://localhost/test');
        //mongoose.connect(credentials.driver+'://'+credentials.host+':'+credentials.port+'/'+credentials.database);
        //console.log('con => ' + credentials.database);
        //var db = mongoose.connection;
        //db.on('error', console.error.bind(console, 'connection error:'));
        var promise = mongoose.connect(credentials.driver+'://'+credentials.host+':'+credentials.port+'/'+credentials.database, {
            useMongoClient: true,
        });
        promise.then(function(db){
            console.log(db);
        });
        //console.log(promise);
    }


    function find(model, filter, limit) {

    }

    module.exports = my_mongoose;
})();