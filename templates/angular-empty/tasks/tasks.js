///**
// * Created by Crystian on 4/6/2015.
// */
//
//var gutil = require('gulp-util'),
//	debug = require('gulp-debug'),
//	shared = require('../../tasks/project/shared.js'),
//	spawn = require('child_process').spawn,
//	fs = require('fs-extra'),
//	templateCache = require('gulp-angular-templatecache'),
//	runSequence = require('run-sequence'),
//	node,
//	gulp = require('gulp');
//
////alias
//gulp.task('default',['build']);
//gulp.task('full',	['full:app']);
//
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
//		'make:ngTemplate',
//		'build:fast',
//		(gutil.env.debug) ? 'nothing' : 'remove:temp',
//		cb);
//});
//
//
//gulp.task('make:ngTemplate', function () {
//	var stream = gulp.src([global.cfg.folders.www +'/**/*.tpl.html'])
//		//.pipe(debug({verbose: true}))
//		.on('error', gutil.log);
//
//	stream = shared.htmlMin(stream);
//	stream = stream.pipe(templateCache({
//		standalone: true,
//		root: global.cfg.folderRoot +'/'+ global.cfg.projectCode +'/www/'
//	}))
//	.pipe(gulp.dest(global.cfg.folders.temp));
//
//	return stream;
//});
