(function () {
	setInterval(clicker('#stokeButton'), 60000);
	setInterval(clicker("#gatherButton"), 1000);
	setInterval(clicker("#trapsButton"), 1000)
	$("#notifications").on("DOMNodeInserted", notificationHandler);

})()

function clicker(name) {
	return function() {
		var b = $(name);
		if (!b.hasClass('disabled')) {
			b.trigger('click');
			console.log('Clicked ' + name)
			return true;
		}	
		return false;
	}
}

function notificationHandler(event) {
	var eventText = $(event.target).text();
	var context = {
		notification : eventText, 
		name : $('#event .eventTitle').text()
	}
	eventRouter(context);
}

function eventRouter(context) {
	switch (context.name)
	{
		case 'Noises':
			handleNoises(context);
			break;

		case 'The Mysterious Wanderer':
			handleWanderer(context);
			break;

		case 'The Master':
			handleMaster(context);
			break;

		case 'The Beggar':
			handleBeggar(context);
			break;

		case 'The Scout':
			handleScout(context);
			break;

		case 'The Nomad':
			handleNomad(context);
			break;

		case 'A Beast Attack':
			handleBeast(context);
			break;

	}
}

function goBack() {
	var btns = $('#event .button');
	clicker('#' + btns[btns.length - 1].id)();
	return true;
}

function handleNoises(context) {
	var action = clicker('#investigate');
	var ignore = clicker('#ignore');
	
	(action() && goBack()) || ignore();
}

function handleWanderer(context) {
	var buttons = $('#event .button');
	var giveLess = $(buttons[0]);
	var giveMore = $(buttons[1]);
	var deny = $(buttons[2]);

	if (!giveMore.hasClass('diabled')) {
		giveMore.trigger('click');
		goBack();
	}
	else if (!giveLess.hasClass('diabled'))	{
		giveLess.trigger('click');
		goBack();
	}
	else
	{
		deny.trigger('click');
	}
}

function handleMaster(context) {
	var agree = clicker('#agree');
	var deny = clicker("#deny");

	if (agree())
	{
		var evasion = clicker('#evasion');
		var precision = clicker('#precision');
		var force = clicker("#force");
		var nothing = clicker('#nothing');
		
		evasion() || precision() || force() || nothing();
		return;
	}
	deny();
}

function handleBeggar(context) {
	var buttons = $('#event .button');
	var giveLess = clicker('#' + buttons[0].id);
	var giveMore = clicker('#' + buttons[1].id);
	var deny = clicker('#' + buttons[2].id);

	((giveMore() || giveLess()) && goBack()) || deny();
}

function handleScout(context) {
	var learn = clicker('#learn');
	var buyMap = clicker('#buyMap');
	learn();
	var nMax = 10;
	while (nMax > 0 && buyMap()) {
		nMax--;
	};
	goBack();
}

function handleNomad(context) {
	var buyCompass = clicker('#buyCompass');
	buyCompass();
	goBack();
}

function handleBeast(context) {
	goBack();
}

function getStore(name) {
	var rowName = '#row_' + name;
	var val = $(rowName + ' .row_val');
	if (val && val.length) {
		var count = parseInt(val.text());
	}
	return count;
}