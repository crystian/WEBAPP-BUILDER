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
			global.cfg.folders.temp,
			global.cfg.folders.build +'/*.scss',
			global.cfg.folders.build +'/'+
				(global.cfg.loader.oneRequest ? '{'+
					global.cfg.landing.html+','+
					global.cfg.landing.css+','+
					global.cfg.landing.js+'}'
					: global.cfg.landing.finalFile
				)
		], {read: false})
		.pipe(clean());
});

gulp.task('make:onRequest', function(cb) {
	shared.makeOneRequest(global.cfg.makeOneRequestFile, cb);
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