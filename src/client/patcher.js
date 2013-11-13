try {
    var _post = function(string, message_type) {
        var xmlhttp,
            _debug_server_path = "http://10.61.9.96:8989/test",
            _m = message_type || "NORMAL";
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("POST", _debug_server_path, true);
        xmlhttp.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
        xmlhttp.send(
            "&content_type=application/x-www-form-urlencoded" +
            "&message_type=" + _m +
            "&content=" + encodeURIComponent(string)
        );
    };
    var log = function(obj) {
        var obj_type = typeof obj;
        var obj_class = Object.prototype.toString.call(obj).slice(8, -1);

        switch (obj_type) {
            default: break;
            case 'undefined':
                _post("undefined");
                break;
            case 'boolean':
                _post("(" + obj_class + ")" + obj);
                break;
            case 'number':
                _post("(" + obj_class + ")" + obj);
                break;
            case 'string':
                _post("(" + obj_class + ")" + obj);
                break;
            case 'object':
                if (obj === null) {
                    _post("(" + obj_class + ")null");
                    break;
                }
                var text = [];
                for (var i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        var value = obj[i];
                        text.push(String(i + ":" + "(" + (typeof value) + ")" + value));
                    }
                }
                _post("(" + obj_class + ") => {" + text.join(", ") + "}");
                break;
        }
    };
} catch (e) {
    debug.log(e);
} finally {
    if (typeof _post === "function") _post("", "INIT");
}