/**
* Created by Crystian on 10/16/2014.
*/

var gulp = require('gulp'),
	runSequence = require('run-sequence');

gulp.task('i', ['install']);
gulp.task('install', ['bowerify']);//install


//gulp.task('default', ['build']);

//gulp.task('build', function (cb) {
//	runSequence(
//		'remove:build',
//		'make:loader',
//		cb);
//});
//
//gulp.task('release', function (cb) {
//	runSequence(
//		'build',
//		'test:loader',
//		cb);
//});
//
//gulp.task('css', ['sassfixer']); //just an alias
//gulp.task('sassfixer', [
//	'css:loader',
//	//'css:base'
//]);
//
//
