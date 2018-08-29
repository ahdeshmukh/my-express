(function(){
	const serializeError = require('serialize-error');
	
	var config = require('../configs/config');
	
	var utility = {};
	utility.returnResult = returnResult;
	utility.returnError = returnError;
	utility.getCurrentDateTime = getCurrentDateTime;
	utility.getCurrentEnv = getCurrentEnv;
	utility.isDevEnv = isDevEnv;
	utility.getDefaultRejectedPromise = getDefaultRejectedPromise
	utility.returnErrorResponse = returnErrorResponse;
	
	function getCurrentDateTime() {
		var date = new Date();
			
		var hour = date.getHours();
		hour = (hour < 10 ? "0" : "") + hour;

		var min  = date.getMinutes();
		min = (min < 10 ? "0" : "") + min;

		var sec  = date.getSeconds();
		sec = (sec < 10 ? "0" : "") + sec;

		var year = date.getFullYear();

		var month = date.getMonth() + 1;
		month = (month < 10 ? "0" : "") + month;

		var day  = date.getDate();
		day = (day < 10 ? "0" : "") + day;

		return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
	}
	
	function getCurrentEnv() {
		return config.env;
	}
	
	function returnResult(data, req) {//console.log(data);
		let result = {};
		let success = true;
		let errorMsg = '';
		let errorDetailedMsg = 'xyz';
		
		if(data === false || data === 'undefined') {
			success = false;
			data = null;
		}
		if(data instanceof Error) {
			success = false;
			errorMsg = serializeError(data).stack;
			if(data.message) {
				errorDetailedMsg = errorMsg;
				errorMsg = data.message;
			}
			data = null; // make the data null since an error has occured
		}
		result.success = success;
		result.data = data;
		result.env = this.getCurrentEnv();
		if(req) {
			result.host = req.headers.host;
		}
		if(errorMsg) {
			result.error = errorMsg;
			if(this.isDevEnv()) {
				result.error.detail = errorDetailedMsg;
			}
		}
		return result;
	}

	function returnError(err) {
		var error = new Error();
		error.message = err || 'Something went wrong';
		return error;
	}

	function isDevEnv() {
		let env = this.getCurrentEnv();
		return (env == 'Dev') ? true : false;
	}

	function getDefaultRejectedPromise(msg) {
    	let defaultPromise = {};
    	//defaultPromise.status = {};
    	//defaultPromise.status.success = false;

    	if(msg){
    		defaultPromise.msg = msg;
		}
	  	return new Promise((resolve, reject) => {
			reject(defaultPromise);
		});
	}

	function returnErrorResponse(err, req=null) {
		let error = this.returnError(err);
		let result = this.returnResult(error, req);
		return result;
	}
	
	module.exports = utility;
	
})();