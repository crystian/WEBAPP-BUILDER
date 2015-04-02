/**
 * Created by Crystian on 2/19/2015.
 */

var gulp = require('gulp'),
	engine = require('../LOADER/tasks/project/engine'),
	debug = require('gulp-debug');


gulp.task('css:app', function (){
	return engine.runPreprocessors(global.cfg.folders.www +'/apps.json');
});

gulp.task('runMagic', function (){
	return engine.runMagic(global.cfg.folders.www +'/apps.json');
});

gulp.task('build', ['runMagic'], function (){
	return engine.runJsonify(global.cfg.folders.www +'/apps.json');
});



