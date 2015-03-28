/**
* Created by Crystian on 10/20/2014.
*/

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	utils = require('./project/utils');

gulp.task('serve', function() {
	return utils.makeServe('.', 'www', global.cfg.ip, global.cfg.ports.serve);
});

gulp.task('serve:build', ['build:fast'], function() {
	return utils.makeServe(global.cfg.folders.build, '', global.cfg.ip, global.cfg.ports.build);
});

gulp.task('serve:nightmare', function() {
	return utils.makeServe(global.cfg.folders.build, '', global.cfg.ip, global.cfg.ports.nightmare);
});
