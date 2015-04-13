/**
 * Created by Crystian on 4/13/2015.
 */


var gutil = require('gulp-util'),
	//debug = require('gulp-debug'),
	engine = require('../../tasks/project/engine.js'),
	shared = require('../../tasks/project/shared.js'),
	gulp = require('gulp');

gulp.task('clearCache', function (done) {
	return engine.clearCache(done);
});

gulp.task('build:fast', ['runMagic'], function (){
	return engine.runJsonify(global.cfg.folders.www +'/apps.json');
});

gulp.task('runMagic', ['make:ngTemplate'], function (){
	return engine.runMagic(global.cfg.folders.www +'/apps.json');
});

gulp.task('optimizeImages', function (){
	return engine.optimizeImages();
});

gulp.task('genAppCache', function (){
	return engine.genAppCache();
});

gulp.task('get:loader', function(cb){
	shared.getLoader(cb);
});

gulp.task('serve:build', ['build'], function() {
	return utils.makeServe(global.cfg.folders.build, '', global.cfg.ip, global.cfg.ports.build);
});

gulp.task('css:app', function (){
	return engine.runPreprocessors(global.cfg.folders.www +'/apps.json');
});
gulp.task('cssw', function() {
	gulp.watch([global.cfg.folders.www + '/**/*.scss'], ['css:app']);
});
