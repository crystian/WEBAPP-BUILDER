/**
* Created by Crystian on 3/2/14.
*/

loader.loadingScreen = (function(el, spinner){
	'use strict';

	var t = false,
		duration = 1200;

	function on(callback) {
		toggle(true, callback);
	}

	function off(callback) {
		toggle(false, callback);
	}

	function toggle(togg, callback) {
		togg = togg === undefined ? t : togg;
		callback = callback ? callback : function(){};
		if (togg){
			t = false;
			el.classList.remove('fadeout');
			el.classList.add('fadein');
			if (spinner) {
				spinner.classList.add('on');
			}
			setTimeout(function () {
				callback();
			}, duration);//be careful esto tambien esta en el class
		} else {
			t = true;
			el.classList.remove('fadein');
			el.classList.add('fadeout');
			setTimeout(function () {
				if (spinner) {
					spinner.classList.remove('on');
				}
				callback();
			}, duration);//be careful esto tambien esta en el class
		}
	}

	return {on : on, off: off, toggle: toggle};

}(byId('loadingScreen'), byId('spinner')));
