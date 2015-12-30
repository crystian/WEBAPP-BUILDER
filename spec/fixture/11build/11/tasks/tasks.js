/**
 * Created by Crystian on 4/6/2015.
 */

var runSequence = require('run-sequence'),
		customs     = require('../../../../../tasks/shared/customs');

//alias
gulp.task('default', ['build']);

gulp.task('hookPreDistProject', function(cb){
	runSequence(
		'ngTemplateApp',
		cb);
});

gulp.task('ngTemplateApp', function(){
	return customs.ngTemplate(gulp.src([global.cfg.app.folders.www + '/**/*.tpl.html']))
		.pipe(gulp.dest(global.cfg.app.folders.www + 'app'));
});
