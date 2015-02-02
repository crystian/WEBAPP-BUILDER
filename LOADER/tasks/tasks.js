/**
* Created by Crystian on 10/16/2014.
*/

var gulp = require('gulp'),
	runSequence = require('run-sequence');

gulp.task('default', ['build']);

gulp.task('build', function (cb) {
	runSequence(
		'remove:build',
		'make:loader',
		'copy:loader',
		cb);
});

gulp.task('release', function (cb) {
	runSequence(
		'test',
		'build',
		cb);
});

gulp.task('test', function (cb) {
	runSequence(
		'test:loader', //nightmare
		cb);
});

gulp.task('css', ['sassfixer']); //just an alias
gulp.task('sassfixer', [
	'css:loader',
	//'css:base'
]);


