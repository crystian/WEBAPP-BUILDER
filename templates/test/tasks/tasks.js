/**
 * Created by Crystian on 4/6/2015.
 */

var runSequence = require('run-sequence'),
	gutil = require('gulp-util');

//alias
gulp.task('default',['build']);

gulp.task('build', function (cb) {
	runSequence(
		'buildProject',
		cb);
});

gulp.task('dist', function (cb) {
	runSequence(
		'buildFullDist',
		'copyImgs',
//		'optimizeImages',
//		(gutil.env.debug) ? 'nothing' : 'genAppCache',
		cb);
});

gulp.task('copyImgs', function (){
	return gulp.src([
		global.cfg.app.folders.www +'/app/assets/img/**/*'
	]).pipe(gulp.dest(global.cfg.app.folders.build +'/img'));
});
