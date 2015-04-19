/**
 * Created by Crystian on 2/22/2015.
 */
var landing = (function() {

	function init(){
		loader.hide();
	}

	return {
		init: init
	};
}());

document.addEventListener('loaderFinished', landing.init);
