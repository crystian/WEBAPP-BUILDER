(function(){
	'use strict';

	document.addEventListener('DOMContentLoaded',function(){
		loader.init(function () {
			//all right, next step, should be load landing page with this event
			document.dispatchEvent(loader.events.loaderFinished);
			console.info('disparo el finish');
		});
	});

}());