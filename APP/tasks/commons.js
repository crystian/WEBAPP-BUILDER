/**
* Created by Crystian on 2/19/2015.
*/

var gulp = require('gulp'),
	clean = require('gulp-clean');

gulp.task('remove:build', function() {
	//no borrar la carpeta build, da errores de sincro
	return gulp.src([global.cfg.folders.build +'/**/*'
		], {read: false})
		.pipe(clean());
});

gulp.task('remove:temp', function() {
	return gulp.src([global.cfg.folders.temp
		], {read: false})
		.pipe(clean());
});
