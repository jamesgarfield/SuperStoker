(function () {
	setInterval(clicker('#stokeButton'), 60000);
	setInterval(clicker("#gatherButton"), 1000);
	setInterval(clicker("#trapsButton"), 1000)
})()

function clicker(name) {
	return function() {
		var b = $(name);
		if (!b.hasClass('disabled')) {
			b.trigger('click');
		}	
	}
}