PORT = 8002;
HOST = '127.0.0.1';

var sys = require('sys'),
fs = require('fs'),
url = require('url'),
http = require('http'),
util = require('./util');

http.createServer(function(req, res) {
	var handler = util.getMap[url.parse(req.url).pathname] || util.not_found;
  handler(req, res);
}).listen(PORT, HOST);

sys.puts("Server at http://" + HOST + ':' + PORT.toString() + '/');

