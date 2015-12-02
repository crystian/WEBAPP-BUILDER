/**
 * Created by Crystian on 01/12/2015.
 */

(function(){

	var core   = require('./core'),
			www    = require('./www'),
			prepro = require('./preprocessors');

	exports.makeWwwJson = function(){
		return core.getFilesByGroupAndApps(www.makeWwwJson, www.resolveFiles);
	};

	exports.runPreprocessors = function(){
		return core.getFilesByGroupAndAppsStream(null, prepro.runPreprocessors);
	};

}());