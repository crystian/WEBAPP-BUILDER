/**
* Created by Crystian on 15/02/02.
*/

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	utils = require('./project/utils'),
	removeCode = require('gulp-remove-code'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	gif = require('gulp-if'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	csslint = require('gulp-csslint'),
	replace = require('gulp-replace'),
	inject = require('gulp-inject'),
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

exports.jsMaker = function(stream) {
	return stream
		//.pipe(debug({verbose: true}))
		//.on('error', gutil.log)
		.pipe(gif(cfg.loader.release, jshint({lookup:false, debug:false})))
		.pipe(gif(cfg.loader.release, jshint.reporter('jshint-stylish')))
		.pipe(gif(cfg.loader.release, jshint.reporter('fail')))

		.pipe(removeCode({ production: cfg.loader.release }))
		.pipe(gif(cfg.loader.release, uglify({
			output:{
				beautify: false
			},
			compress:{
				sequences: true,
				drop_console: false
			}
		}))
	);
};

exports.injectContent = function(filePath, name, tagHtm) {
	return inject(gulp.src([filePath]), {
		starttag: '<!-- inject:'+ name +' -->',
		transform: function (filePath, file) {
			var r = file.contents.toString('utf8');
			if (tagHtm) {
				r = '<'+tagHtm+'>'+r+'</'+tagHtm+'>';
			}
			return r;
		}
	});
};

exports.sassfixer = function(src, dest) {
	var type = utils.getExtensionFile(src);
	var sassOptions = {errLogToConsole: true, indentedSyntax: (type === 'sass')};

	return gulp.src(src)
		//.pipe(debug({verbose: true}))
		//.on('error', gutil.log)
		.pipe(sass(sassOptions))
		.pipe(autoprefixer(global.cfg.autoprefixer))
		.pipe(replace(' 0px', ' 0'))
		.pipe(csslint('csslintrc.json'))
		.pipe(csslint.reporter().on('error',gutil.log))
		.pipe(gulp.dest(dest));
};
