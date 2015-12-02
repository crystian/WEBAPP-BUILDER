/**
 * Created by Crystian on 01/12/2015.
 */

(function(){

	var core   = require('./core'),
			www    = require('./www'),
			js    = require('./javascript'),
			css = require('./css');

	exports.makeWwwJson = function(){
		return core.getFilesByGroupAndApps(www.makeWwwJson, www.resolveFiles);
	};

	exports.runCssPreprocessors = function(){
		return core.getFilesByGroupAndAppsStream(null, css.runPreprocessors);
	};

	exports.runJsPreprocessors = function(){
		return core.getFilesByGroupAndAppsStream(null, js.runPreprocessors);
	};

}());