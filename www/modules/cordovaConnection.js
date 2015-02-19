loader.diag.cordovaConnection = (function () {
	'use strict';

	function init() {
		document.addEventListener('online', function(){
			console.debug('loader.diag.cordovaConnection.online');
			setStatus(true);
			document.dispatchEvent(loader.events.appOnline);
		}, false);

		document.addEventListener('offline', function(){
			console.debug('loader.diag.cordovaConnection.offline');
			setStatus(false);
			document.dispatchEvent(loader.events.appOffline);
		}, false);

		//not needed
		//document.addEventListener('pause', function, false);
	}

	function setStatus(v){
		loader.diag.setStatusConnection(v);
	}

	function getType(state) {
		var states = {};
		states[Connection.UNKNOWN] = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI] = 'WiFi connection';
		states[Connection.CELL_2G] = 'Cell 2G connection';
		states[Connection.CELL_3G] = 'Cell 3G connection';
		states[Connection.CELL_4G] = 'Cell 4G connection';
		states[Connection.CELL] = 'Cell generic connection';
		states[Connection.NONE] = 'No network connection';

		return states[state];
	}


	/**
	 * determina si la conexion es valida
	 * 0 = desconectado
	 * 1 = conetactado pero mala conexion
	 * 2 = buena conexion
	 *
	 * NOTA: Solo valido para cordova apps
	 * @returns {*}
	 */
	function checkConnection(){
		//jshint maxcomplexity:false
		var v;

		switch (navigator.connection.type){
		case 'unknown':
		case 'none':
			v = 0;
			break;
		case '2g':
		case '3g':
		case 'cellular':
			v = 1;
			break;
		case 'ethernet':
		case 'wifi':
		case '4g':
			v = 2;
			break;
		}
		return v;
	}

	return {
		checkConnection: checkConnection,
		getType: getType,
		init: init
	};

}());
