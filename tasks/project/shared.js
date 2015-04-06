/**
 * Created by Crystian on 3/28/2015.
 */

var gutil = require('gulp-util'),
	debug = require('gulp-debug'),
	exec = require('child_process').exec,
	fs = require('fs-extra'),
	gulp = require('gulp');


exports.getLoader = function(cb) {
	makeLoader(function () {
		copyLoader(cb);
	});
};

function copyLoader(cb){
	var pathSrc = '../' + global.cfg.loader.folders.build,
		pathDest = './'+ global.cfg.folders.build;

	fs.copySync(pathSrc +'/'+ global.cfg.loader.filesDest.index, pathDest +'/'+ global.cfg.loader.filesDest.index);

	if(global.cfg.loader.bower.bootstrap){
		fs.copySync(pathSrc +'/assets', pathDest +'/assets');
	}

	if (global.cfg.cordova) {
		fs.copySync(pathSrc +'/'+global.cfg.loader.filesDest.indexCordova, pathDest +'/'+ global.cfg.loader.filesDest.indexCordova);
	}

	cb();
}

function makeLoader(cb) {
	console.logGreen('Making loader ...');

	exec('gulp full', {cwd: '../'},
		function (error, stdout, stderr) {

			if (error || (stderr && stderr !== '')) {
				if (gutil.env.debug) {
					console.logGreen(stdout);
				}
				console.logRed('stderr: ' + stderr);
				console.logRed('exec error: ' + error);
			} else {
				if (gutil.env.debug) {
					console.logGreen(stdout);
				} else {
					console.logGreen('Loader generated.');
				}
			}

			cb();
		});
}

exports.getDirectoryName = function(dirname) {
	var fullPath = dirname;
	var splitter = (global.cfg.os === 'win') ?	'\\' : '/';
	var path = fullPath.split(splitter);
	return path[path.length - 1];;
}