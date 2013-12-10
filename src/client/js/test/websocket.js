var $ = function(t) {
	return document.getElementById(t);
}

var config = {
	name: "HTML5 websocket support",
	testCase: function() {
		if (window.WebSocket) {
			testCase.log("detected window.WebSocket","passed");
			var server = "ws://10.61.6.119:1337";
			var conn = new WebSocket(server);
			conn.onopen = function() {
				testCase.log("socket open: " + server, "passed");
				conn.send("client@" + Number(new Date));
			};
			conn.onmessage = function(message) {
				testCase.log("received message: " + message.data,  "passed");
				if (message.data === "BESTV-TEST-SERVER:OK") {
					testCase.passed();
				} else {
					testCase.failed();
				}
			}
			conn.onerror = function(e){
				testCase.log("error:" + e,"failed");
				testCase.failed();
			},
			conn.onclose = function(event) {
				if(testCase.result === null){
					testCase.log("socket closed.", "failed");
					testCase.failed();
				}else{
					testCase.log("socket closed.", "passed");
				}
			};
			testCase.timer = setTimeout(function(){
				if(testCase.result === null){
					testCase.log("connect over time (30s)", "failed");
					testCase.failed();
				}else{
					clearTimeout(testCase.timer);
				}
			}, 30000)

		} else {
			testCase.log("Not detected window.WebSocket","failed");
			testCase.failed();
		}
	}
}

var testCase = {
	timer : 0,
	result : null,
	log: function(string, status) {
		var ptag = "<span style='color:#3c0'>[PASSED]</span>";
		var ftag = "<span style='color:#c30'>[FAILED]</span>";
		var t = new Date();
		var time = (t.toTimeString()).substr(0, 8) + "." + t.getMilliseconds();
		if(status === "passed"){
			$("log").innerHTML += time + "  " + ptag + string + "<br/>";
			return;
		}
		if(status === "failed"){
			$("log").innerHTML += time + "  " + ftag + string + "<br/>";
			return;
		}
		$("log").innerHTML += time + "  " + string + "<br/>";
	},
	run: function() {
		testCase.init(config);
		var r = function() {
			try {
				return config.testCase();
			} catch (e) {
				testCase.log(e);
				return false;
			}
		}();
	},
	init: function(config) {
		$("caseName").innerHTML = config.name;
		$("result").innerHTML = "";
		$("result").style.background = "none";
	},
	passed: function() {
		testCase.result = "passed";
		$("result").innerHTML = "PASSED";
		$("result").style.background = "#3c0";
	},
	failed: function() {
		testCase.result = "failed";
		$("result").innerHTML = "FAILED";
		$("result").style.background = "#c30";
	}
}
testCase.run();