///**
// * Created by Crystian on 3/28/2015.
// */
//
//var gulp = require('gulp'),
//	webserver = require('gulp-webserver'),
//	htmlmin = require('gulp-htmlmin'),
//	gif = require('gulp-if'),
//	strip = require('gulp-strip-comments'),
//	commons = require('../commons'),
//	exec = require('child_process').exec,
//	utils = require('./utils.js'),
//	fs = require('fs-extra'),
//	gutil = require('gulp-util');
//
//
//exports.copyLoader = function(cb){
//	var pathSrc = global.cfg.folderRoot +'/'+ global.cfg.loader.folders.build,
//		pathDest = global.cfg.folders.build;
//
//	fs.copySync(pathSrc +'/'+ global.cfg.loader.filesDest.index, pathDest +'/'+ global.cfg.loader.filesDest.index);
//
//	if (global.cfg.cordova) {
//		fs.copySync(pathSrc +'/'+global.cfg.loader.filesDest.indexCordova, pathDest +'/'+ global.cfg.loader.filesDest.indexCordova);
//	}
//
//	cb();
//};
//
//exports.htmlMin = function(stream){
//	var htmlminOptions = {
//		collapseWhitespace: true,
//		removeComments: true,
//		removeRedundantAttributes: true
//	};
//	stream = stream
//		.pipe(strip({safe:false, block:false}))
//		.pipe(gif(global.cfg.release, htmlmin(htmlminOptions)));
//
//	return stream;
//};
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
