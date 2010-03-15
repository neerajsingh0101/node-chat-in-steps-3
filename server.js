PORT = 8002;
HOST = '127.0.0.1';

var sys = require('sys'),
http = require('http');

http.createServer(function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.write('Hello World');
	res.close();

}).listen(PORT, HOST);

sys.puts("Server at http://" + HOST + ':' + PORT.toString() + '/');

