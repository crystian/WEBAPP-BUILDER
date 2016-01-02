/**
* Created by Crystian on 4/19/2014.
*/

loader.diag.lang = (function () {
	'use strict';
	var callback = '';

	/* detect language and change it, if can't detected use a browser setup */
	function init(_callback){
		callback = _callback;

		if (loader.cfg.cordova.isDevice && navigator.globalization){ //second: via device
			console.log('via cordova lang');

			navigator.globalization.getLocaleName(
				function (language) {
					var lang = language.value.replace('_', '-');
					setLang( lang, 'cordova device' );
				},
				function () {
					console.warn('Fail with cordova device, fallback with browser');
					//en caso de error usa el detector de browser
					setLang( getBrowserLang(), 'browser' );
				}
			);

		} else { //third: via browser (UA)

			setLang( getBrowserLang(), 'browser' );
		}
	}

	/*	detect via browser	 */
	function getBrowserLang(){
		//jshint maxcomplexity:false

		var lang;

		//just for android, came one string with languages in this format XX-xx
		if ( navigator.userAgent ) {
			lang = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i);
			if (lang) {
				lang = lang[1];
			}
		}

		if ( !lang ) {
			if ( navigator.languages && navigator.languages instanceof Array) {
				lang = navigator.languages[0];
			} else if ( navigator.language ) {
				lang = navigator.language;
			} else if ( navigator.browserLanguage ) {
				lang = navigator.browserLanguage;
			} else if ( navigator.systemLanguage ) {
				lang = navigator.systemLanguage;
			} else if ( navigator.userLanguage ) {
				lang = navigator.userLanguage;
			}
		}

		return lang;
	}

	function setLang( _lang, m ) {
		console.info('Language detected: "'+ _lang +'" via '+ m);
		loader.cfg.lang = _lang;
	}

	return {
		init: init
	};

}());
