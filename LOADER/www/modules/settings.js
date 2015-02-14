/**
* Created by Crystian on 3/2/14.
*/

loader.settings = (function (){
	'use strict';

	var VERSION = 'version',
		USER = 'user',
		LOGGED = 'logged';


	//jshint maxcomplexity:9
	function init(){
		var version = get('version');
		if ( !version ) {
			//FIRST TIME!
			console.info('First time to here!');

			//set defaults values
			set(VERSION, loader.cfg.version);    //nomenclature version
			//others settings ...

		} else {
			if( loader.utils.compareSemVer(loader.cfg.version, version) === 1 ){
				//TODO we need update! chan!

				console.warn('New version by revision, migrate data...');

				//after all
				set(VERSION, loader.cfg.version);

				//trigger an event for others updates
				document.dispatchEvent(loader.events.newVersionDetected);
			}

			//more than once time here.
			//try to get data
		}
	}

	function set(item, value){
		localStorage.setItem(item, value);
	}

	function get(item) {
		return localStorage.getItem(item);
	}

	function remove(item) {
		return localStorage.removeItem(item);
	}

	function removeAlldata() {
		localStorage.clear();
	}

	return {
		VERSION: VERSION,
		USER: USER,
		LOGGED: LOGGED,
		init: init,
		remove: remove,
		removeAlldata: removeAlldata,
		set: set,
		get: get
	};
}());