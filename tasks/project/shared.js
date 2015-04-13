/**
 * Created by Crystian on 3/28/2015.
 */

var gutil = require('gulp-util'),
	debug = require('gulp-debug'),
	exec = require('child_process').exec,
	fs = require('fs-extra'),
	replace = require('replace'),
	utils = require('./utils.js'),
	htmlmin = require('gulp-htmlmin'),
	gif = require('gulp-if'),
	strip = require('gulp-strip-comments'),
	gulp = require('gulp');


exports.getLoader = function(cb) {
	makeLoader(function () {
		copyLoader(cb);
	});
};

function loaderReplaces(file) {
	var r =	['\"oneRequest\": false,', '\"oneRequest\": true,'];

	if(global.cfg.loader.release){
		r =	['oneRequest:!1,', 'oneRequest:1,'];
	}

	replace({
		regex: r[0],
		replacement: r[1],
		paths: [file],
		recursive: false,
		silent: true
	});
}

function copyLoader(cb){
	var pathSrc = '../' + global.cfg.loader.folders.build,
		pathDest = './'+ global.cfg.folders.build;

	fs.copySync(pathSrc +'/'+ global.cfg.loader.filesDest.index, pathDest +'/'+ global.cfg.loader.filesDest.index);

	if(global.cfg.loader.bower.bootstrap){
		fs.copySync(pathSrc +'/assets', pathDest +'/');
	}

	loaderReplaces(pathDest +'/'+ global.cfg.loader.filesDest.index);

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
				utils.exit(1);
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
};

exports.htmlMin = function(stream){
	var htmlminOptions = {
		collapseWhitespace: true,
		removeComments: true,
		removeRedundantAttributes: true
	};
	stream = stream
		.pipe(strip({safe:false, block:false}))
		.pipe(gif(global.cfg.release, htmlmin(htmlminOptions)));

	return stream;
};