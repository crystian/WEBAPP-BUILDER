/**
 * Created by Crystian on 2/22/2015.
 */
var app = (function() {

	function init(){
		loader.hide();
	}

	return {
		init: init
	};
}());

document.addEventListener('loaderFinished', app.init);
