/**
* Created by Crystian on 10/16/2014.
*/

var gutil = require('gulp-util'),
	//debug = require('gulp-debug'),
	utils = require('./project/utils.js'),
	runSequence = require('run-sequence');
	gulp = require('gulp');

//alias:
gulp.task('default',	['build:loader']);
gulp.task('config',		['make:config']);
gulp.task('full:loader',['build:loader:full']);

gulp.task('build:loader:full', function (cb) {
	runSequence(
		'make:base',
		'build:loader',
	cb);
});

gulp.task('build:loader',function (cb) {
	runSequence(
		'remove:loader:build',
		'make:loader',
		'remove:loader:temp',
	cb);
});

gulp.task('release', function (cb) {
	if (!global.cfg.loader.release) {
		console.logRed('Variable "release" in project-config on "false", you will change it if you want a release');
		utils.exit(1);
	}

	runSequence(
		'build:loader:full',
		'test:loader',
	cb);
});
