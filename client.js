window.log = function() {
	try {
		console.log.apply(console, arguments);
	} catch(e) {
		//alert( Array.prototype.join.call( arguments, " "));
	}
};

var App = App || {};

App.util = {};

App.util.zeroPad = function(digits, n) {
	n = n.toString();
	while (n.length < digits) {
		n = '0' + n;
	}
	return n;
};

App.util.timeString = function(date) {
	var minutes = date.getMinutes().toString(),
	hours = date.getHours().toString();
	return App.util.zeroPad(2, hours) + ':' + App.util.zeroPad(2, minutes);
};


App.config = {
	nick: null,
	id: null
};

App.onConnect = function(session) {
	if (session.error) {
		alert(session.error);
		showConnect();
		return;
	}
	App.config.nick = session.nick;
	App.config.id = session.id;

	App.showChat();
};

$('#connectButton').live('click', function(e) {

	var nick = $('#nickInput').attr('value');
	log(nick);

	if (nick.length > 50) {
		alert('nick too long. 50 characters max');
		return false;

	} else if (/[^\w-]/.test(nick)) {
		alert('Bad character found. Only letters, numbers, _ and - are allowed');
		return false;

	} else if ($.trim(nick).length < 1) {
		alert('enter nick name');
		return false;
	}

	$.ajax({
		cache: false,
		type: 'GET',
		url: '/join',
		data: {
			nick: nick
		},
		error: function() {
			alert('Error connecting to server');
		},
		success: App.onConnect
	});

	return false;

});

App.showConnect = function() {
	$('#connect').show();
	$('#loading').hide();
	$('#toolbar').hide();
	$('#nickInput').focus();
};

App.showLoad = function() {
	$('#connect').hide();
	$('#loading').show();
	$('#toolbar').hide();
};

App.showChat = function() {
	$('#connect').hide();
	$('#loading').hide();
	$('#toolbar').show();
};

$(function() {
	App.showConnect();

	//update the clock every second
	setInterval(function() {
    $('#currentTime').text(App.util.timeString(new Date()));
	},
	1000);

});

