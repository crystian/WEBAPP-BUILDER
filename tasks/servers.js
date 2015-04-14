/**
* Created by Crystian on 10/20/2014.
*/

var	gutil = require('gulp-util'),
	//debug = require('gulp-debug'),
	shared = require('./project/shared'),
	gulp = require('gulp');

gulp.task('serve:loader', ['full:loader'], function() {
	return shared.makeServe('.', global.cfg.loader.folders.www, global.cfg.ip, global.cfg.ports.serve);
});

gulp.task('serve:nightmare', function() {
	return shared.makeServe(global.cfg.folders.template +'/'+ global.cfg.loader.folders.build, '', global.cfg.ip, global.cfg.ports.nightmare);
});
