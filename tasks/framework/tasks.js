/**
 * Created by Crystian on 10/16/2014.
 */

var gutil       = require('gulp-util'),
		runSequence = require('run-sequence');

//alias:
gulp.task('default', ['buildLoader']);


gulp.task('loaderConfig', ['_makeConfig']);
gulp.task('loaderCss', ['_makeCss']);
gulp.task('loaderCssw', ['_watchCss']);
gulp.task('loaderServe', ['_serve']);
//gulp.task('loaderTest',		['_test']);

gulp.task('nothing', []);

gulp.task('buildLoader', function(cb){
	runSequence(
			'_buildFull',
			gutil.env.debug ? 'nothing' : '_removeTemp',
		cb);
});

