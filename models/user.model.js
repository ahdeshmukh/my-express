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
        try {
            User.find({},{"password": 0},callback).limit(limit); // not returning the password
        } catch(err) {
            throw err;
        }
    };

    module.exports.getUserById = function(id, callback) {
        try {
            User.findById(id, callback);
        } catch(err) {
            throw err;
        }
    };

    module.exports.addUser = function(user, callback) {
        try {
            User.create(user, callback);
        } catch(err) {
            throw err;
        }
    };

    module.exports.updateUser = function(query, user, callback) {
        try {
            User.update(query, user, callback);
        } catch(err) {
            throw err;
        }
    }

    module.exports.addTask = function(query, task, callback) {
        let task_obj = {};
		task_obj.name = task;
		task_obj.status = 'new';
        task_obj.created_time = Date.now();//dateFormat(now, "isoDateTime", true);//Date();
        try {
            User.update(query, {$push: {"tasks": task_obj}}, callback);
        } catch(err) {
            throw err;
        }
    }

    module.exports.getUserByEmail = function(email, callback) {
        let query = {"email": email};
        try {
            User.findOne(query, callback);
            // User.findOne(query, 'email password', callback); // to only return email and password
        } catch(err) {
            throw err;
        }
    }

    module.exports.getUsersTasksCountByStatus = function(user_id, callback) {
        let user_id_obj = mongoose.Types.ObjectId(user_id);
        try{
            User.aggregate([
                {$match: {_id: user_id_obj, active: true}},
                {$unwind: "$tasks"},
                {$group: {_id: "$tasks.status", num_tasks: {$sum: 1}}},
                {$project:{_id: 0, task_name:"$_id", num_tasks: 1}}
            ], callback);
        } catch(err) {
            throw err;
        }
    }

    module.exports.updateTask = function(user_id, task, callback) {
        let user_id_obj = mongoose.Types.ObjectId(user_id);
        let query = {_id:user_id_obj, "tasks.name":task.name, "tasks.created_time":task.created_time};
        let update = {$set:{"tasks.$.status":task.status}};
        try {
            User.update(query, update, callback)
        } catch(err) {
            throw err;
        }
        
    }

})();