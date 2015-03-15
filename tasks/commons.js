/**
* Created by Crystian on 15/02/02.
*/

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	clean = require('gulp-clean'),
	gutil = require('gulp-util');

gulp.task('remove:build', function() {
	//no borrar la carpeta build, da errores de sincro
	return gulp.src([
			global.cfg.folders.screens,
			global.cfg.folders.build
		], {read: false})
		.pipe(clean());
});

gulp.task('remove:temp', function() {
	return gulp.src([
			global.cfg.folders.temp
		], {read: false})
		.pipe(clean());
});


