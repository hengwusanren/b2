var helper = {
	logEnabled: true,
	logColors: ['white', 'green', 'blue', 'red'],
	log: function(text, type) {
		if(!this.logEnabled) return;

		var line = document.createElement('div');
		line.innerHTML = text;
		if(!type || type < 0 || type >= this.logColors.length) type = 0;
		line.style.color =  this.logColors[type];
		var debugWindow = document.getElementById('debug');
		debugWindow.style.display = 'block';
		debugWindow.appendChild(line);
	}
};