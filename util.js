var sys = require('sys'),
fs = require('fs'),
qs = require('querystring'),
url = require('url'),
util = exports;

util.getMap = [];

util.sessions = {};

util.createSession = function(nick) {
	var i, session;

	for (i in util.sessions) {
		session = util.sessions[i];
		if (session && session.nick === nick) {
			return null;
		}
	}

	session = {
		nick: nick,
		id: Math.floor(Math.random() * 999999999999).toString()
	};

	util.sessions[session.id] = session;
	return session;
};

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
util.get('/style.css', util.staticHandler('style.css'));

util.get('/join', function(req, res) {
	var nick = qs.parse(url.parse(req.url).query).nick,
	session;

	session = util.createSession(nick);
	if (!session) {
		res.simpleJSON(200, {
			error: 'Nick in use'
		});
		return;
	}

	res.simpleJSON(200, {
		nick: session.nick,
		id: session.id
	});
});

util.get('/who', function(req, res) {
	var nicks = [],
	i,
	session;

	for (i in util.sessions) {
		session = util.sessions[i];
		nicks.push(session.nick);
	}
	res.simpleJSON(200, {
		nicks: nicks
	});
});

