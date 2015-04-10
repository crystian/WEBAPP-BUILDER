/**
* Created by Crystian on 10/20/2014.
*/

var	gutil = require('gulp-util'),
	//debug = require('gulp-debug'),
	utils = require('./project/utils'),
	gulp = require('gulp');

gulp.task('serve', function() {
	return utils.makeServe('.', global.cfg.loader.folders.www, global.cfg.ip, global.cfg.ports.serve);
});

gulp.task('serve:nightmare', function() {
	return utils.makeServe(global.cfg.folders.template +'/'+ global.cfg.loader.folders.build, '', global.cfg.ip, global.cfg.ports.nightmare);
});
