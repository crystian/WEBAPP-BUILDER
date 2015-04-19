/**
 * Created by Crystian on 4/6/2015.
 */

var gutil = require('gulp-util'),
	debug = require('gulp-debug'),
	shared = require('../../tasks/project/shared.js'),
	spawn = require('child_process').spawn,
	fs = require('fs-extra'),
	runSequence = require('run-sequence'),
	node,
	gulp = require('gulp');

//alias
gulp.task('default',['build']);
gulp.task('full',	['full:app']);


gulp.task('full:app', function (cb) {
	runSequence(
		'remove:build',
		'get:loader',
		'css:app',
		'build',
		'optimizeImages',
		(gutil.env.debug) ? 'nothing' : 'genAppCache',
		cb);
});

gulp.task('build', function (cb) {
	runSequence(
		'build:fast',
		'copy:imgs',
		(gutil.env.debug) ? 'nothing' : 'remove:temp',
		cb);
});

gulp.task('copy:imgs', function (){
	return gulp.src([
		global.cfg.folders.www +'/landing/img/**/*',
		global.cfg.folders.www +'/app/assets/img/**/*',
		'!**/app/assets/img/sprite*{,/**}'
	]).pipe(gulp.dest(global.cfg.folders.build +'/img'));
});
