///**
// * Created by Crystian on 4/13/2015.
// */
//
//var gulp = require('gulp'),
//	utils = require('./utils.js'),
//	commons = require('../commons'),
//	rename = require('gulp-rename'),
//	del = require('del'),
//	fs = require('fs-extra'),
//	exec = require('child_process').exec,
//	gutil = require('gulp-util');
//
//gulp.task('copy:www:cordova', ['remove:cordova:www','full:app'], function () {
//	if(global.cfg.cordova === false || !utils.fileExist(global.cfg.folders.build +'/'+ global.cfg.loader.filesDest.indexCordova)){
//		console.logRed('Remember set var cordova on true, and it must create '+ global.cfg.loader.filesDest.indexCordova +' file');
//		utils.exit(1);
//	}
//
//	fs.removeSync(global.cfg.folders.temp);
//
//	fs.copySync(global.cfg.folders.build, global.cfg.folders.cordovaWWW);
//
//	return gulp.src(global.cfg.folders.cordovaWWW+'/'+global.cfg.loader.filesDest.indexCordova)
//		.pipe(commons.debugeame())
//		.pipe(rename('index.html'))
//		.pipe(gulp.dest(global.cfg.folders.cordovaWWW))
//		.on('end', function (){
//			return del(global.cfg.folders.cordovaWWW +'/'+ global.cfg.loader.filesDest.indexCordova);
//		});
//});
//
//gulp.task('run:android', ['copy:www:cordova'], function (cb) {
//
//	exec('cordova run android', {cwd: global.cfg.folders.cordova},
//		function (error, stdout, stderr) {
//
//			if (error || (stderr && stderr !== '')) {
//				if (gutil.env.debug) {
//					console.logRed(stdout);
//				}
//				console.logRed('stderr: ' + stderr);
//				console.logRed('exec error: ' + error);
//			} else {
//				if (gutil.env.debug) {
//					console.logGreen(stdout);
//				} else {
//					console.logGreen('Cordova ran on Android (if you want see log, use the parameter --debug)');
//				}
//			}
//			cb();
//		});
//});

//gulp.task('remove:cordova:www', function () {
//	return del(global.cfg.folders.cordovaWWW);
//});
//
