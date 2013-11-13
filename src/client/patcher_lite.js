try {
    var _post = function(string, message_type) {
            var xmlhttp, _debug_server_path = "http://10.61.9.40:8989/test",
                _m = message_type || "NORMAL";
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            } else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.open("POST", _debug_server_path, true);
            xmlhttp.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
            xmlhttp.send("&content_type=application/x-www-form-urlencoded" + "&message_type=" + _m + "&content=" + encodeURIComponent(string));
        }

} catch (e) {
    debug.log(e)
} finally {
    if (typeof _post === "function") _post("", "INIT");
}
