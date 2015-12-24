/**
 * Created by Crystian on 4/6/2015.
 */

//var gutil = require('gulp-util'),
//	debug = require('gulp-debug'),
//	shared = require('../../tasks/project/shared.js'),
//	spawn = require('child_process').spawn,
//	fs = require('fs-extra'),
//	templateCache = require('gulp-angular-templatecache'),
//	runSequence = require('run-sequence'),
//	node
//	gulp = require('gulp');
//;
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
//		'copy:fonts',
//		'copy:imgs',
//		'copy:data',
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
//
//
//gulp.task('copy:fonts', function (){
//	return gulp.src([
//		'vendors/bower_components/bootstrap/dist/fonts/**/*',
//		'vendors/bower_components/components-font-awesome/fonts/**/*',
//		global.cfg.folders.www +'/assets/fonts/**/*'
//	]).pipe(gulp.dest(global.cfg.folders.build + '/fonts'));
//});
//gulp.task('copy:imgs', function (){
//	return gulp.src([
//		global.cfg.folders.www +'/landing/img/**/*',
//		global.cfg.folders.www +'/app/assets/img/**/*',
//		'!**/app/assets/img/sprite*{,/**}'
//	]).pipe(gulp.dest(global.cfg.folders.build +'/img'));
//});
//gulp.task('copy:data', function (){
//	return gulp.src([
//		global.cfg.folders.www +'/app/data/local.json'
//	]).pipe(gulp.dest(global.cfg.folders.build +'/data'));
//});


//gulp.task('apiServe', function() {
//	if (node) node.kill();
//	var www = (global.cfg.pathPrj + 'www/api/api.js');
//	node = spawn('node', [www], {stdio: 'inherit'});
//	node.on('close', function (code) {
//		if (code === 8) {
//			gulp.log('Error detected, waiting for changes...');
//		}
//	});
//});
