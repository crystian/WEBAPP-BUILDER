///**
// * Created by Crystian on 3/28/2015.
// */
//
//var gulp = require('gulp'),
//	debug = require('gulp-debug'),
//	exec = require('child_process').exec,
//	fs = require('fs-extra'),
//	gutil = require('gulp-util');
//
//
//exports.getLoader = function(cb) {
//	makeLoader(function () {
//		copyLoader(cb);
//	});
//};
//
//function copyLoader(cb){
//	var pathSrc = global.cfg.app.folders.loader + '/' + global.cfg.loader.folders.build;
//	fs.copySync(pathSrc +'/'+global.cfg.files.index, global.cfg.folders.www +'/'+global.cfg.files.index);
//
//	if(global.cfg.loader.bower.bootstrap){
//		fs.copySync(pathSrc +'/assets', global.cfg.folders.www +'/assets');
//	}
//
//	if (global.cfg.cordova) {
//		fs.copySync(pathSrc +'/'+global.cfg.files.indexCordova, global.cfg.folders.www +'/'+global.cfg.files.indexCordova);
//	}
//
//	cb();
//}
//
//function makeLoader(cb) {
//	console.logGreen('Making loader ...');
//
//	exec('gulp full', {cwd: global.cfg.folders.loader},
//		function (error, stdout, stderr) {
//
//			if (error || (stderr && stderr !== '')) {
//				if (gutil.env.debug) {
//					console.logGreen(stdout);
//				}
//				console.logRed('stderr: ' + stderr);
//				console.logRed('exec error: ' + error);
//			} else {
//				if (gutil.env.debug) {
//					console.logGreen(stdout);
//				} else {
//					console.logGreen('Loader generated.');
//				}
//			}
//
//			cb();
//		});
//};