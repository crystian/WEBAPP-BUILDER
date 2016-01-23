/**
 * Created by crystian on 28/02/14.
 */

//jshint unused:false
var loader = (function(){
	'use strict';

	var cfg, diag, platform, utils, settings, events, doc, loadingScreen, applicationCache, location, ga, mx, xhr;

	//just for ofuscation
	function setters(){
		cfg = loader.cfg;
		diag = loader.diag;
		platform = loader.platform;
		utils = loader.utils;
		xhr = loader.xhr;
		settings = loader.settings;
		events = loader.events;
		loadingScreen = loader.loadingScreen;
		applicationCache = window.applicationCache;
		location = window.location;
		ga = loader.ga;
		mx = loader.mx;
		doc = window.document;
	}

	//all history start here:
	function init(finishFn){
		loader.finish = finishFn;

		_replaceVariables();
		setters();
		_handleAppCache();

		if(!cfg.release){
			console.warn('****    DEBUG MODE!: NOT RELEASE    ****');
		}
		console.info('App version: ' + cfg.version + ' (' + cfg.loader.version + ')');
		console.info('Loader init');

		//if it is a device, load cordova plugins and more!
		if(cfg.cordova.isDevice){
			console.info('Cordova device');
			cfg.isDevice = 1;

			//async loader, when it will be called by cordova
			doc.addEventListener('deviceready', _loadAsync, false);

			xhr.getJsFile('cordova.js');

		} else {
			if(platform.os.toString().match(/(iPhone|iPod|iPad|iOS|Android|BlackBerry)/)){
				console.info('Device (without cordova)');

				cfg.isDevice = 1;
			} else {
				console.info('Web browser');
				cfg.isDesktop = 1;
			}

			_loadAsync();
		}
	}

	/*
	if there is a new version, so reload it automatically

	by http://www.html5rocks.com/es/tutorials/appcache/beginner/
	*/
	function _handleAppCache(){
		// Check if a new cache is available on page load.
		applicationCache.addEventListener('updateready', function(e){
			if(applicationCache.status === applicationCache.UPDATEREADY){
				// Browser downloaded a new app cache.
				// Swap it in and reload the page to get the new hotness.
				applicationCache.swapCache();
				location.reload();
			}
		}, false);
	}

	//overwriting variables and removing references, just for cleaning globlal
	function _replaceVariables(){
		loader.cfg = window._loaderCfg;
		window._loaderCfg = null;
		//delete window._loaderCfg;

		loader.platform = window.platform;
		window.platform = null;
		delete window.platform;
	}

	//I don't remember why, but better don't touch it
	function _loadAsync(){
		setTimeout(_load, 100);
	}

	function setPolyfills(){
		if(!window.Promise){
			console.warn('Promise polyfill installed');
			ES6Promise.polyfill();
		}
	}

	function _load(){
		_handleDebugMode();
		cfg.compatibility = diag.executeDiag();
		_handleCompatibility();

		//break! bye bye, you are not worthy
		if(cfg.compatibility === 0){
			return;
		}

		diag.registerDetectOrientation();
		cfg.isTouchDevice = diag.isTouchDevice();
		cfg.isMobile = diag.isMobile();

		events.init();
		settings.init();
		ga.init();
		mx.init();

		setPolyfills();

		_debugToolsLoad();

		if(cfg.fastclick && cfg.isTouchDevice){
			FastClick.attach(doc.body);
		}

		console.log('load appName ' + cfg.firstApp);
		xhr.requestApp(cfg.firstApp, _loadAppSuccess, _loadAppFail);
	}

	function _loadAppSuccess(){
		console.warn('_loadAppSuccess');
		loader.finish();
	}

	function _loadAppFail(err){
		utils.showPanicError(err);
	}

	function _handleDebugMode(){
		cfg.debugZone = byId('debugZone');

		debug('Version: ' + cfg.version + '<br>Loader version: ' + cfg.loader.version);

		if(cfg.showDeviceInfo){
			debugAdd(diag.getInfo());
		}

		//I prefer do it to this way because it can be an issue about security, this will remove by gulp task on release mode
		//removeIf(production)
		if(true){return;}
		//endRemoveIf(production)

		//jshint quotmark:false, maxstatements:30
		console.log("                         __..--.._");
		console.log("  .....              .--~  .....  `.");
		console.log(".\":    \"`-..  .    .' ..-'\"    :\". `");
		console.log("` `._ ` _.'`\"(     `-\"'`._ ' _.' '");
		console.log("     ~~~      `.          ~~~");
		console.log("              .'");
		console.log("             /");
		console.log("            (");
		console.log("             ^---'");
		console.log("     -=[ I SEE YOU! / TE VEO! ]=-");
		console.log("");

		//these errors are lies, just a joke
		console.warn(cfg.consoleError[utils.getRandomInt(cfg.consoleError.length - 1)]);

		//delete window.console;
		window.console = {};
		window.console.log = function(){return;};
		window.console.debug = function(){return;};
		window.console.error = function(){return;};
		window.console.warn = function(){return;};
		window.console.info = function(){return;};
	}

	function _handleCompatibility(){
		if(cfg.compatibility !== 2){
			if(cfg.compatibility === 0){
				alert(cfg.loader.text.incompatibleByDiag);
				utils.showPanicError(cfg.loader.text.incompatibleByDiag + '<br>' +
					cfg.loader.text.faqLink);
			} else /* 1 */ {
				_showError(cfg.loader.text.semiIncompatible);
			}
		}
	}


	function _debugToolsLoad(){

		if(cfg.contentEditable){
			doc.body.contentEditable = 'true';
			doc.designMode = 'on';
		}

		if(cfg.showSkeletor){
			utils.showSkeletor();
		}
	}


	function hide(){
		loadingScreen.off(); //via css 500ms
	}

	function show(){
		loadingScreen.on(); //via css 500ms
	}

	function _showError(m){
		console.error(m);
		alert(m);
	}

	function debug(m){
		if(cfg.release || !cfg.debugZoneActive){
			return;
		}
		cfg.debugZone.innerHTML = m;
	}

	function debugAdd(m){
		if(cfg.release || !cfg.debugZoneActive){
			return;
		}
		debug(cfg.debugZone.innerHTML + '<br>---<br>' + m);
	}

	return {
		debug: debug,
		debugAdd: debugAdd,
		show: show,
		hide: hide,
		init: init
	};
}());
