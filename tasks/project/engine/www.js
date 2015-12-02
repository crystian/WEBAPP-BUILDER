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

	exports.resolveFiles = function(file, config, appName, pth){
		var type = utils.getExtensionFile(file.path);

		if(core.defaults.validCssPreproExtensions.indexOf(type) !== -1){
			type = 'css';
		}

		if(core.defaults.validExtensions.indexOf(type) === -1){
			return;
		}

		if(file.basename.indexOf('.' + config.backupExtension + '.') !== -1){
			console.debug('WWWJSON:' + file.basename + ' Backup detected, skipped');
			return;
		}

		if(config.generateMin && file.basename.indexOf('.' + config.minExtension + '.') === -1){
			console.debug('WWWJSON:' + file.basename + ' GenerateMin origin version detected, skipped');
			return;
		}

		var filePath = utils.setExtensionFilename(file.path, type);
		filePath = path.relative(pth, filePath);
		filePath = filePath.split('\\').join('/');

		return filePath;
	};

	exports.makeWwwJson = function(files, appName, pth){
		var result = [];

		files.forEach(function(file){
			if(file && result.indexOf(file) === -1){
				result.push(file)
			}
		});

		return makeWwwFile(appName, result);
	};

	function makeWwwFile(appName, result){
		fs.writeFileSync(global.cfg.pathPrj + global.cfg.app.folders.www + appName + '/' + wwwJson,
			JSON.stringify(result, null, '\t'));

		console.debug(appName + ' generated');
	}

}());