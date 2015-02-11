///**
// * Created by Crystian on 3/2/14.
// */
//
//loader.diag = (function (window) {
//	'use strict';
//
//	function executeDiag() {
//		var compatibility = defineCompatibility();
//		loader.debugAdd('Compatibility: ' + compatibility);
//
//		if (compatibility === 0) {
//			return compatibility;
//		}
//
//		loader.diag.lang.init();
//
//		return compatibility;
//	}
//
//	//basic and first validation regarding minimal requirements
//	function isNotCompatible() {
//		return !isCompatible();
//	}
//	function isCompatible() {
//		//before remove this variable
//		var r = _loaderCfg || loader.cfg;
//
//		return r.compatibilityFirst();
//	}
//
//	//complex second validation of compatibility, regarding platform
//	function defineCompatibility() {
//		//jshint maxcomplexity:false
//		//just for get major and minor
//
//		var platform = loader.platform,
//			version = platform.version ? platform.version : '0.0',
//			platformName = platform.name ? platform.name.toLowerCase() : '',//ie viene sin name ...
//			decimal;
//
//		//patches para normalizar nombres:
//		if ( loader.utils.getInternetExplorerVersion() >= 10 ){
//			platformName = 'ie';
//			version = loader.utils.getInternetExplorerVersion().toString();
//			polyfills.customEventsForIE();
//		} else if( platformName.indexOf('android') >= 0 ){
//			platformName = 'android';
//		} else if( platformName.indexOf('chrome') >= 0 ) {
//			platformName = 'chrome';
//		} else if( platform.os.family.toLowerCase().indexOf('ios') >= 0 ) {
//			platformName = 'ios';
//		}
//
//		//normalize versions
//		version = version.split('.');
//		decimal = version.splice(1, version.length);
//		version = version[0] + '.' + decimal.join('');
//		version = parseFloat(version);
//
//		console.info('Browser version: '+ platformName + ' ' + version);
//
//		var matrixBrowser = loader.cfg.matrix[platformName];
//
//		var compatibility = 0;
//
//		if (matrixBrowser === undefined) {
//			//si no encuentra la version del browser, entra en modo 1
//			compatibility = 1;
//		} else if ((version <= matrixBrowser[0])) {
//			compatibility = 0;
//		} else if (version <= matrixBrowser[1]) {
//			compatibility = 1;
//		} else if (version >= matrixBrowser[2]) {
//			compatibility = 2;
//		}
//
//		return compatibility;
//	}
//
//	function registerDetectOrientation(){
//		var mql = window.matchMedia('(orientation: portrait)');
//
//		if(mql.matches) {
//			loader.cfg.orientation = 0;
//		} else {
//			loader.cfg.orientation = 1;
//		}
//
//		mql.addListener(function(m) {
//			if(m.matches) {
//				loader.cfg.orientation = 0;
//			} else {
//				loader.cfg.orientation = 1;
//			}
//		});
//	}
//
//	//http://ctrlq.org/code/19616-detect-touch-screen-javascript
//	function isTouchDevice() {
//		/*globals DocumentTouch*/
//		return true === ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch);
//	}
//
//	function isMobile() {
//		//TODO hacer por tamanio y densidad de pixeles
//		//debugger;
//		var r = false,
//			ua = window.navigator.userAgent;
//
//		if (!(/iPad.+Mobile/i.test(ua)) && (/Mobile/i.test(ua))) {
//			r = true;
//		}
//		return r;
//	}
//
//	function getInfo() {
//		var result = '';
//		if (loader.cfg.isCordovaDevice) {
//			result = deviceInfoHtml();
//			result += '<br />';
//		}
//		result += clientInfoHtml();
//
//		return result;
//	}
//
//	//based on UA (https://github.com/bestiejs/platform.js)
//	function clientInfoHtml() {
//		var platform = loader.platform;
//
//		return '<b>User Agent based:</b><br />' +
//			'Platform name: ' + platform.name + '<br />' +
//			'Platform version: ' + platform.version + '<br />' +
//			'Platform layout: ' + platform.layout + '<br />' +
//			'Platform OS: ' + platform.os + '<br />' +
//			'Platform desc: ' + platform.description + '<br />' +
//			'Platform product: ' + platform.product + '<br />' +
//			'Platform manufacturer: ' + platform.manufacturer + '<br />' +
//			'USER AGENT: ' +window.navigator.userAgent;
//	}
//
//	//based on cordova "device" object
//	function deviceInfoHtml() {
//		return '<b>Cordova device based:</b><br />' +
//			'Device Model: ' + device.model + '<br />' +
//			'Device Name: ' + device.name + '<br />' +
//			'Device Cordova: ' + device.cordova + '<br />' +
//			'Device Platform: ' + device.platform + '<br />' +
//			'Device UUID: ' + device.uuid + '<br />' +
//			'Device Version: ' + device.version;
//	}
//
//	return {
//		registerDetectOrientation: registerDetectOrientation,
//		getInfo: getInfo,
//		isMobile: isMobile,
//		isTouchDevice: isTouchDevice,
//		isCompatible: isCompatible,
//		isNotCompatible: isNotCompatible,
//		executeDiag: executeDiag
//	};
//}(window));
