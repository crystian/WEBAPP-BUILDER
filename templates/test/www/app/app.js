/**
 * Created by Crystian on 2/22/2015.
 */
var app = (function() {

	function init(){
		loader.hide();
	}

	function clickMe(){
		alert('clickMe!');
	}

	return {
		clickMe: clickMe,
		init: init
	};
}());

document.addEventListener('loaderFinished', app.init);
