(function(){

	var Promise = require('promise');
	var bcrypt = require('bcrypt-nodejs');
	
	var utility = require('../services/utility.service');
	var User = require('../models/user.model');
	
	var auth_service = {};
	auth_service.login = login;
	
	function login(credentials) {
		let errMsg = [];
		if(!credentials.email) {
			errMsg.push('Email is not provided');
		}
        if(!credentials.password) {
			errMsg.push('Password is not provided');
		}
		if(errMsg.length) {
			return utility.getDefaultRejectedPromise(errMsg);
		}

		return new Promise(function(resolve, reject) {
			User.getUserByEmail(credentials.email, function(err, user) {
				if(err) {
					reject(err);
				} else {
                    if(!user) {
                      reject("Invalid email or password");  
                    } else {
                        if(bcrypt.compareSync(credentials.password, user.password)) {
                            resolve(user);
                        } else {
                            reject("Invalid email or password");
                        }
                    }

                    //reject("Invalidxx email or password");
				}
			});
		});
	}
	
	module.exports = auth_service;
})();