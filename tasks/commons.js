/**
* Created by Crystian on 15/02/02.
*/

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	shared = require('./shared'),
	chalk = require('chalk'),
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


process.on('uncaughtException', function(err){
	if(typeof err === 'string') err = {message:err};
	console.logRed('uncaughtException: ' + err.message);
	if (gutil.env.debug) {
		console.logRed(err.stack);
	}
	process.exit(1);             // exit with error
});


console.logGreen = function (m) {
	console.log(chalk.black.bgGreen(m));
};
console.logRed = function (m) {
	console.log(chalk.white.bold.bgRed(m));
};