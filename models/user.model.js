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
        }
    }, { collection: 'users' });

    var User = module.exports = mongoose.model('User', userSchema);

    module.exports.getUsers = function(callback, limit) {
        User.find(callback).limit(limit);
    };

})();