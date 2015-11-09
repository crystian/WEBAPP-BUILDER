/**
 * Created by Crystian on 4/6/2015.
 */
//
//var gulp = require('gulp'),
//	runSequence = require('run-sequence'),
//	gutil = require('gulp-util');
//
////alias
//gulp.task('default',['build']);
//gulp.task('full',	['full:app']);
//
//gulp.task('full:app', ['remove:build'], function (cb) {
//	runSequence(
//		'get:loader',
//		'css:app',
//		'build',
//		'optimizeImages',
//		(gutil.env.debug) ? 'nothing' : 'genAppCache',
//		cb);
//});
//
//gulp.task('build', function (cb) {
//	runSequence(
//		'build:fast',
//		'copy:imgs',
//		'copy:others',
//		(gutil.env.debug) ? 'nothing' : 'remove:temp',
//		cb);
//});
//
//gulp.task('copy:imgs', function (){
//	return gulp.src([
//		global.cfg.folders.www +'/landing/img/**/*',
//		global.cfg.folders.www +'/app/assets/img/**/*',
//		'!**/app/assets/img/sprite*{,/**}'
//	]).pipe(gulp.dest(global.cfg.folders.build +'/img'));
//});
//
//gulp.task('copy:others', function (){
//	return gulp.src([
//		global.cfg.folders.www +'/favicon.ico'
//	]).pipe(gulp.dest(global.cfg.folders.build));
//});
