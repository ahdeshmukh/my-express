(function() {
    const mongoose = require('mongoose');
    const MyMongoose = require('../models/mongoose.model');
    const User = require('../models/user.model');
    //MyMongoose = require('../models/mongoose.model').MyMongoose
    const config = require('../configs/config');

    var my_mongoose = {};
    my_mongoose.getDbCredentials = getDbCredentials;
    my_mongoose.getConnectionString = getConnectionString;
    my_mongoose.connect = connect;
    my_mongoose.find = find;
    my_mongoose.insert = insert;
    my_mongoose.selectModel = selectModel;

    function getDbCredentials() {
        let my_mongoose = new MyMongoose();
        return my_mongoose;
        //return 'Mongoose connection';
    }

    function getConnectionString() {
        //return 'mongodb://amit:dSDqwirHabCmEInU@mean-stack-1-shard-00-00-jigs7.mongodb.net:27017,mean-stack-1-shard-00-01-jigs7.mongodb.net:27017,mean-stack-1-shard-00-02-jigs7.mongodb.net:27017/mean_stack?ssl=true&replicaSet=mean-stack-1-shard-0&authSource=admin';
        let my_mongoose_credentials = this.getDbCredentials();
        let connection_string = my_mongoose_credentials.driver+'://';
        if(my_mongoose_credentials.user) {
            connection_string += my_mongoose_credentials.user;
        }
        if(my_mongoose_credentials.password) {
            connection_string += ':' + my_mongoose_credentials.password;
        }
        if(my_mongoose_credentials.user) {
            connection_string += '@';
        }

        if(my_mongoose_credentials.replicaSet) {
            let nodes_count = 0;
            my_mongoose_credentials.replicaSet.nodes.forEach(function(node){
                if(nodes_count > 0) {
                  connection_string += ',';  
                }
                connection_string += node.host;
                if(node.port) {
                    connection_string += ':'+node.port;
                }
                nodes_count++;
            });
        } else {
            connection_string += my_mongoose_credentials.host;
            if(my_mongoose_credentials.port) {
                connection_string += ':' + my_mongoose_credentials.port;
            }
        }
        
        connection_string += '/' + my_mongoose_credentials.database;

        if(my_mongoose_credentials.replicaSet) {
            connection_string += '?replicaSet=' + my_mongoose_credentials.replicaSet.name;
        }
        
        if(my_mongoose_credentials.additionalOptions) {
            let option_count = 0;
            my_mongoose_credentials.additionalOptions.forEach(function(option) {
                if((option_count == 0) && (!my_mongoose_credentials.replicaSet)) {
                    connection_string += '?';
                } else {
                    connection_string += '&';
                }
                connection_string += option.name + '=' + option.value;
                option_count++;
            });
        }
        return connection_string;
    }

    function connect() {
        let credentials = this.getDbCredentials();
        var promise = mongoose.connect(credentials.driver+'://'+credentials.host+':'+credentials.port+'/'+credentials.database, {
            useMongoClient: true,
        });
        promise.then(function(db){
           //console.log(db); 
        });
    }


    function find(model, filter, limit) {

    }

    function insert(model, data) {
        let selected_model = this.selectModel(model);
        selected_model.save((err, newly_created) => {
            if(err) {
                throw new Error(err);
            }
            return newly_created;
        });
    }

    function selectModel(model) {
        let selected_model = null;
        switch(model) {
            case 'User':
                selected_model = User;
                break;
            default:
                break;
                
        }
        return selected_model;
    }

    module.exports = my_mongoose;
})();