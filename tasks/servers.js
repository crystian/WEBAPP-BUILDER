/**
* Created by Crystian on 10/20/2014.
*/

var	gulp = require('gulp'),
	shared = require('./project/shared'),
	gutil = require('gulp-util');

gulp.task('serve:loader', ['build:loader'], function() {
	return shared.makeServe('.', global.cfg.loader.folders.www, global.cfg.ip, global.cfg.ports.serve);
});

gulp.task('serve:nightmare', function() {
	return shared.makeServe(global.cfg.folders.template +'/'+ global.cfg.loader.folders.build, '', global.cfg.ip, global.cfg.ports.nightmare);
});
