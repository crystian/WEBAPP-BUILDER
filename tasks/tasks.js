/**
* Created by Crystian on 10/16/2014.
*/

var gulp = require('gulp'),
	chalk = require('chalk'),
	runSequence = require('run-sequence');

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

	if (!global.cfg.release) {
		console.log(chalk.black.bgRed('variable release in gulp-config on "false", you will change it if you want a release'));
		global.cfg.release = true;
	}

	runSequence(
		'build:full',
		'test:loader',
		cb);
});

gulp.task('css', ['css:loader']); //just an alias
