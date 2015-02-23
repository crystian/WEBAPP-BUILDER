/**
 * Created by Crystian on 2/19/2015.
 */

var gulp = require('gulp'),
	del	= require('del'),
	gutil = require('gulp-util');


gulp.task('remove:build', ['remove:temp'], function(cb) {
	//no borrar la carpeta build, da errores de sincro
	del([global.cfg.folders.build +'/**/*'
	], /*{force:true}, */cb());
});

gulp.task('remove:temp', function(cb) {
	del([global.cfg.folders.tempFull],cb());
});


process.on('uncaughtException', function(err){
	if(typeof err === 'string') err = {message:err};
	console.error('uncaughtException: ' + err.message);
	console.error(err.stack);
	process.exit(1);             // exit with error
});