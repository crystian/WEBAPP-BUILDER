/**
 * Created by Crystian on 01/12/2015.
 */

(function(){

	var core = require('./core'),
			www  = require('./www'),
			js   = require('./javascript'),
			html = require('./html'),
			css  = require('./css');

	exports.makeWwwJson = function(){
		return core.getFilesByGroupAndApps(www.makeWwwJson, www.resolveFiles);
	};

	exports.css = function(){
		return core.getFilesByGroupAndAppsStream(null, css.runPreprocessors);
	};

	exports.js = function(){
		return core.getFilesByGroupAndAppsStream(null, js.runPreprocessors);
	};

	exports.html = function(){
		return core.getFilesByGroupAndAppsStream(null, html.runPreprocessors);
	};

}());