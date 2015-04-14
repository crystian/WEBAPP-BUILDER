/**
 * Created by Crystian on 4/13/2015.
 */

var gutil = require('gulp-util'),
	//debug = require('gulp-debug'),
	magic = require('./magic.js'),
	clean = require('gulp-clean'),
	shared = require('./shared.js'),
	gulp = require('gulp');

require('./cordova.js');


//Alias
gulp.task('a',		['run:android']);
gulp.task('css',	['css:app']);
gulp.task('loader',	['get:loader']);

//make and get loader
gulp.task('get:loader', function(cb){
	shared.makeLoader(function () {
		shared.copyLoader(cb);
	});
});

//building
gulp.task('build:fast', ['runMagic'], function (){
	return magic.runJsonify(global.cfg.folders.www +'/apps.json');
});

gulp.task('runMagic', ['make:ngTemplate'], function (){
	return magic.runMagic(global.cfg.folders.www +'/apps.json');
});

gulp.task('optimizeImages', function (){
	return magic.optimizeImages();
});

gulp.task('clearCache', function (done) {
	return magic.clearCache(done);
});

gulp.task('genAppCache', function (){
	return magic.genAppCache();
});

//watches
gulp.task('css:app', function (){
	return magic.runPreprocessors(global.cfg.folders.www +'/apps.json');
});
gulp.task('cssw', function() {
	gulp.watch([global.cfg.folders.www + '/**/*.scss'], ['css:app']);
});


//servers
gulp.task('serve', ['full:app'], function() {
	return shared.makeServe('../', 'loader', global.cfg.ip, global.cfg.ports.serve);
});
gulp.task('serve:build', ['full:app'], function() {
	return shared.makeServe(global.cfg.folders.build, '', global.cfg.ip, global.cfg.ports.build);
});

//cleaning and others
gulp.task('remove:build', function() {
	return gulp.src([global.cfg.folders.build], {read: false})
		.pipe(clean());
});

gulp.task('remove:temp', function() {
	return gulp.src([global.cfg.folders.temp], {read: false})
		.pipe(clean());
});