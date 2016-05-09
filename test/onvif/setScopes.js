var fs = require("fs");
var demosite = JSON.parse(fs.readFileSync("../../../../connector/onvif/test/demosite118.json", "utf8"));

test = function (input) {
	var self = this;
	var onDone = function (response) {
		console.log("onDone");
		if (typeof(response) !== "undefined")
			console.log(response);
	}
	var onFail = function (response) {
		console.log("onFail");
		console.log(response);
	}
	var onNotify = function (response) {
		console.log("onNotify");
		console.log(response);
	}

	var getstream = {
		"onDone": onDone,
		"onFail": onFail,
		"name" : "GKB-IPCam",
		"location" : "taiwan"
	};

	var setup = {
		"onDone": onDone,
		"onFail": onFail,
		"onNotify": onNotify,
		"device_type": "onvif",
		"host": demosite.host,
		"port": demosite.port,
		"user": demosite.user,
		"passwd": demosite.passwd
	};

	setup.onDone = function (response) {
		self.wrapper.setScopes(getstream);
	}

	var wrapper = require("../../");
	this.wrapper = new wrapper();
	this.wrapper.setup(setup);

/*	while (typeof(this.wrapper.getDeviceInformation) === "undefined") {
		if (typeof(this.wrapper.getDeviceInformation) !== "undefined") {
			console.log("getDeviceInformation");
			this.wrapper.getDeviceInformation(getDevInfo);
		}
	}
//	console.log(this.wrapper.__proto__);
	this.wrapper.getDeviceInformation(getDevInfo);
*/
}
test();
