(function() {
    
    var mongoose = require('mongoose');
    
    // User schema
    var userSchema = mongoose.Schema({
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            default: true
        },
        tasks: {
            type: Array,
            default:[]
        },
        created_time: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }, { collection: 'users' });

    var User = module.exports = mongoose.model('User', userSchema);

    module.exports.getUsers = function(callback, limit) {
        User.find(callback).limit(limit);
    };

    module.exports.getUserById = function(id, callback) {
        User.findById(id, callback);
    };

    module.exports.addUser = function(user, callback) {
        User.create(user, callback);
    };

    module.exports.updateUser = function(query, user, callback) {
        User.update(query, user, callback);
    }

    module.exports.addTask = function(query, task, callback) {
        let task_obj = {};
		task_obj.name = task;
		task_obj.status = 'new';
        task_obj.created_time = Date.now();
        User.update(query, {$push: {"tasks": task_obj}}, callback);
    }

})();