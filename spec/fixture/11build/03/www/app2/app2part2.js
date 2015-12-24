/**
 * Created by Crystian on 2/22/2015.
 */
var app2 = (function() {

	function init(){
		console.log('app2 init');
	}

	function gotoapp(){
		loader.xhr.requestApp('app', function(){
			console.log('app loaded');
		}, function(){
			console.error('app does not loaded');
		})
	}

	return {
		init: init,
		gotoapp: gotoapp
	};
}());

