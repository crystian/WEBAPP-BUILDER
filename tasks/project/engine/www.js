/**
 * Created by Crystian on 14/11/2015.
 */

var through = require('through2'),
		fs      = require('fs'),
		path      = require('path'),
		utils = require('../../shared/utils'),
		wwwJson = 'www.json';

exports.makeWwwJson = function(appStream, appName, pth, option){
	var result = [];

	return appStream
		//.pipe(utils.debugeame())
		.pipe(through.obj(function(file, enc, cb){
			var filePath = file.path;
			filePath = path.relative(pth, filePath);

			var type = utils.getExtensionFile(filePath);

			switch (type){
				case 'scss':
				case 'sass':
				case 'less':
				case 'css':
					type = 'css';
					break;
				case 'js':
				case 'html':
					break;
				default:
					console.logRed('LOADER: Error, type not found');
					utils.exit(1);
					break;
			}

			filePath = utils.setExtensionFilename(filePath, type);

			filePath = filePath.split('\\').join('/');

			result.push(filePath);
			cb();
		}, function(cb){
			makeWwwFile(appName, result);
			cb();
		}));
};

function makeWwwFile(appName, result){
	fs.writeFile(global.cfg.pathPrj + global.cfg.app.folders.www + appName + '/' + wwwJson,
		JSON.stringify(result, null, '\t'),
		function(err){
			if(err){
				console.logRed(err);
			} else {
				console.logGreen(appName + ' generated');
			}
		});
}
