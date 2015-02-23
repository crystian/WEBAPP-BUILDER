/**
* Created by Crystian on 10/16/2014.
*/

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	runSequence = require('run-sequence'),
	gutil = require('gulp-util');

gulp.task('default', ['build:fast']);

gulp.task('build:full', function (cb) {
	runSequence(
		'make:base',
		'build:fast',
	cb);
});

gulp.task('build:fast', function (cb) {
	runSequence(
		'remove:build',
		'make:loader',
		'remove:temp',
	cb);
});


gulp.task('release', function (cb) {
	if (!global.cfg.loader.release) {
		console.logRed('Variable "release" in gulp-config on "false", you will change it if you want a release');
		process.exit(1);
	}

	runSequence(
		'build:full',
		'test:loader',
	cb);
});

gulp.task('css', ['css:loader']); //just an alias
