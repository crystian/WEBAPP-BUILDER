/**
 * Created by Crystian on 3/28/2015.
 */

var gulp = require('gulp'),
	webserver = require('gulp-webserver'),
	htmlmin = require('gulp-htmlmin'),
	gif = require('gulp-if'),
	strip = require('gulp-strip-comments'),
	commons = require('../commons'),
	exec = require('child_process').exec,
	utils = require('./utils.js'),
	fs = require('fs-extra'),
	gutil = require('gulp-util');

exports.makeServe = function(folder, path, ip, port) {
	path = (path) ? path +'/': '';
	console.logGreen('Remember, this is the url: http://'+ ip +':'+ port +'/'+ path);

	return gulp.src(folder)
		.pipe(commons.debugeame())
		.pipe(webserver({
			host: ip,
			port: port,
			//fallback: 'index.html',
			//directoryListing: true,
			livereload: false,
			open: false
		}));

};

exports.copyLoader = function(cb){
	var pathSrc = global.cfg.folderRoot +'/'+ global.cfg.loader.folders.build,
		pathDest = global.cfg.folders.build;

	fs.copySync(pathSrc +'/'+ global.cfg.loader.filesDest.index, pathDest +'/'+ global.cfg.loader.filesDest.index);

	if (global.cfg.cordova) {
		fs.copySync(pathSrc +'/'+global.cfg.loader.filesDest.indexCordova, pathDest +'/'+ global.cfg.loader.filesDest.indexCordova);
	}

	cb();
};

exports.makeLoader = function(cb) {
	console.logGreen('Making loader ...');

	exec('gulp full:loader --projectCode '+ global.cfg.projectCode, {cwd: '../'},
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
