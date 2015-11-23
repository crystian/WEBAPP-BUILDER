/**
 * Created by Crystian on 14/11/2015.
 */
(function(){
	'use strict';

	var utils   = require('../../shared/utils'),
			core    = require('./core.js'),
			fs      = require('fs'),
			path    = require('path'),
			wwwJson = 'www.json';

	exports.makeWwwJson = function(files, appName, pth){
		var result = [];

		files.forEach(function(file){
			var filePath = file.path;
			filePath = path.relative(pth, filePath);

			var type = utils.getExtensionFile(filePath);

			if(core.defaults.validPreproExtensions.indexOf(type) !== -1){
				type = 'css';
			} else if(core.defaults.validExtensions.indexOf(type) === -1){
				console.logRed('APPFACTORY: Error, type not found');
				utils.exit(1);
			}

			filePath = utils.setExtensionFilename(filePath, type);

			filePath = filePath.split('\\').join('/');

			if(result.indexOf(filePath) > -1){
				console.logRed('APPFACTORY: Error, more than one file with the same name, check css files');
				utils.exit(1);
			}

			result.push(filePath);
		});

		return makeWwwFile(appName, result);
	};

	function makeWwwFile(appName, result){
		return fs.writeFile(global.cfg.pathPrj + global.cfg.app.folders.www + appName + '/' + wwwJson,
			JSON.stringify(result, null, '\t'),
			function(err){
				if(err){
					console.logRed(err);
				} else {
					console.logGreen(appName + ' generated');
				}
			});
	}

}());