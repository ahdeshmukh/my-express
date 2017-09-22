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
        password: {
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
            default: Date.now
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
        task_obj.created_time = Date.now();//dateFormat(now, "isoDateTime", true);//Date();
        User.update(query, {$push: {"tasks": task_obj}}, callback);
    }

    module.exports.getUserByEmail = function(email, callback) {
        let query = {"email": email};
        User.findOne(query, callback);
        // User.findOne(query, 'email password', callback); // to only return email and password
    }

    module.exports.getUsersTasksCountByStatus = function(user_id, callback) {
        let user_id_obj = mongoose.Types.ObjectId(user_id);
        User.aggregate([
            {$match: {_id: user_id_obj, active: true}},
            {$unwind: "$tasks"},
            {$group: {_id: "$tasks.status", num_tasks: {$sum: 1}}},
            {$project:{_id: 0, task_name:"$_id", num_tasks: 1}}
        ], callback);
    }

    module.exports.updateTask = function(user_id, task, callback) {
        let user_id_obj = mongoose.Types.ObjectId(user_id);
        let query = {_id:user_id_obj, "tasks.name":task.name, "tasks.created_time":task.created_time};
        let update = {$set:{"tasks.$.status":task.status}};
        User.update(query, update, callback)
    }

})();