///**
//* Created by Crystian on 10/16/2014.
//*/
//
//var gutil = require('gulp-util'),
//	utils = require('./project/utils.js'),
//	runSequence = require('run-sequence'),
//	gulp = require('gulp');
//
////alias:
//gulp.task('default',	['build:loader']);
//gulp.task('full:loader',['build:loader:full']);
//gulp.task('config',		['make:config']);
//gulp.task('test',		['test:loader']);
//
//gulp.task('build:loader', function (cb) {
//
//	if(!utils.fileExist(global.cfg.loader.folders.www + '/'+global.cfg.loader.filesDest.index)
//	|| !utils.fileExist(global.cfg.loader.folders.www + '/config.js')){
//		console.logRed('Index not found, run `make:base` to generate');
//		utils.exit(1);
//	}
//
//	runSequence(
//		'make:loader:html',
//		'remove:loader:temp',
//	cb);
//});
//
//gulp.task('build:loader:full', ['make:base'], function (cb) {
//	runSequence(
//		'build:loader',
//		cb);
//});
//
//gulp.task('make:base', ['remove:loader:build'], function (cb) {
//	runSequence(
//		'make:base:index',
//		cb);
//});
//
//gulp.task('release', function (cb) {
//	if (!global.cfg.loader.release) {
//		console.logRed('Variable "release" in project-config on "false", you will change it if you want a release');
//		utils.exit(1);
//	}
//
//	runSequence(
//		'full:loader',
//		'test:loader',
//	cb);
//});


gulp.task('default', [], function () {
	console.log('desde tasks.js WORKS!');
});
