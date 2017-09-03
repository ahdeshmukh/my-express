(function(){
	
	var config = require('../configs/config');
	
	var utility = {};
	utility.returnResult = returnResult;
	utility.returnError = returnError;
	utility.getCurrentDateTime = getCurrentDateTime;
	utility.getCurrentEnv = getCurrentEnv;
	
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
	
	function returnResult(data, req) {console.log(data);
		var result = {};
		var success = true;
		if(data === false || data === 'undefined') {
			success = false;
			data = null;
		}
		result.success = success;
		result.data = data;
		result.env = this.getCurrentEnv();
		if(req) {
			result.host = req.headers.host;
		}
		return result;
	}

	function returnError(error) {
		return new Error(error);
	}
	
	module.exports = utility;
	
})();