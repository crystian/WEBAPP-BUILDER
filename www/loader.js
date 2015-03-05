/**
* Created by crystian on 28/02/14.
*/

//jshint unused:false
var loader = (function(){
	'use strict';

	var cfg, diag, platform, utils, settings, events, doc, loadingScreen, applicationCache, location, ga, mx;

	//just for ofuscation
	function setters() {
		cfg = loader.cfg;
		diag = loader.diag;
		platform = loader.platform;
		utils = loader.utils;
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

		if (!cfg.release) {
			console.warn('****    DEBUG MODE!: NOT RELEASE    ****');
		}
		console.info('App version: ' + cfg.version +' ('+cfg.loader.version+')');
		console.info('Loader init');

		//if it is a device, load cordova plugins and more!
		if(cfg.isCordovaDevice){
			console.info('Cordova device');
			cfg.isDevice = 1;

			//carga asincrona, cuando llegue y se parsee dispara un deviceReady y lo mando a cordovaReady
			doc.addEventListener('deviceready', _loadAsync, false);

			utils.getJs('cordova.js');

		} else {
			if (platform.os.toString().match(/(iPhone|iPod|iPad|iOS|Android|BlackBerry)/)) {
				console.info('Device (without cordova)');

				cfg.isDevice = 1;
			} else {
				console.info('Web browser');
				cfg.isDesktop = 1;
			}

			_loadAsync();
		}
	}

	//by http://www.html5rocks.com/es/tutorials/appcache/beginner/
	function _handleAppCache() {
		// Check if a new cache is available on page load.
		//TODO improve it!, mostrar un cartel al usuario diciendole la proxima vez se actualizaran los datos
		applicationCache.addEventListener('updateready', function(e) {
			if (applicationCache.status === applicationCache.UPDATEREADY) {
				// Browser downloaded a new app cache.
				// Swap it in and reload the page to get the new hotness.
				applicationCache.swapCache();
//				if (confirm('A new version of this site is available. Load it?')) {
				location.reload();
//				}
			}
		}, false);
	}

	//pisando variables and removing references
	function _replaceVariables() {
		loader.cfg = window._loaderCfg;
		window._loaderCfg = null;
		//delete window._loaderCfg;

		//sirve para validaciones, no lo puedo controlar, setea esa variable, luego la elimino
		loader.platform = window.platform;
		window.platform = null;
		delete window.platform;
	}

	//no recuerdo porque, pero mejor dejarlo al timeout
	function _loadAsync() {
		setTimeout(_load, 100);
	}

	function _load() {
		_handleDebugMode();
		cfg.compatibility = diag.executeDiag();
		_handleCompatibility();

		//break! chauchau a dios, sos inmerecedor!
		if(cfg.compatibility === 0){return;}

		diag.registerDetectOrientation();
		cfg.isTouchDevice = diag.isTouchDevice();
		cfg.isMobile = diag.isMobile();
		cfg.isTablet = !cfg.isMobile;

		events.init();
		settings.init();
		ga.init();
		mx.init();

		_debugToolsLoad();

		if(cfg.loader.fastclick && cfg.isTouchDevice){
			FastClick.attach(doc.body);
		}

		_loadApp();
	}

	function _loadApp() {
		//just a dummy:
		var path = (cfg.loader.build) ? '.' : '../'+cfg.loader.pathTpl;

		//real case:
		if( cfg.loader.oneRequest ){

			utils.request(path +'/'+ cfg.landing.finalFile, function (data) {
				data = JSON.parse(utils.za(data));
				//console.dir(data);
				utils.setHtml(data.h);
				utils.setCss(data.c);
				utils.setJs(data.j);
				loader.finish();
			});

		} else {

			utils.request(path +'/'+ cfg.landing.html, function (data) {
				utils.setHtml(data);
				utils.request(path +'/'+ cfg.landing.css, function (data) {
					utils.setCss(data);
					utils.request(path +'/'+ cfg.landing.js, function (data) {
						utils.setJs(data);
						loader.finish();
					});
				});
			});
		}
	}

	function _handleDebugMode() {
		cfg.debugZone = byId('debugZone');

		debug('Version: ' + cfg.version+ '<br>Loader version: ' + cfg.loader.version);

		if( cfg.showDeviceInfo ){
			debugAdd(diag.getInfo());
		}

		//prefiero hacerlo asi por seguridad, esto lo remueve gulp en modo release
		//removeIf(production)
		if(true){return;}//flagGulpConsoleMessage
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

		//these errors are lies, solo para enganiar al malisioso
		console.warn(cfg.consoleError[utils.getRandomInt(cfg.consoleError.length-1)]);

		//delete window.console; //error al testear con nightmare
		window.console={};
		window.console.log=function(){return;};
		window.console.debug=function(){return;};
		window.console.error=function(){return;};
		window.console.warn=function(){return;};
		window.console.info=function(){return;};


		////dejo de funcionar con ultimas versiones de chrome, ROMPE IE!!
		//var _z = console;
		//Object.defineProperty( window, 'console', {
		//	get : function(){
		//		if( _z._commandLineAPI ){
		//			throw cfg.consoleError[
		//				utils.getRandomInt(cfg.consoleError.length-1)];
		//		}
		//		return _z;
		//	},
		//	set : function(val){
		//		_z = val;
		//	}
		//});

	}

	function _handleCompatibility() {
		if (cfg.compatibility !== 2) {
			if (cfg.compatibility === 0) {
				alert(cfg.loader.text.incompatibleByDiag);
				utils.showPanicError(cfg.loader.text.incompatibleByDiag +'<br>' +
											cfg.loader.text.faqLink);
			} else /* 1 */ {
				_showError(cfg.loader.text.semiIncompatible);
			}
		}
	}


	function _debugToolsLoad() {

		if (cfg.contentEditable) {
			doc.body.contentEditable = 'true';
			doc.designMode = 'on';
		}

		if( cfg.showSkeletor ){
			utils.showSkeletor();
		}
	}


	function hide() {
		loadingScreen.off(); //via css 500ms
	}

	function show() {
		loadingScreen.on(); //via css 500ms
	}

	function _showError(m){
		console.error(m);
		alert(m);
	}

	function debug(m) {
		if (cfg.release || !cfg.debugZoneActive) {
			return;
		}
		cfg.debugZone.innerHTML = m;
	}

	function debugAdd(m) {
		if (cfg.release || !cfg.debugZoneActive) {
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
