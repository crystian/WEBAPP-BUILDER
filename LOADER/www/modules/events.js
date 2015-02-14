/**
* Created by Crystian on 3/3/14.
*/

loader.events = (function(){
	'use strict';

	function init() {
		//no customEvent porque no es soportado por android browser
		this.loaderFinished.initEvent('loaderFinished', false, false);
		this.newVersionDetected.initEvent('newVersionDetected', false, false);
	}

	return {
		loaderFinished: document.createEvent('Events'),
		newVersionDetected: document.createEvent('Events'),
		init: init
	};
}());
