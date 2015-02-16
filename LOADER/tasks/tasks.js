/**
* Created by Crystian on 10/16/2014.
*/

var gulp = require('gulp'),
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

gulp.task('release', function (cb) {

	if (!global.cfg.release) {
		console.error('variable release in gulp-config on "false", you will change it if you want a release');
		//return;
	}
	runSequence(
		'bowerify',
		'build',
		//'test:loader',
		cb);
});

gulp.task('css', ['css:loader']); //just an alias
