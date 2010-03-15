PORT = 8002;
HOST = '127.0.0.1';

var sys = require('sys'),
fs = require('fs');
http = require('http');

http.createServer(function(req, res) {
	fs.readFile('index.html', function(err, data) {
		if (err) {
			sys.puts('Error loading file index.html');
		} else {
			sys.puts('Loading file index.html');
		}

		res.writeHead(200, {
			'Content-Type': 'text/html',
			'Content-Length': data.length
		});
		res.write(data);
		res.close();
	});
}).listen(PORT, HOST);

sys.puts("Server at http://" + HOST + ':' + PORT.toString() + '/');

