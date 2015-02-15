///**
//* Created by Crystian on 15/02/02.
//*/
//
var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	csslint = require('gulp-csslint'),
	//debug = require('gulp-debug'),
	del	= require('del'),
	gutil = require('gulp-util');

gulp.task('remove:build', ['remove:temp'], function(cb) {
	//no borrar la carpeta build, da errores de sincro
	del([global.cfg.folders.screens,
		global.cfg.folders.build +'/*.*'
	], /*{force:true}, */cb());
});
gulp.task('remove:temp', function(cb) {
	del([global.cfg.folders.temp],cb());
});

exports.sassfixer = function(src, dest) {
	return gulp.src(src)
		//.pipe(debug({verbose: true}))
		.on('error', console.error.bind(console))
		.pipe(sass({style: 'expanded', noCache: true}))
		.pipe(autoprefixer(global.cfg.autoprefixer))
		.pipe(csslint('csslintrc.json'))
		.pipe(csslint.reporter().on('error',gutil.log))
		.pipe(gulp.dest(dest));
};

process.on('uncaughtException', function(err){
	if(typeof err === 'string') err = {message:err};
	console.error('uncaughtException: ' + err.message);
	console.error(err.stack);
	process.exit(1);             // exit with error
});

