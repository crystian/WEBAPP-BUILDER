/**
* Created by Crystian on 3/3/14.
*/

//jshint unused:false
loader.polyfills = (function(){
	'use strict';


	//nivelacion de eventos para ie
	function customEventsForIE() {
		(function () {
			function CustomEvent(event, params) {
				params = params || { bubbles: false, cancelable: false, detail: undefined };
				var evt = document.createEvent('CustomEvent');
				evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
				return evt;
			}

			if (!window.CustomEvent) {
				//CustomEvent.prototype = window.CustomEvent.prototype;
				window.CustomEvent = CustomEvent;
			}
		})();
	}


	return {
		customEventsForIE: customEventsForIE
	};

}());