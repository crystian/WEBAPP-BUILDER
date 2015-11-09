/**
 * Created by Crystian on 10/16/2014.
 */

var gutil       = require('gulp-util'),
		utils       = require('./shared/utils.js'),
		runSequence = require('run-sequence'),
		gulp        = require('gulp');

//alias:
gulp.task('default',	['makeHtmlFinal']);
//gulp.task('full:loader',['build:loader:full']);
gulp.task('config',		['makeConfig']);
//gulp.task('test',		['test:loader']);
gulp.task('css', ['makeCss']);
gulp.task('cssw', ['watcherCss']);
gulp.task('nothing', []);


