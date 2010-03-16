var sys = require('sys'),
fs = require('fs'),
qs = require('querystring'),
url = require('url'),
util = exports;

util.getMap = [];

util.get = function(path, handler) {
	util.getMap[path] = handler;
};

util.not_found = function(req, res) {
	var not_found_msg = 'Not Found';

	res.writeHead(404, {
		'Content-Type': 'text/plain',
		'Content-Length': not_found_msg.length
	});
	res.write(not_found_msg);
	res.close();
};

util.staticHandler = function(filename) {
	var body;

	function loadResponseData(callback) {
		fs.readFile(filename, function(err, data) {
			if (err) {
				sys.debug('Error loadinf file ' + filename);
			} else {
				sys.debug('loading file ' + filename);
				body = data;
			}
			callback();
		});
	}

	return function(req, res) {
		loadResponseData(function() {
			res.writeHead(200, {
				'Content-Type': 'text/html',
				'Content-Length': body.length
			});
			res.write(body);
			res.close();
		});
	};

};

util.get('/', util.staticHandler('index.html'));
util.get('/jquery-1.4.2.js', util.staticHandler('jquery-1.4.2.js'));
util.get('/client.js', util.staticHandler('client.js'));

util.get('/join', function(req, res) {
	var nick = qs.parse(url.parse(req.url).query).nick;
	res.simpleJSON(200, {
		nick: nick,
		id: 'tbd'
	});
});

