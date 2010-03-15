window.log = function() {
	try {
		console.log.apply(console, arguments);
	} catch(e) {
		//alert( Array.prototype.join.call( arguments, " "));
	}
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
		error: function() {},
		success: function() {}
	});

	return false;

});

$(function() {

	$('#nickInput').focus();

});

