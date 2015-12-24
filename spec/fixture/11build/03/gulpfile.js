/**
 * Created by Crystian on 02/19/2015.
 */

//REMEMBER!: All public TASKS ARE ON tasks.js
var gulp        = require('gulp'),
		runSequence = require('run-sequence'),
		image       = require('../../../../tasks/project/engine/image'),
		gutil       = require('gulp-util');

require('../../../../tasks/boot.js').boot({
	gulp: gulp,
	dirname: __dirname
});

gulp.task('hookPostDistProject', function(cb){
	runSequence(
		'copyImgs',
		'optimizeImages',
		//		(gutil.env.debug) ? 'nothing' : 'genAppCache',
		cb);
});

gulp.task('optimizeImages', function(){
	return image.optimizeImages(global.cfg.app.folders.dist + 'img/**/*', global.cfg.app.folders.dist + 'img')
});

gulp.task('copyImgs', function(){
	return gulp.src([
		global.cfg.app.folders.www + '/app/assets/img/**/*',
		global.cfg.app.folders.www + '/app2/assets/img/**/*'
	]).pipe(gulp.dest(global.cfg.app.folders.dist + '/img'));
});
