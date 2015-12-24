/**
 * Created by Crystian on 4/6/2015.
 */

var runSequence = require('run-sequence'),
	gutil = require('gulp-util');

//alias
gulp.task('default',['build']);

//gulp.task('hookPostBuildProject', function (cb) {
//	runSequence(
//		'copyImgs',
//		cb);
//});

gulp.task('hookPostDistProject', function (cb) {
	runSequence(
		'copyImgs',
//		'optimizeImages',
//		(gutil.env.debug) ? 'nothing' : 'genAppCache',
		cb);
});

gulp.task('copyImgs', function (){
	return gulp.src([
		global.cfg.app.folders.www +'/app/assets/img/**/*'
	]).pipe(gulp.dest(global.cfg.app.folders.dist +'/img'));
});
