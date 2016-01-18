/**
 * Created by Crystian on 4/6/2015.
 */

var runSequence = require('run-sequence'),
		image       = require('../../../tasks/project/engine/image');

//alias
gulp.task('default', ['build']);

gulp.task('hookPostDistProject', function(cb){
	runSequence(
		'copyImgs',
		'optimizeImages',
		cb);
});

gulp.task('optimizeImages', function(){
	return image.optimizeImages(global.cfg.app.folders.dist +'img/**/*', global.cfg.app.folders.dist +'img')
});

gulp.task('copyImgs', function(){
	return gulp.src([
		global.cfg.app.folders.www + '/app/assets/img/*.*'
	]).pipe(gulp.dest(global.cfg.app.folders.dist + '/img'));
});
