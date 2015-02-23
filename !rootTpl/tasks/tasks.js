/**
 * Created by Crystian on 2/19/2015.
 */


var gulp = require('gulp'),
	runSequence = require('run-sequence');

gulp.task('default', ['build']);


gulp.task('build', function (cb) {
	runSequence(
		'remove:build',
		'make:app',
		//'run:cordova',

		//'make:loader',
		//'remove:temp',
		cb);
});