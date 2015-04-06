/**
* Created by Crystian on 10/16/2014.
*/

var gutil = require('gulp-util'),
	//debug = require('gulp-debug'),
	utils = require('./project/utils.js'),
	runSequence = require('run-sequence');
	gulp = require('gulp');

//alias:
gulp.task('default', ['build']);
gulp.task('css', ['css:loader']);
gulp.task('config', ['make:config']);
gulp.task('full',['build:full']);

gulp.task('build:full', function (cb) {
	runSequence(
		'make:base',
		'build',
	cb);
});

gulp.task('build',function (cb) {
	runSequence(
		'remove:build',
		'make:loader',
		'remove:temp',
	cb);
});

gulp.task('release', function (cb) {
	if (!global.cfg.loader.release) {
		console.logRed('Variable "release" in project-config on "false", you will change it if you want a release');
		cb();
		utils.exit(1);
	}

	runSequence(
		'build:full',
		'test:loader',
	cb);
});
