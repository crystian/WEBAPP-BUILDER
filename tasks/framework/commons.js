///**
//* Created by Crystian on 15/02/02.
//*/
//
//var gulp = require('gulp'),
//	debug = require('gulp-debug'),
//	del = require('del'),
//	utils = require('./project/utils'),
//	sass = require('gulp-sass'),
//	autoprefixer = require('gulp-autoprefixer'),
//	replace = require('gulp-replace'),
//	csslint = require('gulp-csslint'),
//	gif = require('gulp-if'),
//	through = require('through2'),
//	jshint = require('gulp-jshint'),
//	removeCode = require('gulp-remove-code'),
//	uglify = require('gulp-uglify'),
//	inject = require('gulp-inject'),
//	gutil = require('gulp-util');
//
//gulp.task('remove:loader:build', function() {
//	return del([
//		global.cfg.loader.folders.screens,
//		global.cfg.loader.folders.build
//	]);
//});
//
//gulp.task('remove:loader:temp', function() {
//	return del(global.cfg.loader.folders.temp);
//});
//
//gulp.task('remove:cordova:www', function () {
//	return del(global.cfg.folders.cordovaWWW);
//});
//
//exports.jsMaker = function(stream) {
//	return stream
//		.pipe(gif(cfg.loader.release, jshint({lookup:false, debug:false})))
//		.pipe(gif(cfg.loader.release, jshint.reporter('jshint-stylish')))
//		.pipe(gif(cfg.loader.release, jshint.reporter('fail')))
//
//		.pipe(removeCode({ production: cfg.loader.release }))
//		.pipe(gif(cfg.loader.release, uglify({
//			output:{
//				beautify: false
//			},
//			compress:{
//				sequences: true,
//				drop_console: false
//			}
//		}))
//	);
//};
//

//exports.sassfixer = function(src, dest) {
//	var type = utils.getExtensionFile(src);
//	var sassOptions = {errLogToConsole: true, indentedSyntax: (type === 'sass')};
//
//    return gulp.src(src)
//		.pipe(this.debugeame())
//		.pipe(sass(sassOptions))
//		.pipe(autoprefixer(global.cfg.autoprefixer))
//		.pipe(replace(' 0px', ' 0'))
//		.pipe(csslint('csslintrc.json'))
//		.pipe(csslint.reporter())
//		.pipe(gulp.dest(dest));
//};
//