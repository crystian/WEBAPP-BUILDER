(function(){
	'use strict';

	document.addEventListener('DOMContentLoaded',function(){
		loader.init(function () {
			console.info('Event loaderFinished triggered');

			//all right, next step, should be load landing page with this event
			document.dispatchEvent(loader.events.loaderFinished);
		});
	});

}());