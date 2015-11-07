/**
 * Created by Crystian on 06/11/2015.
 */

var utils = require('./utils'),
	del = require('del'),
//	utils = require('./project/utils'),
		sass = require('gulp-sass');
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

gulp.task('makeCss', ['cleanCss'], function () {
	var src = global.cfg.folders.fwk +'/'+ global.cfg.loader.folders.www + '/**/*.s+(a|c)ss',
			dest = global.cfg.folders.fwk +'/'+ global.cfg.loader.folders.www;

		var sassOptions = {errLogToConsole: true, indentedSyntax: false};

    return gulp.src(src)
		.pipe(utils.debugeame())
		.pipe(sass(sassOptions))
		//.pipe(autoprefixer(global.cfg.autoprefixer))
		//.pipe(replace(' 0px', ' 0'))
		//.pipe(csslint('csslintrc.json'))
		//.pipe(csslint.reporter())
		.pipe(gulp.dest(dest))
	 ;
});


gulp.task('cleanCss', function(){
	return del([
		global.cfg.folders.fwk +'/'+ global.cfg.loader.folders.www + '/**/*.css'
	], {force: true});
});