/**
 * Created by Crystian on 2/22/2015.
 */
var app = (function() {

	function init(){
		loader.hide();
	}

	function gotoapp2(){
		loader.xhr.requestApp('app2', function(){
			console.log('app loaded');
		}, function(){
			console.error('app does not loaded');
		})
	}

	function clickMe(){
		alert('clickMe!');
	}

	return {
		init: init,
		clickMe: clickMe,
		gotoapp2: gotoapp2
	};
}());

document.addEventListener('loaderFinished', app.init);
