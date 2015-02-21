/**
* Created by Crystian on 10/16/2014.
*/

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	runSequence = require('run-sequence'),
	gutil = require('gulp-util');

gulp.task('i', ['install']);
gulp.task('install', ['bowerify']);//install

gulp.task('default', ['build']);

gulp.task('build', function (cb) {
	runSequence(
		'remove:build',
		'make:loader',
		'remove:temp',
		cb);
});

gulp.task('build:full', function (cb) {
	runSequence(
		'bowerify',
		'build',
		cb);
});

gulp.task('release', function (cb) {
	'use strict';

	if (!global.cfg.loader.release) {
		console.logRed('Variable "release" in gulp-config on "false", you will change it if you want a release');
		process.exit(1);
	}

	if (gutil.env.withapp) {
		console.logRed('Is not posible with "withapp" argument, because its need a final destination');
		process.exit(1);
	}

	runSequence(
		'build:full',
		'test:loader',
		cb);
});

gulp.task('css', ['css:loader']); //just an alias
