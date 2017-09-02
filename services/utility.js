(function(){
	
	var config = require('../configs/config');
	
	var utility = {};
	utility.returnResult = returnResult;
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
	
	function returnResult(data, errors) {
		/*var success = true;
		if(res_status) {
			success = true;
		}*/
		
		var result = {};
		
		try {
			result.success = true;
			result.data = data;
		} catch (error) { // catching Exceptions thrown by functions
			result.success = false;
			if (errors) {
				result.errors = errors
			}
		} finally {
			return result;
		}
	}
	
	module.exports = utility;
	
})();