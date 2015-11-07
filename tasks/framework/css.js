/**
 * Created by Crystian on 06/11/2015.
 */

var utils        = require('./utils'),
		del          = require('del'),
		autoprefixer = require('gulp-autoprefixer'),
		replace      = require('gulp-replace'),
		csslint      = require('gulp-csslint'),
		gutil        = require('gulp-util'),
		sass         = require('gulp-sass');

gulp.task('makeCss', ['cleanCss'], function(){
	var src  = global.cfg.folders.fwk + '/' + global.cfg.loader.folders.www + '/**/*.s+(a|c)ss',
			dest = global.cfg.folders.fwk + '/' + global.cfg.loader.folders.www;

	var sassOptions = {errLogToConsole: true, indentedSyntax: false};

	return gulp.src(src)
		.pipe(utils.debugeame())
		.pipe(sass(sassOptions))
		.pipe(autoprefixer(global.cfg.autoprefixer && global.cfg.autoprefixer.split('|')))
		.pipe(replace(' 0px', ' 0'))
		.pipe(csslint(global.cfg.folders.fwk + '/csslintrc.json'))
		.pipe(csslint.reporter(customReporter))
		.pipe(csslint.failReporter())
		.pipe(gulp.dest(dest))
		;
});

gulp.task('watchCss', function(){
	return gulp.watch([global.cfg.folders.fwk + '/' + global.cfg.loader.folders.www + '/**/*.s+(a|c)ss'], ['makeCss']);
});

gulp.task('cleanCss', function(){
	return del([
		global.cfg.folders.fwk + '/' + global.cfg.loader.folders.www + '/**/*.css'
	], {force: true});
});

var customReporter = function(file){
	gutil.log(gutil.colors.cyan(file.csslint.errorCount) + ' errors in ' + gutil.colors.magenta(file.path));

	file.csslint.results.forEach(function(result){
		gutil.log(result.error.message + ' on line ' + result.error.line);
	});
};