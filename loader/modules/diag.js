/**
 * Created by Crystian on 3/2/14.
 */

loader.diag = (function(window){
	'use strict';

	function executeDiag(){
		var compatibility = defineCompatibility();
		loader.debugAdd('Compatibility: ' + compatibility);

		if(compatibility === 0){
			return compatibility;
		}

		loader.diag.lang.init();
		loader.diag.cordovaConnection.init();

		return compatibility;
	}

	//complex second validation of compatibility, regarding platform
	function defineCompatibility(){
		//jshint maxcomplexity:false

		//just for get major and minor
		var platform     = loader.platform,
				version      = platform.version ? platform.version : '0.0',
				platformName = platform.name ? platform.name.toLowerCase() : '',//ie viene sin name ...
				decimal;

		//patches to normalize names:
		if(platformName === 'ie'){
			loader.polyfills.customEventsForIE();
		} else if(platformName.indexOf('android') >= 0){
			platformName = 'android';
		} else if(platformName.indexOf('chrome mobile') >= 0){
			platformName = 'chromeMobile';
		} else if(platformName.indexOf('chrome') >= 0){
			platformName = 'chrome';
		} else if(platform.os.family.toLowerCase().indexOf('ios') >= 0){
			platformName = 'ios';
		}

		//normalize versions
		version = version.split('.');
		decimal = version.splice(1, version.length);
		version = version[0] + '.' + decimal.join('');
		version = parseFloat(version);

		console.info('Browser version: ' + platformName + ' ' + version);

		var matrixBrowser = loader.cfg.compatibilityMatrix[platformName];

		var compatibility = 0;


		/*
		 less than first param, is incompatible
		 less than second param, is semi incompatible
		 greater than second param, is compatible
		 */

		if(matrixBrowser === undefined){
			//if it can't detect the browser and version, is semi incompatible
			compatibility = 1;
		} else if((version <= matrixBrowser[0])){
			compatibility = 0;
		} else if(version <= matrixBrowser[1]){
			compatibility = 1;
		} else if(version > matrixBrowser[1]){
			compatibility = 2;
		}

		return compatibility;
	}

	function registerDetectOrientation(){
		var mql = window.matchMedia('(orientation: portrait)');

		_setOrientation(mql.matches);

		mql.addListener(function(m){
			_setOrientation(m.matches);
		});
	}

	function _setOrientation(portrait){
		if(portrait){
			loader.cfg.isLandscape = loader.cfg.orientation = 0;
			loader.cfg.isPortraid = 1;
		} else {
			loader.cfg.orientation = loader.cfg.isLandscape = 1;
			loader.cfg.isPortraid = 0;
		}
	}

	//http://ctrlq.org/code/19616-detect-touch-screen-javascript
	function isTouchDevice(){
		console.warn('isTouchDevice may does not work properly');
		/*globals DocumentTouch*/
		return true === ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch);
	}

	function isMobile(){
		//TODO do it for size and pixels density
		var r  = false,
				ua = window.navigator.userAgent;

		if(!(/iPad.+Mobile/i.test(ua)) && (/Mobile/i.test(ua))){
			r = true;
		}
		return r;
	}

	function getInfo(){
		var result = '';
		if(loader.cfg.cordova.isDevice){
			result = deviceInfoHtml();
			result += '<br />';
		}
		result += clientInfoHtml();

		return result;
	}

	//based on UA (https://github.com/bestiejs/platform.js)
	function clientInfoHtml(){
		var platform = loader.platform;

		return '<b>User Agent based:</b><br />' +
			'Platform name: ' + platform.name + '<br />' +
			'Platform version: ' + platform.version + '<br />' +
			'Platform layout: ' + platform.layout + '<br />' +
			'Platform OS: ' + platform.os + '<br />' +
			'Platform desc: ' + platform.description + '<br />' +
			'Platform product: ' + platform.product + '<br />' +
			'Platform manufacturer: ' + platform.manufacturer + '<br />' +
			'USER AGENT: ' + window.navigator.userAgent;
	}

	//based on cordova "device" object
	function deviceInfoHtml(){
		return '<b>Cordova device based:</b><br />' +
			'Device Model: ' + device.model + '<br />' +
			'Device Name: ' + device.name + '<br />' +
			'Device Cordova: ' + device.cordova + '<br />' +
			'Device Platform: ' + device.platform + '<br />' +
			'Device UUID: ' + device.uuid + '<br />' +
			'Device Version: ' + device.version;
	}

	function setStatusConnection(v){
		loader.cfg.online = v;
		loader.cfg.offline = !v;
	}

	return {
		registerDetectOrientation: registerDetectOrientation,
		setStatusConnection: setStatusConnection,
		getInfo: getInfo,
		isTouchDevice: isTouchDevice,
		isMobile: isMobile,
		executeDiag: executeDiag
	};
}(window));
