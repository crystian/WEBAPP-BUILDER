/**
 * Created by Crystian on 01/12/2015.
 */

(function(){
	'use strict';


	var core = require('./core'),
			www  = require('./www'),
			js   = require('./javascript'),
			html = require('./html'),
			css  = require('./css');

	exports.makeWwwJson = function(){
		return core.getFilesByGroupAndApps(www.makeWwwJson, www.resolveFiles);
	};

	exports.makeJsons = function(){
		return core.makeJsons();
	};

	exports.css = function(){
		return dist(core.getFilesByGroupAndAppsStream(null, css.runPreprocessors));
	};

	exports.js = function(){
		return dist(core.getFilesByGroupAndAppsStream(null, js.runPreprocessors));
	};

	exports.html = function(){
		return dist(core.getFilesByGroupAndAppsStream(null, html.runPreprocessors));
	};


	function dist(stream){
		if(global.cfg.isBuild){
			stream = stream.pipe(gulp.dest(global.cfg.app.folders.build + global.cfg.app.folders.temp));
		}
		return stream;
	}

}());