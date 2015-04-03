/**
 * Created by Crystian on 2/19/2015.
 */

var gulp = require('gulp'),
	engine = require('../../tasks/project/engine');

//gulp.task('default', ['build']);
//
//gulp.task('css', ['css:app']); //just an alias
//gulp.task('loader', ['get:loader']);

gulp.task('cssw', function() {
	gulp.watch([global.cfg.folders.www + '/**/*.scss'], ['css:app']);
});

//ENGINE:
gulp.task('css:app', function (){
	return engine.runPreprocessors(global.cfg.folders.www +'/apps.json');
});