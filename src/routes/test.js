exports.logs = function(req, res){
	//console.log(req.headers);
	var client_ip = "10.61.6.191";
	
	var _type = req.headers['content-type'],
		_ip = req.header('x-forwarded-for') || req.connection.remoteAddress,
		_referer = req.headers['referer'] || '',
		_agent = req.headers['user-agent'],
		_start = req._startTime,
		_dateString = _start.getFullYear() + "-" + (_start.getMonth() + 1) + "-" + _start.getDate(),
		_timeString =_start.toTimeString();
	

	//if(_ip !== client_ip)return;

	function sendMessageToConsole(message_obj){
		//console.log(message_obj);
		function send(content, type){
			var _r = '\u001b[31m',
				_g = '\u001b[32m',
				_y = '\u001b[33m',
				_b = '\u001b[34m',
				_c = '\u001b[35m',	
				_re = '\u001b[0m';

			switch(type){
				case "NORMAL":
					console.log(
						_re + "["+ _timeString.substr(0,8) + "(" + _start.getMilliseconds() + ") " + _ip + "]" + _re +
						content
					);
					break;
				case "WARNING": 
					console.log(
						_re + "["+ _timeString.substr(0,8) + "(" + _start.getMilliseconds() + ") " + _ip + "]" + _re +
						_y + "WARNING: " + content + _re 
					);
					break;
				case "ERROR": 
					console.log(						
						_re + "["+ _timeString.substr(0,8) + "(" + _start.getMilliseconds() + ") " + _ip + "]" + _re +
						_r + "ERROR: " + content + _re 
					);
					break;
				case "INIT": 
					console.log(
						"\n" +
						_b + _dateString + " " + _timeString + "\n" + 
						_g +"CLIENT: "+ _re + _ip + "\n" + 
						_g +"REFERER: "+ _re + _referer  + "\n" + 
						_g +"USER-AGENT: "+ _re + _agent + "\n"
					);
					break;
				case "POINT": 
					console.log(						
						_re + "["+ _timeString.substr(0,8) + "(" + _start.getMilliseconds() + ") " + _ip + "]" + _re +
						_c + "POINT: " + content + _re 
					);
					break;
			}
		}	
		
		if(typeof message_obj !== "object"){
			send("message type not an object.", "ERROR");
			return;
		}
		if(!message_obj.hasOwnProperty("content_type")){
			return;
		}
		if(!message_obj.hasOwnProperty("message_type")){
			console.log(typeof message_obj["message_type"])
			send("cannot get message type.", "ERROR");
			return;
		}
		if(!message_obj.hasOwnProperty("content")){
			send("cannot get message content.", "ERROR");
			return;
		}
		
		send(message_obj["content"], message_obj["message_type"]);

	}

	sendMessageToConsole(req.body);
	res.json({ status: 'finish' });
};