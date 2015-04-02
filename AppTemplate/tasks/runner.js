/**
 * Created by Crystian on 2/19/2015.
 */

//var gulp = require('gulp'),
//	debug = require('gulp-debug'),
//	//rename = require('gulp-rename'),
//	exec = require('child_process').exec,
//	//del	= require('del'),
//	fs = require('fs-extra'),
//	gutil = require('gulp-util');


//gulp.task('copy:www:cordova', ['remove:cordova:www'], function () {
//	fs.copySync(global.cfg.folders.www, global.cfg.folders.cordovaWWW);
//
//	return gulp.src(global.cfg.folders.cordovaWWW+'/'+global.cfg.files.indexCordova)
//		//.pipe(debug({verbose: true}))
//		//.on('error', console.error.bind(console))
//		.pipe(rename('index.html'))
//		.pipe(gulp.dest(global.cfg.folders.cordovaWWW))
//		.on('end', function () {
//			del(global.cfg.folders.cordovaWWW+'/'+global.cfg.files.indexCordova);
//		});
//});
//
//gulp.task('run:android', ['copy:www:cordova'], function (cb) {
//
//	exec('cordova run android',{cwd:global.cfg.folders.cordova},
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
//
//gulp.task('remove:cordova:www', function (cb) {
//	del(global.cfg.folders.cordovaWWW+'/**/*',cb);
//});
