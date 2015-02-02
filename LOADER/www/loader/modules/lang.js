/**
 * Created by Crystian on 4/19/2014.
 */

loader.diag.lang = (function () {
	'use strict';
	var callback = '';

	/* detect language and change it, if can't detected use a browser setup */
	function init(_callback){
		callback = _callback;

		var lang = loader.settings.get('lang');

		if( lang ){ //first: via settings

			setLang( lang, 'setting' );

		} else if (loader.cfg.isCordovaDevice){ //second: via device

			navigator.globalization.getLocaleName(
				function (language) {
					lang = language.value.replace('_', '-');
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

		//TODO improve?
		if ( !lang ) {
			if ( navigator.language ) {
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

		var lang = validateLang(_lang);

		console.info('Language detected: "'+ lang +'" via '+ m);
		loader.cfg.lang = lang;
	}

	function validateLang(_lang){
		var lang = 'es'; //default language if fallback others methods

		_lang = _lang.toLowerCase();

		if( loader.cfg.i18n.langsFrom[_lang] ){ //first detect with country (es-ar)
			lang = _lang;
		} else { //second: with main lang
			_lang = _lang.split('-')[0];

			if(loader.cfg.i18n.langsFrom[_lang]){
				lang = _lang;
			}
		}

		return lang;
	}

	return {
		init: init
	};

}());
