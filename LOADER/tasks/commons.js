///**
//* Created by Crystian on 15/02/02.
//*/
//
//var gulp = require('gulp'),
//	sass = require('gulp-ruby-sass'),
//	autoprefixer = require('gulp-autoprefixer'),
//	//debug = require('gulp-debug'),
//	del	= require('del'),
//	csslint = require('gulp-csslint'),
//	gutil = require('gulp-util');
//
//gulp.task('remove:build', function(cb) {
//	//no borrar la carpeta build, da errores de sincro
//	del([global.cfg.folders.temp,
//		global.cfg.folders.screens,
//		global.cfg.folders.dist
//	], /*{force:true}, */cb());
//});
//
//exports.sassfixer = function(src, dest) {
//	var r = gulp.src(src)
//	//.pipe(debug({verbose: true}))
//	.pipe(sass({style: 'expanded', noCache: true}))
//	.pipe(autoprefixer(global.cfg.autoprefixer))
//	.pipe(csslint('csslintrc.json'))
//	.pipe(csslint.reporter().on('error',gutil.log))
//	.pipe(gulp.dest(dest));
//
//	r.on('error', console.error.bind(console));
//	return r;
//};
//
//process.on('uncaughtException', function(err){
//	if(typeof err === 'string') err = {message:err};
//	console.error('uncaughtException: ' + err.message);
//	console.error(err.stack);
//	process.exit(1);             // exit with error
//});
//
